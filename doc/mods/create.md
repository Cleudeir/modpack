# Create

**Version:** 0.5.1.h (1.20.1)
**Category:** Technology & Automation

## Description
Create is a mod offering a variety of tools and blocks for building animated and automated contraptions. It focuses on visual and functional mechanical systems using rotational power, gears, and kinetic components without requiring complex Redstone knowledge.

## Key Features
- **Rotational Power System** - Generate and transmit power via shafts, gears, and gearboxes
- **Mechanical Components** - Bearings, pistons, saws, drills, deployers, and mechanical arms
- **Conveyor Belts & Depot** - Transport and process items along animated belts
- **Encased Fans & Fluids** - Process items with hot/cold air, mix fluids
- **Redstone Integration** - Automatic crafters, presses, and sequenced gearshifts
- **Ponder System** - Built-in tutorials for every component (press `W` on items in JEI)
- **Contraptions** - Assemble moving structures with rope pulleys, wall mounts, and bearings
- **Rails & Trains** - Full railway system with signals, stations, and powered carts
- **Blueprints** - Save and share contraption designs

## Configuration
**Config file:** `config/create-common.toml`, `config/create-client.toml`

Key settings:
- `disableWorldGen` = `true` (copper and zinc ore generation disabled)
- `enableOverstressedTooltip` = `true` (shows warning when kinetic network is overloaded)
- `enableAmbientSounds` = `true` (machines make noise)
- `fanParticleDensity` = `0.5`
- Client: `rotateWhenSeated` controls rotation while riding contraptions
- Server config (per-world): controls stress impact, RPM limits, recipe overrides

## Tips
- Check the Goggle Overlay info when looking at kinetic blocks (press `W` with Engineer's Goggles equipped)
- Create worldgen (zinc, limestone, scoria, tuff) is disabled in this modpack
- Use the Ponder system (`W` on any Create item in inventory/JEI) to learn mechanics in-game
- Stress is cumulative - if total stress exceeds capacity, all machines stop
- Compatible with Create Crafts & Additions and Create Stuff & Additions for expanded content
