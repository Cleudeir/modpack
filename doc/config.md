# Configuration Files Documentation

Configuration files control mod behavior and settings. Located in the `config/` directory.

## File Types

| Extension | Format | Description |
|-----------|--------|-------------|
| .toml | TOML | Most common Forge config format |
| .json | JSON | Data and recipe configs |
| .cfg | CFG | Legacy config format |
| .properties | Properties | Key-value pairs |
| .snbt | SNBT | Stringified NBT |

## Key Configuration Files

### Core Mods
- `forge-client.toml` / `forge-server.toml` - Forge core settings
- `fml.toml` - FML loader settings
- `embeddium-options.json` - Embeddium performance settings

### Major Mods
- `create-common.toml` - Create mod settings
- `quark-common.toml` - Quark settings
- `twilightforest-common.toml` - Twilight Forest settings
- `scalinghealth-client.toml` - Scaling Health settings

### Performance
- `modernfix-common.toml` - ModernFix settings
- `ferritecore-mixin.toml` - FerriteCore settings
- `embeddium-mixins.properties` - Embeddium mixins

### Mobs
- `incontrol/` - Mob spawning rules
- `spawnbalanceutility-common.toml` - Spawn balancing
- `hordes-common.toml` - Horde mode settings

### World Generation
- `terrablender.toml` - Biome generation
- `repurposed_structures-forge/` - Structure settings
- `towns_and_towers/` - Village settings

## Configuration Tips

1. **Backup configs** before making changes
2. **Use Configured mod** for in-game config editing
3. **Check mod docs** for config explanations
4. **Test changes** in singleplayer first

## Common Config Locations

| Task | Config File |
|------|-------------|
| Change mob spawns | incontrol/ |
| Adjust performance | modernfix-common.toml |
| Modify recipes | kubejs/server_scripts/ |
| Change worldgen | terrablender.toml |
| Edit item stats | apothic_attributes/ |

## Config Editing Tools

- **Configured**: In-game config editor
- **Cloth Config**: Config API for mods
- **KubeJS**: Script-based customization
- **CraftTweaker**: Recipe modification

## Troubleshooting

- Check crash reports for config errors
- Verify TOML syntax (no trailing commas)
- Ensure mod versions match config format
- Reset to defaults if unsure
