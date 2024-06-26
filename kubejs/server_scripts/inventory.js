//// Registrando o evento de abertura de inventário
//PlayerEvents.inventoryOpened(event => {
//    const player = event.player;
//    const inventory = player.inventory;
//
//    // Logando informações sobre o inventário e seus slots
//    console.log(`Inventário aberto: ${inventory}`);
//    console.log(`Número de slots no inventário: ${inventory.slots.size()}`);
//
//    // Iterando sobre os slots do inventário e identificando os slots adicionados por mods
//    inventory.slots.forEach(slot => {
//        const slotId = slot.id;
//        const slotItem = slot.getItem();
//        const slotX = slot.getX();
//        const slotY = slot.getY();
//
//        // Logando informações sobre cada slot
//        console.log(`Slot ID: ${slotId}, Posição: (${slotX}, ${slotY}), Item: ${slotItem}`);
//
//        // Verificar se o slot pertence a um mod específico e mover o slot
//        if (slotId.startsWith("modid:")) { // Substitua "modid" pelo ID do mod desejado
//            slot.setX(newX); // Defina newX para a nova posição X desejada
//            slot.setY(newY); // Defina newY para a nova posição Y desejada
//        }
//    });
//});