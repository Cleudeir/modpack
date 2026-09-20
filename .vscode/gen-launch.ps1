# Generates the full Minecraft modpack classpath + launch.json
# Run: powershell -ExecutionPolicy Bypass -File gen-launch.ps1

$ErrorActionPreference = "Stop"
. "$PSScriptRoot\mc-launch-common.ps1"

$modpackDir = $script:modpackDir
$modpackDirFwd = Fwd-ForJson $modpackDir

# --- Collect classpath ---
$cpJars = Get-McClasspath
$classPathsFwd = $cpJars | ForEach-Object { Fwd-ForJson $_ }

# --- Write classpath file (forward slashes) ---
$cpContent = $cpJars -join "`r`n"
Set-Content -Path "$modpackDir\.vscode\mc-classpath.txt" -Value $cpContent -Encoding UTF8
Write-Output "Classpath jars: $($cpJars.Count)"

# --- Module path ---
$modulePathFwd = Get-McModulePath

# --- vmArgs (no debug agent on launch config - attach config covers it) ---
$vmArgs = (Get-McVmArgs -Xmx "4G") -join " "

# --- Game args ---
$args = (Get-McGameArgs -Username "Dev") -join " "

# --- Build launch.json ---
$classPathsJson = ($classPathsFwd | ForEach-Object { "            `"$_`"" }) -join ",`r`n"
$javaFwd = Fwd-ForJson $script:java

$launchJson = @"
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Modpack (Launch)",
      "request": "launch",
      "mainClass": "cpw.mods.bootstraplauncher.BootstrapLauncher",
      "cwd": "${modpackDirFwd}",
      "console": "integratedTerminal",
      "javaExec": "${javaFwd}",
      "vmArgs": "${vmArgs}",
      "args": "${args}",
      "modulePaths": [
        "${modulePathFwd}"
      ],
      "classPaths": [
$classPathsJson
      ]
    },
    {
      "type": "java",
      "name": "Attach to Minecraft (TLauncher)",
      "request": "attach",
      "hostName": "localhost",
      "port": 5005,
      "timeout": 60000
    }
  ]
}
"@

Set-Content -Path "$modpackDir\.vscode\launch.json" -Value $launchJson -Encoding UTF8
Write-Output "launch.json generated"