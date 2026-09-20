package com.adminpanel;

import com.mojang.blaze3d.platform.InputConstants;
import net.minecraft.client.KeyMapping;
import net.minecraft.client.Minecraft;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.client.event.RegisterKeyMappingsEvent;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.lwjgl.glfw.GLFW;
import org.slf4j.Logger;
import com.mojang.logging.LogUtils;

@Mod(AdminPanelMod.MODID)
public class AdminPanelMod {
    public static final String MODID = "adminpanel";
    private static final Logger LOGGER = LogUtils.getLogger();
    public static KeyMapping openMenuKey;

    public AdminPanelMod() {
        var bus = FMLJavaModLoadingContext.get().getModEventBus();
        bus.addListener(this::clientSetup);
        bus.addListener(this::registerKeyBindings);
        MinecraftForge.EVENT_BUS.register(this);
    }

    private void clientSetup(final FMLClientSetupEvent event) {
        LOGGER.info("Admin Panel GUI loaded!");
    }

    private void registerKeyBindings(final RegisterKeyMappingsEvent event) {
        openMenuKey = new KeyMapping(
                "key.adminpanel.open",
                InputConstants.Type.KEYSYM,
                GLFW.GLFW_KEY_RIGHT_CONTROL,
                "category.adminpanel"
        );
        event.register(openMenuKey);
    }
}
