# KubeJS Scripts Documentation

KubeJS is a JavaScript scripting engine that allows customization of Minecraft without creating a full mod.

## Directory Structure

```
kubejs/
├── server_scripts/    # Run on server side
├── startup_scripts/   # Run on game start
├── client_scripts/    # Run on client side
├── assets/            # Custom textures and models
├── config/            # KubeJS configuration
└── data/              # Custom recipes and loot tables
```

## Server Scripts

These scripts run on the server and handle game logic.

### admin_panel.js
Admin panel functionality for server management.

### block_replace.js
Replaces blocks in the world (e.g., swap one block type for another).

### custom_equipment.js
Adds custom equipment items with special properties.

### custom_equipment_effect.js
Adds effects to custom equipment items.

### example.js
Example script showing KubeJS capabilities.

### game_over.js
Customizes game over behavior.

### initial_item.js
Gives players starting items on first join.

### item_category.js
Organizes items into custom categories.

### rewards.js
Awards items or effects for achievements.

### way_sign.js
Custom waystone/sign functionality.

## Startup Scripts

These scripts run when the game starts and register new content.

### admin_item.js
Registers admin-only items.

### custom_item_attributes.js
Adds custom attributes to items.

### custom_structures.js
Registers custom world structures.

### example.js
Example startup script.

### worldgen.js
Customizes world generation.

## Client Scripts

These scripts run on the client and handle UI/visual changes.

### admin_gui.js
Admin GUI interface.

### example.js
Example client script.

## Script Patterns

### Adding Recipes
```javascript
// server_scripts/recipes.js
PlayerEvents.loggedIn(event => {
  event.player.give('minecraft:diamond')
})
```

### Modifying Items
```javascript
// startup_scripts/items.js
StartupEvents.registry('item', event => {
  event.create('custom:item').displayName('Custom Item')
})
```

### Event Handling
```javascript
// server_scripts/events.js
BlockEvents.rightClicked(event => {
  if (event.block.id === 'minecraft:chest') {
    event.server.runCommand('/say Chest opened!')
  }
})
```

## Tips

- Use server_scripts for game logic
- Use startup_scripts for registering new content
- Use client_scripts for UI modifications
- Test scripts in creative mode first
- Check logs/kubejs/ for script errors

## Related Files

- KubeJS config: kubejs/config/
- Custom assets: kubejs/assets/
- Custom data: kubejs/data/
