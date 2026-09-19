# Fast Async World Save

**Version:** 1.x
**Category:** Performance

## Description
Fast Async World Save optimizes world saving by performing save operations asynchronously, reducing lag spikes during auto-saves and manual saves.

## Key Features
- Asynchronous world saving
- Reduced lag during save operations
- Better performance during long play sessions
- Configurable save intervals
- Minimal impact on world integrity

## Configuration
Config file: `config/fastasyncworldsave.toml`

Key settings:
- `enabled`: Enable async world saving (recommended: true)
- `saveInterval`: How often to auto-save (in ticks)
- `asyncOperations`: Number of async save operations

## Tips
- Essential for modpacks with many mods
- Reduces stuttering during auto-saves
- Keep backup of world when first testing
- Monitor disk usage with large worlds