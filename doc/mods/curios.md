# Curios API

**Version:** 1.20.1-5.1.6.1
**Category:** Combat & Weapons

## Description
Curios API is a framework that adds equipment slots for trinkets and accessories. It provides the foundation for mods like Artifacts and Nameless Trinkets to add their items.

## Key Features
- Adds trinket/accessory equipment slots
- Provides API for other mods to register items
- Compatible with multiple slot types (belt, charm, etc.)
- Client-side slot rendering
- Integration with inventory systems

## Configuration
Config file: `config/curios.toml`
- `slotTypes` - Define available slot types
- `rendering` - Toggle slot rendering
- `keybinds` - Configure slot keybindings

## Tips
- Required for most trinket mods to function
- Open curios inventory with default keybind (usually 'G')
- Some mods may require restarting after adding/removing
