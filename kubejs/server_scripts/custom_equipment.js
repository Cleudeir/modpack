ServerEvents.recipes(event => {	
    // Remove a receita existente
    event.remove({mod:'marbledsarsenal'});
    event.remove({mod:'zombie_extreme'});
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
    
    // Combat Set ////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_sheet'},
            B: {item: 'marbledsapi:hardened_steel_sheet'},
            C: {item: 'minecraft:iron_helmet'}
        },
        result: {
            item: 'zombie_extreme:combat_armor_helmet',
            count: 1
        }
    });
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_sheet'},
            B: {item: 'marbledsapi:hardened_steel_sheet'},
            C: {item: 'minecraft:iron_chestplate'}
        },
        result: {
            item: 'zombie_extreme:combat_armor_chestplate',
            count: 1
        }
    });	

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_sheet'},
            B: {item: 'marbledsapi:hardened_steel_sheet'},
            C: {item: 'minecraft:iron_leggings'}
        },
        result: {
            item: 'zombie_extreme:combat_armor_leggings',
            count: 1
        }
    });	
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_sheet'},
            B: {item: 'marbledsapi:hardened_steel_sheet'},
            C: {item: 'minecraft:iron_boots'}
        },
        result: {
            item: 'zombie_extreme:combat_armor_boots',
            count: 1
        }
    });		

    // Black Juggernaut Set ////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_ingot'},
            B: {item: 'marbledsapi:steel_sheet'},
            C: {item: 'zombie_extreme:combat_armor_helmet'}
        },
        result: {
            item: 'marbledsarsenal:black_juggernaut_armor_helmet',
            count: 1
        }
    });
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_ingot'},
            B: {item: 'marbledsapi:steel_sheet'},
            C: {item: 'zombie_extreme:combat_armor_chestplate'}
        },
        result: {
            item: 'marbledsarsenal:black_juggernaut_armor_chestplate',
            count: 1
        }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_ingot'},
            B: {item: 'marbledsapi:steel_sheet'},
            C: {item: 'zombie_extreme:combat_armor_leggings'}
        },
        result: {
            item: 'marbledsarsenal:black_juggernaut_armor_leggings',
            count: 1
        }
    });
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "BAB",
            "ACA",
            "BAB"
        ],
        key: {
            A: {item: 'marbledsapi:steel_ingot'},
            B: {item: 'marbledsapi:steel_sheet'},
            C: {item: 'zombie_extreme:combat_armor_boots'}
        },
        result: {
            item: 'marbledsarsenal:black_juggernaut_armor_boots',
            count: 1
        }
    });	

    // Riot Juggernaut Set /////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "ACA",
            "CBC",
            "ACA"
        ],
        key: {
            A: {item: 'marbledsapi:steel_block'},
            C: {item: 'minecraft:netherite_ingot'},			
            B: {item: 'marbledsarsenal:black_juggernaut_armor_helmet'}
        },
        result: {
            item: 'marbledsarsenal:riot_armor_helmet',
            count: 1
        }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "ACA",
            "CBC",
            "ACA"
        ],
        key: {
            A: {item: 'marbledsapi:steel_block'},
            C: {item: 'minecraft:netherite_ingot'},			
            B: {item: 'marbledsarsenal:black_juggernaut_armor_chestplate'}
        },
        result: {
            item: 'marbledsarsenal:riot_armor_chestplate',
            count: 1
        }
    });	
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "ACA",
            "CBC",
            "ACA"
        ],
        key: {
            A: {item: 'marbledsapi:steel_block'},
            C: {item: 'minecraft:netherite_ingot'},			
            B: {item: 'marbledsarsenal:black_juggernaut_armor_leggings'}
        },
        result: {
            item: 'marbledsarsenal:riot_armor_leggings',
            count: 1
        }
    });		

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "ACA",
            "CBC",
            "ACA"
        ],
        key: {
            A: {item: 'marbledsapi:steel_block'},
            C: {item: 'minecraft:netherite_ingot'},			
            B: {item: 'marbledsarsenal:black_juggernaut_armor_boots'}
        },
        result: {
            item: 'marbledsarsenal:riot_armor_boots',
            count: 1
        }
    });	

    // Juggernaut Suit /////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'marbledsapi:hardened_steel_ingot'},
            B: {item: 'zombie_extreme:combat_armor_helmet'},
            C: {item: 'minecraft:green_dye'}	
        },
        result: {
            item: 'zombie_extreme:juggernaut_suit_helmet',
            count: 1
        }
    });
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'marbledsapi:hardened_steel_ingot'},
            B: {item: 'zombie_extreme:combat_armor_chestplate'},
            C: {item: 'minecraft:green_dye'}	
        },
        result: {
            item: 'zombie_extreme:juggernaut_suit_chestplate',
            count: 1
        }
    });	

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'marbledsapi:hardened_steel_ingot'},
            B: {item: 'zombie_extreme:combat_armor_leggings'},
            C: {item: 'minecraft:green_dye'}	
        },
        result: {
            item: 'zombie_extreme:juggernaut_suit_leggings',
            count: 1
        }
    });	
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'marbledsapi:hardened_steel_ingot'},
            B: {item: 'zombie_extreme:combat_armor_boots'},
            C: {item: 'minecraft:green_dye'}	
        },
        result: {
            item: 'zombie_extreme:juggernaut_suit_boots',
            count: 1
        }
    });		

    // Exo Suit ////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'createdeco:netherite_sheet'},
            B: {item: 'zombie_extreme:juggernaut_suit_helmet'},
            C: {item: 'minecraft:redstone_block'}	
        },
        result: {
            item: 'zombie_extreme:exo_suit_helmet',
            count: 1
        }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'createdeco:netherite_sheet'},
            C: {item: 'marbledsapi:steel_block'},
            B: {item: 'zombie_extreme:juggernaut_suit_chestplate'}			
        },
        result: {
            item: 'zombie_extreme:exo_suit_chestplate',
            count: 1
        }
    });

    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'createdeco:netherite_sheet'},
            C: {item: 'marbledsapi:steel_block'},
            B: {item: 'zombie_extreme:juggernaut_suit_leggings'}
        },
        result: {
            item: 'zombie_extreme:exo_suit_leggings',
            count: 1
        }
    });
	
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            "CBC",
            "AAA"
        ],
        key: {
            A: {item: 'createdeco:netherite_sheet'},
            C: {item: 'marbledsapi:steel_block'},
            B: {item: 'zombie_extreme:juggernaut_suit_boots'}
        },
        result: {
            item: 'zombie_extreme:exo_suit_boots',
            count: 1
        }
    });	

    // Night Vision Glasses  ////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            " A ",
            "CBC",
            "   "
        ],
        key: {
            A: {item: 'zombie_extreme:combat_armor_helmet'},
            B: {item: 'minecraft:emerald'},
            C: {item: 'minecraft:emerald_block'}	
        },
        result: {
            item: 'zombie_extreme:night_vision_glasses_helmet',
            count: 1
        }
    });

    // WEAPONS  ////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////
    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "AAA",
            " B ",
            " B "
        ],
        key: {
            A: {item: 'marbledsapi:steel_block'},
            B: {item: 'createaddition:iron_rod'}
		},
        result: {
            item: 'zombie_extreme:buzz_killer',
            count: 1
        }
    });
	
	    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            "CAC",
            " A ",
            " B "
        ],
        key: {
            A: {item: 'minecraft:iron_sheet'},
            B: {item: 'createaddition:iron_rod'},			
            C: {item: 'minecraft:redstone'}
		},			
        result: {
            item: 'zombie_extreme:electric_katana',
            count: 1
        }
    });
	// ITEMS //////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////////////	
	    event.custom({
        type: 'minecraft:crafting_shaped',
        pattern: [
            " A ",
            " B ",
            " C "
        ],
        key: {
            A: {item: 'supplementaries:ash'},
            B: {item: 'minecraft:glass_bottle'},			
            C: {item: 'minecraft:arrow'}
		},			
        result: {
            item: 'zombie_extreme:syringe_drug',
            count: 1
        }
    });	
});	
