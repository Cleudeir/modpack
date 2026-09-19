---
name: minecraft-modding
description: Use when creating, modifying or debugging Minecraft Forge mods for 1.20.1. Triggers on keywords: mod, forge, mixin, KubeJS, crash, debug, recipe, block, item, entity, GUI, config.
---

# Minecraft Forge Modding Skill

## Overview

This skill provides guidance for developing Minecraft Forge mods version 1.20.1.

## Key Paths

| Path | Purpose |
|------|---------|
| `mods/` | Compiled mod JARs |
| `config/` | Mod configuration (TOML, JSON) |
| `kubejs/server_scripts/` | Server-side KubeJS scripts |
| `kubejs/startup_scripts/` | Startup KubeJS scripts |
| `kubejs/client_scripts/` | Client-side KubeJS scripts |
| `scripts/` | CraftTweaker scripts (.zs) |
| `datapacks/` | Custom datapacks |
| `crash-reports/` | Crash logs |

## Common Tasks

### 1. Reading Crash Reports

```bash
# Find latest crash
ls -lt crash-reports/ | head -5

# Read crash report
cat crash-reports/crash-YYYY-MM-DD_HH.MM.SS-client.txt
```

Look for:
- `Suspected Mods:` section
- `Caused by:` in stack traces
- Mixin errors (`MixinApplyError`, `InvalidMixinException`)

### 2. KubeJS Script Creation

**New Item:**
```javascript
// kubejs/startup_scripts/custom_items.js
StartupEvents.registry('item', event => {
  event.create('custom_item').displayName('Custom Item')
})
```

**New Recipe:**
```javascript
// kubejs/server_scripts/custom_recipes.js
ServerEvents.recipes(event => {
  event.shaped('minecraft:diamond', [
    'AAA',
    'A A',
    'AAA'
  ], { A: 'minecraft:cobblestone' })
})
```

### 3. Config File Editing

Forge configs use TOML format:
```toml
[section]
setting = "value"
number = 123
boolean = true
```

### 4. Mixin Debugging

Mixin errors indicate:
- Missing target classes
- Incompatible mod versions
- Shadow field not found

Solution: Check mod version compatibility or disable the problematic mod.

## Debug Setup

### VSCode launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Debug Minecraft (Client)",
      "request": "launch",
      "mainClass": "net.minecraft.client.main.Main",
      "classpath": "${workspaceFolder}/mods/*",
      "args": [
        "--username", "Dev",
        "--version", "1.20.1",
        "--gameDir", "${workspaceFolder}"
      ],
      "env": {
        "MC_VERSION": "1.20.1",
        "FORGE_VERSION": "47.3.0"
      }
    }
  ]
}
```

### Environment Variables

```bash
# Enable Forge debug logging
export FORGE_DEBUG=true

# Verbose mixin logging
export MIXIN_DEBUG=true
```

## Mod Development Tips

1. **Always backup** before modifying existing mods
2. **Check dependencies** in mod JARs (META-INF/mods.toml)
3. **Use KubeJS** for simple tweaks (recipes, items, events)
4. **Use Forge MDK** for complex mods (new mechanics, blocks, entities)
5. **Test incrementally** - make one change at a time
6. **Read crash reports fully** - the answer is usually in the stack trace

## Version Compatibility

| Component | Version |
|-----------|---------|
| Minecraft | 1.20.1 |
| Forge | 47.3.0 |
| Java | 17 |
| KubeJS | 2001.6.5 |
| Mixin | 0.8.5 |
