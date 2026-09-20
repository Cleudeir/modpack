param(
    [string]$version = ""
)

$modDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$modsDir = Join-Path (Split-Path -Parent (Split-Path -Parent $modDir)) "mods"
$gradle = "C:\Users\user\.gradle\wrapper\dists\gradle-8.10.2-bin\a04bxjujx95o3nb99gddekhwo\gradle-8.10.2\bin\gradle.bat"
$buildFile = "$modDir\build.gradle"

# Read current version
$currentVersion = ""
foreach ($line in Get-Content $buildFile) {
    if ($line -match "^\s*version\s*=\s*'([^']+)'") {
        $currentVersion = $Matches[1]
        break
    }
}

if ($version -eq "") {
    $parts = $currentVersion -split "\."
    if ($parts.Length -eq 3) {
        $parts[2] = [int]$parts[2] + 1
    } else {
        $parts += "1"
    }
    $version = $parts -join "."
}

Write-Output "Version: $currentVersion -> $version"

# Update build.gradle - rewrite the version line
$lines = Get-Content $buildFile
$newLines = @()
foreach ($line in $lines) {
    if ($line -match "^\s*version\s*=\s*'") {
        $newLines += "version = '$version'"
    } else {
        $newLines += $line
    }
}
$newLines | Set-Content $buildFile

# Remove old jar
$oldJar = Get-ChildItem $modsDir -Filter "adminpanel-*.jar" -ErrorAction SilentlyContinue
if ($oldJar) {
    Remove-Item $oldJar.FullName -Force
    Write-Output "Removed: $($oldJar.Name)"
}

# Build
Write-Output "Building..."
$ErrorActionPreference = "SilentlyContinue"
& $gradle clean build --no-daemon 2>$null | Select-String "error:|BUILD SUCCESS|BUILD FAILED"
$ErrorActionPreference = "Continue"

# Copy new jar
$newJar = Get-ChildItem "$modDir\build\libs" -Filter "*.jar" | Where-Object { $_.Name -notlike "*sources*" } | Select-Object -First 1
if ($newJar) {
    Copy-Item $newJar.FullName "$modsDir\adminpanel-$version.jar" -Force
    Write-Output "Done: adminpanel-$version.jar ($([math]::Round($newJar.Length/1KB, 1)) KB)"
} else {
    Write-Output "ERROR: JAR not found"
}
