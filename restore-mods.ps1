# ============================================================
#  RESTORE MODS - sai do modo debug e devolve o modpack
#  completo (mods/ original do backup).
#
#  Le o nome do backup de mods-switch.json.
#
#  Uso:  restore-mods.bat   (ou powershell -File restore-mods.ps1)
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

Write-Host "== Restaurar mods (modpack completo) ==" -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath $backup)) {
    Write-Host "[OK] Nenhum backup encontrado. mods/ ja esta no modo normal." -ForegroundColor Green
    exit 0
}

Write-Host "[1/2] Removendo mods/ isolado..." -ForegroundColor Yellow
if (Test-Path -LiteralPath $mods) {
    Remove-Item -LiteralPath $mods -Recurse -Force
}

Write-Host "[2/2] Restaurando $($cfg.backupPath)/ -> mods/..." -ForegroundColor Yellow
Move-Item -LiteralPath $backup -Destination $mods

Write-Host "[OK] Mods restaurados. Modpack completo de volta." -ForegroundColor Green
exit 0