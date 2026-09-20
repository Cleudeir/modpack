# ============================================================
# mc-launch-common.ps1 - Shared logic to compute the full
# Minecraft Forge 1.20.1 modpack launch command from modpack.json
# Dot-source this: . "$PSScriptRoot\mc-launch-common.ps1"
# ============================================================

$ErrorActionPreference = "Stop"

$script:mcRoot = "C:\Users\user\AppData\Roaming\.minecraft"
$script:mcVersion = "modpack"
$script:modpackDir = "$($script:mcRoot)\versions\$($script:mcVersion)"
$script:libRoot = "$($script:mcRoot)\libraries"
$script:assets = "$($script:mcRoot)\assets"
$script:java = "C:\Users\user\AppData\Roaming\.minecraft\runtime\java-runtime-gamma\windows\java-runtime-gamma\bin\java.exe"
$script:osName = "windows"

function Fwd-ForJson($p) { return $p -replace '\\', '/' }

function Get-McModpackJson {
    return Get-Content "$($script:modpackDir)\modpack.json" -Raw | ConvertFrom-Json
}

function Test-McRule($rules) {
    if (-not $rules -or $rules.Count -eq 0) { return $true }
    foreach ($r in $rules) {
        if ($r.action -eq "allow") {
            if ($r.os.name -and $r.os.name -ne $script:osName) { return $false }
            if ($r.os.arch -and $r.os.arch -ne "amd64") { return $false }
        }
        if ($r.action -eq "disallow") {
            if (-not $r.os.name) { return $false }
            if ($r.os.name -eq $script:osName) { return $false }
        }
    }
    return $true
}

function Get-McClasspath {
    $json = Get-McModpackJson
    $jars = @()
    foreach ($lib in $json.libraries) {
        if (-not (Test-McRule $lib.rules)) { continue }
        $path = $lib.artifact.path
        $jar = "$($script:libRoot)\$($path -replace '/', '\')"
        if (Test-Path $jar) { $jars += $jar }
    }
    # modpack.jar = the client jar (minecraft)
    $jars += "$($script:modpackDir)\modpack.jar"
    return $jars
}

function Get-McModuleJars {
    $lib = $script:libRoot
    return @(
        "$lib\cpw\mods\bootstraplauncher\1.1.2\bootstraplauncher-1.1.2.jar",
        "$lib\cpw\mods\securejarhandler\2.1.10\securejarhandler-2.1.10.jar",
        "$lib\org\ow2\asm\asm-commons\9.7\asm-commons-9.7.jar",
        "$lib\org\ow2\asm\asm-util\9.7\asm-util-9.7.jar",
        "$lib\org\ow2\asm\asm-analysis\9.7\asm-analysis-9.7.jar",
        "$lib\org\ow2\asm\asm-tree\9.7\asm-tree-9.7.jar",
        "$lib\org\ow2\asm\asm\9.7\asm-9.7.jar",
        "$lib\net\minecraftforge\JarJarFileSystems\0.3.19\JarJarFileSystems-0.3.19.jar"
    )
}

function Get-McModulePath {
    return ((Get-McModuleJars | ForEach-Object { Fwd-ForJson $_ }) -join ';')
}

function Get-McNativesDir {
    return "$($script:modpackDir)\natives"
}

function Get-McVmArgs([switch]$IncludeDebugAgent, [int]$DebugPort = 5005, [switch]$Suspend, [string]$Xmx = "4G") {
    $natives = Fwd-ForJson (Get-McNativesDir)
    $libRootFwd = Fwd-ForJson $script:libRoot
    $args = @()

    if ($IncludeDebugAgent) {
        $suspendMode = if ($Suspend) { 'y' } else { 'n' }
        $args += "-agentlib:jdwp=transport=dt_socket,server=y,suspend=$suspendMode,address=*:$DebugPort"
    }

    $args += (
        "-Djava.library.path=$natives",
        "-Djna.tmpdir=$natives",
        "-Dorg.lwjgl.system.SharedLibraryExtractPath=$natives",
        "-Dio.netty.native.workdir=$natives",
        "-Dminecraft.launcher.brand=TLauncher",
        "-Dminecraft.launcher.version=2.8.6",
        "-Djava.net.preferIPv6Addresses=system",
        "-DignoreList=bootstraplauncher,securejarhandler,asm-commons,asm-util,asm-analysis,asm-tree,asm,JarJarFileSystems,client-extra,fmlcore,javafmllanguage,lowcodelanguage,mclanguage,forge-,modpack.jar",
        "-DmergeModules=jna-5.10.0.jar,jna-platform-5.10.0.jar",
        "-DlibraryDirectory=$libRootFwd",
        "-Xss1M",
        "-Xmx$Xmx",
        "-XX:HeapDumpPath=MojangTricksIntelDriversForPerformance_javaw.exe_minecraft.exe.heapdump",
        "--add-modules",
        "ALL-MODULE-PATH",
        "--add-opens",
        "java.base/java.util.jar=cpw.mods.securejarhandler",
        "--add-opens",
        "java.base/java.lang.invoke=cpw.mods.securejarhandler",
        "--add-exports",
        "java.base/sun.security.util=cpw.mods.securejarhandler",
        "--add-exports",
        "jdk.naming.dns/com.sun.jndi.dns=java.naming"
    )
    return $args
}

function Get-McGameArgs([string]$Username = "Dev") {
    $modpackDirFwd = Fwd-ForJson $script:modpackDir
    $assetsFwd = Fwd-ForJson $script:assets
    return @(
        "--username", "$Username",
        "--version", "$($script:mcVersion)",
        "--gameDir", "$modpackDirFwd",
        "--assetsDir", "$assetsFwd",
        "--assetIndex", "5",
        "--uuid", "00000000-0000-0000-0000-000000000000",
        "--accessToken", "0",
        "--clientId", "0",
        "--xuid", "0",
        "--userType", "legacy",
        "--versionType", "release",
        "--launchTarget", "forgeclient",
        "--fml.forgeVersion", "47.3.0",
        "--fml.mcVersion", "1.20.1",
        "--fml.forgeGroup", "net.minecraftforge",
        "--fml.mcpVersion", "20230612.114412"
    )
}