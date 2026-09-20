---
name: admin-panel-testing
description: Use when testing the running Admin Panel mod in Minecraft 1.20.1, sending commands or mouse/keyboard input to the live game window. Triggers on keywords: admin panel test, R.CTRL, test mod in-game, send command, mc-control, click button, focus game window, Back to Game, Open to LAN, check world state, menu navigation.
---

# Admin Panel In-Game Testing — Self-Contained Control Reference

This skill is a **pre-computed control map**. All coordinates, button geometry and command sequences are stored here so no process is ever rediscovered. If the window size changes, use the **recalculation section** with the stored base size.

---

## 0. Memory File (persistent state)

Coordinates are stored so nothing needs re-discovery. Record runtime facts in:

```
C:\Users\user\AppData\Roaming\.minecraft\versions\modpack\.vscode\mc-session.json
```

Structure (read it first, update it after every screen change):

```json
{
  "screen": {
    "name": "in-game",
    "width": 941,
    "height": 569
  },
  "window": {
    "rect": {"L": 489, "T": 244, "R": 1430, "B": 813},
    "centerX": 959,
    "centerY": 528,
    "pid": 0
  },
  "menu": {
    "current": "none",
    "lastPause": false,
    "panelOpen": false
  }
}
```

If `mc-session.json` exists, **trust its stored coordinates** and only re-verify when the window size differs from the expected 941×569.

---

## 1. Golden Rule: Focus BEFORE Every Input

**Never send any keyboard/mouse input without first focusing the Minecraft window.**

- `mc-control.ps1 -MouseClick` / `-Key` already call `SetForegroundWindow` internally.
- For raw `keybd_event` input (R.CTRL, ESC) ALWAYS run `-Foreground` first + `Start-Sleep 300ms`.

**Universal pre-command sequence:**

1. `-Foreground` (focus window)
2. Ensure on gameplay screen (panel closed, no pause menu). If unsure → ESC to try to clear, or click **Back to Game**
3. Wait 1–2 s
4. Send the command / key / click

---

## 2. Screen Geometry & Recalculation

### Stored base (this modpack default)

| Item | Value |
|------|-------|
| Base window size | **941 × 569** |
| Window center (image coords) | (470, 284) |
| Window center (screen coords) | (959, 528) |
| Image origin on screen | window rect (L,T) = (489, 244) |
| `mc-control` offsets | relative to window center, NOT origin |

### Coordinate formulas

```
imageX -> screenX = L + imageX  (L≈489)
imageY -> screenY = T + imageY  (T≈244)
offsetX = imageX - (width/2)
offsetY = imageY - (height/2)
```

### Recalculation for a changed window size

If `mc-control.ps1 -GetWindow` reports a new SIZE (e.g. 1280×720), recompute every coordinate:

```
newImageX = storedImageX * (newWidth / 941)
newImageY = storedImageY * (newHeight / 569)
newCenterX = newWidth / 2
newCenterY = newHeight / 2
offsetX = newImageX - newCenterX
offsetY = newImageY - newCenterY
```

All image-coordinate tables below are given in the 941×569 space and can be rescaled by these factors.

---

## 3. mc-control.ps1 Reference

| Action | Command |
|--------|---------|
| Window info | `-GetWindow` |
| Screenshot | `-Screenshot -Out screenshots/x.png` |
| Focus | `-Foreground` |
| Send key (SendKeys) | `-Key "f5"`, `-Key "{ESC}"` |
| Mouse click | `-MouseClick -X <offX> -Y <offY>` (offsets from center) |

Raw keyboard (`keybd_event`) — R.CTRL open panel, ESC close:

```
R_CTRL: keybd_event(0xA3, 0x1D, 0x0001, 0)  then keybd_event(0xA3, 0x1D, 0x0003, 0)   [EXTENDEDKEY down/up]
ESC:    keybd_event(0x1B, 0x01, 0, 0)  then keybd_event(0x1B, 0x01, 2, 0)
```

(Note: ESC may need scancode 0x01 — first try without it when game screen is confident.)

---

## 4. Menu Coordinate Map (941×569 image space)

### 4.1 In-Game (gameplay)

| Element | Coords |
|---------|--------|
| Hotbar row | y≈500–540, x≈40–900 |
| Action bar (feedback) | y≈462–495, center x≈470 |
| Chat | bottom-left, x≈10–400, y≈380–500 |
| Heal/Hunger HUD | top-left x≈10–100, y≈10–50 |

### 4.2 Admin Panel (R.CTRL to open)

Panel 260×210, center (470,284) → px≈340, py≈179.

| Element | Image coords |
|---------|--------------|
| Panel body | x 340–600, y 179–389 |
| Title bar | y≈179–195 |
| Tabs row | y≈157–177 (click y≈167) |
| **Player tab ≈ x 366** | **Items ≈ x 418** | World ≈ x 470 | Mobs ≈ x 522 | Mods ≈ x 574 |
| Bottom bar | y≈375–389 |

Button grid: col0 x≈344 (click ~406), col1 x≈472 (click ~534); rows y=185/208/231/254/277/300/323 (+10 to click).

**Player tab (col0, col1):**
- (406,195) Heal `heal`
- (534,195) Feed `feed`
- (406,218) Fly `fly`
- (534,218) God Mode `god`
- (406,241) God Gear `godgear`
- (534,241) Give All `giveall`
- (406,264) Creative `creative`
- (534,264) Survival `survival`
- (406,287) Speed 2x `speed 2`
- (534,287) Night Vision `nv`
- (406,310) Fire Resist `fire`
- (534,310) Strength `strength`
- (406,333) Regen `regen`
- (534,333) Haste `haste`
- (406,356) Invisible `invis`
- (534,356) Clear Effects `cleareffects`

**Items tab (click Items tab ≈ (418,167) first):**
- (406,195) Diamond x64 `give minecraft:diamond 64`
- (534,195) Netherite x64 `give minecraft:netherite_ingot 64`
- (406,218) Emerald x64 `give minecraft:emerald 64`
- (534,218) DiamondBlock x64 `give minecraft:diamond_block 64`
- (406,241) EnchApple x64 `give minecraft:enchanted_golden_apple 64`
- (534,241) EnderPearl x16 `give minecraft:ender_pearl 16`
- (406,264) XPBottle x64 `give minecraft:experience_bottle 64`
- (534,264) Elytra `give minecraft:elytra`
- (406,287) Totem `give minecraft:totem_of_undying`
- (534,287) Backpack `give quark:backpack`
- (406,310) Iron Chest `give ironchest:iron_chest`
- (534,310) Repair All `repair`
- (406,333) Clear Inv `clearinv`

**World tab (click ≈ (470,167)):**
- (406,195) Set Day `time day`
- (534,195) Set Night `time night`
- (406,218) Clear Sky `weather clear`
- (534,218) Rain `weather rain`
- (406,241) Thunder `weather thunder`
- (534,241) Peaceful `difficulty peaceful`
- (406,264) Hard `difficulty hard`
- (534,264) Skip +1000 `tickwarp 1000`
- (406,287) Skip +10000 `tickwarp 10000`
- (534,287) Spawn `spawn`
- (406,310) Top `top`
- (534,310) TP All `tpall`

**Mobs tab (click ≈ (522,167)):**
- (406,195) Kill All `killall`
- (534,195) Player List `plist`

**Mods tab (click ≈ (574,167)):**
- (406,195) Mod List `modlist`
- (534,195) Mods Info `mods`
- (406,218) Help `admin help`

Panel open indicator: dark blue bg (`R17 G22 B57`) at (470,120); buttons gray 131 at (406,195).

### 4.3 Pause Menu (ESC → Game Menu)

6 bands, center x≈470; buttons 2-col in the middle block:

| Row (y range) | Center y | Contents |
|---------------|----------|----------|
| 171–202 | 186 | Back to Game |
| 219–250 | 234 | (columns) |
| 267–298 | 282 | (columns) |
| 315–346 | 330 | **Open to LAN ≈ x 572** |
| 363–394 | 378 | Mods |
| 411–442 | 426 | Save and Quit to Title |

Click **Back to Game**: (470,186) → offset (0, -98).
Click **Open to LAN**: (572,330) → offset (+102, +46).

### 4.4 Open to LAN Screen

| Element | Image Coords |
|---------|--------------|
| Row Game Mode/Allow Cheats | y≈250 |
| Row Online Mode/PvP | y≈298 |
| Allow Cheats: ON | right column x≈484–775, y≈250 → click ≈ (630, 250) |
| **Start LAN World** | y≈509–540, x≈484–657 → click ≈ (570, 524) → offset (+100, +240) |
| Cancel | x≈662–775 → click ≈ (718, 524) |

### 4.5 Main Menu/Select World

| Element | Image Coords |
|---------|--------------|
| Singleplayer (main menu) | ≈ (470, 264) → offset (0, -20) |
| Select World -> Play Selected World | ≈ (311, 475) → offset (-160, +190) |
| World row "Corner of Clay" select | ≈ (451, 154) → offset (-20, -130) |

---

## 5. Command Flow Facts

- Button click → `sendCmd` → `mc.player.connection.sendCommand(cmd)`; `/` stripped.
- Feedback `✓ <cmd>` shows on **action bar (~3 s), hidden while panel open** → verify after closing panel.
- `heal` is NOT vanilla. Modpack `healthcommand` registers `/health`, not `/heal`.
- Vanilla cheat commands (`give`, `time day`, `weather`, `difficulty`) only parse when cheats enabled.
- World "Corner of Clay": was `allowCommands=0` (cheats OFF). Enable via **Open to LAN → Allow Cheats: ON → Start LAN World**, then game returns to gameplay with cheats on.
- Chat errors "Unknown or incomplete command" = command doesn't exist OR cheats off (vanilla cmds unregistered).

---

## 6. Overlay / Vision Verification

- Screenshot full → downscale to JPG (quality 60, width 480) → pass to `screenshot-reader` agent.
- For small detail: crop + upscale region (hotbar x60–920 y490–565; chat x40–940 y380–565; action bar x40–500 y430–490) then OCR.
- Pixel probes: panel open (dark blue at 470,120 / gray 131 at 406,195), panel closed (terrain colors).
- Vision OCR of tiny items is unreliable — use pixel probes + crop-upscale.

---

## 7. Current Session Status (update after each step)

> Last verified window size: 941×569. Last screen: Open to LAN (Allow Cheats already ON). Next step: click Start LAN World (+100,+240) → gameplay with cheats → confirm action bar from earlier Diamond/Heal clicks and test panel item command.