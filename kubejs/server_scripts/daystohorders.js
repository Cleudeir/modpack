// ================================================================
//  DAYS TO HOORDERS - Hordas de zombies que escalam com os dias
//  Inspirado em "This War of Mine" / "7 Days to Die"
//
//  CONFIG: kubejs/config/daystohorders.json
//  COMANDOS: /kubejs custom_command hordestatus
//            /kubejs custom_command hordeskip
//
//  NOTAS: var (nunca const/let), overworld() (nao getLevel),
//         UtilsJS.getPath() (nao Path.resolve)
// ================================================================

var $Zombie         = Java.loadClass('net.minecraft.world.entity.monster.Zombie');
var $Vindicator     = Java.loadClass('net.minecraft.world.entity.monster.Vindicator');
var $Husk           = Java.loadClass('net.minecraft.world.entity.monster.Husk');
var $Drowned        = Java.loadClass('net.minecraft.world.entity.monster.Drowned');
var $EntityType     = Java.loadClass('net.minecraft.world.entity.EntityType');
var $ItemStack      = Java.loadClass('net.minecraft.world.item.ItemStack');
var $Items          = Java.loadClass('net.minecraft.world.item.Items');
var $EquipmentSlot  = Java.loadClass('net.minecraft.world.entity.EquipmentSlot');
var $HeightmapTypes = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types');
var $Component      = Java.loadClass('net.minecraft.network.chat.Component');
var $UtilsJS        = Java.loadClass('dev.latvian.mods.kubejs.util.UtilsJS');
var $JsonIO         = Java.loadClass('dev.latvian.mods.kubejs.util.JsonIO');

var CONFIG_PATH = $UtilsJS.getPath('kubejs/config/daystohorders.json');

var config = {
    intervalDays: 3,
    baseSize: 5,
    maxSize: 30,
    warningMinutes: 1,
    radius: 20,
    debug: false
};

function loadConfig() {
    try {
        var cfgJson = $JsonIO.readJson(CONFIG_PATH);
        if (cfgJson != null && cfgJson.isJsonObject()) {
            var obj = cfgJson.getAsJsonObject();
            if (obj.has('intervalDays'))   config.intervalDays   = obj.get('intervalDays').getAsInt();
            if (obj.has('baseSize'))       config.baseSize       = obj.get('baseSize').getAsInt();
            if (obj.has('maxSize'))        config.maxSize        = obj.get('maxSize').getAsInt();
            if (obj.has('warningMinutes')) config.warningMinutes = obj.get('warningMinutes').getAsInt();
            if (obj.has('radius'))         config.radius         = obj.get('radius').getAsInt();
            if (obj.has('debug'))          config.debug          = obj.get('debug').getAsBoolean();
        }
        config.intervalDays = Math.max(1, config.intervalDays);
        config.baseSize = Math.max(1, Math.min(100, config.baseSize));
        config.maxSize = Math.max(config.baseSize, Math.min(200, config.maxSize));
        log('Config: interval=' + config.intervalDays + ' base=' + config.baseSize
            + ' max=' + config.maxSize + ' warn=' + config.warningMinutes
            + ' radius=' + config.radius + ' debug=' + config.debug);
    } catch (e) {
        log('ERRO lendo config: ' + e);
    }
}

var lastHordeDay = -1;
var warningSent  = false;
var hordeActive  = false;

function log(msg) { console.log('[DaysToHoarders] ' + msg); }
function logDebug(msg) { if (config.debug) log('[DEBUG] ' + msg); }

function getDayNumber(rawLevel) {
    return Math.floor(rawLevel.getDayTime() / 24000);
}

function isNight(rawLevel) {
    var time = rawLevel.getDayTime() % 24000;
    return time >= 13000 && time < 23000;
}

function getTimeOfDay(rawLevel) {
    return rawLevel.getDayTime() % 24000;
}

function getHordeSize(dayNumber) {
    return Math.min(config.baseSize + Math.floor(dayNumber / 2), config.maxSize);
}

function hasArmor(d)  { return d >= 5; }
function hasSword(d)  { return d >= 10; }
function isHard(d)    { return d >= 15; }

function getHordeName(d) {
    if (d >= 30) return '\u00a74\u00a7lHorda Infernal';
    if (d >= 20) return '\u00a7c\u00a7lHorda Brutal';
    if (d >= 10) return '\u00a76\u00a7lHorda Perigosa';
    if (d >= 5)  return '\u00a7e\u00a7lHorda Hostil';
    return '\u00a7a\u00a7lHorda Fraca';
}

function createZombie(rawLevel, x, y, z, dayNumber, rng) {
    var zombie;
    if (isHard(dayNumber) && rng.nextFloat() < 0.2) {
        zombie = new $Vindicator($EntityType.VINDICATOR, rawLevel);
    } else if (rng.nextFloat() < 0.15) {
        zombie = new $Husk($EntityType.HUSK, rawLevel);
    } else if (rng.nextFloat() < 0.1) {
        zombie = new $Drowned($EntityType.DROWNED, rawLevel);
    } else {
        zombie = new $Zombie($EntityType.ZOMBIE, rawLevel);
    }
    zombie.setPos(x, y, z);

    if (hasArmor(dayNumber)) {
        var chance = Math.min(0.8, 0.3 + dayNumber * 0.02);
        if (rng.nextFloat() < chance) {
            if (dayNumber >= 25 && rng.nextFloat() < 0.3) {
                zombie.setItemSlot($EquipmentSlot.HEAD, new $ItemStack($Items.DIAMOND_HELMET));
                zombie.setItemSlot($EquipmentSlot.CHEST, new $ItemStack($Items.DIAMOND_CHESTPLATE));
                zombie.setItemSlot($EquipmentSlot.LEGS, new $ItemStack($Items.DIAMOND_LEGGINGS));
                zombie.setItemSlot($EquipmentSlot.FEET, new $ItemStack($Items.DIAMOND_BOOTS));
            } else if (dayNumber >= 15 && rng.nextFloat() < 0.5) {
                zombie.setItemSlot($EquipmentSlot.HEAD, new $ItemStack($Items.IRON_HELMET));
                zombie.setItemSlot($EquipmentSlot.CHEST, new $ItemStack($Items.IRON_CHESTPLATE));
                zombie.setItemSlot($EquipmentSlot.LEGS, new $ItemStack($Items.IRON_LEGGINGS));
                zombie.setItemSlot($EquipmentSlot.FEET, new $ItemStack($Items.IRON_BOOTS));
            } else {
                zombie.setItemSlot($EquipmentSlot.HEAD, new $ItemStack($Items.LEATHER_HELMET));
                zombie.setItemSlot($EquipmentSlot.CHEST, new $ItemStack($Items.LEATHER_CHESTPLATE));
                zombie.setItemSlot($EquipmentSlot.LEGS, new $ItemStack($Items.LEATHER_LEGGINGS));
                zombie.setItemSlot($EquipmentSlot.FEET, new $ItemStack($Items.LEATHER_BOOTS));
            }
        }
    }

    if (hasSword(dayNumber) && rng.nextFloat() < 0.6) {
        if (dayNumber >= 25 && rng.nextFloat() < 0.3) {
            zombie.setItemSlot($EquipmentSlot.MAINHAND, new $ItemStack($Items.DIAMOND_SWORD));
        } else if (dayNumber >= 15 && rng.nextFloat() < 0.5) {
            zombie.setItemSlot($EquipmentSlot.MAINHAND, new $ItemStack($Items.IRON_SWORD));
        } else {
            zombie.setItemSlot($EquipmentSlot.MAINHAND, new $ItemStack($Items.STONE_SWORD));
        }
    }

    zombie.setCustomName($Component.literal(getHordeName(dayNumber)));
    zombie.setCustomNameVisible(true);
    return zombie;
}

function spawnHorde(rawLevel, players, dayNumber) {
    var hordeSize = getHordeSize(dayNumber);
    var rng = rawLevel.getRandom();
    var spawned = 0;
    log('=== HORDA DIA ' + dayNumber + ' === ' + hordeSize + ' zombies');

    for (var p = 0; p < players.size(); p++) {
        var player = players.get(p);
        if (player.isCreative() || player.isSpectator()) continue;
        var px = player.getX();
        var pz = player.getZ();
        var perPlayer = Math.ceil(hordeSize / players.size());

        for (var i = 0; i < perPlayer && spawned < hordeSize; i++) {
            var angle = (2 * Math.PI * i) / perPlayer + (rng.nextFloat() * 0.5);
            var dist = 15 + rng.nextFloat() * config.radius;
            var sx = px + Math.cos(angle) * dist;
            var sz = pz + Math.sin(angle) * dist;
            var sy = rawLevel.getHeight(
                $HeightmapTypes.MOTION_BLOCKING_NO_LEAVES,
                Math.floor(sx), Math.floor(sz)
            );
            var zombie = createZombie(rawLevel, sx, sy + 1, sz, dayNumber, rng);
            rawLevel.addFreshEntity(zombie);
            spawned++;
        }
    }
    log('Horda invocada: ' + spawned + ' zombies');
    return spawned;
}

loadConfig();

ServerEvents.loaded(function (event) {
    try {
        var rawLevel = event.server.overworld();
        if (!rawLevel) return;
        lastHordeDay = getDayNumber(rawLevel);
        warningSent = false;
        hordeActive = false;
        log('Servidor iniciado. Dia: ' + lastHordeDay);
    } catch (e) {
        log('ERRO em loaded: ' + e);
    }
});

ServerEvents.tick(function (event) {
    try {
        var rawLevel = event.server.overworld();
        if (!rawLevel) return;

        var dayNumber = getDayNumber(rawLevel);
        var isNt = isNight(rawLevel);
        var time = getTimeOfDay(rawLevel);
        var nextHordeDay = lastHordeDay + config.intervalDays;

        // Aviso
        var warnTicks = config.warningMinutes * 20 * 60;
        if (isNt && dayNumber >= nextHordeDay && !warningSent
            && time >= 13000 && time < 13000 + warnTicks) {
            warningSent = true;
            var players = rawLevel.players();
            for (var i = 0; i < players.size(); i++) {
                players.get(i).tell(
                    '\u00a7c\u00a7l\u26a0 AVISO: \u00a7eHorda de zombies se aproxima!'
                    + ' \u00a7cDia ' + dayNumber
                    + ' | \u00a74' + getHordeName(dayNumber)
                    + '\u00a7c | \u00a77' + getHordeSize(dayNumber) + ' zombies'
                );
            }
            log('Aviso enviado.');
        }

        // Horda: cedo da noite (13500-14500)
        if (isNt && dayNumber >= nextHordeDay && time >= 13500 && time <= 14500 && !hordeActive) {
            hordeActive = true;
            lastHordeDay = dayNumber;
            warningSent = false;
            var players = rawLevel.players();
            if (players.size() > 0) {
                spawnHorde(rawLevel, players, dayNumber);
            } else {
                log('Nenhum jogador online, horda cancelada.');
            }
        }

        // Reseta ao amanhecer
        if (!isNt && hordeActive) {
            hordeActive = false;
            warningSent = false;
        }
    } catch (e) {
        log('ERRO em tick: ' + e);
    }
});

ServerEvents.customCommand('hordestatus', function (event) {
    try {
        var rawLevel = event.server.overworld();
        var day = rawLevel ? getDayNumber(rawLevel) : 0;
        var next = lastHordeDay + config.intervalDays;
        var msg = '[DaysToHoarders] dia=' + day
            + ' ultimo_horde=' + lastHordeDay
            + ' proxima=dia_' + next
            + ' tamanho=' + getHordeSize(day)
            + ' armor=' + hasArmor(day)
            + ' sword=' + hasSword(day)
            + ' hard=' + isHard(day);
        if (event.player) { event.player.tell(msg); } else { log(msg); }
    } catch (e) {
        log('ERRO em command: ' + e);
    }
});

ServerEvents.customCommand('hordeforce', function (event) {
    try {
        var rawLevel = event.server.overworld();
        if (!rawLevel) { log('Nivel nao encontrado.'); return; }
        var day = getDayNumber(rawLevel);
        var players = rawLevel.players();
        if (players.size() === 0) { log('Nenhum jogador online.'); return; }
        hordeActive = true;
        lastHordeDay = day;
        warningSent = false;
        spawnHorde(rawLevel, players, day);
        var msg = '[DaysToHoarders] HORDA FORCADA no dia ' + day + '!';
        if (event.player) { event.player.tell(msg); } else { log(msg); }
    } catch (e) {
        log('ERRO em command force: ' + e);
    }
});

ServerEvents.customCommand('hordeskip', function (event) {
    try {
        var rawLevel = event.server.overworld();
        if (rawLevel) { lastHordeDay = getDayNumber(rawLevel); }
        warningSent = false;
        hordeActive = false;
        var msg = '[DaysToHoarders] Proxima horda pulada.';
        if (event.player) { event.player.tell(msg); } else { log(msg); }
    } catch (e) {
        log('ERRO em command skip: ' + e);
    }
});
