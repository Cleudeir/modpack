# Create Crafts & Additions

**Version:** 1.2.3 (1.20.1)
**Category:** Technology & Automation

## Description
Create Crafts & Additions (Create Addition) is an addon for Create that bridges rotational power with Forge Energy (FE) and adds new processing machines, connectors, and wiring systems. It enables seamless integration between Create's kinetic network and tech mod energy systems.

## Key Features
- **Alternator** - Converts rotational power into Forge Energy (FE)
- **Electric Motor** - Converts Forge Energy back into rotational power
- **Accumulator** - Multiblock energy storage (configurable size, up to 5x3)
- **Rolling Mill** - Processes materials like wires and rods
- **Wire Connectors & Cables** - Transmit FE between blocks (small and large connectors)
- **Tesla Coil** - Defensive/utility block that damages mobs and charges items
- **Portable Energy Interface** - Attach to contraptions for FE transfer on-the-go
- **Diamond Grit Sandpaper** - Durable crafting tool for processing
- **Barbed Wire** - Damage-dealing decorative block

## Configuration
**Config file:** `config/createaddition-common.toml`

Key settings:
- `fe_at_max_rpm` = `480` (FE/t generated at 256 RPM)
- `alternator.generator_efficiency` = `0.75` (75% conversion efficiency)
- `accumulator.accumulator_capacity` = `2,000,000` FE per block
- `accumulator.accumulator_max_height` = `5`, `max_width` = `3`
- `tesla_coil.tesla_coil_hurt_mob` = `3` half hearts damage
- `tesla_coil.tesla_coil_charge_rate` = `5,000` FE/t
- Wire lengths: small = 16 blocks, large = 32 blocks
- Connector transfer rates configurable per type

## Tips
- Alternator efficiency (75%) means you lose some energy in conversion - plan accordingly
- Accumulator multiblock grows by stacking vertically, width up to 3
- Tesla Coil can both damage mobs AND charge held items
- Wires can pass through blocks if `connector_allow_passive_io` is enabled
- Essential bridge for connecting Create to FE-based mods (Mekanism, Thermal, etc.)
