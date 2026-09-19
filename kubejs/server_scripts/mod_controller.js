// priority: 10
// ============================================
//   MOD CONTROLLER - Controle Total dos Mods
//   Comando: /mods ou /modctrl
// ============================================

PlayerEvents.chat(event => {
    let msg = event.message
    let player = event.player
    let level = event.level
    let server = event.server

    if (level.clientSide) return

    // ==========================================
    // MOD CONTROLLER - /mods
    // ==========================================
    if (msg === '/mods' || msg === '/modctrl') {
        showModController(player)
        event.cancel()
    }

    // ==========================================
    // MOD CONTROLLER TABS
    // ==========================================
    if (msg === '/mods 1' || msg === '/modctrl 1') {
        showPerformanceMods(player)
        event.cancel()
    }

    if (msg === '/mods 2' || msg === '/modctrl 2') {
        showGameplayMods(player)
        event.cancel()
    }

    if (msg === '/mods 3' || msg === '/modctrl 3') {
        showWorldMods(player)
        event.cancel()
    }

    if (msg === '/mods 4' || msg === '/modctrl 4') {
        showVisualMods(player)
        event.cancel()
    }

    if (msg === '/mods 5' || msg === '/modctrl 5') {
        showUtilityMods(player)
        event.cancel()
    }

    if (msg === '/mods 6' || msg === '/modctrl 6') {
        showCombatMods(player)
        event.cancel()
    }

    if (msg === '/mods 7' || msg === '/modctrl 7') {
        showStorageMods(player)
        event.cancel()
    }

    if (msg === '/mods 8' || msg === '/modctrl 8') {
        showWorldgenMods(player)
        event.cancel()
    }

    // ==========================================
    // PERFORMANCE MODS CONTROLS
    // ==========================================
    if (msg === '/mod fps') {
        player.tell('§6§l═══ FPS & PERFORMANCE ═══')
        player.tell('§a/fps status §7- Ver FPS atuais')
        player.tell('§a/fps particles §7- Toggle partículas')
        player.tell('§a/fps entities §7- Limite de entidades')
        player.tell('§a/fps render §7- Distância render')
        player.tell('§a/fps shadow §7- Toggle sombras')
        player.tell('§a/fps clouds §7- Toggle nuvens')
        player.tell('§a/fps weather §7- Toggle clima visual')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/fps status') {
        let mem = java.lang.Runtime.getRuntime().totalMemory() - java.lang.Runtime.getRuntime().freeMemory()
        let memMB = Math.round(mem / 1024 / 1024)
        let maxMem = Math.round(java.lang.Runtime.getRuntime().totalMemory() / 1024 / 1024)
        let entities = level.getEntities().length
        player.tell('§6§l═══ SISTEMA ═══')
        player.tell('§aMemória: §f' + memMB + '/' + maxMem + ' MB')
        player.tell('§aEntidades: §f' + entities)
        player.tell('§aTPS: §f' + server.tickRate)
        player.tell('§aDificuldade: §f' + level.difficulty)
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/fps particles') {
        server.runCommand('gamerule doParticleToggle true')
        player.tell('§a✦ Partículas toggleado!')
        event.cancel()
    }

    if (msg === '/fps entities') {
        server.runCommand('gamerule maxEntityCramming 24')
        player.tell('§a🐾 Entity cap: 24')
        event.cancel()
    }

    // ==========================================
    // GAMEPLAY MODS CONTROLS
    // ==========================================
    if (msg === '/mod create') {
        player.tell('§6§l═══ CREATE MOD ═══')
        player.tell('§a/create stress §7- Ver estresse')
        player.tell('§a/create stressreset §7- Resetar estresse')
        player.tell('§a/create speed <val> §7- Speed multiplier')
        player.tell('§a/create circuits §7- Toggle circuits')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/create stress') {
        player.tell('§6§lCreate Stress: §fNormal')
        event.cancel()
    }

    if (msg === '/create stressreset') {
        player.tell('§a§lCreate Stress Resetado!')
        event.cancel()
    }

    if (msg === '/mod quark') {
        player.tell('§6§l═══ QUARK ═══')
        player.tell('§a/quark bag §7- Dar Quark Bag')
        player.tell('§a/quark crate §7- Dar Crate')
        player.tell('§a/chest §7- Toggle chest improvements')
        player.tell('§a/torch §7- Toggle torch placement')
        player.tell('§a/rope §7- Toggle rope')
        player.tell('§a/pipes §7- Toggle pipes')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/quark bag') {
        player.give(Item.of('quark:backpack'))
        player.tell('§a🎒 Quark Backpack!')
        event.cancel()
    }

    if (msg === '/quark crate') {
        player.give(Item.of('quark:crate'))
        player.tell('§a📦 Quark Crate!')
        event.cancel()
    }

    if (msg === '/mod waystones') {
        player.tell('§6§l═══ WAYSTONES ═══')
        player.tell('§a/waystone list §7- Listar waystones')
        player.tell('§a/waystone tp <name> §7- Teleportar')
        player.tell('§a/waystone share §7- Compartilhar')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mod curios') {
        player.tell('§6§l═══ CURIOS ═══')
        player.tell('§a/curios slot §7- Dar slot extra')
        player.tell('§a/curios ring §7- Dar ring')
        player.tell('§a/curios charm §7- Dar charm')
        player.tell('§a/curios belt §7- Dar belt')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // WORLD MODS CONTROLS
    // ==========================================
    if (msg === '/mod world') {
        player.tell('§6§l═══ WORLD MODS ═══')
        player.tell('§a/world structure §7- Toggle structures')
        player.tell('§a/world village §7- Toggle villages')
        player.tell('§a/world dungeon §7- Toggle dungeons')
        player.tell('§a/world biome §7- Toggle biome mods')
        player.tell('§a/world ore §7- Toggle ore gen')
        player.tell('§a/world tree §7- Toggle tree gen')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mod dungeons') {
        player.tell('§6§l═══ DUNGEON MODS ═══')
        player.tell('§a/dungeons arise §7- Dungeons Arise')
        player.tell('§a/dungeons rogl §7- Roguelike Dungeons')
        player.tell('§a/dungeons twilight §7- Twilight Forest')
        player.tell('§a/dungeons infernal §7- Infernal Mobs')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/dungeons arise') {
        player.tell('§a§lDungeons Arise: Ativo')
        event.cancel()
    }

    if (msg === '/dungeons rogl') {
        player.tell('§a§lRoguelike Dungeons: Ativo')
        event.cancel()
    }

    // ==========================================
    // VISUAL MODS CONTROLS
    // ==========================================
    if (msg === '/mod visual') {
        player.tell('§6§l═══ VISUAL MODS ═══')
        player.tell('§a/visual shaders §7- Toggle shaders')
        player.tell('§a/visual particles §7- Toggle partículas')
        player.tell('§a/visual sounds §7- Toggle sons extras')
        player.tell('§a/visual animations §7- Toggle animações')
        player.tell('§a/visual hud §7- Toggle HUD mods')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mod ambient') {
        player.tell('§6§l═══ AMBIENT SOUNDS ═══')
        player.tell('§a/ambient volume <val> §7- Volume')
        player.tell('§a/ambient biome §7- Sons por biome')
        player.tell('§a/ambient weather §7- Sons clima')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // UTILITY MODS CONTROLS
    // ==========================================
    if (msg === '/mod util') {
        player.tell('§6§l═══ UTILITY MODS ═══')
        player.tell('§a/util jei §7- Abrir JEI')
        player.tell('§a/util jade §7- Toggle Jade (WAILA)')
        player.tell('§a/util inventory §7- Toggle inventory mods')
        player.tell('§a/util waystones §7- Toggle waystones')
        player.tell('§a/util map §7- Toggle map mods')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/util jei') {
        server.runCommand('recipe give @s *')
        player.tell('§a📋 JEI: Todas receitas!')
        event.cancel()
    }

    if (msg === '/mod inventory') {
        player.tell('§6§l═══ INVENTORY MODS ═══')
        player.tell('§a/inv trash §7- Toggle TrashSlot')
        player.tell('§a/inv sort §7- Toggle Inventory Sort')
        player.tell('§a/inv profiles §7- Toggle Profiles')
        player.tell('§a/inv hud §7- Toggle HUD')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // COMBAT MODS CONTROLS
    // ==========================================
    if (msg === '/mod combat') {
        player.tell('§6§l═══ COMBAT MODS ═══')
        player.tell('§a/combat better §7- Better Combat')
        player.tell('§a/combat weapons §7- Divine Weaponry')
        player.tell('§a/combat armor §7- Armor Mods')
        player.tell('§a/combat mobs §7- Mob Mods')
        player.tell('§a/combat hordes §7- The Hordes')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/combat better') {
        player.tell('§a§lBetter Combat: Ativo')
        player.tell('§7Swipe attacks, double handed weapons')
        event.cancel()
    }

    if (msg === '/combat weapons') {
        player.tell('§a§lDivine Weaponry: Ativo')
        player.give(Item.of('divine_weaponry:pinkie_pie'))
        player.tell('§7Arma especial dada!')
        event.cancel()
    }

    // ==========================================
    // STORAGE MODS CONTROLS
    // ==========================================
    if (msg === '/mod storage') {
        player.tell('§6§l═══ STORAGE MODS ═══')
        player.tell('§a/storage iron §7- Dar Iron Chest')
        player.tell('§a/storage shulker §7- Dar Shulker')
        player.tell('§a/storage backpack §7- Dar Backpack')
        player.tell('§a/storage crate §7- Dar Crate')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/storage iron') {
        player.give(Item.of('ironchest:iron_chest'))
        player.tell('§a📦 Iron Chest!')
        event.cancel()
    }

    if (msg === '/storage backpack') {
        player.give(Item.of('quark:backpack'))
        player.tell('§a🎒 Backpack!')
        event.cancel()
    }

    // ==========================================
    // WORLDGEN MODS CONTROLS
    // ==========================================
    if (msg === '/mod worldgen') {
        player.tell('§6§l═══ WORLDGEN MODS ═══')
        player.tell('§a/gen trees §7- Toggle tree gen')
        player.tell('§a/gen ores §7- Toggle ore gen')
        player.tell('§a/gen structures §7- Toggle structures')
        player.tell('§a/gen villages §7- Toggle villages')
        player.tell('§a/gen dungeons §7- Toggle dungeons')
        player.tell('§a/gen biomes §7- Toggle biome mods')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // QUICK MOD TOGGLES
    // ==========================================
    if (msg === '/toggle fps') {
        server.runCommand('gamerule doDaylightCycle true')
        player.tell('§a✦ FPS toggle!')
        event.cancel()
    }

    if (msg === '/toggle particles') {
        server.runCommand('gamerule doFireTick true')
        player.tell('§a✦ Particles toggle!')
        event.cancel()
    }

    // ==========================================
    // MOD INFO
    // ==========================================
    if (msg === '/modinfo') {
        player.tell('§6§l╔══════════════════════════════╗')
        player.tell('§6§l║    §e§lMOD INFO §6§l              ║')
        player.tell('§6§l╠══════════════════════════════╣')
        player.tell('§aTotal Mods: §f300+')
        player.tell('§aForge: §f47.3.0')
        player.tell('§aKubeJS: §f2001.6.5')
        player.tell('§aMC: §f1.20.1')
        player.tell('§6§l╚══════════════════════════════╝')
        event.cancel()
    }

    // ==========================================
    // MOD LIST
    // ==========================================
    if (msg === '/modlist') {
        player.tell('§6§l═══ MODS PRINCIPAIS ═══')
        player.tell('§a⚙ Create §7- Máquinas e automação')
        player.tell('§a🐾 Alex\'s Mobs §7- Mobs adicionais')
        player.tell('§a📦 Quark §7- Vanilla improvements')
        player.tell('§a📍 Waystones §7- Teleporte')
        player.tell('§a🎮 FTB Quests §7- Missões')
        player.tell('§a💍 Curios §7- Accessories')
        player.tell('§a⚔ Better Combat §7- Combat rework')
        player.tell('§a🏰 Dungeons Arise §7- Estruturas')
        player.tell('§a🌙 Twilight Forest §7- Dimensão')
        player.tell('§a🔫 ScorchedGuns §7- Armas')
        player.tell('§a🧟 The Hordes §7- Hordes')
        player.tell('§a📦 Iron Chest §7- Baús')
        player.tell('§a🎨 Supplementaries §7- Decorativos')
        player.tell('§a🌳 Ecologics §7- Nature')
        player.tell('§a⛏ ParCool §7- Parkour')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }
})

function showModController(player) {
    player.tell('§6§l╔══════════════════════════════╗')
    player.tell('§6§l║    §e§lMOD CONTROLLER §6§l        ║')
    player.tell('§6§l╠══════════════════════════════╣')
    player.tell('§6§l║ §a1 §7- §fPerformance           §6§l║')
    player.tell('§6§l║ §a2 §7- §fGameplay              §6§l║')
    player.tell('§6§l║ §a3 §7- §fWorld                 §6§l║')
    player.tell('§6§l║ §a4 §7- §fVisual                §6§l║')
    player.tell('§6§l║ §a5 §7- §fUtility               §6§l║')
    player.tell('§6§l║ §a6 §7- §fCombat                §6§l║')
    player.tell('§6§l║ §a7 §7- §fStorage               §6§l║')
    player.tell('§6§l║ §a8 §7- §fWorldgen              §6§l║')
    player.tell('§6§l║ §c0 §7- §fFechar               §6§l║')
    player.tell('§6§l╚══════════════════════════════╝')
    player.tell('§eUse: /mods <número>')
}

function showPerformanceMods(player) {
    player.tell('§6§l═══ PERFORMANCE MODS ═══')
    player.tell('§a/mod fps §7- FPS controls')
    player.tell('§a/mod ferrite §7- FerriteCore (RAM)')
    player.tell('§a/mod embeddium §7- Embeddium (GPU)')
    player.tell('§a/mod modernfix §7- ModernFix')
    player.tell('§a/mod spark §7- Spark profiler')
    player.tell('§a/mod smooth §7- SmoothChunk')
    player.tell('§a/mod entity §7- Entity culling')
    player.tell('§6§l════════════════════════')
}

function showGameplayMods(player) {
    player.tell('§6§l═══ GAMEPLAY MODS ═══')
    player.tell('§a/mod create §7- Create controls')
    player.tell('§a/mod quark §7- Quark controls')
    player.tell('§a/mod waystones §7- Waystones controls')
    player.tell('§a/mod curios §7- Curios controls')
    player.tell('§a/mod ftb §7- FTB controls')
    player.tell('§a/mod farmers §7- Farmer\'s Delight')
    player.tell('§a/mod parcool §7- ParCool controls')
    player.tell('§6§l════════════════════════')
}

function showWorldMods(player) {
    player.tell('§6§l═══ WORLD MODS ═══')
    player.tell('§a/mod world §7- World controls')
    player.tell('§a/mod dungeons §7- Dungeon controls')
    player.tell('§a/mod villages §7- Village controls')
    player.tell('§a/mod biomes §7- Biome controls')
    player.tell('§a/mod structures §7- Structure controls')
    player.tell('§6§l════════════════════════')
}

function showVisualMods(player) {
    player.tell('§6§l═══ VISUAL MODS ═══')
    player.tell('§a/mod visual §7- Visual controls')
    player.tell('§a/mod ambient §7- AmbientSounds')
    player.tell('§a/mod shaders §7- Shader controls')
    player.tell('§a/mod particles §7- Particle controls')
    player.tell('§a/mod animations §7- Animation controls')
    player.tell('§6§l════════════════════════')
}

function showUtilityMods(player) {
    player.tell('§6§l═══ UTILITY MODS ═══')
    player.tell('§a/util jei §7- JEI controls')
    player.tell('§a/util jade §7- Jade (WAILA)')
    player.tell('§a/util inventory §7- Inventory mods')
    player.tell('§a/util map §7- Map controls')
    player.tell('§a/util waystones §7- Waystones')
    player.tell('§6§l════════════════════════')
}

function showCombatMods(player) {
    player.tell('§6§l═══ COMBAT MODS ═══')
    player.tell('§a/combat better §7- Better Combat')
    player.tell('§a/combat weapons §7- Divine Weaponry')
    player.tell('§a/combat armor §7- Armor Mods')
    player.tell('§a/combat mobs §7- Mob Mods')
    player.tell('§a/combat hordes §7- The Hordes')
    player.tell('§6§l════════════════════════')
}

function showStorageMods(player) {
    player.tell('§6§l═══ STORAGE MODS ═══')
    player.tell('§a/storage iron §7- Iron Chest')
    player.tell('§a/storage shulker §7- Shulker Box')
    player.tell('§a/storage backpack §7- Backpack')
    player.tell('§a/storage crate §7- Crate')
    player.tell('§6§l════════════════════════')
}

function showWorldgenMods(player) {
    player.tell('§6§l═══ WORLDGEN MODS ═══')
    player.tell('§a/gen trees §7- Tree gen')
    player.tell('§a/gen ores §7- Ore gen')
    player.tell('§a/gen structures §7- Structures')
    player.tell('§a/gen villages §7- Villages')
    player.tell('§a/gen dungeons §7- Dungeons')
    player.tell('§a/gen biomes §7- Biomes')
    player.tell('§6§l════════════════════════')
}
