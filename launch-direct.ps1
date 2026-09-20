# ============================================================
#  LAUNCH DIRECT FORGE (sem TLauncher)
#  Lê versions/modpack/modpack.json, monta o classpath das
#  bibliotecas em .minecraft\libraries e executa o
#  BootstrapLauncher do Forge direto no Java.
#
#  O agente JDWP (porta 5005) JÁ vem no modpack.json ->
#  o VSCode pode anexar (F5 -> Attach to Minecraft porta 5005).
#
#  Parametros:
#    -Username  "NomeJogador"   (default: Dev)
#    -Xmx       "6G"            (default: 6G  - evita OOM)
#    -Width     "1920"          (default: 1920)
#    -Height    "1080"          (default: 1080)
#    -NoDebug                    (remove o agente JDWP)
#    -DryRun                     (so monta e imprime o comando)
#
#  Uso:  powershell -ExecutionPolicy Bypass -File launch-direct.ps1
# ============================================================

[CmdletBinding()]
param(
    [string]$Username = "Dev",
    [string]$Xmx = "6G",
    [int]$Width = 1920,
    [int]$Height = 1080,
    [switch]$NoDebug,
    [switch]$DryRun
)

$ErrorActionPreference = "Stop"

$mcRoot    = "C:\Users\user\AppData\Roaming\.minecraft"
$gameDir   = "$mcRoot\versions\modpack"
$libDir    = "$mcRoot\libraries"
$assetsDir = "$mcRoot\assets"
$natDir    = "$gameDir\natives"
$manifest  = Join-Path $gameDir "modpack.json"
$clientJar = Join-Path $gameDir "modpack.jar"

if (-not (Test-Path $manifest)) { Write-Host "[ERRO] modpack.json nao encontrado em $manifest" -ForegroundColor Red; exit 1 }

$t = Get-Content -Raw $manifest | ConvertFrom-Json

# --- classpath: bibliotecas + client jar -------------------------
function Get-LibPath([string]$libName) {
    $p = $libName.Split(':')
    $group = $p[0]; $artifact = $p[1]; $version = $p[2]
    $classifier = if ($p.Count -gt 3) { $p[3] } else { $null }
    $dir = Join-Path $libDir ($group -replace '\.', '\')
    $f = "$artifact-$version"
    if ($classifier) { $f += "-$classifier" }
    return (Join-Path $dir (Join-Path $artifact (Join-Path $version "$f.jar")))
}

$cp = @()
foreach ($lib in $t.libraries) {
    $path = Get-LibPath $lib.name
    $cp += $path
}
$cp += $clientJar
$classpath = $cp -join ';'

# --- placeholders ------------------------------------------------
$uuid = $null
if (Test-Path "$gameDir\usercache.json") {
    try {
        $u = Get-Content -Raw "$gameDir\usercache.json" | ConvertFrom-Json
        $match = $u | Where-Object { $_.name -eq $Username }
        if ($match) { $uuid = $match.uuid }
    } catch { }
}
if (-not $uuid) {
    # UUID offline baseado no nome (convencao do launcher offline)
    $md5 = [System.Security.Cryptography.MD5]::Create()
    $bytes = [System.Text.Encoding]::UTF8.GetBytes("OfflinePlayer:$Username")
    $hash = ($md5.ComputeHash($bytes) | ForEach-Object { $_.ToString("x2") }) -join ''
    $uuid = $hash.Substring(0,8) + "-" + $hash.Substring(8,4) + "-" + $hash.Substring(12,4) + "-" + $hash.Substring(16,4) + "-" + $hash.Substring(20,12)
}

$vars = @{
    "classpath"           = $classpath
    "library_directory"   = $libDir -replace '\\', '/'
    "natives_directory"   = $natDir
    "classpath_separator" = ';'
    "launcher_name"       = 'direct-forge'
    "launcher_version"    = '1.0'
    "version_name"        = 'modpack'
    "game_directory"      = $gameDir
    "assets_root"         = $assetsDir
    "assets_index_name"   = '5'
    "auth_player_name"    = $Username
    "auth_uuid"           = $uuid
    "auth_access_token"   = '0'
    "clientid"            = ''
    "auth_xuid"           = ''
    "user_type"           = 'Legacy'
    "version_type"        = 'release'
    "resolution_width"    = '854'
    "resolution_height"   = '480'
}

function Expand-Args([object[]]$argsIn, $varsTable) {
    $out = @()
    foreach ($a in $argsIn) {
        $vals = if ($a.values) { @($a.values) } else { @($a) }
        foreach ($v in $vals) {
            if ($v -like '*--quickPlay*') { continue }
            foreach ($k in $varsTable.Keys) { $v = $v.Replace("`${$k}", $varsTable[$k]).Replace("`$`{$k`}", $varsTable[$k]) }
            # remove qualquer placeholder restante (ex: ${quickPlayPath}) - launcher real deixaria vazio
            if ($v -match '\$\{') { continue }
            if ($v -ne '') { $out += $v }
        }
    }
    return $out
}

$jvm  = New-Object System.Collections.Generic.List[string]
$jvm.AddRange([string[]](Expand-Args $t.arguments.jvm $vars))
$game = @(Expand-Args $t.arguments.game $vars)

# ajustes
if ($NoDebug) { $jvm = @($jvm | Where-Object { $_ -notlike '-agentlib:*' }) }
if ($Xmx)     { $jvm += "-Xmx$Xmx" }

# -XstartOnFirstThread eh so para macOS (o TLauncher tambem filtra no Windows)
if ($PSVersionTable.Platform -ne 'Unix' -or $env:OS -match 'Windows') {
    $jvm = @($jvm | Where-Object { $_ -notlike '-XstartOnFirstThread' })
}

$mainClass = $t.mainClass
$all = @($jvm) + @($mainClass) + @($game)

if ($DryRun) {
    Write-Host "== DRY RUN (comando montado, nao executa) ==" -ForegroundColor Cyan
    Write-Host "Bibliotecas no classpath: $($cp.Count)"
    Write-Host "UUID: $uuid"
    Write-Host ""
    Write-Host "java $($all -join ' ')" -ForegroundColor Gray
    Write-Host ""
    Write-Host "[OK] Comando montado. Remova -DryRun para executar." -ForegroundColor Green
    exit 0
}

# --- escolha do Java (Forge 1.20.1 = Java 17) --------------------
# Preferencia: runtime do Minecraft (same da TLauncher = "17.0.15 by Microsoft").
# o JBR 21 do Android Studio tem agente JDWP bugado (crash jdwp.dll) - evitar.
$candidates = @(
    "C:\Users\user\AppData\Roaming\.minecraft\runtime\java-runtime-gamma\windows\java-runtime-gamma\bin\java.exe",
    "C:\Users\user\AppData\Roaming\.minecraft\runtime\java-runtime-epsilon\windows\java-runtime-epsilon\bin\java.exe",
    "C:\Program Files\Android\Android Studio\jbr\bin\java.exe"
)
$javaExe = $candidates | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
if (-not $javaExe) { Write-Host "[ERRO] Nenhum Java encontrado." -ForegroundColor Red; exit 1 }
$javaVer = (& cmd /c "`"$javaExe`" -version 2>&1" | Select-Object -First 1)
Write-Host "Java: $javaVer"
if ($javaVer -notmatch 'version "(17|18|19|20|21)[^"]*') { Write-Host "[AVISO] Versao de Java inesperada para Forge 1.20.1." -ForegroundColor Yellow }

Write-Host "== Iniciando Minecraft Forge direto (sem TLauncher) ==" -ForegroundColor Cyan
Write-Host "Jogador: $Username | Porta debug 5005: $(if ($NoDebug) {'desativada'} else {'ativa'})"
& $javaExe @all
exit $LASTEXITCODE