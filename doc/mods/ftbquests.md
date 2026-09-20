# FTB Quests

**Version:** 2001.4.6
**Category:** Adventure & Dungeons

## Description
FTB Quests is a powerful questing and progression system that allows modpack developers to create quest lines, achievements, and progression gates. Players complete tasks to earn rewards and unlock new content.

## Key Features
- Create custom quest lines and chapters
- Task types: item detection, advancement, location, entity kill
- Reward systems: loot tables, item rewards, command rewards
- Team-based or individual quest progression
- Integration with FTB Teams for multiplayer support
- Visual quest trees with dependency tracking
- Customizable quest book UI

## Configuration
**Config file:** Managed through FTB Library (`ftb-library-forge-2001.2.2.jar`)

Key settings:
- Quest data is stored in world save under `ftbquests/` folder
- Server-side config controls permissions and team settings
- Client-side config for UI preferences
- Use `/ftbquests` command to manage quests in-game

## Tips
- Press L (default) to open the quest book
- Complete prerequisite quests before attempting dependent ones
- Check quest descriptions for hints about rewards
- Some quests may require specific mods or items to complete
- Server operators can use commands to reset quest progress
- Quests can be shared between teams or kept individual
