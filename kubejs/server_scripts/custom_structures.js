ServerEvents.highPriorityData((event) => {
    const biomeSource = event.worldgen.addOrReplace('minecraft:overworld')
    const structureSets = biomeSource.getStructureSets()
    const targetStructure = 'zombie_extreme:ruin_3' // Substitua pelo ID da estrutura que você deseja modificar

    structureSets.forEach(set => {
        set.structures.forEach(structure => {
            if (structure.structure.location().toString() === targetStructure) {
                // Reduzindo a frequência de geração
                structure.frequency = 0.1 // Ajuste a frequência conforme necessário
            }
        })
    })
})