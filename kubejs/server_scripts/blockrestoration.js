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
//
//  CONFIG: kubejs/config/blockrestoration.json
//    { "mainBlock": "mod:id_do_bloco", "radius": 20 }
//
//  DEBUG: /kubejs custom_command blockrestore_status
// ================================================================

const CONFIG_PATH = Java.loadClass('java.nio.file.Paths').get('kubejs/config/blockrestoration.json').toAbsolutePath();
const SAVE_PATH   = Java.loadClass('java.nio.file.Paths').get('kubejs/config/blockrestoration.dat').toAbsolutePath();

const $Files      = Java.loadClass('java.nio.file.Files');
const $JsonParser = Java.loadClass('com.google.gson.JsonParser');
const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
const $BlockPos    = Java.loadClass('net.minecraft.core.BlockPos');
const $BlockStateParser = Java.loadClass('net.minecraft.commands.arguments.blocks.BlockStateParser');
const $CollisionContext = Java.loadClass('net.minecraft.world.phys.shapes.CollisionContext');
const $Heightmap  = Java.loadClass('net.minecraft.world.level.levelgen.Heightmap');
const $Blocks     = Java.loadClass('net.minecraft.world.level.block.Blocks');
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes');
const $Registries = Java.loadClass('net.minecraft.core.registries.Registries');
const $ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
const $ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation');
const $Entity     = Java.loadClass('net.minecraft.world.entity.Entity');
const $Level      = Java.loadClass('net.minecraft.world.level.Level');

// ------------------------------------------------------------------
// CONFIG (lida do arquivo kubejs/config/blockrestoration.json)
// ------------------------------------------------------------------
let config = {
    mainBlock: 'minecraft:black_banner',
    radius: 20
};

function loadConfig() {
    try {
        if ($Files.exists(CONFIG_PATH)) {
            const obj = $JsonParser.parseString($Files.readString(CONFIG_PATH)).getAsJsonObject();
            if (obj.has('mainBlock')) config.mainBlock = obj.get('mainBlock').getAsString();
            if (obj.has('radius'))    config.radius    = obj.get('radius').getAsInt();
        }
        config.radius = Math.max(1, Math.min(100, config.radius));
        console.log('[blockrestoration] Config: mainBlock=' + config.mainBlock + ' radius=' + config.radius);
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
let state = {
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

function keyOf(pos) {
    return pos.getX() + ',' + pos.getY() + ',' + pos.getZ();
}

function posFromKey(k) {
    const p = String(k).split(',');
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
        const lookup = rawLevel.registryAccess().lookupOrThrow($Registries.BLOCK);
        return $BlockStateParser.parseForBlock(lookup, String(str), false).blockState();
    } catch (e) {
        // fallback: tenta só o id do bloco -> estado padrão
        try {
            const id = String(str).split('[')[0];
            const block = $ForgeRegistries.BLOCKS.getValue($ResourceLocation.tryParse(id));
            return block != null ? block.defaultBlockState() : null;
        } catch (e2) {
            return null;
        }
    }
}

// O bloco tal está dentro do volume cúbico (±raio) do bloco principal?
function inVolume(pos) {
    if (!state.mainBlockPos) return false;
    const r = config.radius;
    const a = state.mainBlockPos;
    return Math.abs(pos.getX() - a.getX()) <= r
        && Math.abs(pos.getY() - a.getY()) <= r
        && Math.abs(pos.getZ() - a.getZ()) <= r;
}

// ------------------------------------------------------------------
// PERSISTÊNCIA (NBTIO)
// ------------------------------------------------------------------
function putMap(tag, name, map) {
    const inner = new $CompoundTag();
    map.forEach((value, k) => inner.putString(k, value.stateString));
    tag.put(name, inner);
}

function readMap(tag, name, target) {
    const keys = tag.getCompound(name).getAllKeys().toArray();
    const inner = tag.getCompound(name);
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        target.set(k, { stateString: inner.getString(k) });
    }
}

function saveState() {
    try {
        $Files.createDirectories(SAVE_PATH.getParent());
        const tag = new $CompoundTag();
        tag.putString('mainBlockPos', state.mainBlockPos ? keyOf(state.mainBlockPos) : '');
        putMap(tag, 'aroundBlocks', state.aroundBlocks);
        putMap(tag, 'brokenBlocks', state.brokenBlocks);
        putMap(tag, 'perimeterBlocks', state.perimeterBlocks);
        NBTIO.write(SAVE_PATH, tag);
        log('Estado salvo.');
    } catch (e) {
        log('ERRO ao salvar estado: ' + e);
    }
}

function loadState() {
    try {
        if (!$Files.exists(SAVE_PATH)) {
            log('Sem arquivo de estado salvo (primeira vez).');
            return;
        }
        const tag = NBTIO.read(SAVE_PATH);
        if (tag == null) return;
        const posStr = tag.getString('mainBlockPos');
        state.mainBlockPos = (posStr && posStr.length > 0) ? posFromKey(posStr) : null;
        readMap(tag, 'aroundBlocks', state.aroundBlocks);
        readMap(tag, 'brokenBlocks', state.brokenBlocks);
        readMap(tag, 'perimeterBlocks', state.perimeterBlocks);
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
    const r = config.radius;
    for (let x = -r; x <= r; x++) {
        for (let y = -r; y <= r; y++) {
            for (let z = -r; z <= r; z++) {
                const pos = center.offset(x, y, z);
                const s = rawLevel.getBlockState(pos);
                const key = keyOf(pos);
                if (!s.isAir() && !s.is($Blocks.FIRE) && !state.aroundBlocks.has(key)) {
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
    const r = config.radius;
    const h = $Heightmap.Types.MOTION_BLOCKING_NO_LEAVES;
    const put = (x, z) => {
        const y = rawLevel.getHeight(h, x, z) + 2;
        const pos = new $BlockPos(x, y, z);
        state.perimeterBlocks.set(keyOf(pos), { stateString: stateStr(rawLevel.getBlockState(pos)) });
    };
    for (let i = -r; i <= r; i++) {
        put(center.getX() + i, center.getZ() + r);
        put(center.getX() + i, center.getZ() - r);
    }
    for (let i = -r; i <= r; i++) {
        put(center.getX() + r, center.getZ() + i);
        put(center.getX() - r, center.getZ() + i);
    }
}

// Colocou o bloco principal: destrói a zona antiga e escaneia a nova
function removeBlockAroundMainBlock(rawLevel, newMainPos) {
    if (state.mainBlockPos) {
        const old = state.mainBlockPos;
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
        const key = keyOf(pos);
        state.brokenBlocks.delete(key);
        state.aroundBlocks.set(key, { stateString: stateStr(rawLevel.getBlockState(pos)) });
    }
}

// Jogador quebrou bloco dentro do volume → NÃO restaura
function updatePlayerBreakBlockAroundBlocks(pos) {
    if (inVolume(pos)) {
        const key = keyOf(pos);
        state.aroundBlocks.delete(key);
        state.brokenBlocks.delete(key);
    }
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

    state.aroundBlocks.forEach((value, k) => {
        if (rawLevel.getBlockState(posFromKey(k)).isAir() && !state.brokenBlocks.has(k)) {
            state.brokenBlocks.set(k, value);      // guarda o estado ORIGINAL
            state.aroundBlocks.delete(k);           // fiel ao mod original (é removido do around)
        }
    });
}

// A cada 1s (dia): restaura 1 bloco quebrado por vez, se vazio de entidades
function getRestoreBlocks(rawLevel) {
    if (state.brokenBlocks.size === 0) return;

    let restored = false;
    state.brokenBlocks.forEach((value, k) => {
        if (restored) return;
        const pos = posFromKey(k);
        const blockState = parseState(rawLevel, value.stateString);
        if (blockState == null) { state.brokenBlocks.delete(k); return; } // bloco não existe mais

        const shape = blockState.getShape(rawLevel, pos, $CollisionContext.empty());
        let clear = true;
        if (!shape.isEmpty()) {
            const aabb = shape.bounds().move(pos.getX(), pos.getY(), pos.getZ());
            clear = rawLevel.getEntitiesOfClass($Entity, aabb).isEmpty();
        }
        if (clear) {
            rawLevel.setBlock(pos, blockState, 3);
            state.brokenBlocks.delete(k);
            restored = true;
        }
    });
}

// A cada 4s: partículas nos quebrados e no perímetro
function getAnimate(rawLevel) {
    state.brokenBlocks.forEach((value, k) => {
        const pos = posFromKey(k);
        if (rawLevel.getBlockState(pos).isAir()) {
            rawLevel.sendParticles($ParticleTypes.HAPPY_VILLAGER,
                pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 5, 0.2, 0.2, 0.2, 0.5);
        }
    });
    state.perimeterBlocks.forEach((value, k) => {
        const pos = posFromKey(k);
        rawLevel.sendParticles($ParticleTypes.FALLING_OBSIDIAN_TEAR,
            pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5, 5, 0.2, 0.2, 0.2, 0.1);
    });
}

// ------------------------------------------------------------------
// CONFIG + ESTADO (carregados quando o script inicia/reloada)
// ------------------------------------------------------------------
loadConfig();
loadState();

// ------------------------------------------------------------------
// EVENTOS
// ------------------------------------------------------------------

// QUANDO O SERVIDOR DESLIGA: salva tudo
ServerEvents.unloaded(event => {
    saveState();
});

// ------------------------- COLOCAR BLOCO --------------------------
BlockEvents.placed(event => {
    try {
        const rawLevel = event.level;       // Level cru (ServerLevel em servidor)
        const block = event.block;          // BlockContainerJS
        const pos = block.getPos();
        const id = block.getId();           // já é String ("mod:id")

        if (id === config.mainBlock) {
            log('Bloco principal colocado em ' + keyOf(pos));
            removeBlockAroundMainBlock(rawLevel, pos);
            setBlockStatesAroundMainBlock(rawLevel, pos);
            getPerimeterBlocks(rawLevel, pos);
            getAnimate(rawLevel);
        } else {
            updatePutBlockAroundBlocks(rawLevel, pos);
        }
    } catch (e) {
        log('ERRO em placed: ' + e);
    }
});

// ------------------------- QUEBRAR BLOCO --------------------------
BlockEvents.broken(event => {
    try {
        const rawLevel = event.level;       // Level cru
        const block = event.block;
        const pos = block.getPos();

        // Se a posição quebrada é o bloco principal → cancela a zona
        const isMain = state.mainBlockPos && state.mainBlockPos.equals(pos);
        if (isMain) {
            log('Bloco principal quebrado em ' + keyOf(pos) + ' — zona cancelada.');
            state.aroundBlocks.clear();
            state.perimeterBlocks.clear();
            state.mainBlockPos = pos;
        } else {
            updatePlayerBreakBlockAroundBlocks(pos);
        }
    } catch (e) {
        log('ERRO em broken: ' + e);
    }
});

// --------------------------- TICK LOOP ----------------------------
let tickCounter = 0;
ServerEvents.tick(event => {
    try {
        const rawLevel = event.server.getLevel($Level.OVERWORLD); // ServerLevel
        if (!rawLevel) return;

        tickCounter++;

        if (tickCounter % 20 === 0) {            // a cada 1 segundo
            // restaura apenas durante o dia (fiel ao mod original)
            const timeOfDay = rawLevel.getDayTime() % 24000;
            if (timeOfDay < 13000) {
                getRestoreBlocks(rawLevel);
            }
        }
        if (tickCounter % 80 === 0) {            // a cada 4 segundos
            getAnimate(rawLevel);
        }
        if (tickCounter % 300 === 0) {           // a cada 15 segundos
            checkBlockStatesAroundMainBlock(rawLevel);
        }
        if (tickCounter % 600 === 0) {           // a cada 30 segundos
            saveState();                          // autosave (protege contra /reload)
        }
    } catch (e) {
        log('ERRO em tick: ' + e);
    }
});

// ----------------------- COMANDO DE DEBUG -------------------------
ServerEvents.customCommand('blockrestore_status', event => {
    try {
        const msg = '[BlockRestoration] principal=' + (state.mainBlockPos ? keyOf(state.mainBlockPos) : 'nenhum')
            + ' aoRedor=' + state.aroundBlocks.size
            + ' quebrados=' + state.brokenBlocks.size
            + ' perimetro=' + state.perimeterBlocks.size
            + ' | config: raio=' + config.radius + ' bloco=' + config.mainBlock;
        if (event.player) {
            event.player.tell(msg);
        } else {
            log(msg);
        }
    } catch (e) {
        log('ERRO em command: ' + e);
    }
});