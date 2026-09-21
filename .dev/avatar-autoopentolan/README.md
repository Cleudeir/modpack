## Summary

This Minecraft Forge mod, "avatar_autoopentolan," automatically opens the server to LAN upon startup and allows the server administrator to toggle the game mode between Survival and Spectator using the Escape key.  The mod uses Forge's event system and configuration to manage server settings, including the port number and PvP status.  The configuration is handled by a separate `GlobalConfig` class.  The mod's core logic resides in the `Events` class, which listens for server start, player login, and key input events.  A `Main` class serves as the mod's entry point, registering event listeners and initializing the configuration.  The mod's functionality includes starting a LAN server on a specified port, setting the game mode, and sending messages to the first player who joins the server.


## Tech Stack

Java, Minecraft Forge, Forge Config Spec, Minecraft API.
