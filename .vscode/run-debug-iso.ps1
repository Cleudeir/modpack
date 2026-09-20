# ============================================================
#  run-debug-iso.ps1 - Debug ISOLADO (KubeJS + Admin Panel)
#  com TIMEOUT de abertura (nao trava o agente/terminal).
#
#  1) Isole mods/ (KubeJS + Admin Panel) usando isolate_debug.ps1
#  2) Lanca o jogo com JDWP porta 5005 (suspend=n)
#  3) Espera o boot ate -WaitSec (default 240s), validando a
#     porta 5005 e o latest.log; se nao abrir -> aviso e exit.
#
#  Uso:
#    powershell -ExecutionPolicy Bypass -File .vscode\run-debug-iso.ps1
#    powershell -ExecutionPolicy Bypass -File .vscode\run-debug-iso.ps1 -WaitSec 300 -Username Dev -Xmx 6G
# ============================================================

[CmdletBinding()]
param(
    [int]$Port = 5005,
    [int]$WaitSec = 240,
    [string]$Username = "Dev",
    [string]$Xmx = "6G",
    [switch]$RestoreFirst,
    [switch]$NoIsolate
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot

# ---------- 1) isolar (ou restaurar antes, se pedido) ----------
$restoreScript = Join-Path $PSScriptRoot "restore_mods.ps1"
if ($RestoreFirst -and (Test-Path "$root\mods_full")) {
    Write-Host "[1] Restaurando mods/ completo primeiro..." -ForegroundColor Yellow
    & $restoreScript
}

if (-not $NoIsolate) {
    Write-Host "[1/3] Isolando mods para debug (KubeJS + Admin Panel)..." -ForegroundColor Cyan
    & (Join-Path $PSScriptRoot "isolate_debug.ps1")
    if ($LASTEXITCODE -ne 0) { Write-Host "[ERRO] Falha ao isolar mods." -ForegroundColor Red; exit 1 }
}

# ---------- 2) lancar com JDWP + timeout ----------
Write-Host "[2/3] Lancando jogo com JDWP porta $Port (suspend=n)..." -ForegroundColor Cyan

$launchOut = "$root\logs\debug-iso-console.log"
if (-not (Test-Path "$root\logs")) { New-Item -ItemType Directory -Path "$root\logs" | Out-Null }

# monta comando usando mc-launch-common.ps1 (mesma infra do run-debug.ps1)
. (Join-Path $PSScriptRoot "mc-launch-common.ps1")
$java = $script:java
$classpath = (Get-McClasspath | ForEach-Object { Fwd-ForJson $_ }) -join ';'
$modulePath = Get-McModulePath
$vmArgs = @(Get-McVmArgs -IncludeDebugAgent -DebugPort $Port -Suspend:$false -Xmx $Xmx)
$gameArgs = @(Get-McGameArgs -Username $Username)

$allArgs = New-Object System.Collections.Generic.List[string]
foreach ($a in $vmArgs)  { $allArgs.Add([string]$a) }
$allArgs.Add("-cp");         $allArgs.Add([string]$classpath)
$allArgs.Add("-p");          $allArgs.Add([string]$modulePath)
$allArgs.Add("cpw.mods.bootstraplauncher.BootstrapLauncher")
foreach ($a in $gameArgs) { $allArgs.Add([string]$a) }
$allArgsArr = $allArgs.ToArray()

$p = Start-Process -FilePath $java `
    -ArgumentList $allArgsArr `
    -WorkingDirectory $root `
    -RedirectStandardOutput $launchOut `
    -RedirectStandardError "$launchOut.err" `
    -PassThru `
    -WindowStyle Hidden

Write-Host "  PID $($p.Id) | java: $java"
Write-Host "  Log: $launchOut"

# ---------- 3) esperar boot com timeout ----------
Write-Host "[3/3] Aguardando boot (timeout ${WaitSec}s)... Porta $Port deve abrir e latest.log deve exibir o menu." -ForegroundColor Cyan

$deadline = (Get-Date).AddSeconds($WaitSec)
$portReady = $false
$menuReady = $false
$lastKit = ""

while ((Get-Date) -lt $deadline) {
    if ($p.HasExited) {
        Write-Host "  [ERRO] Jogo saiu antes de abrir (code $($p.ExitCode))." -ForegroundColor Red
        exit 1
    }
    # porta 5005 escutando?
    try {
        $c = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
        if ($c) { $portReady = $true }
    } catch { }

    # daily latest.log
    $latest = "$root\logs\latest.log"
    if (Test-Path $latest) {
        $tail = Get-Content $latest -Tail 40 -ErrorAction SilentlyContinue
        $menuReady = ($tail -match "Setting user:|Sound engine started|Backend library: LWJGL|Creating OpenGL|Preparing start region|Time elapsed") -and ($tail -notmatch "ERROR\] Failed")
        $lastKit = (Get-Content $latest -Tail 3 -ErrorAction SilentlyContinue) -join " | "
    }

    if ($portReady -and $menuReady) {
        Write-Host "  [OK] Boot completo: porta $Port ativa e menu carregado." -ForegroundColor Green
        Write-Host "  Anexe o VSCode (Attach to Minecraft, porta $Port)."
        exit 0
    }
    Start-Sleep -Seconds 2
}

# timeout
Write-Host ""
Write-Host "  [TIMEOUT de ${WaitSec}s atingido] - o processo nao terminou o boot." -ForegroundColor Yellow
Write-Host "  Porta 5005: $(if ($portReady) {'OK'} else {'NAO abriu'}) | Ultimas linhas:" -ForegroundColor Yellow
Write-Host "  $lastKit"
if (-not $portReady) {
    Write-Host "  [DICA] Se a porta nao abriu, veja $launchOut.err para o crash do JVM."
} elseif (-not $menuReady) {
    Write-Host "  [DICA] Porta aberta mas menu ainda nao carregou (mundo/mods pesados). Aumente -WaitSec."
    Write-Host "         Voce JA PODE anexar o debugger mesmo sem o menu."
}
exit 2