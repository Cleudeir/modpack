# Wesley's Roguelike Dungeons

**Version:** 2.3.2
**Category:** Adventure & Dungeons

## Description
Wesley's Roguelike Dungeons adds procedurally generated roguelike dungeons throughout the world. These multi-level dungeons contain loot, spawners, and increasingly difficult enemies as you descend deeper.

## Key Features
- Procedurally generated multi-level dungeons
- Three size variants: Small, Medium, Large
- Difficulty scaling (Easy/Normal/Hard)
- Vessels of Vision for dungeon detection
- Both Overworld and Nether dungeon variants
- Loot chests with randomized rewards
- Spawner rooms with various mob types

## Configuration
**Config file:** `config/wesleys-roguelike-dungeons-config.toml`

Key settings:
- `CFDungeonSize` - Controls dungeon size (0=small, 1=medium, 2=large) - Default: 1
- `CFDungeonDifficulty` - Sets difficulty level (0=easy, 1=normal, 2=hard) - Default: 1
- `CFAllowNaturalDungeons` - Enable/disable natural dungeon generation - Default: true
- `CFDungeonRarity` - Structures per 1,000,000 chunks (Overworld) - Default: 1000
- `CFNetherDungeonRarity` - Structures per 1,000,000 chunks (Nether) - Default: 300
- `CFAllowModifiers` - Enable mob modifiers - Default: false
- `CFModifierChance` - Chance of mobs spawning with modifiers (0-100) - Default: 5
- `CFAllowVesselofVision` - Enable Vessels of Vision - Default: true
- `CFSlowerDungeonCounter` - Timer speed multiplier (higher = slower) - Default: 100

## Tips
- Use Vessels of Vision to locate nearby dungeons
- Prepare supplies before descending - dungeons have multiple floors
- Higher difficulty dungeons have better loot but tougher enemies
- Consider adjusting dungeon rarity if dungeons spawn too frequently
- Nether dungeons are rarer but often contain unique rewards
