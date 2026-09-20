# Embeddium

**Version:** 0.3.x
**Category:** Performance

## Description
Embeddium is a Forge port of Sodium, a performance optimization mod for Minecraft. It significantly improves FPS and reduces lag by optimizing chunk rendering, entity rendering, and other client-side processes.

## Key Features
- Optimized chunk rendering and mesh building
- Improved FPS and reduced stuttering
- Better entity and block entity rendering
- Compatible with most Forge mods
- Reduced CPU usage during chunk loading

## Configuration
Config file: `config/embeddium.toml`

Key settings:
- `renderDistance`: Adjust render distance optimization
- `chunkUpdateThreads`: Number of threads for chunk updates
- `useFogOcclusion`: Enable/disable fog occlusion culling

## Tips
- Install with Oculus for shader compatibility
- Increase chunk update threads if you have a multi-core CPU
- Works best with Iris Shaders for shader support
- May conflict with some rendering mods - check compatibility