# ============================================================
#  mc-cmp.ps1 - Compara a tela atual do Minecraft com IMAGENS
#  DE REFERENCIA dos menus e diz se a tela mudou corretamente.
#
#  Uso:
#   1) CRIAR referencia:
#        mc-cmp.ps1 -SaveRef main-menu
#        mc-cmp.ps1 -SaveRef multiplayer
#        mc-cmp.ps1 -SaveRef singleplayer
#        mc-cmp.ps1 -SaveRef world        (mundo carregado)
#      (salva em screenshots\refs\<nome>.png)
#
#   2) COMPARAR a tela atual contra todas as refs:
#        mc-cmp.ps1                      -> imprime Nome=XX.X%
#        mc-cmp.ps1 -MinConf 90          -> sai 0 se a MELHOR
#                                           combinacao >= 90%, senao 1
#        mc-cmp.ps1 -MinConf 90 -Name singleplayer
#                                      -> sai 0 apenas se a tela atual
#                                           corresponde a 'singleplayer'
#
#  Metricas:
#    - Correlacao de Pearson entre os pixels (escala de cinza 64x64)
#    - Diferenca media absoluta normalizada (1 - MAE/255)
#    - Confianca = max(pearson, 1-MAE), em %
#
#  Nota: a animacao de fundo do menu torna a corr. ~92-99%; dois menus
#  diferentes (ex: main-menu x multiplayer) ficam < 75%. Limiar 90% eh
#  seguro para "mesma tela" e evita falso positivo entre telas distintas.
# ============================================================

[CmdletBinding()]
param(
    [string]$SaveRef = "",           # salva a tela atual como screenshot\refs\<nome>.png
    [string]$RefDir = "",            # pasta de refs (default: screenshots\refs)
    [double]$MinConf = 0,            # 0=apenas imprime; >0 => exit 0/1 se melhor >= limiar
    [string]$Name = "",              # se definido, exige que a melhor ref tenha este nome
    [int]$TargetPid = 0,             # opcional
    [string]$TitleMatch = "Minecraft"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
if (-not $RefDir) { $RefDir = Join-Path $root "screenshots\refs" }
if (-not (Test-Path $RefDir)) { New-Item -ItemType Directory -Path $RefDir -Force | Out-Null }

$tmp = Join-Path $RefDir "_current.png"
$cmpScript = Join-Path $PSScriptRoot "mc-control.ps1"

# ---------- captura a tela atual ----------
$capArgs = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $cmpScript, '-Screenshot', '-Out', $tmp)
if ($TargetPid -gt 0) { $capArgs += @('-TargetPid', "$TargetPid") }
& powershell @capArgs | Out-Null
if (-not (Test-Path $tmp)) { Write-Output "CAPTURE_FAIL"; exit 2 }

Add-Type -AssemblyName System.Drawing

# ---------- funcao: reduz para 64x64 tons de cinza ----------
function Get-GrayPixels([string]$path) {
    $bmp = New-Object System.Drawing.Bitmap($path)
    try {
        $tw = 64; $th = 64
        $thumb = New-Object System.Drawing.Bitmap($tw, $th)
        $g = [System.Drawing.Graphics]::FromImage($thumb)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBilinear
        $g.DrawImage($bmp, 0, 0, $tw, $th)
        $g.Dispose()
        $arr = New-Object 'float[]' ($tw * $th)
        for ($y = 0; $y -lt $th; $y++) {
            for ($x = 0; $x -lt $tw; $x++) {
                $c = $thumb.GetPixel($x, $y)
                $arr[$y * $tw + $x] = (0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
            }
        }
        $thumb.Dispose()
        return ,$arr
    } finally { $bmp.Dispose() }
}

# ---------- correlacao de Pearson + MAE ----------
function Get-SimCur([float[]]$a, [float[]]$b) {
    $n = $a.Length
    $ma = 0.0; $mb = 0.0
    for ($i = 0; $i -lt $n; $i++) { $ma += $a[$i]; $mb += $b[$i] }
    $ma /= $n; $mb /= $n
    $cov = 0.0; $va = 0.0; $vb = 0.0; $mae = 0.0
    for ($i = 0; $i -lt $n; $i++) {
        $da = $a[$i] - $ma; $db = $b[$i] - $mb
        $cov += $da * $db; $va += $da * $da; $vb += $db * $db
        $mae += [Math]::Abs($a[$i] - $b[$i])
    }
    $pearson = 0.0
    if ($va -gt 1e-9 -and $vb -gt 1e-9) { $pearson = $cov / ([Math]::Sqrt($va) * [Math]::Sqrt($vb)) }
    $normMae = 1.0 - ($mae / $n / 255.0)
    $conf = [Math]::Max($pearson, $normMae)
    return ,@([Math]::Round($conf * 100, 1), [Math]::Round($pearson * 100, 1), [Math]::Round($normMae * 100, 1))
}

# ---------- se -SaveRef, salva ----------
if ($SaveRef -ne "") {
    $dst = Join-Path $RefDir "$SaveRef.png"
    Copy-Item -LiteralPath $tmp -Destination $dst -Force
    Write-Output "SAVE_REF=$dst"
    exit 0
}

# ---------- compara com todas as refs ----------
$cur = Get-GrayPixels $tmp
$results = @()
foreach ($f in Get-ChildItem $RefDir -Filter "*.png" | Where-Object { $_.Name -ne "_current.png" }) {
    $refPix = Get-GrayPixels $f.FullName
    $sim = Get-SimCur $cur $refPix
    $results += [PSCustomObject]@{
        Name = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
        Conf = [double]$sim[0]
        Pearson = [double]$sim[1]
        MAE = [double]$sim[2]
    }
}
$results = $results | Sort-Object Conf -Descending

foreach ($r in $results) {
    Write-Output ("{0}={1}% (pearson={2}% mae={3}%)" -f $r.Name, $r.Conf, $r.Pearson, $r.MAE)
}

$best = $results | Select-Object -First 1
if (-not $best) { Write-Output "NO_REFS"; exit 3 }

# ---------- criterio ----------
$ok = $false
if ($MinConf -gt 0) {
    if ($Name -ne "") {
        $ok = ($best.Name -eq $Name -and $best.Conf -ge $MinConf)
    } else {
        $ok = ($best.Conf -ge $MinConf)
    }
    if ($ok) {
        Write-Output "MATCH_OK name=$($best.Name) conf=$($best.Conf)%"
        exit 0
    } else {
        Write-Output "MATCH_FAIL best=$($best.Name) conf=$($best.Conf)% need=$MinConf% needName=$Name"
        exit 1
    }
}
exit 0