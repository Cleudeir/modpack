# Patchouli

**Version:** 1.20.1-84
**Category:** Adventure & Dungeons

## Description
Patchouli is an in-game documentation library that allows mod developers to create rich, interactive guidebooks. It provides a framework for displaying recipes, tutorials, and mod information directly in-game.

## Key Features
- In-game documentation and guidebooks
- Interactive recipe display
- Advancement-locked content
- Custom multiblock visualization
- Rich text formatting support
- Book crafting and customization
- Integration with JEI for recipe lookups

## Configuration
**Config file:** `config/patchouli-client.toml`

Key settings:
- `disableAdvancementLocking` - Show all entries without advancement requirements - Default: false
- `testingMode` - Enable testing mode for book authors - Default: false
- `inventoryButtonBook` - Set book ID to show in inventory (replaces recipe book)
- `useShiftForQuickLookup` - Use Shift instead of Ctrl for quick lookup - Default: false
- `textOverflowMode` - How to handle text overflow: OVERFLOW, TRUNCATE, or RESIZE - Default: RESIZE
- `quickLookupTime` - Ticks needed to hold key before book opens - Default: 10

## Tips
- Press the configured key to open Patchouli guidebooks
- Some books require specific advancements to unlock entries
- Use the search function to find specific topics quickly
- Check the recipe section for crafting instructions
- Books can be found in loot chests or crafted depending on mod configuration
