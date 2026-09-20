# ============================================================
#  ISOLAR MODS - modo debug (so KubeJS)
#  Move a pasta mods/ inteira para mods_full/ e cria uma mods/
#  contendo APENAS o KubeJS + dependencias obrigatorias
#  (kubejs-forge, rhino-forge, architectury, kubejsoffline).
#
#  Uso: powershell -ExecutionPolicy Bypass -File .vscode\isolate_kubejs.ps1
#  Para voltar: .vscode\restore_mods.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$mods = Join-Path $root "mods"
$backup = Join-Path $root "mods_full"
$marker = Join-Path $mods ".kubejs_isolated"

# Alvo do modo isolado: somente as dependencias do KubeJS 1.20.1
$onlyThese = @(
    "kubejs-forge-2001.6.5-build.14.jar",
    "rhino-forge-2001.2.3-build.6.jar",
    "architectury-9.2.14-forge.jar",
    "kubejsoffline-4.0.2.jar"
)

Write-Host "== Isolar mods (so KubeJS) ==" -ForegroundColor Cyan

# Ja isolado -> nao fazer nada
if (Test-Path -LiteralPath $marker) {
    Write-Host "[OK] mods/ ja esta isolado (so KubeJS). Nada a fazer." -ForegroundColor Green
    exit 0
}

# Backup pendente -> pedir para restaurar antes
if (Test-Path -LiteralPath $backup) {
    Write-Host "[ERRO] Existe uma pasta mods_full/. Execute restore_mods.ps1 primeiro." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath $mods)) {
    Write-Host "[ERRO] Pasta mods/ nao encontrada em $root" -ForegroundColor Red
    exit 1
}

Write-Host "[1/3] Movendo mods/ -> mods_full/ (backup completo)..." -ForegroundColor Yellow
Move-Item -LiteralPath $mods -Destination $backup

Write-Host "[2/3] Criando mods/ somente com KubeJS..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $mods | Out-Null
Set-Content -LiteralPath $marker -Value "isolated" -Encoding Ascii

foreach ($jar in $onlyThese) {
    $src = Join-Path $backup $jar
    if (Test-Path -LiteralPath $src) {
        $dst = Join-Path $mods $jar
        try {
            New-Item -ItemType HardLink -Path $dst -Target $src | Out-Null
            Write-Host "  + " $jar " (hardlink)" -ForegroundColor Green
        } catch {
            Copy-Item -LiteralPath $src -Destination $dst
            Write-Host "  + " $jar " (copia)" -ForegroundColor Green
        }
    } else {
        Write-Host "  ~ " $jar " nao encontrado no pacote (ignorado)" -ForegroundColor DarkGray
    }
}

Write-Host "[3/3] Concluido." -ForegroundColor Green
Write-Host ""
Write-Host "Agora inicie o jogo com debug (DEBUG.bat / TLauncher) e pressione F5 no VSCode." -ForegroundColor Cyan
Write-Host "Para voltar ao normal: .vscode\\restore_mods.ps1" -ForegroundColor Cyan
exit 0