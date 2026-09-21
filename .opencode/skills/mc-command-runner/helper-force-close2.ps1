# Force unfocus and refocus the MC window, then ESC
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinFocus {
    [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
    [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int X, int Y, int cx, int cy, uint f);
    [DllImport("user32.dll")] public static extern bool BringWindowToTop(IntPtr h);
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
}
"@

$procs = Get-CimInstance Win32_Process -Filter "Name='java.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match "BootstrapLauncher|forgeclient|java-runtime-gamma" } |
    Sort-Object WorkingSetSize -Descending | Select-Object -First 1

if (-not $procs) { Write-Output "NO_JAVA"; exit }
$mcPid = [int]$procs.ProcessId

# Find window
Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;
public static class WinEnum {
    public delegate bool EnumProc(IntPtr h, IntPtr l);
    [DllImport("user32.dll")] public static extern bool EnumWindows(EnumProc cb, IntPtr l);
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
    [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr h);
    [DllImport("user32.dll", CharSet=CharSet.Unicode)] public static extern int GetWindowText(IntPtr h, StringBuilder t, int max);
}
"@

$foundH = [IntPtr]::Zero
$cb = [WinEnum+EnumProc]{
    param($h, $l)
    $p = [uint32]0
    [WinEnum]::GetWindowThreadProcessId($h, [ref]$p) | Out-Null
    if ([int]$p -eq $using:mcPid -and [WinEnum]::IsWindowVisible($h)) {
        $sb = New-Object System.Text.StringBuilder 512
        [WinEnum]::GetWindowText($h, $sb, 512) | Out-Null
        if ($sb.ToString() -match "Minecraft") {
            $script:foundH = $h
            return $false
        }
    }
    return $true
}
[WinEnum]::EnumWindows($cb, [IntPtr]::Zero) | Out-Null

if ($foundH -eq [IntPtr]::Zero) { Write-Output "WINDOW_NOT_FOUND"; exit }
Write-Output "Found window handle=$foundH"

# Focus it
[WinFocus]::SetWindowPos($foundH, [IntPtr]::new(-1), 0, 0, 0, 0, 0x0001 -bor 0x0002) | Out-Null
[WinFocus]::BringWindowToTop($foundH) | Out-Null
[WinFocus]::SetForegroundWindow($foundH) | Out-Null
Start-Sleep -Milliseconds 500

$fg = [WinFocus]::GetForegroundWindow()
Write-Output "Foreground window after focus: $fg (expected $foundH)"

# Now send ESC via WScript
$ws = New-Object -ComObject WScript.Shell
$ws.SendKeys("{ESC}")
Write-Output "Sent ESC"
Start-Sleep -Milliseconds 1000

Write-Output "Done"
