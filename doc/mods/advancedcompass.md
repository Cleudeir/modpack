# Advanced Compass

**Version:** 1.2.15
**Category:** Exploration & Navigation

## Description
Advanced Compass enhances the vanilla compass with additional modes and information. It shows nearby entities, waypoints, and coordinates on a customizable compass HUD.

## Key Features
- Shows nearby mobs, players, and entities on compass
- Displays waypoints from other mods (JourneyMaps, Xaero's, etc.)
- Customizable compass size, position, and appearance
- Auto-creates death waypoints
- Shows coordinates above or below compass
- Entity grouping and distance display
- Multiple display modes (always on, main hand, both hands, any slot)

## Configuration
Config file: `config/advancedcompass-client.toml`

Key settings:
- `showMode` - When compass is visible (default: ALWAYS_ON)
- `showEntities` - Show mobs and players (default: true)
- `showWaypoints` - Show waypoints (default: true)
- `autoDeathWaypoint` - Create waypoint on death (default: true)
- `coordinatesMode` - Show coordinates (default: BELOW)
- `compassWidth` - Compass width (default: 180)
- `maxDistance` - Maximum entity render distance (default: 500)

## Tips
- Adjust `viewAngle` to see more/fewer entities on compass
- Use `hideBehindBlocks` to only show visible entities
- Death waypoints help locate your stuff after dying
- Compass scales with GUI scale setting
- Compatible with most waypoint mods