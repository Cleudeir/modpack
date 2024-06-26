//MobGriefingEvents.canGrief(event => {
//    try {
//        let entity = event.getEntity();
//
//        // Debugging: Log the entity
//        event.server.tell(`Entidade tentando causar dano: ${entity ? entity : 'N/A'}`);
//
//        // Check if the entity is a monster
//        if (entity && entity.isMonster()) {
//            // Cancel the mob griefing event if the entity is a monster
//            event.cancel();
//            event.server.tell(`Griefing por monstro foi cancelado para ${entity}`);
//        }
//    } catch (error) {
//        event.server.tell(`Ocorreu um erro ao processar o evento de mob griefing: ${error.message}`);
//    }
//});
//
//BlockEvents.broken(event => {
//    try {
//	let a = event.getEntity();
//	let b = event.getBlock();
//	event.server.tell(Text.yellow(`${a}`));
//	event.server.tell(Text.blue(`${b}`));
//    } catch (error) {
//        event.server.tell(Text.red(`Ocorreu um erro: ${error.message}`));
//    }
//});

//BlockEvents.rightClicked(event => {
//	// Check if the entity breaking the block is a player
//	let entity = event.getHand();
//	event.server.tell(`OLHA ${entity}`)
//	function spawnParticles() {
//    world.spawnParticles(ParticleTypes.COMPOSTER, event.block + 0.5, event.block + 0.5, event.block + 0.5, 10, 0.5, 0.5, 0.5, 0.01);
//	}
//  
//	if (!entity.isPlayer()) {
//	// Capture the broken block's position and type
//		let blockPos = event.getBlock().getPos();
//		let blockType = event.getBlock().getId();
//		event.server.tell(`Um jogador quebrou um bloco de ${blockType} em (${blockPos.x}, ${blockPos.y}, ${blockPos.z})`);
//		event.server.runCommandSilent(`playsound minecraft:block.anvil.land master @a ${blockPos.x} ${blockPos.y} ${blockPos.z} 1.0 1.0`)				
//		event.server.scheduleInTicks(120, () => {    
//		// Play a special sound effect at the block's position
//				event.block.set(blockType)
//				event.cancel();
//		});
//	}
//});
//
//BlockEvents.leftClicked(event => {
//	// Check if the entity breaking the block is a player
//	let entity = event.getHand();
//	event.server.tell(`OLHA!! ${entity}`)
//	function spawnParticles() {
//    world.spawnParticles(ParticleTypes.COMPOSTER, event.block + 0.5, event.block + 0.5, event.block + 0.5, 10, 0.5, 0.5, 0.5, 0.01);
//	}
//  
//	if (!entity.isPlayer()) {
//	// Capture the broken block's position and type
//		let blockPos = event.getBlock().getPos();
//		let blockType = event.getBlock().getId();
//		event.server.tell(`Um jogador quebrou um bloco de ${blockType} em (${blockPos.x}, ${blockPos.y}, ${blockPos.z})`);
//		event.server.runCommandSilent(`playsound minecraft:block.anvil.land master @a ${blockPos.x} ${blockPos.y} ${blockPos.z} 1.0 1.0`)				
//		event.server.scheduleInTicks(120, () => {    
//		// Play a special sound effect at the block's position
//				event.block.set(blockType)
//				event.cancel();
//		});
//	}
//});

//BlockEvents.broken(event => {
//  // Check if the entity breaking the block is a monster
//  let entity = event.getEntity();
//  if (entity.isPlayer()) {
//    // Capture the broken block's position and type
//    let blockPos = event.getBlock().getPos();
//    let blockType = event.getBlock().getId();
//    
//    // Announce the broken block in the chat
//    event.server.tell(`Um monstro quebrou um bloco de ${blockType} em (${blockPos.x}, ${blockPos.y}, ${blockPos.z})`);
//    
//    // Play a special sound effect at the block's position
//    event.server.runCommandSilent(`playsound minecraft:entity.lightning_bolt.thunder master @a ${blockPos.x} ${blockPos.y} ${blockPos.z} 1.0 1.0`);
//    
//    // Schedule the block to be replaced after 180 seconds (3 minutes)
//    event.server.scheduleInTicks(20, (event.server), callback => { // 3600 ticks = 3 minutes (1 second = 20 ticks)
//    // Get the current block at the position
//    //let currentBlock = event.getLevel().getBlock(blockPos);
//    // Replace the block with the original type
//	event.server.getLevel().setBlock(blockPos, blockType);
//    // Check if the block is still air (indicating it hasn't been replaced)
//    //if (currentBlock.getId() === 'minecraft:air') {
//    //  // Replace the block with the original type
//    //  event.getLevel().setBlock(blockPos, blockType);
//    //}
//    });
//  }
//});

///2
////// server_scripts/main.js
////
//BlockEvents.broken(event => {
//  // Check if the entity breaking the block is a monster
//  let entity = event.getEntity();
//  if (entity.isPlayer()) {
//    // Capture the broken block's position and type
//    let blockPos = event.getBlock().getPos();
//    let blockType = event.getBlock().getId();
//    
//    // Play a special sound effect at the block's position
//    event.server.tell(`Um monstro quebrou um bloco de ${blockType} em (${blockPos.x}, ${blockPos.y}, ${blockPos.z})`);
//    
//    // Schedule the block to be replaced after 180 seconds (3 minutes)
//    event.server.schedule(40, () => { // 3600 ticks = 3 minutes (1 second = 20 ticks)
//      // Get the current block at the position
//      let currentBlock = event.server.getLevel().getBlock(blockPos);
//	  event.server.tell(`${currentBlock}`)
//	  //event.server.getLevel().setBlock(blockPos, blockType);
//      
//      // Check if the block is still air (indicating it hasn't been replaced)
//      //if (currentBlock.getId() == 'minecraft:air') {
//      //  // Replace the block with the original type
//      //  event.server.getLevel().setBlock(blockPos, blockType);
//      //}
//    });
//  }
//});