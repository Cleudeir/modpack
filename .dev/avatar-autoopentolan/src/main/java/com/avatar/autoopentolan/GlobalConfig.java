package com.avatar.autoopentolan;

import net.minecraftforge.common.ForgeConfigSpec;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.config.ModConfig;

public class GlobalConfig {

    private static final ForgeConfigSpec.Builder BUILDER = new ForgeConfigSpec.Builder();
    public static ForgeConfigSpec CONFIG;

    public static ForgeConfigSpec.ConfigValue<Integer> PORT;
    public static ForgeConfigSpec.ConfigValue<Boolean> PVP_ENABLED;

    static {
        setupConfig();
    }

    private static void setupConfig() {
        // Configure port server will listen
        BUILDER.comment("Configure port server will listen").push("portConfig");
        PORT = BUILDER.define("port", 9090);
        BUILDER.pop();

        // Configure PvP settings
        BUILDER.comment("Configure PvP settings").push("pvpConfig");
        PVP_ENABLED = BUILDER.define("pvpEnabled", false); // PvP disabled by default
        BUILDER.pop();

        CONFIG = BUILDER.build();
    }

    public static void init() {
        ModLoadingContext.get().registerConfig(ModConfig.Type.COMMON, CONFIG);
    }

    public static int loadPort() {
        // Load the config if not already loaded
        Integer data = 9090;
        if (CONFIG.isLoaded()) {
            // Retrieve data from config
            data = PORT.get();
        }
        return data;
    }

    public static boolean isPvpEnabled() {
        // Load the PvP setting from config
        boolean pvp = false;
        if (CONFIG.isLoaded()) {
            pvp = PVP_ENABLED.get();
        }
        return pvp;
    }
}
