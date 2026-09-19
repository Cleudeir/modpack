# Chunk Sending

**Version:** 1.x
**Category:** Performance

## Description
Chunk Sending optimizes how chunks are sent from the server to clients, improving network performance and reducing lag during multiplayer or single-player with chunk loading.

## Key Features
- Optimized chunk data transmission
- Reduced network bandwidth usage
- Better chunk loading performance
- Improved multiplayer experience
- Compatible with most server mods

## Configuration
Config file: `config/chunksending.toml`

Key settings:
- `enabled`: Enable chunk sending optimization (recommended: true)
- `sendRate`: Rate of chunk sending (chunks per tick)
- `compressionLevel`: Compression level for chunk data

## Tips
- Particularly effective on servers with many players
- Can reduce network lag in modpacks
- Works well with Smooth Chunk mod
- Monitor server performance after installation