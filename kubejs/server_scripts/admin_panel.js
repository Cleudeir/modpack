// priority: 10
// ============================================
//   PAINEL ADMIN - Comandos via Chat
// ============================================

// --- ADMIN REMOTE: Clique Direito ---
ItemEvents.rightClick('kubejs:admin_remote', event => {
    let player = event.player
    if (player && !player.level.clientSide) {
        openAdminPanel(player)
    }
})

function openAdminPanel(player) {
    player.tell('§6§l╔══════════════════════════════╗')
    player.tell('§6§l║    §e§lPAINEL ADMIN §6§l         ║')
    player.tell('§6§l╠══════════════════════════════╣')
    player.tell('§6§l║ §a1 §7- §fStatus do Sistema     §6§l║')
    player.tell('§6§l║ §a2 §7- §fTeletransporte        §6§l║')
    player.tell('§6§l║ §a3 §7- §fItens & Inventário    §6§l║')
    player.tell('§6§l║ §a4 §7- §fJogador              §6§l║')
    player.tell('§6§l║ §a5 §7- §fMundo & Clima        §6§l║')
    player.tell('§6§l║ §a6 §7- §fMobs & Entidades     §6§l║')
    player.tell('§6§l║ §a7 §7- §fMods Específicos     §6§l║')
    player.tell('§6§l║ §a8 §7- §fPerformance          §6§l║')
    player.tell('§6§l║ §c0 §7- §fFechar Painel        §6§l║')
    player.tell('§6§l╚══════════════════════════════╝')
    player.tell('§eUse: /panel <número>')
}

// --- ALL COMMANDS VIA CHAT ---
PlayerEvents.chat(event => {
    let msg = event.message
    let player = event.player
    if (!player || player.level.clientSide) return

    let server = player.level.getServer()

    // ==========================================
    // PAINEL PRINCIPAL
    // ==========================================
    if (msg === '/panel') {
        openAdminPanel(player)
        event.cancel()
    }

    if (msg === '/panel 1') {
        let entities = player.level.getEntities().length
        player.tell('§6§l═══ STATUS DO SISTEMA ═══')
        player.tell('§aJogadores: §f' + server.playerList.players.length)
        player.tell('§aEntidades: §f' + entities)
        player.tell('§aTPS: §f' + server.tickRate)
        player.tell('§aDia: §f' + player.level.getDayTime())
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // PLAYER COMMANDS
    // ==========================================
    if (msg === '/heal') {
        player.health = player.maxHealth
        player.foodLevel = 20
        player.tell('§a§l♥ Vida restaurada!')
        event.cancel()
    }

    if (msg === '/feed') {
        player.foodLevel = 20
        player.saturation = 20
        player.tell('§a§l🍖 Fome restaurada!')
        event.cancel()
    }

    if (msg === '/fly') {
        let abilities = player.abilities
        abilities.allowFlying = !abilities.allowFlying
        abilities.flying = abilities.allowFlying
        player.sendAbilitiesUpdate()
        player.tell('§a✈ Fly ' + (abilities.allowFlying ? '§lON' : '§cOFF'))
        event.cancel()
    }

    if (msg === '/god') {
        player.invulnerable = !player.invulnerable
        player.tell('§a🛡 God ' + (player.invulnerable ? '§lON' : '§cOFF'))
        event.cancel()
    }

    if (msg === '/godgear') {
        player.give(Item.of('netherite_sword').enchant('minecraft:sharpness', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('netherite_pickaxe').enchant('minecraft:efficiency', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('netherite_helmet').enchant('minecraft:protection', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('netherite_chestplate').enchant('minecraft:protection', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('netherite_leggings').enchant('minecraft:protection', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('netherite_boots').enchant('minecraft:protection', 5).enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('shield').enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('elytra').enchant('minecraft:unbreaking', 5).enchant('minecraft:mending', 1))
        player.give(Item.of('totem_of_undying'))
        player.give(Item.of('enchanted_golden_apple').count(64))
        player.tell('§6§l⚔ GOD GEAR COMPLETO!')
        event.cancel()
    }

    if (msg === '/giveall') {
        player.give(Item.of('netherite_sword').enchant('minecraft:sharpness', 5))
        player.give(Item.of('netherite_pickaxe').enchant('minecraft:efficiency', 5))
        player.give(Item.of('netherite_axe').enchant('minecraft:efficiency', 5))
        player.give(Item.of('netherite_shovel').enchant('minecraft:efficiency', 5))
        player.give(Item.of('netherite_helmet').enchant('minecraft:protection', 5))
        player.give(Item.of('netherite_chestplate').enchant('minecraft:protection', 5))
        player.give(Item.of('netherite_leggings').enchant('minecraft:protection', 5))
        player.give(Item.of('netherite_boots').enchant('minecraft:protection', 5))
        player.give(Item.of('shield'))
        player.give(Item.of('elytra'))
        player.give(Item.of('totem_of_undying'))
        player.give(Item.of('diamond_block').count(64))
        player.give(Item.of('emerald_block').count(64))
        player.give(Item.of('netherite_block').count(64))
        player.give(Item.of('enchanted_golden_apple').count(64))
        player.give(Item.of('experience_bottle').count(64))
        player.give(Item.of('ender_pearl').count(16))
        player.tell('§6§l🎒 Pack completo!')
        event.cancel()
    }

    if (msg.startsWith('/speed ')) {
        let speed = parseFloat(msg.split(' ')[1]) || 2
        server.runCommand('effect give ' + player.username + ' minecraft:speed 999999 ' + (speed - 1) + ' true')
        player.tell('§a🏃 Speed: ' + speed + 'x')
        event.cancel()
    }

    if (msg.startsWith('/jump ')) {
        let lvl = parseInt(msg.split(' ')[1]) || 5
        server.runCommand('effect give ' + player.username + ' minecraft:jump_boost 999999 ' + (lvl - 1) + ' true')
        player.tell('§a🦘 Jump: ' + lvl + 'x')
        event.cancel()
    }

    if (msg === '/invis') {
        server.runCommand('effect give ' + player.username + ' minecraft:invisibility 999999 0 true')
        player.tell('§a👻 Invisível!')
        event.cancel()
    }

    if (msg === '/nv') {
        server.runCommand('effect give ' + player.username + ' minecraft:night_vision 999999 0 true')
        player.tell('§e👁 Visão Noturna!')
        event.cancel()
    }

    if (msg === '/fire') {
        server.runCommand('effect give ' + player.username + ' minecraft:fire_resistance 999999 0 true')
        player.tell('§6🔥 Resistência ao Fogo!')
        event.cancel()
    }

    if (msg === '/strength') {
        server.runCommand('effect give ' + player.username + ' minecraft:strength 999999 2 true')
        player.tell('§c💪 Força!')
        event.cancel()
    }

    if (msg === '/regen') {
        server.runCommand('effect give ' + player.username + ' minecraft:regeneration 999999 2 true')
        player.tell('§a💚 Regeneração!')
        event.cancel()
    }

    if (msg === '/haste') {
        server.runCommand('effect give ' + player.username + ' minecraft:haste 999999 2 true')
        player.tell('§6⛏ Haste!')
        event.cancel()
    }

    if (msg === '/cleareffects') {
        server.runCommand('effect clear ' + player.username)
        player.tell('§c🗑 Efeitos removidos!')
        event.cancel()
    }

    // ==========================================
    // TELEPORT COMMANDS
    // ==========================================
    if (msg === '/spawn') {
        let spawn = player.level.getSpawnPos()
        player.setPosition(spawn.x, spawn.y, spawn.z)
        player.tell('§a🏠 Spawn!')
        event.cancel()
    }

    if (msg === '/top') {
        let pos = player.blockPosition()
        let topY = player.level.getHeight(pos.x, pos.z)
        player.setPosition(pos.x, topY + 1, pos.z)
        player.tell('§a⬆ Topo!')
        event.cancel()
    }

    if (msg === '/tpall') {
        let pos = player.position()
        server.playerList.players.forEach(p => {
            p.setPosition(pos.x, pos.y, pos.z)
        })
        player.tell('§a👥 Todos teleportados!')
        event.cancel()
    }

    if (msg === '/plist') {
        player.tell('§6§l═══ JOGADORES ═══')
        server.playerList.players.forEach(p => {
            player.tell('§a' + p.username + ' §7- HP:' + Math.round(p.health))
        })
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    // ==========================================
    // WORLD COMMANDS
    // ==========================================
    if (msg === '/time day') {
        player.level.setDayTime(1000)
        player.tell('§e☀ Dia!')
        event.cancel()
    }

    if (msg === '/time night') {
        player.level.setDayTime(13000)
        player.tell('§9🌙 Noite!')
        event.cancel()
    }

    if (msg === '/weather clear') {
        server.runCommand('weather clear')
        player.tell('§e☀ Clima limpo!')
        event.cancel()
    }

    if (msg === '/weather rain') {
        server.runCommand('weather rain')
        player.tell('§9🌧 Chuva!')
        event.cancel()
    }

    if (msg === '/weather thunder') {
        server.runCommand('weather thunder')
        player.tell('§4⛈ Trovoada!')
        event.cancel()
    }

    if (msg === '/peaceful') {
        server.runCommand('difficulty peaceful')
        player.tell('§a☮ Pacífico!')
        event.cancel()
    }

    if (msg.startsWith('/difficulty ')) {
        let diff = msg.split(' ')[1]
        server.runCommand('difficulty ' + diff)
        player.tell('§a⚔ Dificuldade: ' + diff)
        event.cancel()
    }

    if (msg.startsWith('/tickwarp ')) {
        let ticks = parseInt(msg.split(' ')[1]) || 1000
        player.level.setDayTime(player.level.getDayTime() + ticks)
        player.tell('§e⏰ +' + ticks + ' ticks!')
        event.cancel()
    }

    // ==========================================
    // ENTITY COMMANDS
    // ==========================================
    if (msg === '/killall') {
        let count = 0
        player.level.getEntities().forEach(entity => {
            if (!entity.isPlayer()) {
                entity.kill()
                count++
            }
        })
        player.tell('§c☠ ' + count + ' eliminadas!')
        event.cancel()
    }

    if (msg === '/killhostile') {
        let count = 0
        player.level.getEntities().forEach(entity => {
            if (!entity.isPlayer() && entity.type && entity.type.category === 'monster') {
                entity.kill()
                count++
            }
        })
        player.tell('§c☠ ' + count + ' hostis!')
        event.cancel()
    }

    // ==========================================
    // ITEM COMMANDS
    // ==========================================
    if (msg.startsWith('/give ')) {
        let args = msg.split(' ')
        let itemId = args[1] || 'minecraft:diamond'
        let amount = parseInt(args[2]) || 1
        player.give(Item.of(itemId, amount))
        player.tell('§a📦 +' + amount + 'x ' + itemId)
        event.cancel()
    }

    if (msg.startsWith('/enchant ')) {
        let args = msg.split(' ')
        let ench = args[1] || 'minecraft:sharpness'
        let lvl = parseInt(args[2]) || 5
        let mainhand = player.getMainHandItem()
        if (!mainhand.isEmpty()) {
            mainhand.enchant(ench, lvl)
            player.tell('§a✨ ' + ench + ' ' + lvl)
        } else {
            player.tell('§cSegure um item!')
        }
        event.cancel()
    }

    if (msg === '/repair') {
        player.inventory.items.forEach(item => {
            if (item.isDamageableItem()) {
                item.damageValue = 0
            }
        })
        player.tell('§a🔧 Reparado!')
        event.cancel()
    }

    if (msg === '/clearinv') {
        player.inventory.clearAll()
        player.tell('§a🗑 Inventário limpo!')
        event.cancel()
    }

    // ==========================================
    // GAMEMODE COMMANDS
    // ==========================================
    if (msg === '/creative') {
        server.runCommand('gamemode creative ' + player.username)
        player.tell('§a🔨 Criativo!')
        event.cancel()
    }

    if (msg === '/survival') {
        server.runCommand('gamemode survival ' + player.username)
        player.tell('§a❤ Sobrevivência!')
        event.cancel()
    }

    if (msg === '/spectate') {
        server.runCommand('gamemode spectator ' + player.username)
        player.tell('§a👁 Espectador!')
        event.cancel()
    }

    if (msg === '/adventure') {
        server.runCommand('gamemode adventure ' + player.username)
        player.tell('§a⚔ Aventura!')
        event.cancel()
    }

    // ==========================================
    // MOD CONTROLLER
    // ==========================================
    if (msg === '/mods' || msg === '/modctrl') {
        player.tell('§e§l╔══════════════════════════════╗')
        player.tell('§e§l║    §6§lMOD CONTROLLER §e§l         ║')
        player.tell('§e§l╠══════════════════════════════╣')
        player.tell('§e1 §7- §fPerformance')
        player.tell('§e2 §7- §fGameplay')
        player.tell('§e3 §7- §fWorld')
        player.tell('§e4 §7- §fVisual')
        player.tell('§e5 §7- §fUtility')
        player.tell('§e6 §7- §fCombat')
        player.tell('§e7 §7- §fStorage')
        player.tell('§e8 §7- §fWorldgen')
        player.tell('§e§l╚══════════════════════════════╝')
        player.tell('§eUse: /mods <número>')
        event.cancel()
    }

    if (msg === '/mods 1') {
        player.tell('§6§l═══ PERFORMANCE ═══')
        player.tell('§a/fps status §7- FPS')
        player.tell('§a/fps particles §7- Particles')
        player.tell('§a/mod ferrite §7- FerriteCore')
        player.tell('§a/mod embeddium §7- Embeddium')
        player.tell('§a/mod modernfix §7- ModernFix')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mods 2') {
        player.tell('§6§l═══ GAMEPLAY ═══')
        player.tell('§a/mod create §7- Create')
        player.tell('§a/mod quark §7- Quark')
        player.tell('§a/mod waystones §7- Waystones')
        player.tell('§a/mod curios §7- Curios')
        player.tell('§a/ftb §7- FTB')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mod create') {
        player.tell('§6§l═══ CREATE ═══')
        player.tell('§a/create stress §7- Ver estresse')
        player.tell('§a/create speed <val> §7- Speed')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/mod quark') {
        player.tell('§6§l═══ QUARK ═══')
        player.tell('§a/quark bag §7- Backpack')
        player.tell('§a/quark crate §7- Crate')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/quark bag') {
        player.give(Item.of('quark:backpack'))
        player.tell('§a🎒 Backpack!')
        event.cancel()
    }

    if (msg === '/quark crate') {
        player.give(Item.of('quark:crate'))
        player.tell('§a📦 Crate!')
        event.cancel()
    }

    if (msg === '/mod storage') {
        player.tell('§6§l═══ STORAGE ═══')
        player.tell('§a/storage iron §7- Iron Chest')
        player.tell('§a/storage backpack §7- Backpack')
        player.tell('§a/storage shulker §7- Shulker')
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

    if (msg === '/mod combat') {
        player.tell('§6§l═══ COMBAT ═══')
        player.tell('§a/combat better §7- Better Combat')
        player.tell('§a/combat weapons §7- Weapons')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/modlist') {
        player.tell('§6§l═══ MODS PRINCIPAIS ═══')
        player.tell('§a⚙ Create §7- Máquinas')
        player.tell('§a🐾 Alex\'s Mobs §7- Mobs')
        player.tell('§a📦 Quark §7- Vanilla+')
        player.tell('§a📍 Waystones §7- Teleporte')
        player.tell('§a🎮 FTB §7- Missões')
        player.tell('§a💍 Curios §7- Accessories')
        player.tell('§a⚔ Better Combat §7- Combat')
        player.tell('§a🏰 Dungeons Arise §7- Estruturas')
        player.tell('§a🌙 Twilight Forest §7- Dimensão')
        player.tell('§a🔫 ScorchedGuns §7- Armas')
        player.tell('§a📦 Iron Chest §7- Baús')
        player.tell('§6§l════════════════════════')
        event.cancel()
    }

    if (msg === '/admin help') {
        player.tell('§6§l╔══════════════════════════════╗')
        player.tell('§6§l║    §e§lADMIN HELP §6§l            ║')
        player.tell('§6§l╠══════════════════════════════╣')
        player.tell('§e/panel §7- Abrir painel')
        player.tell('§e/heal §7- Curar')
        player.tell('§e/feed §7- Comer')
        player.tell('§e/fly §7- Voar')
        player.tell('§e/god §7- God mode')
        player.tell('§e/godgear §7- Gear god')
        player.tell('§e/giveall §7- Items')
        player.tell('§e/speed <val> §7- Velocidade')
        player.tell('§e/tp <x> <y> <z> §7- Teleporte')
        player.tell('§e/killall §7- Matar entidades')
        player.tell('§e/mods §7- Mod Controller')
        player.tell('§e/modlist §7- Lista mods')
        player.tell('§6§l╚══════════════════════════════╝')
        event.cancel()
    }
})
