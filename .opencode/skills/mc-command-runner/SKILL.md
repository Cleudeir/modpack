---
name: mc-command-runner
description: Use when sending commands, clicking buttons, or navigating menus in the running Minecraft 1.20.1 game window. Auto-detects window size and calculates correct coordinates. Triggers on keywords: mc run command, mc click, mc navigate, send time set, open to LAN, mc horde, mc force, send chat command, mc control window.
---

# MC Command Runner — Auto-Size-Aware Game Controller

This skill **auto-detects the Minecraft window size** and calculates correct click coordinates regardless of window dimensions. Never hardcode pixel positions again.

## Core Helper Script

All operations go through:

```
.opencode/skills/mc-command-runner/mc-auto.ps1
```

This script handles:
- Finding the Minecraft window by PID or title
- Auto-detecting window rect (L, T, R, B, width, height)
- SendInput mouse clicks scaled to actual window size
- SendKeys keyboard input
- SendText for chat commands
- Screenshots

## Quick Reference

### Find window and get info
```powershell
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -GetWindow -TargetPid <PID>
```

### Send a key
```powershell
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -Key "{TAB}" -TargetPid <PID>
```

### Click at percentage of window
```powershell
# click at 60% width, 58% height (relative to window client area)
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -ClickPct 60,58 -TargetPid <PID>
```

### Send chat command (opens chat, types, sends)
```powershell
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -Cmd "/time set 13000" -TargetPid <PID>
```

### Full sequence: Open to LAN + Enable Cheats
```powershell
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -OpenLan -TargetPid <PID>
```

### Full sequence: Navigate to world + Open LAN + run command
```powershell
& ".opencode\skills\mc-command-runner\mc-auto.ps1" -FullSequence -Command "/time set 13000" -TargetPid <PID>
```

## Coordinate System

All percentage-based. The script auto-reads window rect via `GetWindowRect`:

| Action | Percentage (W%, H%) |
|--------|---------------------|
| **Game Menu buttons** | |
| Back to Game | 50%, 31% |
| Advancements | 25%, 40% |
| Statistics | 75%, 40% |
| Give Feedback | 25%, 50% |
| Report Bugs | 75%, 50% |
| Options | 25%, 59% |
| Open to LAN | 75%, 59% |
| Mods | 50%, 68% |
| Save and Quit | 50%, 78% |
| **Open to LAN screen** | |
| Game Mode button | 35%, 44% |
| Allow Cheats button | 65%, 44% |
| Start LAN World | 35%, 93% |
| Cancel | 65%, 93% |
| **Main Menu** | |
| Singleplayer | 50%, 48% |
| Multiplayer | 50%, 58% |
| **Select World** | |
| Play Selected World | 33%, 88% |

## Standard Flows

### 1. Enable cheats and run a command
```
1. ESC (Game Menu)
2. ClickPct 75,59 (Open to LAN)
3. ClickPct 65,44 (Allow Cheats ON) -- if not already ON
4. ClickPct 35,93 (Start LAN World)
5. ESC (close menu, return to game)
6. Cmd "/time set 13000"
```

### 2. Navigate from main menu to world
```
1. Key {TAB} (Singleplayer)
2. Key {ENTER}
3. Wait 4s
4. Key {TAB} x2
5. Key {ENTER} (Play Selected World)
6. Wait 15s (world load)
```

### 3. Force horde (custom KubeJS command)
```
1. Ensure cheats enabled (flow 1)
2. Cmd "/kubejs custom_command hordeforce"
```

## Learning System

The script saves learnings to `.opencode/skills/mc-command-runner/mc-learn.json`:

```powershell
# Save window state (with -Learn flag on any command)
& mc-auto.ps1 -GetWindow -Learn

# Show all learned data
& mc-auto.ps1 -Status

# Click + screenshot to verify what happened
& mc-auto.ps1 -VerifyClick "75,59"
```

### What gets learned:
| Data | Purpose |
|------|---------|
| `lastWindow` | Handle, rect, size, PID for fast reconnection |
| `knownScreens` | Screens seen at each window size |
| `clickLog` | Last 200 clicks with pct, screen, result |
| `verifiedClicks` | Click positions confirmed by screenshot |
| `commandHistory` | Last 100 commands sent + result |
| `errors` | Last 50 errors for debugging |

### Using learnings:
- Always pass `-Learn` to save state during operations
- Check `-Status` before starting to know current state
- Use `-VerifyClick` to confirm a click landed correctly
- `verifiedClicks` stores per-window-size results so coordinates auto-correct on resize

## Notes

- `SendInput` with `MOUSEEVENTF_ABSOLUTE` is DPI-safe (works on all monitors)
- `mouse_event` / `SetCursorPos` is NOT DPI-safe — never use for clicking
- `SendKeys` for chat input works but must escape special chars: `{}+^%~()`
- Window may move (position changes) but size stays consistent within a session
- Always check `-GetWindow` output before clicking if unsure of position
- Pass `-Learn` to any command to save state for future sessions
