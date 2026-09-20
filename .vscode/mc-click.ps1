# ============================================================
# mc-click.ps1 - Clique em posiCAO RELATIVA da janela do MC.
#
# As coordenadas sao RELATIVAS ao conteudo PrintWindow da janela
# (ex: 435,100 = "Back to Game" em uma captura 870x519).
# O script le o RECT atual da janela e converte:
#   screen = (rect.L + imgX, rect.T + imgY)
# Assim, mesmo que o jogo mova a janela, o clique acerta.
#
# Uso:
#   mc-click.ps1 -X 435 -Y 260 -TargetPid 15324
#   mc-click.ps1 -X 435 -Y 260 -TitleMatch "Minecraft" -TargetPid 15324
#
# OBS: a conversao imagem->janela assume que a imagem PrintWindow
# cobre IGUAL ao GetWindowRect (frame+client). Para um titulo de
# janela padrao isso bate; se o jogo estiver maximizado, folder.
# ============================================================

[CmdletBinding()]
param(
    [Parameter(Mandatory=$true)][int]$X,
    [Parameter(Mandatory=$true)][int]$Y,
    [string]$TitleMatch = "Minecraft",
    [int]$TargetPid = 0,
    [int]$HoldMs = 80
)

$ErrorActionPreference = "Stop"

if (-not ("Win32Click" -as [type])) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class Win32Click {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int max);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
    [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
    [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@ -ReferencedAssemblies System.Runtime.InteropServices
}

$script:foundHandle = [IntPtr]::Zero
$script:foundRect = New-Object Win32Click+RECT

$cb = {
    param($hWnd, $lParam)
    if (-not [Win32Click]::IsWindowVisible($hWnd)) { return $true }
    $sb = New-Object System.Text.StringBuilder 512
    [Win32Click]::GetWindowText($hWnd, $sb, 512) | Out-Null
    $title = $sb.ToString()
    if ($title -match $TitleMatch) {
        $proc = 0
        [Win32Click]::GetWindowThreadProcessId($hWnd, [ref]$proc) | Out-Null
        if ($TargetPid -eq 0 -or $proc -eq $TargetPid) {
            $script:foundHandle = $hWnd
            return $false
        }
    }
    return $true
}

[Win32Click]::EnumWindows($cb, [IntPtr]::Zero) | Out-Null
if ($script:foundHandle -eq [IntPtr]::Zero) { Write-Output "WINDOW_NOT_FOUND"; exit 1 }

$h = $script:foundHandle
[Win32Click]::GetWindowRect($h, [ref]$script:foundRect) | Out-Null
$L = $script:foundRect.Left; $T = $script:foundRect.Top
$W = $script:foundRect.Right - $L; $H = $script:foundRect.Bottom - $T

# traz ao topo (TOPMOST momentaneo) para garantir clique no jogo e nao no console
[Win32Click]::SetWindowPos($h, [IntPtr]::new(-1), 0, 0, 0, 0, 0x0001 -bor 0x0002 -bor 0x0010) | Out-Null
[Win32Click]::SetForegroundWindow($h) | Out-Null
Start-Sleep -Milliseconds 450

$cx = $L + $X
$cy = $T + $Y
[Win32Click]::SetCursorPos($cx, $cy) | Out-Null
Start-Sleep -Milliseconds 200
[Win32Click]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)
Start-Sleep -Milliseconds $HoldMs
[Win32Click]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)

# remove TOPMOST
[Win32Click]::SetWindowPos($h, [IntPtr]::new(-2), 0, 0, 0, 0, 0x0001 -bor 0x0002) | Out-Null

Write-Output "CLICK img($X,$Y) -> screen($cx,$cy) rect W=${W} H=${H} hwnd=0x$('{0:X}' -f $h)"