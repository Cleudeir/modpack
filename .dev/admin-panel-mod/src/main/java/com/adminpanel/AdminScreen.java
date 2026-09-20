package com.adminpanel;

import net.minecraft.ChatFormatting;
import net.minecraft.client.Minecraft;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.components.Button;
import net.minecraft.client.gui.screens.Screen;
import net.minecraft.network.chat.Component;

public class AdminScreen extends Screen {

    private int selectedTab = 0;

    private static final String[] TAB_NAMES = {"Player", "Items", "World", "Mobs", "Mods"};
    private static final ChatFormatting[] TAB_COLORS = {
        ChatFormatting.GREEN, ChatFormatting.GOLD, ChatFormatting.AQUA,
        ChatFormatting.RED, ChatFormatting.LIGHT_PURPLE
    };
    private static final int PANEL_W = 260;
    private static final int PANEL_H = 210;

    public AdminScreen() {
        super(Component.literal("Admin Menu"));
    }

    @Override
    protected void init() {
        super.init();
        buildMenu();
    }

    private void buildMenu() {
        clearWidgets();
        int cx = this.width / 2;
        int cy = this.height / 2;
        int px = cx - PANEL_W / 2;
        int py = cy - PANEL_H / 2;

        int tabW = PANEL_W / TAB_NAMES.length;
        for (int i = 0; i < TAB_NAMES.length; i++) {
            final int tab = i;
            addRenderableWidget(Button.builder(
                Component.literal(TAB_NAMES[i]),
                b -> { selectedTab = tab; buildMenu(); }
            ).pos(px + i * tabW, py - 22).size(tabW - 1, 20).build());
        }

        String[][] items = getItemsForTab(selectedTab);
        int btnW = (PANEL_W - 12) / 2;
        int btnH = 20;
        int startY = py + 6;

        for (int i = 0; i < items.length; i++) {
            int col = i % 2;
            int row = i / 2;
            int x = px + 4 + col * (btnW + 4);
            int y = startY + row * (btnH + 3);
            if (y + btnH > py + PANEL_H - 6) break;

            final String cmd = items[i][1];
            final String label = items[i][0];
            addRenderableWidget(Button.builder(
                Component.literal(label),
                b -> {
                    sendCmd(cmd);
                    Minecraft mc = Minecraft.getInstance();
                    if (mc.player != null) {
                        mc.player.displayClientMessage(
                            Component.literal("\u2713 " + cmd).withStyle(ChatFormatting.GREEN), true
                        );
                    }
                }
            ).pos(x, y).size(btnW, btnH).build());
        }
    }

    private String[][] getItemsForTab(int tab) {
        switch (tab) {
            case 0: return new String[][] {
                {"Heal",           "heal"},
                {"Feed",           "feed"},
                {"Fly",            "fly"},
                {"God Mode",       "god"},
                {"God Gear",       "godgear"},
                {"Give All",       "giveall"},
                {"Creative",       "creative"},
                {"Survival",       "survival"},
                {"Speed 2x",       "speed 2"},
                {"Night Vision",   "nv"},
                {"Fire Resist",    "fire"},
                {"Strength",       "strength"},
                {"Regen",          "regen"},
                {"Haste",          "haste"},
                {"Invisible",      "invis"},
                {"Clear Effects",  "cleareffects"},
            };
            case 1: return new String[][] {
                {"Diamond x64",       "give minecraft:diamond 64"},
                {"Netherite x64",     "give minecraft:netherite_ingot 64"},
                {"Emerald x64",       "give minecraft:emerald 64"},
                {"DiamondBlock x64",  "give minecraft:diamond_block 64"},
                {"EnchApple x64",     "give minecraft:enchanted_golden_apple 64"},
                {"EnderPearl x16",    "give minecraft:ender_pearl 16"},
                {"XPBottle x64",      "give minecraft:experience_bottle 64"},
                {"Elytra",            "give minecraft:elytra"},
                {"Totem",             "give minecraft:totem_of_undying"},
                {"Backpack",          "give quark:backpack"},
                {"Iron Chest",        "give ironchest:iron_chest"},
                {"Repair All",        "repair"},
                {"Clear Inv",         "clearinv"},
            };
            case 2: return new String[][] {
                {"Set Day",       "time day"},
                {"Set Night",     "time night"},
                {"Clear Sky",     "weather clear"},
                {"Rain",          "weather rain"},
                {"Thunder",       "weather thunder"},
                {"Peaceful",      "difficulty peaceful"},
                {"Hard",          "difficulty hard"},
                {"Skip +1000",    "tickwarp 1000"},
                {"Skip +10000",   "tickwarp 10000"},
                {"Spawn",         "spawn"},
                {"Top",           "top"},
                {"TP All",        "tpall"},
            };
            case 3: return new String[][] {
                {"Kill All",      "killall"},
                {"Player List",   "plist"},
            };
            case 4: return new String[][] {
                {"Mod List",   "modlist"},
                {"Mods Info",  "mods"},
                {"Help",       "admin help"},
            };
            default: return new String[0][];
        }
    }

    private void sendCmd(String cmd) {
        Minecraft mc = Minecraft.getInstance();
        if (mc.player != null) {
            String c = cmd.startsWith("/") ? cmd.substring(1) : cmd;
            mc.player.connection.sendCommand(c);
        }
    }

    @Override
    public void render(GuiGraphics g, int mx, int my, float pt) {
        this.renderBackground(g);
        int cx = this.width / 2;
        int cy = this.height / 2;
        int px = cx - PANEL_W / 2;
        int py = cy - PANEL_H / 2;

        // shadow
        g.fill(px + 4, py + 4, px + PANEL_W + 4, py + PANEL_H + 4, 0x55000000);
        // border
        g.fill(px - 2, py - 2, px + PANEL_W + 2, py + PANEL_H + 2, 0xFF3355CC);
        // bg
        g.fill(px, py, px + PANEL_W, py + PANEL_H, 0xDD0C0C22);
        // title bar
        g.fill(px, py, px + PANEL_W, py + 16, 0xBB111133);

        String title = "\u2605  ADMIN PANEL  \u2605";
        int tw = this.font.width(title);
        g.drawString(this.font, title, cx - tw / 2, py + 4, 0xFFDD44, true);

        // tab underline
        int tabW = PANEL_W / TAB_NAMES.length;
        for (int i = 0; i < TAB_NAMES.length; i++) {
            if (i == selectedTab) {
                g.fill(px + i * tabW, py + 20, px + (i + 1) * tabW, py + 22, TAB_COLORS[i].getColor());
            }
        }

        // bottom bar
        g.fill(px, py + PANEL_H - 14, px + PANEL_W, py + PANEL_H, 0xBB0A0A1A);
        g.drawString(this.font, "[RCtrl] Open  |  [ESC] Close", px + 8, py + PANEL_H - 11, 0x555555);

        super.render(g, mx, my, pt);
    }

    @Override
    public boolean isPauseScreen() {
        return false;
    }
}
