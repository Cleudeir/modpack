# GPU Memory Leak Fix

**Version:** 1.x
**Category:** Performance

## Description
GPU Memory Leak Fix addresses memory leaks in Minecraft's rendering system that can cause GPU memory to accumulate over time, leading to performance degradation and crashes.

## Key Features
- Fixes GPU memory leaks
- Prevents performance degradation over time
- Reduces GPU memory usage
- Prevents crashes from memory exhaustion
- Works automatically in background

## Configuration
Config file: `config/gpumemleakfix.toml`

Key settings:
- `fixMemoryLeaks`: Enable memory leak fixes (recommended: true)
- `cleanupInterval`: How often to check for leaks (in ticks)
- `logLeaks`: Enable logging of detected leaks

## Tips
- Essential for long gaming sessions
- Particularly important when using shader mods
- Monitor GPU memory usage with other tools to verify effectiveness
- Works well with other performance optimization mods