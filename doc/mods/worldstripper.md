# World Stripper

**Version:** 3.3.0
**Category:** Exploration & Navigation

## Description
World Stripper allows players to strip away layers of blocks in a configurable area. It's useful for clearing large areas, exploring underground, or creating flat spaces for building.

## Key Features
- Strip blocks in a configurable radius
- Set Y-level range for stripping
- Replace blocks with air or other blocks
- Configurable block update settings
- Notify neighbors option
- Safe stripping with render thread updates

## Configuration
Config file: `config/worldstripper/settings.toml`

Key settings:
- `stripRadiusX` / `stripRadiusZ` - Area radius (default: 48)
- `stripStartY` / `stripStopY` - Y-level range (default: 256 to -64)
- `replacementBlock` - Block to replace with (default: air)
- `notifyNeighbors` - Notify adjacent blocks (default: true)
- `blockUpdate` - Update blocks immediately (default: false)
- `noRender` - Don't update renderer (default: true)

## Tips
- Start with small radius to test settings
- Use `/worldstrip` command to activate
- Replacement block can be any valid block ID
- Large areas may cause lag - strip in sections
- Backup world before large-scale stripping