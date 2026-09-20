---
name: admin-panel-build
description: Use when building, compiling, versioning, or installing the Admin Panel Forge mod for Minecraft 1.20.1. Triggers on keywords: build-mod, admin panel, adminpanel, compile mod, build script, version increment.
---

# Admin Panel Mod Build Skill

## Overview

This skill covers building the Admin Panel Mod (`adminpanel`), a clickable GUI menu mod for Minecraft Forge 1.20.1. It handles version incrementing, compilation with Gradle, and installation to the mods folder.

## Key Paths

| Path | Purpose |
|------|---------|
| `mods/` | Installed mod JAR |
| `.dev/admin-panel-mod/` | Mod source code |
| `.dev/admin-panel-mod/build-mod.ps1` | Build script (version + compile + install) |
| `.dev/admin-panel-mod/src/main/java/com/adminpanel/` | Java source files |
| `.dev/admin-panel-mod/src/main/resources/` | Mod resources (mods.toml, pack.mcmeta) |
| `.dev/admin-panel-mod/build/libs/admin-panel-mod-<version>.jar` | Compiled JAR output |

## Mod Source Files

| File | Purpose |
|------|---------|
| `AdminPanelMod.java` | Main mod class, keybind registration |
| `AdminPanelClient.java` | Client event handler (Right Control opens menu) |
| `AdminScreen.java` | Clickable menu GUI (5 tabs, button grid) |

## Build Script Usage

### Auto-increment version

```powershell
powershell -ExecutionPolicy Bypass -File build-mod.ps1
```

Increments patch version: `1.0.0` -> `1.0.1` -> `1.0.2` ...

### Specify version

```powershell
powershell -ExecutionPolicy Bypass -File build-mod.ps1 -version "2.0.0"
```

Sets exact version.

### What the script does

1. Reads current version from `build.gradle` (line: `version = '1.0.0'`)
2. Increments patch version (or uses provided `-version`)
3. Rewrites the version line in `build.gradle`
4. Deletes old `adminpanel-*.jar` from `mods/`
5. Runs `gradle clean build --no-daemon`
6. Copies new JAR to `mods/adminpanel-<version>.jar`

## Gradle Environment

| Component | Value |
|-----------|-------|
| Gradle | 8.10.2 (local in `~/.gradle/wrapper/dists/`) |
| Gradle path | `C:\Users\user\.gradle\wrapper\dists\gradle-8.10.2-bin\a04bxjujx95o3nb99gddekhwo\gradle-8.10.2\bin\gradle.bat` |
| ForgeGradle | 6.0.+ |
| Forge | 1.20.1-47.3.0 |
| Java | 17 |
| Mappings | official |

## Manual Build (if script fails)

```powershell
cd "C:\Users\user\AppData\Roaming\.minecraft\versions\modpack\.dev\admin-panel-mod"
& "C:\Users\user\.gradle\wrapper\dists\gradle-8.10.2-bin\a04bxjujx95o3nb99gddekhwo\gradle-8.10.2\bin\gradle.bat" clean build --no-daemon
```

Output JAR: `build/libs/admin-panel-mod-<version>.jar`

Install manually:
```powershell
Copy-Item "build\libs\admin-panel-mod-<version>.jar" "C:\Users\user\AppData\Roaming\.minecraft\versions\modpack\mods\adminpanel-<version>.jar" -Force
```

## Keybind & Usage

- **Right Control** - Opens the Admin Menu GUI
- **ESC** - Closes the menu
- Menu tabs: Player, Items, World, Mobs, Mods
- Buttons send commands executed by `kubejs/server_scripts/admin_panel.js`

## In-Game Commands (handled by KubeJS)

| Command | Effect |
|---------|--------|
| `heal` | Restore health + hunger |
| `feed` | Restore food + saturation |
| `fly` | Toggle flight |
| `god` | Toggle invulnerability |
| `godgear` | Give full enchanted netherite gear |
| `giveall` | Give essential items |
| `speed <val>` | Set speed effect |
| `killall` | Kill all entities |
| `time day/night` | Set time of day |
| `weather clear/rain` | Set weather |

## Troubleshooting

### Build fails with "BUILD FAILED"

- Check `build.gradle` version line is intact: `version = '1.0.0'`
- Run gradle without filtering: `& gradle.bat clean build --no-daemon 2>&1`
- Look for `error:` lines in output

### PowerShell reports error but JAR was created

- `gradle.bat` writes informational messages to stderr
- Not a real failure - check if JAR exists in `build/libs/`
- The script uses `2>$null` to suppress stderr noise

### gradle-wrapper not found

- Use the full path to local gradle:
  `C:\Users\user\.gradle\wrapper\dists\gradle-8.10.2-bin\a04bxjujx95o3nb99gddekhwo\gradle-8.10.2\bin\gradle.bat`

### Mod not showing in-game

- Verify JAR exists: `Get-ChildItem mods -Filter "adminpanel-*.jar"`
- Check mods.toml for correct modId: `adminpanel`
- Check dependencies: Forge >= 47, Minecraft 1.20.1