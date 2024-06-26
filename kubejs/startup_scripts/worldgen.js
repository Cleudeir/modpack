//WorldgenEvents.remove(event => {
//  // print all features for a given biome filter
//  event.printFeatures('', 'minecraft:overworld')
//
//  event.removeOres(props => {
//    // much like ADDING ores, this supports filtering by worldgen layer...
////    props.worldgenLayer = 'underground_ores'
////    // ...and by biome
////    props.biomes = [
////      { category: 'icy' },
////      { category: 'savanna' },
////      { category: 'mesa' }
////    ]
//
//    // BlockStatePredicate to remove iron and copper ores from the given biomes
//    // Note tags may NOT be used here, unfortunately...
//    props.blocks = ['minecraft:iron_ore', 'minecraft:copper_ore']
//  })
//
//  // remove features by their id (first argument is a generation step)
////  event.removeFeatureById('underground_ores', ['minecraft:ore_coal_upper', 'minecraft:ore_coal_lower'])
//})
//
//WorldgenEvents.add(event => {
//  // use the anchors helper from the event
//  const { anchors } = event
//
//  event.addOre(ore => {
//    ore.id = 'minecraft:iron_ore' // (optional, but recommended) custom id for the feature
//    ore.count([48, 50])             // generate between 48 and 50 veins (chosen at random), you could use a single number here for a fixed amount of blocks
//      .squared()                    // randomly spreads the ores out across the chunk, instead of generating them in a column
//      .uniformHeight(				      // generate the ore with a triangular distribution, this means it will be more likely to be placed closer to the center of the anchors
//        anchors.aboveBottom(32),    // the lower bound should be 32 blocks above the bottom of the world, so in this case, Y = -32 since minY = -64
//        anchors.absolute(96)	      // the upper bound, meanwhile is set to be just exactly at Y = 96
//      )								              // in total, the ore can be found between Y levels -32 and 96, and will be most likely at Y = (96 + -32) / 2 = 32
//    // more, optional parameters (default values are shown here)
//    ore.size = 9                            // max. vein size
//  })
//
//  // oh yeah, and did I mention lakes exist, too?
//  // (for now at least, Vanilla is likely to remove them in the future)
////  event.addLake(lake => {
////    lake.id = 'kubejs:funny_lake' // BlockStatePredicate
////    lake.chance = 4
////    lake.fluid = 'minecraft:lava'
////    lake.barrier = 'minecraft:redstone_block'
////  })
//})

