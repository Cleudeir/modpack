# Modpack Development Guide

## Project Overview

This is a Minecraft Forge 1.20.1 modpack with 300+ mods.

## Quick Start

1. **Read crash reports** in `crash-reports/` when issues occur
2. **Check configs** in `config/` for mod settings
3. **Use KubeJS** in `kubejs/` for quick customizations
4. **Debug** using VSCode launch configurations

## Key Commands

```bash
# List mods
ls mods/

# Check latest crash
ls -lt crash-reports/ | head -5

# Find config for specific mod
find config/ -name "*modname*"
```

## Development Workflow

1. Identify the problem (crash report, bug, feature request)
2. Locate relevant mod/config/script
3. Make minimal changes
4. Test with VSCode debugger
5. Verify fix works

## Common Mod Locations

| Task | Location |
|------|----------|
| Custom items/recipes | `kubejs/server_scripts/` |
| Custom blocks/items | `kubejs/startup_scripts/` |
| Mod configs | `config/` |
| CraftTweaker | `scripts/` |
| Datapacks | `datapacks/` |

## Debug Tips

- Enable `MIXIN_DEBUG=true` for verbose mixin logging
- Check `crash-reports/` for stack traces
- Use `spark` mod for performance profiling
- Test in creative mode first
