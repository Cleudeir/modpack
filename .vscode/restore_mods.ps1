# ============================================================
#  RESTAURAR MODS - sai do modo debug (so KubeJS) e volta ao
#  modpack completo.
#
#  Uso: powershell -ExecutionPolicy Bypass -File .vscode\restore_mods.ps1
# ============================================================

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$mods = Join-Path $root "mods"
$backup = Join-Path $root "mods_full"

Write-Host "== Restaurar mods (modpack completo) ==" -ForegroundColor Cyan

if (-not (Test-Path -LiteralPath $backup)) {
    Write-Host "[OK] Nenhum backup encontrado; mods/ ja esta no modo normal." -ForegroundColor Green
    exit 0
}

Write-Host "[1/2] Removendo mods/ isolado..." -ForegroundColor Yellow
if (Test-Path -LiteralPath $mods) {
    Remove-Item -LiteralPath $mods -Recurse -Force
}

Write-Host "[2/2] Restaurando mods_full/ -> mods/ ..." -ForegroundColor Yellow
Move-Item -LiteralPath $backup -Destination $mods

Write-Host "[OK] Mods restaurados. Modpack completo de volta." -ForegroundColor Green
exit 0