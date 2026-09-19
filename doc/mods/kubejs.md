# KubeJS

**Version:** 2001.6.5-build.14
**Category:** Utility & Library

## Description
KubeJS is a JavaScript scripting engine for Minecraft that lets you create custom items, blocks, recipes, and more through scripts. It's powerful for quick customizations without creating full mods.

## Key Features
- Custom items and blocks
- Recipe creation and modification
- Event handling (right-click, break, etc.)
- Custom commands
- Tooltip modification
- Loot table editing
- Entity spawning control

## Configuration
- Scripts location: `kubejs/` folder
  - `startup_scripts/` - items, blocks, creative tabs
  - `server_scripts/` - recipes, loot tables, events
  - `client_scripts/` - tooltips, JEI integration
- Config: `config/kubejs/`

## Tips
- Start with `server_scripts` for recipe changes
- Use `startup_scripts` for new items/blocks
- Check `kubejs/logfile.txt` for script errors
- Requires Rhino engine to function
