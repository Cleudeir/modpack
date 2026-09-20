# Modpack Documentation

This document provides a comprehensive overview of all mods, configurations, and scripts in this Minecraft Forge 1.20.1 modpack.

## Project Structure

```
modpack/
├── mods/              # Compiled mod JARs (300+ mods)
├── config/            # Mod configuration files (TOML, JSON)
├── kubejs/            # KubeJS scripts (server, startup, client)
├── scripts/           # CraftTweaker scripts (.zs)
├── datapacks/         # Custom datapacks
├── resourcepacks/     # Resource packs
├── crash-reports/     # Crash logs for debugging
└── doc/               # This documentation
    ├── README.md      # Main overview
    ├── mods/          # Individual mod documentation
    └── categories/    # Category-based documentation
```

## Mod Categories

| Category | Description | File |
|----------|-------------|------|
| [Performance](categories/performance.md) | FPS optimization, memory management | performance.md |
| [World Generation](categories/worldgen.md) | Structures, biomes, terrain | worldgen.md |
| [Mobs & Entities](categories/mobs.md) | New creatures, AI improvements | mobs.md |
| [Combat & Weapons](categories/combat.md) | Weapons, armor, combat mechanics | combat.md |
| [Magic & RPG](categories/magic.md) | Spells, skills, progression systems | magic.md |
| [Technology](categories/technology.md) | Create, machinery, automation | technology.md |
| [Building & Decoration](categories/building.md) | Blocks, furniture, aesthetics | building.md |
| [Quality of Life](categories/qol.md) | Inventory, UI, convenience features | qol.md |
| [Exploration](categories/exploration.md) | Waystones, maps, navigation | exploration.md |
| [Adventure & Dungeons](categories/adventure.md) | Roguelike dungeons, quests | adventure.md |
| [Visual & Audio](categories/visual.md) | Shaders, sounds, animations | visual.md |
| [Utility & Library](categories/utility.md) | Core libraries, APIs, utilities | utility.md |

## Quick Reference

### Most Important Mods

- **Create** - Mechanical power system with gears, conveyors, and automation
- **Quark** - Vanilla+ improvements and quality of life features
- **Twilight Forest** - Dimension with bosses and progression
- **KubeJS** - Scripting engine for custom items, recipes, and events
- **CraftTweaker** - Recipe customization and game rule changes
- **Embeddium** - Performance optimization (Sodium port for Forge)
- **Jade** - In-game information overlay (WAILA/HWYLA)
- **JEI** - Recipe viewer and item lookup

### Configuration Files

Config files are located in `config/` directory. Most mods use TOML format. Key configs:

- `forge-client.toml` / `forge-server.toml` - Forge core settings
- `create-common.toml` - Create mod settings
- `quark-common.toml` - Quark settings
- `kubejs/` - KubeJS script configuration

### Debugging

1. Check `crash-reports/` for crash logs
2. Enable `MIXIN_DEBUG=true` for verbose logging
3. Use `spark` mod for performance profiling
4. Test in creative mode first

## Links

- [Forge Documentation](https://docs.minecraftforge.net)
- [KubeJS Documentation](https://kubejs.com)
- [CraftTweaker Documentation](https://docs.blamejared.com)
