# Entity Culling

**Version:** 1.x
**Category:** Performance

## Description
Entity Culling optimizes performance by skipping the rendering of entities that are not visible to the player. This significantly reduces the load on the rendering system, especially in areas with many entities.

## Key Features
- Skips rendering of non-visible entities
- Optimizes entity rendering performance
- Reduces GPU load in entity-heavy areas
- Works with all entity types
- Minimal performance overhead

## Configuration
Config file: `config/entityculling.toml`

Key settings:
- `enabled`: Enable entity culling (recommended: true)
- `cullInvisibleEntities`: Cull entities behind other blocks
- `cullEntitiesIn unloadedChunks`: Skip entities in unloaded chunks

## Tips
- Particularly effective in farms with many mobs
- Can significantly improve FPS in entity-heavy builds
- Works automatically with minimal configuration
- Combine with Embeddium for maximum rendering optimization