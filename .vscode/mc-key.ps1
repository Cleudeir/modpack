# ============================================================
# mc-key.ps1 - Inject a key via keybd_event (VK + scancode),
# reliably sending to the focused Minecraft window.
#
# Usage:
#   mc-key.ps1 -VK 0xA3 [-Scan 0x1D] [-Ext]      # press+release (toggle)
#   mc-key.ps1 -VK 0x1B -Scan 0x01                # ESC (needs scancode)
#   mc-key.ps1 -VK 0xA3 -Scan 0x1D -Ext -Down     # just key down
#   mc-key.ps1 -VK 0xA3 -Scan 0x1D -Ext -Up       # just key up
#
# keybd_event flags: 0 = down, 2 = up.
# KEYEVENTF_EXTENDEDKEY  = 0x0001 (needed for right Ctrl: VK 0xA3, scan 0x1D)
# KEYEVENTF_KEYUP        = 0x0002
# ============================================================

param(
    [Parameter(Mandatory=$true)][int]$VK,
    [int]$Scan = 0,
    [switch]$Ext,
    [switch]$Down,
    [switch]$Up,
    [string]$TitleMatch = "Minecraft",
    [int]$TargetPid = 0
)

$ErrorActionPreference = "Stop"

if (-not ("Win32Key" -as [type])) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class Win32Key {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int max);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);
}
"@ -ReferencedAssemblies System.Runtime.InteropServices
}

$foundHandle = [IntPtr]::Zero
$cb = [Win32Key+EnumWindowsProc]{
    param($h, $l)
    if (-not [Win32Key]::IsWindowVisible($h)) { return $true }
    $procId = [uint32]0
    [Win32Key]::GetWindowThreadProcessId($h, [ref]$procId) | Out-Null
    if ($TargetPid -ne 0 -and $procId -ne $TargetPid) { return $true }
    $sb = New-Object System.Text.StringBuilder 256
    [Win32Key]::GetWindowText($h, $sb, 256) | Out-Null
    $title = $sb.ToString()
    if ($title -match $TitleMatch) {
        $script:foundHandle = $h
        return $false
    }
    return $true
}
[Win32Key]::EnumWindows($cb, [IntPtr]::Zero) | Out-Null

if ($foundHandle -eq [IntPtr]::Zero) {
    Write-Output "WINDOW_NOT_FOUND"; exit 1
}

[Win32Key]::SetForegroundWindow($foundHandle) | Out-Null
Start-Sleep -Milliseconds 250

$flags = if ($Ext) { 0x0001 } else { 0 }
$vkByte = [byte]$VK
$scanByte = [byte]$Scan

if (($Down -or (-not $Up)) -and -not $Up) {
    [Win32Key]::keybd_event($vkByte, $scanByte, $flags, [UIntPtr]::Zero)
}
Start-Sleep -Milliseconds 60
if (($Up -or (-not $Down))) {
    [Win32Key]::keybd_event($vkByte, $scanByte, ($flags -bor 0x0002), [UIntPtr]::Zero)
}

Write-Output "KEY=VK=0x$($VK.ToString('X')) SCAN=0x$($Scan.ToString('X')) EXT=$Ext"