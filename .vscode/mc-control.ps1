# ============================================================
# mc-control.ps1 - Control the running Minecraft window and
# take screenshots, using Win32 APIs.
#
# Actions:
#   -GetWindow        : print window info (title, rect, pid)
#   -Screenshot       : capture the window to a PNG (-Out path)
#   -Foreground       : focus the window
#   -Key "f2"         : send keystrokes (SendKeys syntax, e.g. "f2", "{ESC}", "{/}")
#   -MouseClick       : click at center of window (optional -X -Y offset)
#
# Examples:
#   mc-control.ps1 -GetWindow
#   mc-control.ps1 -Screenshot -Out screenshots\mc-window.png
#   mc-control.ps1 -Key "f2"
#   mc-control.ps1 -Foreground
# ============================================================

[CmdletBinding()]
param(
    [switch]$GetWindow,
    [switch]$Screenshot,
    [string]$Out = "",
    [switch]$Foreground,
[string]$Key = "",
    [string]$SendText = "",
    [switch]$MouseClick,
    [int]$X = 0,
    [int]$Y = 0,
    [string]$TitleMatch = "Minecraft",
    [int]$TargetPid = 0
)

$ErrorActionPreference = "Stop"

if (-not ("Win32MC" -as [type])) {
    Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class Win32MC {
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr hWnd, StringBuilder text, int max);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
    [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT rect);
    [DllImport("user32.dll")] public static extern bool PrintWindow(IntPtr hWnd, IntPtr hdc, uint flags);
    [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
    [DllImport("user32.dll")] public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint dwData, UIntPtr dwExtraInfo);
    [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left, Top, Right, Bottom; }
}
"@ -ReferencedAssemblies System.Runtime.InteropServices
}

function Get-JavaPid {
    # Strategy 1: find a java process that owns a visible window titled like Minecraft
    $all = Get-Process -Name java -ErrorAction SilentlyContinue
    if (-not $all) { return 0 }
    $candidates = @(Get-CimInstance Win32_Process -Filter "Name='java.exe'" -ErrorAction SilentlyContinue)
    # Strategy 1: command line contains BootstrapLauncher/forgeclient -> definitely the game
    $mc = $candidates | Where-Object { $_.CommandLine -match "BootstrapLauncher" -or $_.CommandLine -match "forgeclient" -or $_.CommandLine -match "java-runtime-gamma" } |
         Sort-Object -Property @{Expression={$_.WorkingSetSize};Descending=$true} -ErrorAction SilentlyContinue |
         Select-Object -First 1
    if ($mc) { return [int]$mc.ProcessId }
    # Strategy 2: window title match (cheapest reliable)
    $script:pidByWindow = 0
    $cb2 = [Win32MC+EnumWindowsProc]{
        param($h, $l)
        $procId = [uint32]0
        [Win32MC]::GetWindowThreadProcessId($h, [ref]$procId) | Out-Null
        if ([Win32MC]::IsWindowVisible($h)) {
            $sb = New-Object System.Text.StringBuilder 512
            [Win32MC]::GetWindowText($h, $sb, 512) | Out-Null
            if ($sb.ToString() -match $script:gameTitleMatch) { $script:pidByWindow = [int]$procId; return $false }
        }
        return $true
    }
    [Win32MC]::EnumWindows($cb2, [IntPtr]::Zero) | Out-Null
    if ($script:pidByWindow -gt 0) { return $script:pidByWindow }
    # Strategy 3: biggest java process (game usually uses the most RAM)
    $big = $all | Sort-Object WorkingSet64 -Descending | Select-Object -First 1
    return $big.Id
}

$script:gameTitleMatch = "Minecraft"
if ($TitleMatch -ne "Minecraft") { $script:gameTitleMatch = $TitleMatch }

$script:foundHandle = [IntPtr]::Zero
$script:foundTitle = ""
$script:foundRect = @{ L = 0; T = 0; R = 0; B = 0 }

function Find-McWindow {
    param([string]$match = "Minecraft", [int]$procIdTarget = 0)
    $targetPid = if ($procIdTarget -gt 0) { $procIdTarget } else { Get-JavaPid }
    if ($targetPid -eq 0) {
        Write-Output "NO_JAVA"
        return $false
    }
    $script:foundHandle = [IntPtr]::Zero
    $callback = [Win32MC+EnumWindowsProc]{
        param($h, $l)
        $procId = [uint32]0
        [Win32MC]::GetWindowThreadProcessId($h, [ref]$procId) | Out-Null
        if ([int]$procId -eq $targetPid -and [Win32MC]::IsWindowVisible($h)) {
            $sb = New-Object System.Text.StringBuilder 512
            [Win32MC]::GetWindowText($h, $sb, 512) | Out-Null
            if ($sb.ToString() -match $match) {
                $script:foundHandle = $h
                $script:foundTitle = $sb.ToString()
                $r = New-Object Win32MC+RECT
                [Win32MC]::GetWindowRect($h, [ref]$r) | Out-Null
                $script:foundRect.L = $r.Left;  $script:foundRect.T = $r.Top
                $script:foundRect.R = $r.Right; $script:foundRect.B = $r.Bottom
                return $false
            }
        }
        return $true
    }
    [Win32MC]::EnumWindows($callback, [IntPtr]::Zero) | Out-Null
    if ($script:foundHandle -eq [IntPtr]::Zero) {
        Write-Output "WINDOW_NOT_FOUND"
        return $false
    }
    return $true
}

if ($GetWindow) {
    if (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid) {
        $w = $script:foundRect.R - $script:foundRect.L
        $h = $script:foundRect.B - $script:foundRect.T
        Write-Output "HANDLE=$($script:foundHandle)"
        Write-Output "TITLE=$($script:foundTitle)"
        Write-Output "RECT=$($script:foundRect.L),$($script:foundRect.T),$($script:foundRect.R),$($script:foundRect.B)"
        Write-Output "SIZE=${w}x${h}"
    }
    exit
}

if ($Foreground) {
    if (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid) {
        [Win32MC]::SetForegroundWindow($script:foundHandle) | Out-Null
        Write-Output "FOCUSED=$($script:foundTitle)"
    }
    exit
}

if ($Key -ne "") {
    if (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid) {
        [Win32MC]::SetForegroundWindow($script:foundHandle) | Out-Null
        Start-Sleep -Milliseconds 250
        $ws = New-Object -ComObject WScript.Shell
        $keyStr = if ($Key -match '^\{.*\}$') { $Key } else { "{$Key}" }
        if ($Key -eq "f2") { $keyStr = "{F2}" }
        if ($Key -eq "esc") { $keyStr = "{ESC}" }
        $ws.SendKeys($keyStr)
        Write-Output "SENT=$keyStr"
    }
    exit
}

if ($MouseClick) {
    if (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid) {
        [Win32MC]::SetForegroundWindow($script:foundHandle) | Out-Null
        Start-Sleep -Milliseconds 250
        $cx = [int]((($script:foundRect.L + $script:foundRect.R) / 2) + $X)
        $cy = [int]((($script:foundRect.T + $script:foundRect.B) / 2) + $Y)
        [Win32MC]::SetCursorPos($cx, $cy) | Out-Null
        Start-Sleep -Milliseconds 100
        [Win32MC]::mouse_event(0x0002, 0, 0, 0, [UIntPtr]::Zero)  # LEFTDOWN
        Start-Sleep -Milliseconds 50
        [Win32MC]::mouse_event(0x0004, 0, 0, 0, [UIntPtr]::Zero)  # LEFTUP
        Write-Output "CLICKED=$cx,$cy"
    }
    exit
}

if ($Screenshot) {
    if (-not (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid)) { exit 1 }
    Add-Type -AssemblyName System.Drawing
    $w = $script:foundRect.R - $script:foundRect.L
    $h = $script:foundRect.B - $script:foundRect.T
    if ($w -le 0 -or $h -le 0) { Write-Output "BAD_RECT"; exit 1 }

    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)

    # Try PrintWindow with PW_RENDERFULLCONTENT first (works even if occluded)
    $hdc = $g.GetHdc()
    $ok = [Win32MC]::PrintWindow($script:foundHandle, $hdc, 2)
    $g.ReleaseHdc($hdc)

    # Fallback: screen copy
    if (-not $ok) {
        [Win32MC]::SetForegroundWindow($script:foundHandle) | Out-Null
        Start-Sleep -Milliseconds 300
        $g.CopyFromScreen($script:foundRect.L, $script:foundRect.T, 0, 0, $bmp.Size)
    }
    $g.Dispose()

$outPath = if ($Out -ne "") { $Out } else { "$PSScriptRoot\mc-window.png" }
    # ensure absolute path (o resolve antigo quebrava com paths com contra-barra)
    $full = [System.IO.Path]::GetFullPath($outPath)
    $fullDir = [System.IO.Path]::GetDirectoryName($full)
    if (-not (Test-Path $fullDir)) { New-Item -ItemType Directory -Path $fullDir -Force | Out-Null }
    $bmp.Save($full, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "SAVED=$full"
    Write-Output "SIZE=${w}x${h}"
}

if ($SendText -ne "") {
    if (Find-McWindow -match $TitleMatch -procIdTarget $TargetPid) {
        [Win32MC]::SetForegroundWindow($script:foundHandle) | Out-Null
        Start-Sleep -Milliseconds 400
        $ws = New-Object -ComObject WScript.Shell
        # digita caractere por caractere para evitar conflito com chars especiais
        foreach ($ch in $SendText.ToCharArray()) {
            $special = ""
            switch ($ch) {
                '{' { $special = "{{}" }
                '}' { $special = "{}}" }
                '+' { $special = "{+}" }
                '^' { $special = "{^}" }
                '%' { $special = "{%}" }
                '~' { $special = "{~}" }
                '(' { $special = "{(}" }
                ')' { $special = "{)}" }
                default { $special = [string]$ch }
            }
            $ws.SendKeys($special)
            Start-Sleep -Milliseconds 20
        }
        Write-Output "SENT_TEXT=$SendText"
    }
    exit
}

if (-not ($GetWindow -or $Screenshot -or $Foreground -or $Key -ne "" -or $MouseClick)) {
    Write-Output "Usage: mc-control.ps1 -GetWindow | -Screenshot -Out <png> | -Foreground | -Key <keys> | -MouseClick"
}

