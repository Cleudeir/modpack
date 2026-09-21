package com.avatar.autoopentolan.server;

import java.util.List;

import com.avatar.autoopentolan.GlobalConfig;
import com.avatar.autoopentolan.Main;

import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.server.network.ServerConnectionListener;
import net.minecraft.world.level.GameType;
import net.minecraftforge.client.event.InputEvent;
import net.minecraftforge.event.entity.player.PlayerEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.server.ServerLifecycleHooks;

@Mod.EventBusSubscriber(modid = Main.MODID, bus = Mod.EventBusSubscriber.Bus.FORGE)
public class Events {

    static ServerPlayer hoster;

    @SubscribeEvent
    public static void onServerStarting(ServerStartingEvent event) {
        start();
    }

    @SubscribeEvent
    public static void onPlayerSpawned(PlayerEvent.PlayerLoggedInEvent event) {
        if (hoster == null) {
            MinecraftServer server = ServerLifecycleHooks.getCurrentServer();
            List<ServerPlayer> players = server.getPlayerList().getPlayers();
            for (ServerPlayer player : players) {
                hoster = player;
                break;
            }
        }
    }

    public static void start() {
        int port = GlobalConfig.loadPort();
        Boolean isPvpEnabled = GlobalConfig.isPvpEnabled();
        MinecraftServer server = ServerLifecycleHooks.getCurrentServer();
        ServerConnectionListener connection = server.getConnection();
        if (server != null && connection != null) {
            // Open to LAN
            server.getWorldData().setGameType(GameType.SURVIVAL);
            server.setPvpAllowed(isPvpEnabled);
            try {
                connection.startTcpServerListener(null, port); // Start LAN server on specified port
                System.out.println("Server is now open to LAN on port " + port);
                List<ServerPlayer> players = server.getPlayerList().getPlayers();
                for (ServerPlayer player : players) {
                    hoster = player;
                    player.sendSystemMessage(Component.literal("Server is now open to LAN on port " + port));
                    break;
                }
            } catch (Exception e) {
                System.err.println("Failed to open LAN server: " + e.getMessage());
            }
        }
    }

    @SubscribeEvent
    public static void onKeyInput(InputEvent.Key event) {
        if (event.getKey() == 256) {
            MinecraftServer server = ServerLifecycleHooks.getCurrentServer();
            if (server != null && hoster != null) {
                if (server.getWorldData().getGameType() == GameType.SURVIVAL) {
                    server.getWorldData().setGameType(GameType.SPECTATOR);
                } else if (server.getWorldData().getGameType() == GameType.SPECTATOR) {
                    server.getWorldData().setGameType(GameType.SURVIVAL);
                }
            }
        }
    }
}
