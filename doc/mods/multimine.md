# Multi Mine

**Version:** 1.20.1.4
**Category:** Technology & Automation / Mining Tools

## Description
Multi Mine allows players to mine multiple connected blocks of the same type simultaneously. When mining one block, adjacent blocks of the same type within a configurable radius are also broken, greatly speeding up resource gathering and clearing operations.

## Key Features
- **Simultaneous mining** - Mine multiple connected blocks at once
- **Configurable radius** - Set how many blocks are affected
- **Block regeneration** - Optional respawn of mined blocks (for server testing)
- **Banned blocks list** - Prevent specific blocks from being multi-mined
- **Banned items list** - Prevent specific tools from triggering the effect

## Configuration
**Config file:** `config/multimine.cfg`

Key settings:
- `blockRegenerationEnabled` = `true` (blocks respawn after mining)
- `initialBlockRegenDelayMillis` = `5000` (5 second delay before respawn)
- `blockRegenIntervalMillis` = `1000` (1 second between respawns)
- `debugMode` = `false`
- Extensive `bannedBlocks` and `bannedItems` lists to prevent unintended mining

## Tips
- Block regeneration is enabled by default - disable for normal gameplay
- Many blocks are banned by default to prevent accidental destruction of important items
- Great for mining large ore veins or clearing flat areas
- Works with any tool, but can be restricted via banned items
- Consider disabling for hardcore survival to maintain challenge
