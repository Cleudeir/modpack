# Falling Tree

**Version:** 4.3.4 (1.20.1)
**Category:** Technology & Automation / Trees

## Description
Falling Tree makes chopping trees much faster by breaking the entire tree when you break one log block. Leaves decay naturally or break instantly, and the tree falls in a realistic animation. It works with any tool and respects enchantments.

## Key Features
- **Whole tree felling** - Break one log, entire tree breaks
- **Configurable break modes** - Fall animation, instant break, or item drop
- **Tree detection** - Automatically detects connected logs and leaves
- **Tool support** - Works with any tool, respects enchantments (optional)
- **Leave breaking** - Optional automatic leaf removal
- **Sneak to disable** - Hold sneak to mine single blocks normally

## Configuration
**Config file:** `config/fallingtree.json`

Key settings:
- `breakMode` = `"FALL_ITEM"` (blocks fall as items with animation)
- `detectionMode` = `"WHOLE_TREE"` (detects entire tree structure)
- `maxScanSize` = `800` (max blocks to scan)
- `maxSize` = `800` (max tree size)
- `treeBreaking` = `true` (logs break when one is broken)
- `leavesBreaking` = `true` (leaves auto-break)
- `allowMixedLogs` = `false` (requires same log type)
- `sneakMode` = `"SNEAK_DISABLE"` (sneak to mine single blocks)
- `ignoreTools` = `true` (works with bare hands)
- `damageMultiplicand` = `0.0` (no extra tool damage)

## Tips
- Hold Shift/Sneak to mine a single log block normally
- Set `damageMultiplicand` > 0 if you want tool durability to matter
- Mixed log types (oak + spruce) won't trigger by default
- Works on modded trees if they follow vanilla log/leaf block conventions
- Great for early game - no special tools required
- Compatible with FallingTree, Treecapitator, and similar mods
