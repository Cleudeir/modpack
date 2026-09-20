# ============================================================
# run-debug.ps1 - Invoke the full modpack in debug mode from the
# command line, with live log following (console + latest.log).
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File run-debug.ps1
#   powershell -ExecutionPolicy Bypass -File run-debug.ps1 -Suspend -Port 5005 -Username Dev -Xmx 6G
#   powershell -ExecutionPolicy Bypass -File run-debug.ps1 -NoFollow       # no live tail
#
# The JVM is started with a JDWP debug agent (default port 5005).
# While the game runs you can attach VSCode (Attach to Minecraft config)
# or any IDE to port 5005. Logs stream to the console and are saved to
# logs\run-debug-console.log + logs\latest.log (Forge).
# ============================================================

[CmdletBinding()]
param(
    [int]$Port = 5005,
    [switch]$Suspend,
    [string]$Username = "Dev",
    [string]$Xmx = "4G",
    [switch]$NoFollow
)

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\mc-launch-common.ps1"

$modpackDir = $script:modpackDir
$logsDir = "$modpackDir\logs"
$consoleLog = "$logsDir\run-debug-console.log"
if (-not (Test-Path $logsDir)) { New-Item -ItemType Directory -Path $logsDir | Out-Null }

# --- Build the java command ---
$java = $script:java
$classpath = (Get-McClasspath | ForEach-Object { Fwd-ForJson $_ }) -join ';'
$modulePath = Get-McModulePath
$vmArgs = @(Get-McVmArgs -IncludeDebugAgent -DebugPort $Port -Suspend:$Suspend -Xmx $Xmx)
$gameArgs = @(Get-McGameArgs -Username $Username)

# Build a FLAT string[] for Start-Process (nested arrays break ArgumentList binding)
$allArgs = New-Object System.Collections.Generic.List[string]
foreach ($a in $vmArgs)  { $allArgs.Add([string]$a) }
$allArgs.Add("-cp");         $allArgs.Add([string]$classpath)
$allArgs.Add("-p");          $allArgs.Add([string]$modulePath)
$allArgs.Add("cpw.mods.bootstraplauncher.BootstrapLauncher")
foreach ($a in $gameArgs) { $allArgs.Add([string]$a) }
$allArgsArr = $allArgs.ToArray()

Write-Host "=========================================================="
Write-Host " Minecraft Modpack Debug Launcher"
Write-Host "  Game dir : $modpackDir"
Write-Host "  Java     : $java"
Write-Host "  Xmx      : $Xmx"
Write-Host "  Port     : $Port  (suspend=$([bool]$Suspend))"
Write-Host "  User     : $Username"
Write-Host "  Console  : $consoleLog"
Write-Host "  Ctrl+C to stop. Attach VSCode -> 'Attach to Minecraft' to debug."
Write-Host "=========================================================="

# --- Launch javaw (no console window) or java ---
# Use java (console) so output can be captured and followed.
$p = Start-Process -FilePath $java `
    -ArgumentList $allArgsArr `
    -WorkingDirectory $modpackDir `
    -RedirectStandardOutput $consoleLog `
    -RedirectStandardError "$consoleLog.err" `
    -PassThru `
    -WindowStyle Hidden

Write-Host "Started PID $($p.Id). Logs:"
Write-Host "  -> $consoleLog"

# --- Follow logs until game exits ---
if (-not $NoFollow) {
    $latestLog = "$logsDir\latest.log"

    # Wait for Forge to create latest.log (up to 60s)
    $waited = 0
    while ((-not (Test-Path $latestLog)) -and $waited -lt 60) {
        Start-Sleep -Milliseconds 500
        $waited += 0.5
    }

    $lastTail = [long]0

    Write-Host "Following logs (Ctrl+C to stop following, game keeps running)..."

    while (-not $p.HasExited) {
        if (Test-Path $latestLog) {
            # Stream newly appended lines from latest.log (Forge's live log)
            $fs = [System.IO.File]::Open($latestLog, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
            try {
                $fs.Position = $lastTail
                $reader = New-Object System.IO.StreamReader($fs)
                while (-not $reader.EndOfStream) {
                    $line = $reader.ReadLine()
                    if ($line) { Write-Host $line }
                }
                $lastTail = $fs.Position
            }
            finally {
                $fs.Close()
            }
        }
        Start-Sleep -Milliseconds 300
    }

    # Drain anything left after exit
    if (Test-Path $latestLog) {
        $fs = [System.IO.File]::Open($latestLog, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        try {
            $fs.Position = $lastTail
            $reader = New-Object System.IO.StreamReader($fs)
            while (-not $reader.EndOfStream) {
                $line = $reader.ReadLine()
                if ($line) { Write-Host $line }
            }
        }
        finally {
            $fs.Close()
        }
    }

    Write-Host ""
    if ($p.ExitCode -ne $null) { Write-Host "Game exited with code $($p.ExitCode)." }
    else                       { Write-Host "Game process ended (killed or crashed, no exit code)." }
}
else {
    Write-Host "Game running in background (PID $($p.Id)). -NoFollow given, not tailing logs."
    Write-Host "Full log: $consoleLog"
}

# --- Also dump forge debug log location hint ---
Write-Host "Full Forge log: $logsDir\latest.log"
Write-Host "Debug log     : $logsDir\debug.log"