// ================================================================
//  AVATAR BLOCK RESTORATION — réplica em KubeJS (1.20.1/Forge)
//  Replica fiel do mod "avatar-blockrestoration" (Cleudeir)
//
//  COMO FUNCIONA:
//  - Ao COLOCAR o bloco principal (default minecraft:black_banner),
//    tira um snapshot cúbico (±raio) dos blocos ao redor e marca o
//    perímetro (bordas do quadrado) na altura do terreno +2.
//  - A cada 15s: bloco do snapshot que virou AR (creeper/TNT/enderman)
//    → entra na fila de restauração guardando o estado ORIGINAL.
//  - A cada 1s, SÓ DURANTE O DIA: restaura 1 bloco da fila por vez,
//    apenas se nenhuma entidade estiver ocupando a área do bloco.
//  - A cada 4s: partículas (happy_villager nos quebrados,
//    falling_obsidian_tear no perímetro).
//  - Quebra/colocação POR JOGADOR dentro da área → o bloco NÃO é
//    restaurado (fica sob controle do jogador).
//  - Se o bloco principal for quebrado → a zona é cancelada.
//  - Estado persistido em kubejs/config/blockrestoration.dat (NBTIO).
//  - Ao ENTRAR no servidor, cada jogador recebe 1x a bandeira (bloco
//    principal) para ativar sua própria área de restauração.
//  - Ao INICIAR o servidor, o bloco principal é colocado no SPAWN do
//    mundo (se ainda não estiver lá), ativando a zona no spawn.
//
//  CONFIG: kubejs/config/blockrestoration.json
//    { "mainBlock": "mod:id_do_bloco", "radius": 20, "debug": true }
//
//  DEBUG: /kubejs custom_command blockrestore_status
//         /kubejs custom_command blockrestore_debug   (liga/desliga debug ao vivo)
//
//  MODO DEBUG (config "debug": true) — para TESTES ISOLADOS mais rápidos:
//   - Ignora a regra de "só restaura de dia";
//   - Restaura até 30 blocos por passada (normal: 1);
//   - Tick acelerado (2/10/40/100 em vez de 20/80/300/600);
//   - Logs detalhados [DEBUG] de cada ação;
//   - No carregamento, verifica que o mod original NÃO está instalado
//     (isolamento: apenas o KubeJS executa a restauração).
//
//  NOTAS TÉCNICAS (Rhino/KubeJS 1.20.1):
//  - NUNCA usar const/let no topo nem dentro de funções: o Rhino reavalia
//    o script no mesmo contexto ao entrar no mundo e lança
//    "redeclaration of var X". Sempre usar VAR.
//  - java.nio.file.Path/Paths/Files SÃO BLOQUEADOS pelo ClassFilter do KubeJS.
//  - Path.resolve("string") eh ambiguo no Rhino => usar UtilsJS.getPath().
//  - event.server.getLevel(ResourceKey) eh ambiguo no Rhino =>
//    usar event.server.overworld() (sem argumentos, sem sobrecarga).
// ================================================================

var $KubeJSPaths = Java.loadClass('dev.latvian.mods.kubejs.KubeJSPaths');
var $UtilsJS     = Java.loadClass('dev.latvian.mods.kubejs.util.UtilsJS');
var CONFIG_PATH  = $UtilsJS.getPath('kubejs/config/blockrestoration.json'); // kubejs/config/
var SAVE_PATH    = $UtilsJS.getPath('kubejs/config/blockrestoration.dat');

var $JsonIO      = Java.loadClass('dev.latvian.mods.kubejs.util.JsonIO');
var $NBTIO       = Java.loadClass('dev.latvian.mods.kubejs.util.NBTIOWrapper');
var $HeightmapTypes = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap$Types');
var $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
var $BlockPos    = Java.loadClass('net.minecraft.core.BlockPos');
var $BlockStateParser = Java.loadClass('net.minecraft.commands.arguments.blocks.BlockStateParser');
var $CollisionContext = Java.loadClass('net.minecraft.world.phys.shapes.CollisionContext');
var $Blocks     = Java.loadClass('net.minecraft.world.level.block.Blocks');
var $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes');
var $Registries = Java.loadClass('net.minecraft.core.registries.Registries');
var $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
var $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
var $Entity     = Java.loadClass('net.minecraft.world.entity.Entity');
var $Level      = Java.loadClass('net.minecraft.world.level.Level');

// ------------------------------------------------------------------
// CONFIG (lida do arquivo kubejs/config/blockrestoration.json)
// ------------------------------------------------------------------
var config = {
    mainBlock: 'minecraft:black_banner',
    radius: 20,
    debug: false
};

function loadConfig() {
    try {
        var cfgJson = $JsonIO.readJson(CONFIG_PATH); // JsonElement ou null
        if (cfgJson != null && cfgJson.isJsonObject()) {
            var cfgObj = cfgJson.getAsJsonObject();
            if (cfgObj.has('mainBlock')) config.mainBlock = cfgObj.get('mainBlock').getAsString();
            if (cfgObj.has('radius'))    config.radius    = cfgObj.get('radius').getAsInt();
            if (cfgObj.has('debug'))     config.debug     = cfgObj.get('debug').getAsBoolean();
        }
        config.radius = Math.max(1, Math.min(100, config.radius));
        console.log('[blockrestoration] Config: mainBlock=' + config.mainBlock + ' radius=' + config.radius + ' debug=' + config.debug);
    } catch (e) {
        console.log('[blockrestoration] ERRO lendo config, usando padrões: ' + e);
    }
}

// ------------------------------------------------------------------
// ESTADO EM MEMÓRIA
//   mainBlockPos      : BlockPos (ou null se nenhuma zona ativa)
//   aroundBlocks      : Map "x,y,z" -> {stateString}
//   brokenBlocks      : Map "x,y,z" -> {stateString}
//   perimeterBlocks   : Map "x,y,z" -> {stateString}
// ------------------------------------------------------------------
var state = {
    mainBlockPos: null,
    aroundBlocks: new Map(),
    brokenBlocks: new Map(),
    perimeterBlocks: new Map()
};

// ------------------------------------------------------------------
// UTILITÁRIOS
// ------------------------------------------------------------------
function log(msg) {
    console.log('[blockrestoration] ' + msg);
}

// Log apenas quando o modo DEBUG está ativo
function logDebug(msg) {
    if (config.debug) log('[DEBUG] ' + msg);
}

// Isolamento: garante que NENHUM outro mod executa a mesma lógica.
// Se o mod original estiver instalado, avisa para remover o .jar.
function checkIsolation() {
    try {
        var $Platform = Java.loadClass('dev.architectury.platform.Platform');
        if ($Platform.isModLoaded('avatar_blockrestoration')) {
            log('ATENÇÃO: o mod avatar_blockrestoration está INSTALADO!');
            log('Remova o .jar de mods/ para o teste isolado funcionar (só KubeJS).');
        } else {
            log('Isolamento OK: mod original NÃO instalado — só o KubeJS executa a restauração.');
        }
    } catch (e) {
        logDebug('Aviso: não foi possível verificar isolamento: ' + e);
    }
}

function keyOf(pos) {
    return pos.getX() + ',' + pos.getY() + ',' + pos.getZ();
}

function posFromKey(k) {
    var p = String(k).split(',');
    return new $BlockPos(parseInt(p[0]), parseInt(p[1]), parseInt(p[2]));
}

// BlockState -> string serializável "mod:id[prop=val,...]"
function stateStr(state) {
    try {
        return $BlockStateParser.serialize(state);
    } catch (e) {
        try {
            return $ForgeRegistries.BLOCKS.getKey(state.getBlock()).toString();
        } catch (e2) {
            return 'minecraft:air';
        }
    }
}

// string serializada -> BlockState (restauração fiel de propriedades)
function parseState(rawLevel, str) {
    try {
        var lookup = rawLevel.registryAccess().lookupOrThrow($Registries.BLOCK);
        return $BlockStateParser.parseForBlock(lookup, String(str), false).blockState();
    } catch (e) {
        // fallback: tenta só o id do bloco -> estado padrão
        try {
            var id = String(str).split('[')[0];
            var block = $ForgeRegistries.BLOCKS.getValue($ResourceLocation.tryParse(id));
            return block != null ? block.defaultBlockState() : null;
        } catch (e2) {
            return null;
        }
    }
}

// O bloco tal está dentro do volume cúbico (±raio) do bloco principal?
function inVolume(pos) {
    if (!state.mainBlockPos) return false;
    var r = config.radius;
    var a = state.mainBlockPos;
    return Math.abs(pos.getX() - a.getX()) <= r
        && Math.abs(pos.getY() - a.getY()) <= r
        && Math.abs(pos.getZ() - a.getZ()) <= r;
}

// ------------------------------------------------------------------
// PERSISTÊNCIA (NBTIO)
// ------------------------------------------------------------------
function putMap(parentTag, name, map) {
    var inner = new $CompoundTag();
    map.forEach(function (value, k) { inner.putString(k, value.stateString); });
    parentTag.put(name, inner);
}

function readMap(parentTag, name, target) {
    var keys = parentTag.getCompound(name).getAllKeys().toArray();
    var inner = parentTag.getCompound(name);
    for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        target.set(k, { stateString: inner.getString(k) });
    }
}

function saveState() {
    try {
        // SAVE_PATH fica dentro de KubeJSPaths.CONFIG, que já existe
        var stateTag = new $CompoundTag();
        stateTag.putString('mainBlockPos', state.mainBlockPos ? keyOf(state.mainBlockPos) : '');
        putMap(stateTag, 'aroundBlocks', state.aroundBlocks);
        putMap(stateTag, 'brokenBlocks', state.brokenBlocks);
        putMap(stateTag, 'perimeterBlocks', state.perimeterBlocks);
        $NBTIO.write(SAVE_PATH, stateTag);
        log('Estado salvo.');
    } catch (e) {
        log('ERRO ao salvar estado: ' + e);
    }
}

function loadState() {
    try {
        var loadedTag = $NBTIO.read(SAVE_PATH); // null se não existir
        if (loadedTag == null) {
            log('Sem arquivo de estado salvo (primeira vez).');
            return;
        }
        var posStr = loadedTag.getString('mainBlockPos');
        state.mainBlockPos = (posStr && posStr.length > 0) ? posFromKey(posStr) : null;
        readMap(loadedTag, 'aroundBlocks', state.aroundBlocks);
        readMap(loadedTag, 'brokenBlocks', state.brokenBlocks);
        readMap(loadedTag, 'perimeterBlocks', state.perimeterBlocks);
        log('Estado carregado: main=' + (state.mainBlockPos ? keyOf(state.mainBlockPos) : 'nenhum')
            + ' around=' + state.aroundBlocks.size
            + ' broken=' + state.brokenBlocks.size
            + ' perimeter=' + state.perimeterBlocks.size);
    } catch (e) {
        log('ERRO ao carregar estado: ' + e);
    }
}

// ------------------------------------------------------------------
// LÓGICA (réplica dos métodos do mod original)
// ------------------------------------------------------------------

// Snapshot cúbico ±raio ao redor do bloco principal
function setBlockStatesAroundMainBlock(rawLevel, center) {
    var r = config.radius;
    for (var x = -r; x <= r; x++) {
        for (var y = -r; y <= r; y++) {
            for (var z = -r; z <= r; z++) {
                var pos = center.offset(x, y, z);
                var s = rawLevel.getBlockState(pos);
                var key = keyOf(pos);
                if (!s.isAir() && !s.is($Blocks.FIRE) && !isExcludedBlock(stateStr(s)) && !state.aroundBlocks.has(key)) {
                    state.aroundBlocks.set(key, { stateString: stateStr(s) });
                }
            }
        }
    }
    log('Zona escaneada: around=' + state.aroundBlocks.size
        + ' perimeter=' + state.perimeterBlocks.size);
}

// Perímetro: as 4 bordas do quadrado (±raio) na altura do terreno +2
function getPerimeterBlocks(rawLevel, center) {
    var r = config.radius;
    var h = $HeightmapTypes.MOTION_BLOCKING_NO_LEAVES;
    function put(x, z) {
        var y = rawLevel.getHeight(h, x, z) + 2;
        var pos = new $BlockPos(x, y, z);
        state.perimeterBlocks.set(keyOf(pos), { stateString: stateStr(rawLevel.getBlockState(pos)) });
    }
    for (var i = -r; i <= r; i++) {
        put(center.getX() + i, center.getZ() + r);
        put(center.getX() + i, center.getZ() - r);
    }
    for (var j = -r; j <= r; j++) {
        put(center.getX() + r, center.getZ() + j);
        put(center.getX() - r, center.getZ() + j);
    }
}

// Colocou o bloco principal: destrói a zona antiga e escaneia a nova
function removeBlockAroundMainBlock(rawLevel, newMainPos) {
    if (state.mainBlockPos) {
        var old = state.mainBlockPos;
        if (!old.equals(newMainPos)) {
            rawLevel.destroyBlock(old, true); // dropa o bloco principal antigo
        }
    }
    state.aroundBlocks.clear();
    state.perimeterBlocks.clear();
    state.mainBlockPos = newMainPos;
}

// Jogador colocou bloco DENTRO do volume → vira parte do snapshot
function updatePutBlockAroundBlocks(rawLevel, pos) {
    if (inVolume(pos)) {
        var key = keyOf(pos);
        var s = rawLevel.getBlockState(pos);
        var ss = stateStr(s);
        state.brokenBlocks.delete(key);
        // NAO adiciona TNT/fogo no snapshot
        if (!isExcludedBlock(ss)) {
            state.aroundBlocks.set(key, { stateString: ss });
        }
    }
}

// Jogador quebrou bloco dentro do volume → NÃO restaura
function updatePlayerBreakBlockAroundBlocks(pos) {
    if (inVolume(pos)) {
        var key = keyOf(pos);
        state.aroundBlocks.delete(key);
        state.brokenBlocks.delete(key);
    }
}

// Blocos que NUNCA devem ser restaurados (explosao, fogo, etc.)
var EXCLUDED_BLOCKS = [
    'minecraft:tnt',
    'minecraft:fire',
    'minecraft:soul_fire',
    'minecraft:campfire',        // nao restaura campfire quebrado
    'minecraft:soul_campfire'
];

function isExcludedBlock(stateString) {
    for (var i = 0; i < EXCLUDED_BLOCKS.length; i++) {
        if (stateString.indexOf(EXCLUDED_BLOCKS[i]) === 0) return true;
    }
    return false;
}

// A cada 15s: detecta blocos que viraram ar (griefing) → restauração
function checkBlockStatesAroundMainBlock(rawLevel) {
    if (!state.mainBlockPos) return;

    // Se o bloco principal sumiu → zona cancelada (quebrados seguem restaurando)
    if (rawLevel.getBlockState(state.mainBlockPos).isAir()) {
        state.aroundBlocks.clear();
        state.perimeterBlocks.clear();
        log('Bloco principal removido — zona cancelada.');
    }

    state.aroundBlocks.forEach(function (value, k) {
        if (rawLevel.getBlockState(posFromKey(k)).isAir() && !state.brokenBlocks.has(k)) {
            // NAO adiciona TNT/fogo/blocos de explosao na fila de restauracao
            if (isExcludedBlock(value.stateString)) {
                state.aroundBlocks.delete(k);
                logDebug('excluido da restauracao: ' + k + ' (' + value.stateString + ')');
                return;
            }
            state.brokenBlocks.set(k, value);      // guarda o estado ORIGINAL
            state.aroundBlocks.delete(k);           // fiel ao mod original (é removido do around)
        }
    });
}

// A cada 1s: restaura 1 bloco quebrado por vez, se vazio de entidades.
// TNT/fogo/blocos de explosao sao sempre excluidos.
function getRestoreBlocks(rawLevel, maxBlocks) {
    if (state.brokenBlocks.size === 0 || maxBlocks <= 0) return;

    var restored = 0;
    state.brokenBlocks.forEach(function (value, k) {
        if (restored >= maxBlocks) return;
        // pula blocos excluidos (TNT, fogo, etc.)
        if (isExcludedBlock(value.stateString)) {
            state.brokenBlocks.delete(k);
            return;
        }
        var pos = posFromKey(k);
        var blockState = parseState(rawLevel, value.stateString);
        if (blockState == null) { state.brokenBlocks.delete(k); return; } // bloco não existe mais

        var shape = blockState.getShape(rawLevel, pos, $CollisionContext.empty());
        var clear = true;
        if (!shape.isEmpty()) {
            var aabb = shape.bounds().move(pos.getX(), pos.getY(), pos.getZ());
            clear = rawLevel.getEntitiesOfClass($Entity, aabb).isEmpty();
        }
        if (clear) {
            rawLevel.setBlock(pos, blockState, 3);
            state.brokenBlocks.delete(k);
            restored++;
            logDebug('restaurado ' + k + ' <- ' + value.stateString);
        }
    });
    if (restored > 0) log('Restaurados ' + restored + ' bloco(s) (faltam ' + state.brokenBlocks.size + ').');
}

// A cada 4s: partículas nos quebrados e no perímetro
function getAnimate(rawLevel) {
    state.brokenBlocks.forEach(function (value, k) {
        var pos = posFromKey(k);
        if (rawLevel.getBlockState(pos).isAir()) {
            rawLevel.sendParticles($ParticleTypes.HAPPY_VILLAGER,
                pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 5, 0.2, 0.2, 0.2, 0.5);
        }
    });
    state.perimeterBlocks.forEach(function (value, k) {
        var pos = posFromKey(k);
        rawLevel.sendParticles($ParticleTypes.FALLING_OBSIDIAN_TEAR,
            pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 5, 0.2, 0.2, 0.2, 0.1);
    });
}

// ---------------------------------------------------------------
// BANDEIRA NO SPAWN — coloca o bloco principal no ponto de spawn
// do mundo quando o servidor inicia.
// Regras:
//  - Só age se o bloco no spawn NÃO for a bandeira (não força nada
//    de novo se a bandeira já está lá);
//  - Ativa a zona de proteção NO SPAWN apenas se não existir outra
//    zona ativa (não rouba a zona de um jogador);
//  - Se a bandeira do spawn for destruída, o servidor reposiciona.
// ---------------------------------------------------------------
function placeSpawnFlag(rawLevel) {
    try {
        var spawnPos = rawLevel.getSharedSpawnPos();
        var x = spawnPos.getX();
        var z = spawnPos.getZ();
        var y = rawLevel.getHeight($HeightmapTypes.MOTION_BLOCKING_NO_LEAVES, x, z);
        var targetPos = new $BlockPos(x, y, z);

        var current = rawLevel.getBlockState(targetPos);
        var rl = $ResourceLocation.tryParse(config.mainBlock);
        var flagBlock = (rl != null) ? $ForgeRegistries.BLOCKS.getValue(rl) : null;

        if (flagBlock == null || flagBlock === $Blocks.AIR) {
            log('BANDEIRA NO SPAWN: bloco principal inválido (' + config.mainBlock + '), nada a fazer.');
            return;
        }

        // já existe a bandeira exatamente no spawn → respeita o estado atual
        if (current.getBlock() === flagBlock) {
            log('BANDEIRA NO SPAWN: já existe em ' + keyOf(targetPos) + ', nada a fazer.');
            return;
        }

        log('BANDEIRA NO SPAWN: colocando ' + config.mainBlock + ' em ' + keyOf(targetPos));
        rawLevel.setBlock(targetPos, flagBlock.defaultBlockState(), 3);

        // só ativa a zona no spawn se NÃO existir outra zona ativa
        // (não rouba a zona de um jogador quando ele reloca a bandeira)
        if (state.mainBlockPos == null) {
            log('BANDEIRA NO SPAWN: ativando zona no spawn.');
            state.aroundBlocks.clear();
            state.perimeterBlocks.clear();
            state.mainBlockPos = targetPos;
            setBlockStatesAroundMainBlock(rawLevel, targetPos);
            getPerimeterBlocks(rawLevel, targetPos);
            getAnimate(rawLevel);
        }
        saveState();
    } catch (e) {
        log('ERRO em placeSpawnFlag: ' + e);
    }
}

// ------------------------------------------------------------------
// CONFIG + ESTADO (carregados quando o script inicia/reloada)
// ------------------------------------------------------------------
loadConfig();
loadState();
checkIsolation();

// ------------------------------------------------------------------
// EVENTOS
// ------------------------------------------------------------------

// QUANDO O SERVIDOR DESLIGA: salva tudo
ServerEvents.unloaded(function () {
    saveState();
});

// QUANDO O SERVIDOR INICIA: garante a bandeira no spawn do mundo
ServerEvents.loaded(function (event) {
    try {
        var rawLevel = event.server.overworld(); // ServerLevel (sem ambiguidade de getLevel)
        if (!rawLevel) return;
        placeSpawnFlag(rawLevel);
    } catch (e) {
        log('ERRO em loaded: ' + e);
    }
});

// ------------------------- COLOCAR BLOCO --------------------------
BlockEvents.placed(function (event) {
    try {
        var rawLevel = event.level;       // Level cru (ServerLevel em servidor)
        var block = event.block;          // BlockContainerJS
        var pos = block.getPos();
        var id = block.getId();           // já é String ("mod:id")

        if (id === config.mainBlock) {
            log('Bloco principal colocado em ' + keyOf(pos));
            removeBlockAroundMainBlock(rawLevel, pos);
            setBlockStatesAroundMainBlock(rawLevel, pos);
            getPerimeterBlocks(rawLevel, pos);
            getAnimate(rawLevel);
            logDebug('DEBUG placed: zona ativa em ' + keyOf(pos)
                + ' around=' + state.aroundBlocks.size
                + ' perimeter=' + state.perimeterBlocks.size);
        } else {
            updatePutBlockAroundBlocks(rawLevel, pos);
            logDebug('DEBUG placed: ' + id + ' em ' + keyOf(pos));
        }
    } catch (e) {
        log('ERRO em placed: ' + e);
    }
});

// ------------------------- QUEBRAR BLOCO --------------------------
BlockEvents.broken(function (event) {
    try {
        var rawLevel = event.level;       // Level cru
        var block = event.block;
        var pos = block.getPos();

        // Se a posição quebrada é o bloco principal → cancela a zona
        var isMain = state.mainBlockPos && state.mainBlockPos.equals(pos);
        if (isMain) {
            log('Bloco principal quebrado em ' + keyOf(pos) + ' — zona cancelada.');
            state.aroundBlocks.clear();
            state.perimeterBlocks.clear();
            state.mainBlockPos = pos;
        } else {
            updatePlayerBreakBlockAroundBlocks(pos);
            logDebug('DEBUG broken: ' + block.getId() + ' em ' + keyOf(pos)
                + ' (marcado como controle do jogador, não restaura)');
        }
    } catch (e) {
        log('ERRO em broken: ' + e);
    }
});

// --------------------------- TICK LOOP ----------------------------
var tickCounter = 0;
ServerEvents.tick(function (event) {
    try {
        var rawLevel = event.server.overworld(); // ServerLevel (sem ambiguidade de getLevel)
        if (!rawLevel) return;

        tickCounter++;

        // Sempre 1 bloco/segundo (20 ticks). Debug acelera scan/save mas NAO restore.
        var restoreEvery = 20;                        // 1 bloco por segundo sempre
        var renderEvery = config.debug ? 10 : 80;    // normal: a cada 4s
        var scanEvery   = config.debug ? 40 : 300;   // normal: a cada 15s
        var saveEvery   = config.debug ? 100: 600;   // normal: a cada 30s

        if (tickCounter % restoreEvery === 0) {
            var timeOfDay = rawLevel.getDayTime() % 24000;
            // restaura apenas de dia. DEBUG ignora isso.
            if (timeOfDay < 13000 || config.debug) {
                getRestoreBlocks(rawLevel, 1); // sempre 1 bloco por passada
            }
        }
        if (tickCounter % renderEvery === 0) {          // partículas
            getAnimate(rawLevel);
        }
        if (tickCounter % scanEvery === 0) {            // escaneia quebrados (griefing)
            checkBlockStatesAroundMainBlock(rawLevel);
        }
        if (tickCounter % saveEvery === 0) {            // autosave (protege contra /reload)
            saveState();
        }
    } catch (e) {
        log('ERRO em tick: ' + e);
    }
});

// ----------------------- COMANDO DE DEBUG -------------------------
ServerEvents.customCommand('blockrestore_status', function (event) {
    try {
        var msg = '[BlockRestoration] principal=' + (state.mainBlockPos ? keyOf(state.mainBlockPos) : 'nenhum')
            + ' aoRedor=' + state.aroundBlocks.size
            + ' quebrados=' + state.brokenBlocks.size
            + ' perimetro=' + state.perimeterBlocks.size
            + ' | config: raio=' + config.radius + ' bloco=' + config.mainBlock
            + ' debug=' + config.debug;
        if (event.player) {
            event.player.tell(msg);
        } else {
            log(msg);
        }
    } catch (e) {
        log('ERRO em command: ' + e);
    }
});

// LIGA/DESLIGA o modo debug em tempo real (sem editar a config e reiniciar).
ServerEvents.customCommand('blockrestore_debug', function (event) {
    try {
        config.debug = !config.debug;
        var msg = '[BlockRestoration] modo debug agora = ' + config.debug
            + ' (debug: restaura 30 blocos/passada, ignora dia/noite)';
        if (event.player) {
            event.player.tell(msg);
        } else {
            log(msg);
        }
    } catch (e) {
        log('ERRO em command debug: ' + e);
    }
});

// ----------------- BANDEIRA + ITENS DE TESTE (toda vez que entra) ----
// Ao entrar no servidor, o jogador recebe:
//  1x bandeira (bloco principal) para ativar a area de restauracao
//  64x ovo de creeper para testar destruicao
//  1x isqueiro para acender TNT
//  64x TNT para testes
// Modo DEBUG: sempre da os itens (ignora stage).
PlayerEvents.loggedIn(function (event) {
    try {
        var player = event.player;

        // dar bandeira (bloco principal da config)
        var flag = Item.of(config.mainBlock);
        if (!flag.isEmpty()) {
            player.give(flag);
            player.give(Item.of(config.mainBlock)); // 2 bandeiras
            player.tell('§6§lVoce recebeu a BANDEIRA! §r§7Coloque-a no chao para §bativar a area de restauracao de blocos§7 ao redor.');
        } else {
            player.tell('§cBandeira nao encontrada: §o' + config.mainBlock + '§r§c.');
            log('Bandeira do config nao e um item valido: ' + config.mainBlock);
        }

        // itens de teste: creeper egg, isqueiro, TNT
        player.give(Item.of('minecraft:creeper_spawn_egg', 64));
        player.give(Item.of('minecraft:flint_and_steel'));
        player.give(Item.of('minecraft:tnt', 64));
        player.give(Item.of('minecraft:obsidian', 64));
        player.give(Item.of('minecraft:diamond_pickaxe'));
        player.give(Item.of('minecraft:cooked_beef', 64));
        player.give(Item.of('minecraft:torch', 64));
        player.tell('§a§lItens de teste: §r§764 Creeper Eggs, Isqueiro, 64 TNT, 64 Obsidian, Picareta de Diamante, Comida, Tochas.');
        log('Itens de teste dados ao jogador: ' + player.getName());
    } catch (e) {
        log('ERRO em loggedIn (itens): ' + e);
    }
});