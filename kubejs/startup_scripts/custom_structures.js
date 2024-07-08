//ServerEvents.highPriorityData((event) => {
//    const biomeSource = event.worldgen.addOrReplace('minecraft:overworld')
//    const structureSets = biomeSource.getStructureSets()
//    const targetStructure = 'zombie_extreme:ruin_3' // Substitua pelo ID da estrutura que você deseja modificar
//
//    structureSets.forEach(set => {
//        set.structures.forEach(structure => {
//            if (structure.structure.location().toString() === targetStructure) {
//                // Reduzindo a frequência de geração
//                structure.frequency = 0.1 // Ajuste a frequência conforme necessário
//            }
//        })
//    })
//})

//ServerEvents.worldgen(event => {
//    // Obtém a configuração de um bioma específico
//    event.modifyBiome('minecraft:plains', biome => {
//        // Obtém a lista de configurações de estruturas para o bioma
//        let structures = biome.getStructures()
//        
//        // Remove a estrutura específica do bioma
//        structures.removeStructure('zombie_extreme:ruin_3')
//        
//        // Re-adiciona a estrutura com uma frequência reduzida
//        structures.addStructure('zombie_extreme:ruin_3', {frequency: 0.1}) // Ajuste a frequência conforme necessário
//    })
//})