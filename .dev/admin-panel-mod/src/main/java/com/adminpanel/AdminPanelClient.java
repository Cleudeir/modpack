package com.adminpanel;

import net.minecraft.client.Minecraft;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.client.event.InputEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import org.lwjgl.glfw.GLFW;

@Mod.EventBusSubscriber(modid = AdminPanelMod.MODID, value = Dist.CLIENT)
public class AdminPanelClient {

    private static boolean menuOpen = false;

    public static void setMenuOpen(boolean open) {
        menuOpen = open;
    }

    @SubscribeEvent
    public static void onKeyInput(InputEvent.Key event) {
        Minecraft mc = Minecraft.getInstance();
        if (mc.player == null) return;

        int key = event.getKey();
        int action = event.getAction();

        if (key == AdminPanelMod.openMenuKey.getKey().getValue() && action == GLFW.GLFW_PRESS) {
            if (mc.screen == null) {
                mc.setScreen(new AdminScreen());
                menuOpen = true;
            }
        }
    }
}
