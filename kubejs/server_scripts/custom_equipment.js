ServerEvents.recipes(event => {	
    // Remove a receita existente
    event.remove({mod:'grapplemod'});	
    event.remove({mod:'marbledsarsenal'});
    event.remove({mod:'zombie_extreme'});
	event.remove({id: 'quark:torch_arrow'});
	
	//Torch Arrow 
	event.custom({
        type: 'minecraft:crafting_shapeless',
        ingredients: [
            { item: 'minecraft:torch' },
            { item: 'minecraft:arrow' },
            { item: 'minecraft:string' }			
        ],
        result: { item: 'quark:torch_arrow' }
    });

    // Furnace Recipes
    event.custom({
        type: 'minecraft:smelting',
        ingredient: { item: 'zombie_extreme:raw_steel' },
        result: { item: 'marbledsapi:steel_sheet' },
        experience: 0.35,
        cookingtime: 100
    });

    // Shaped Crafting Recipes
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:steel_pickaxe' }
    });
	
    // Arrow
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            ' B ',
            '   '
        ],
        key: {
            A: { item: 'minecraft:stone' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'minecraft:arrow' }
    });	

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AA ',
            'AB ',
            ' B '
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:steel_axe' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:steel_shovel' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AA ',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:steel_hoe' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'zombie_extreme:ignot_titan' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:titan_pickaxe' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AA ',
            'AB ',
            ' B '
        ],
        key: {
            A: { item: 'zombie_extreme:ignot_titan' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:titan_axe' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'zombie_extreme:ignot_titan' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:titan_shovel' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AA ',
            ' B ',
            ' B '
        ],
        key: {
            A: { item: 'zombie_extreme:ignot_titan' },
            B: { item: 'minecraft:stick' }
        },
        result: { item: 'zombie_extreme:titan_hoe' }
    });

    event.custom({
        type: 'minecraft:crafting_shapeless',
        ingredients: [
            { item: 'marbledsapi:steel_sheet' },
            { item: 'marbledsapi:steel_sheet' }
        ],
        result: { item: 'marbledsapi:steel_ingot' }
    });

    event.custom({
        type: 'minecraft:crafting_shapeless',
        ingredients: [
            { item: 'supplementaries:ash' },
            { item: 'minecraft:coal' }
        ],
        result: { item: 'minecraft:gunpowder' }
    });

    event.custom({
        type: 'minecraft:crafting_shapeless',
        ingredients: [
            { item: 'minecraft:charcoal' },
            { item: 'minecraft:gravel' }
        ],
        result: { item: 'minecraft:coal' }
    });

    event.custom({
        type: 'minecraft:crafting_shapeless',
        ingredients: [
            { item: 'minecraft:sugar' },
            { item: 'minecraft:coal' }
        ],
        result: {
            item: 'minecraft:gunpowder',
            count: 4
        }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BBB',
            'B B'
        ],
        key: {
            A: { item: 'minecraft:smooth_stone' },
            B: { item: 'minecraft:iron_ingot' }
        },
        result: { item: 'cgm:workbench' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            'BCB',
            '   '
        ],
        key: {
            A: { item: 'minecraft:redstone' },
            B: { item: 'minecraft:air' },
            C: { item: 'minecraft:chest' }
        },
        result: { item: 'create:smart_chute' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            ' B ',
            ' C '
        ],
        key: {
            A: { item: 'minecraft:iron_nugget' },
            B: { item: 'minecraft:white_wool' },
            C: { item: 'minecraft:iron_nugget' }
        },
        result: { item: 'create:filter' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            ' A ',
            ' B ',
            ' C '
        ],
        key: {
            A: { item: 'minecraft:gold_nugget' },
            B: { item: 'minecraft:white_wool' },
            C: { item: 'minecraft:gold_nugget' }
        },
        result: { item: 'create:attribute_filter' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'ABA',
            'ABA',
            '   '
        ],
        key: {
            A: { item: 'minecraft:stick' },
            B: { item: 'createdeco:iron_mesh_fence' }
        },
        result: { item: 'zombie_extreme:barbed_fence' }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'A B',
            '   ',
            '   '
        ],
        key: {
            A: { item: 'minecraft:iron_ingot' },
            B: { item: 'minecraft:string' }
        },
        result: {
            item: 'zombie_extreme:wire',
            count: 2
        }
    });
    
    // Lr Armor - Set 1 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:sniper_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:sniper_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:sniper_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:sniper_boots'}
    });	
	
    // Lr Armor - Set 2 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:armored_chemical_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:armored_chemical_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:armored_chemical_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:armored_chemical_boots'}
    });		
	
    // Lr Armor - Set 1 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:attacker_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:attacker_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:attacker_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:attacker_boots'}
    });		
	
    // Lr Armor - Set 1 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:attacker_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:attacker_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:attacker_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:attacker_boots'}
    });
	
	
    // Lr Armor - Set 1 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:medical_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:medical_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:medical_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:medical_boots'}
    });
	
	
    // Lr Armor - Set 1 //////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////

	//1-Helmet
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_helmet' },
	
        },
        result: {item: 'lrarmor:scout_helmet'}
    });
	
	//2-Chestplate
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_chestplate' },
	
        },
        result: {item: 'lrarmor:scout_chestplate'}
    });

	//3-Leggings
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_leggings' },
	
        },
        result: {item: 'lrarmor:scout_leggings'}
    });

	//4-Boots
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            'AAA',
            'BEC',
            'DDD'
        ],
        key: {
            A: { item: 'marbledsapi:steel_ingot' },
            B: { item: 'minecraft:green_dye' },
			C: { item: 'minecraft:black_dye' },
            D: { item: 'zombie_extreme:ignot_titan' },
			E: { item: 'minecraft:iron_boots' },
	
        },
        result: {item: 'lrarmor:scout_boots'}
    });
	
}
);