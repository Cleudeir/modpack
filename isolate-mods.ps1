# ============================================================
#  ISOLATE MODS - modo debug (so KubeJS)
#  Le mods-switch.json e move a pasta mods/ inteira para o
#  backup (mods_full/), criando uma mods/ somente com os
#  mods listados em activeMods.
#
#  Config: mods-switch.json
#    "backupPath": "mods_full"   -> nome da pasta de backup
#    "activeMods": [...]         -> mods que ficam ativas
#
#  Uso:  isolate-mods.bat   (ou powershell -File isolate-mods.ps1)
# ============================================================

$ErrorActionPreference = "Stop"
$dir   = Split-Path -Parent $MyInvocation.MyCommand.Path
$configFile = Join-Path $dir "mods-switch.json"

if (-not (Test-Path $configFile)) {
    Write-Host "[ERRO] mods-switch.json nao encontrado em $dir" -ForegroundColor Red
    exit 1
}
$cfg = Get-Content -Raw $configFile | ConvertFrom-Json

$mods   = Join-Path $dir "mods"
$backup = Join-Path $dir $cfg.backupPath
$marker = Join-Path $mods ".isolated_marker"

Write-Host "== Isolar mods (so KubeJS) ==" -ForegroundColor Cyan
Write-Host "Backup: $backup"

# Ja isolado -> nao fazer nada
if (Test-Path -LiteralPath $marker) {
    Write-Host "[OK] mods/ ja esta isolado. Nada a fazer." -ForegroundColor Green
    exit 0
}
# Backup pendente -> pedir para restaurar antes
if (Test-Path -LiteralPath $backup) {
    Write-Host "[ERRO] Ja existe $($cfg.backupPath)/. Execute restore-mods.bat primeiro." -ForegroundColor Red
    exit 1
}
if (-not (Test-Path -LiteralPath $mods)) {
    Write-Host "[ERRO] Pasta mods/ nao encontrada em $dir" -ForegroundColor Red
    exit 1
}

Write-Host "[1/3] Movendo mods/ -> $($cfg.backupPath)/ (backup completo)..." -ForegroundColor Yellow
Move-Item -LiteralPath $mods -Destination $backup

Write-Host "[2/3] Criando mods/ somente com os mods da config..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path $mods | Out-Null
Set-Content -LiteralPath $marker -Value "isolated" -Encoding Ascii

foreach ($jar in $cfg.activeMods) {
    $src = Join-Path $backup $jar
    if (Test-Path -LiteralPath $src) {
        $dst = Join-Path $mods $jar
        try {
            New-Item -ItemType HardLink -Path $dst -Target $src | Out-Null
            Write-Host "  + $jar (hardlink)" -ForegroundColor Green
        } catch {
            Copy-Item -LiteralPath $src -Destination $dst
            Write-Host "  + $jar (copia)" -ForegroundColor Green
        }
    } else {
        Write-Host "  ~ $jar nao encontrado no backup (ignore)" -ForegroundColor DarkGray
    }
}

Write-Host "[3/3] Concluido." -ForegroundColor Green
Write-Host ""
Write-Host "Inicie o jogo (launch-direct.bat) e anexe o VSCode (F5, porta 5005)." -ForegroundColor Cyan
Write-Host "Para voltar ao normal: restore-mods.bat" -ForegroundColor Cyan
exit 0