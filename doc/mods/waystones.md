# Waystones

**Version:** 14.1.3
**Category:** Exploration & Navigation

## Description
Waystones is a teleportation network mod that allows players to create and link teleportation points across the world. It provides an easy way to fast-travel between locations using waystone blocks, warp stones, and other methods.

## Key Features
- Place waystone blocks that can be activated and named
- Teleport between waystones with XP cost based on distance
- Warp stones for portable teleportation to any discovered waystone
- Sharestones for team-based teleportation networks
- Portstones for public teleportation hubs
- Dimensional warp to teleport between dimensions
- Configurable XP costs and restrictions

## Configuration
Config file: `config/waystones-common.toml`

Key settings:
- `xpCost.blocksPerXpLevel` - Distance per XP level (default: 1000 blocks)
- `xpCost.maximumBaseXpCost` - Maximum XP cost (default: 3.0)
- `xpCost.dimensionalWarpXpCost` - XP cost for dimension travel (default: 3)
- `restrictions.restrictToCreative` - Only creative players can place waystones
- `restrictions.transportLeashed` - Teleport leashed mobs with you

## Tips
- Place waystones at key locations (base, villages, points of interest)
- Use warp stones for emergency teleportation back to base
- Waystones can be renamed by right-clicking with a name tag
- XP cost can be disabled by setting maximumBaseXpCost to 0
- Generated waystones in worldgen are unbreakable by default