# Force close menu: find fresh window, focus, send ESC
$ErrorActionPreference = "Stop"

# Find java process fresh
$procs = Get-CimInstance Win32_Process -Filter "Name='java.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match "BootstrapLauncher|forgeclient|java-runtime-gamma" } |
    Sort-Object WorkingSetSize -Descending | Select-Object -First 1

if (-not $procs) { Write-Output "NO_JAVA"; exit }
$mcPid = [int]$procs.ProcessId
Write-Output "Found Java PID=$mcPid"

# Use WScript to activate and send ESC
$ws = New-Object -ComObject WScript.Shell
$activated = $ws.AppActivate($mcPid)
Write-Output "AppActivate PID result: $activated"
Start-Sleep -Milliseconds 500

# Send ESC three times to be sure
$ws.SendKeys("{ESC}")
Write-Output "Sent ESC #1"
Start-Sleep -Milliseconds 400
$ws.SendKeys("{ESC}")
Write-Output "Sent ESC #2"
Start-Sleep -Milliseconds 400

Write-Output "Done"
