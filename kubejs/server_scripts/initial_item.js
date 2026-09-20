const rankS = [
    'artifacts:night_vision_goggles',
    'artifacts:scarf_of_invisibility',
    'artifacts:bunny_hoppers',
	'grapplemod:launcheritem',
    'celestial_artifacts:amethyst_ring',
    'celestial_artifacts:flight_ring',
    'celestial_artifacts:holy_talisman',
    'celestial_artifacts:angel_heart',
    'celestial_artifacts:angel_pearl',
    'celestial_artifacts:knight_shelter',
    'celestial_artifacts:solar_magnet',
    'celestial_artifacts:bearing_stamen',
    'celestial_artifacts:earth_axe',
    'celestial_artifacts:earth_pickaxe',
    'celestial_artifacts:earth_shovel',
    'nameless_trinkets:missing_page',
    'nameless_trinkets:broken_ankh',
    'nameless_trinkets:speed_force',
    'nameless_trinkets:vampire_blood',
    'nameless_trinkets:blindfold',
    'nameless_trinkets:ghast_eye',
    'nameless_trinkets:wooden_stick',
    'nameless_trinkets:gods_crown',
    'nameless_trinkets:fragile_cloud'
];
const rankA = [
    'quark:backpack',
    'artifacts:everlasting_beef',
    'artifacts:eternal_steak',
    'artifacts:shock_pendant',
    'artifacts:flame_pendant',
    'artifacts:cloud_in_a_bottle',
    'artificats:universal_attractor',
    'artifacts:crystal_heart',
    'artifacts:helium_flamingo',
    'artifacts:chorus_totem',
    'artifacts:power_glove',
    'artifacts:fire_gauntlet',
    'artifacts:vampiric_glove',
    'artifacts:pickaxe_heater',
    'artifacts:running_shoes',
    'celestial_artifacts:magic_horseshoe',
    'celestial_artifacts:heart_of_revenge',
    'celestial_artifacts:life_bracelet',
    'celestial_artifacts:prayer_crown',
    'celestial_artifacts:titan_scabbard',
    'nameless_trinkets:reverse_card',
    'nameless_trinkets:broken_magnet',
    'nameless_trinkets:super_magnet',
    'nameless_trinkets:lucky_rock',
    'nameless_trinkets:rage_mind',
    'nameless_trinkets:cracked_crown',
    'nameless_trinkets:sigil_of_baphomet',
    'nameless_trinkets:tear_of_the_sea',
    'nameless_trinkets:true_heart_of_the_sea',
    'nameless_trinkets:moon_stone',
    'nameless_trinkets:sleeping_pills',
    'nameless_trinkets:ethereal_wings',
    'nameless_trinkets:reforger',
    'nameless_trinkets:light_gloves',
    'nameless_trinkets:nelumbo',
    'nameless_trinkets:dark_nelumbo'
];
const rankB = [
    'artifacts:umbrella',
    'artifacts:thorn_pendant',
    'artifacts:charm_of_sinking',
    'artifacts:obsidian_skull',
    'artifacts:antidote_vessel',
    'artifacts:digging_claws',
    'artifacts:feral_claws',
    'artifacts:pocket_piston',
    'artifacts:aqua_dashers',
    'artifacts:steadfast_spikes',
    'artifacts:rooted_boots',
    'celestial_artifacts:gold_ring',
    //'celestial_artifacts:flight_ring',
    'celestial_artifacts:holy_sword',
    'celestial_artifacts:sands_talisman',
    'celestial_artifacts:skywalker_scroll',
    'celestial_artifacts:charming_bracelet',
    'celestial_artifacts:star_necklace',
    'celestial_artifacts:gallop_necklace',
    'celestial_artifacts:fang_necklace',
    'celestial_artifacts:sea_god_crown',
    'celestial_artifacts:guardian_eye',
    'celestial_artifacts:magic_arrow_bag',
    'celestial_artifacts:spirit_crown',
    'celestial_artifacts:flame_arrow_bag',
    //'celestial_artifacts:spirit_arrow_bag',
    'celestial_artifacts:iron_scabbard',
    'celestial_artifacts:leech_scabbard',
    'celestial_artifacts:repent_mirror',
    'celestial_artifacts:backtrack_mirror',
    'nameless_trinkets:callus',
    'nameless_trinkets:puffer_fish_liver',
    'nameless_trinkets:blaze_nucleus',
    'nameless_trinkets:ice_cube',
    'nameless_trinkets:amphibious_hands',
    'nameless_trinkets:spider_legs',
    'nameless_trinkets:scarab_amulet',
    //'nameless_trinkets:fate_emerald',
    'nameless_trinkets:dragons_eye',
    'nameless_trinkets:four_leaf_clover',
    'nameless_trinkets:experience_battery'
];
const rankC = [
    'artifacts:plastic_drinking_hat',
    'artifacts:novely_drinking_hat',
    'artifacts:snorkel',
    //'artifacts:villager_hat',
    //'artifacts:supertitious_hat',
    //'artifacts:cowboy_hat',
    //'artifacts:anglers_hat',
    'artifacts:lucky_scarf',
    'artifacts:panic_necklace',
    'artifacts:golden_hook',
    'artifacts:cross_necklace',	
    //'artifacts:onion_ring',
    //'artifacts:snowshoes',
    'artifacts:flippers',
    'celestial_artifacts:gold_ring',
    //'celestial_artifacts:emerald_ring',
    //'celestial_artifacts:thunder_ring',
    'celestial_artifacts:netherite_ring',
    'celestial_artifacts:nether_fire',
	//'celestial_artifacts:freeze_ring',
    'celestial_artifacts:gluttony_badge',
    //'celestial_artifacts:traveler_scroll',
    //'celestial_artifacts:sea_god_scroll',
    'celestial_artifacts:precious_bracelet',
    'celestial_artifacts:red_ruby_bracelet',
    'celestial_artifacts:spirit_bracelet',
    'celestial_artifacts:cross_necklace',
    'celestial_artifacts:precious_necklace',
    'celestial_artifacts:holy_necklace',
    'celestial_artifacts:red_heart_necklace',
    'celestial_artifacts:spirit_necklace',
    'celestial_artifacts:evil_eye',
    'nameless_trinkets:experience_battery',
    'nameless_trinkets:experience_magnet',
    'nameless_trinkets:what_magnet',
    //'nameless_trinkets:tick',
    'nameless_trinkets:explosion_proof_jacket',
    'nameless_trinkets:creeper_sense',
    //'nameless_trinkets:fertilizer',
    //'nameless_trinkets:gills',
    'nameless_trinkets:fractured_nullstone',
    'nameless_trinkets:miners_soul'
];
PlayerEvents.loggedIn(event => {
    let player = event.player;

    // Verifique se o jogador está entrando pela primeira vez
    if (!event.player.stages.has('first_join')) {
        // Conceda as recompensas de primeira entrada ao jogador

        // Marque o jogador como tendo recebido as recompensas de primeira entrada
        player.stages.add('first_join');

        // Lista de itens possíveis para substituir a stone sword
        let stoneWeapons = [
            'divine_weaponry:stone_dagger',
            'divine_weaponry:stone_sickle',
            'divine_weaponry:stone_glaive',
            'divine_weaponry:stone_katana',
            'divine_weaponry:stone_spear',
            //'divine_weaponry:stone_longsword',
            'divine_weaponry:stone_battleaxe',
            'divine_weaponry:stone_hammer',
            'divine_weaponry:stone_scythe',
            'divine_weaponry:stone_cutlass',
            'divine_weaponry:stone_rapier',
            'minecraft:stone_sword',
            'minecraft:bow'
        ];

        // Selecione um item aleatório da lista
        let randomStoneWeapon = stoneWeapons[Math.floor(Math.random() * stoneWeapons.length)];

        // Itens básicos do bundle
        let bundleItems = [
            {id: 'minecraft:stone_pickaxe', Count: 1},
            {id: 'minecraft:stone_axe', Count: 1},
            {id: 'minecraft:stone_shovel', Count: 1},
            {id: randomStoneWeapon, Count: 1},
            {id: 'minecraft:torch', Count: 8},
            {id: 'minecraft:bread', Count: 9}
        ];

        // Adicione 120 flechas se o item aleatório for um arco
        if (randomStoneWeapon === 'minecraft:bow') {
            bundleItems.push({id: 'minecraft:arrow', Count: 120});
        }

        // Crie um bundle e adicione itens a ele
        let bundle = Item.of('minecraft:bundle', {
            Items: bundleItems,
            display: {Name: '{"text":"Basic Bundle"}'}
        });

        // Adicione o bundle ao inventário do jogador
        player.give(bundle);

        // Gere um número aleatório entre 1 e 10
        let randomNum = Math.floor(Math.random() * 10) + 1;
        let randomItem, bundleName;

        if (randomNum === 1) {
            randomItem = rankS[Math.floor(Math.random() * rankS.length)];
            bundleName = '§4Rank S Bundle';
        } else if (randomNum === 2 || randomNum === 3) {
            randomItem = rankA[Math.floor(Math.random() * rankA.length)];
            bundleName = '§6Rank A Bundle';
        } else if (randomNum >= 4 && randomNum <= 8) {
            randomItem = rankB[Math.floor(Math.random() * rankB.length)];
            bundleName = '§2Rank B Bundle';
        } else {
            randomItem = rankC[Math.floor(Math.random() * rankC.length)];
            bundleName = '§9Rank C Bundle';
        }

        // Crie o bundle de artefato
        let artifactBundle = Item.of('minecraft:bundle', {
            Items: [
                {id: randomItem, Count: 1}
            ],
            display: {Name: '{"text":"' + bundleName + '"}'}
        });

        // Adicione o bundle de artefato ao inventário do jogador
        let playername = player.getName().getString();
        player.give(artifactBundle);
        player.runCommandSilent(`effect give ${playername} minecraft:regeneration 60 3`);
        player.runCommandSilent(`effect give ${playername} minecraft:resistance 60 3`);
        player.runCommandSilent(`effect give ${playername} minecraft:glowing infinite 1`);
    }
});


ServerEvents.tags('item', event => {
    // Categoria: Constructive Blocks
    event.add('kubejs:ranks', rankS);
    event.add('kubejs:ranka', rankA);
    event.add('kubejs:rankb', rankB);
    event.add('kubejs:rankc', rankC);
});