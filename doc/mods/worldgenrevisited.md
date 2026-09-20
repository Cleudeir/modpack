# World Genre Visited

**Version:** 0.4.4 (Experimental)
**Category:** Exploration & Navigation

## Description
World Genre Visited tracks visited areas and modifies world generation. It allows customization of ore frequencies, cave generation, mob spawns, and other world features.

## Key Features
- Track visited areas and biomes
- Customize ore generation frequencies
- Modify cave and canyon generation
- Control mob spawns per dimension
- Remove or add world features
- Multiple worldgen types (1.12, 1.16, current)

## Configuration
Config file: `config/worldgenrevisited.toml`

Key settings:
- `worldgen_type` - World generation style (default: 2 = current)
- `enable_cheese_and_spaghetti_caves` - Modern caves (default: true)
- `enable_deepslate` - Deepslate generation (default: true)
- `features_to_remove` - List of features to disable
- `feature_frequencies` - Ore frequency multipliers
- `percentage_caves_piece_surface` - Cave surface penetration (default: 0.6)
- `max_mob_spawns_per_level` - Mob caps per dimension

## Tips
- This is an experimental mod - backup worlds before use
- Use `/listallfeatures` to see available features
- Use `/listallcarvers` to see available carvers
- Ore frequency multipliers can be set (e.g., "minecraft:ore_iron=0.5")
- Mob caps help control lag from excessive spawns