PlayerEvents.respawned(event => {

    let player = event.player;
	let playername = player.getName().getString();	
//	let heartIcon = "\u2764";  // Ícone de coração	
//	const MobEffects = Java.loadClass('net.minecraft.world.effect.MobEffects');
//	
//
//	player.runCommandSilent(`gamemode survival ${playername}`);		
//	let customHealth = player.persistentData.getInt("customHealth") || player.getHealth();
//	let newHealth = customHealth-4;
//	    if (newHealth <= 2) {
//		player.runCommandSilent(`gamemode spectator ${playername}`);	
//		player.persistentData.putInt("customHealth", 20);
//		player.runCommandSilent(`title ${playername} title {"text":"Game over.","bold":false,"color":"#D62828"}`);
//	return;}
//	player.runCommandSilent(`health set ${playername} ${newHealth}`);
//	player.persistentData.putInt("customHealth", newHealth);
//	//player.tell(`HP reduzido para ${newHealth/2}!`);
//	player.runCommandSilent(`title ${playername} title {"text":"${newHealth/2}${heartIcon}!","bold":false,"color":"#D62828"}`);
	player.runCommandSilent(`effect give ${playername} minecraft:regeneration 90 4`);	
	player.runCommandSilent(`effect give ${playername} minecraft:resistance 90 4`);	
});


//ItemEvents.foodEaten('minecraft:golden_apple', event => {
//	let player = event.player			
//	let playername = player.getName().getString();	
//	let heartIcon = "\u2764";  // Ícone de coração	
//	
//	let customHealth = player.persistentData.getInt("customHealth") || player.getHealth();		
//	let newHealth = customHealth+4;	
//	if (newHealth >= 20) {
//		player.persistentData.putInt("customHealth", 20);
//		player.runCommandSilent(`health set ${playername} 20`);		
//		player.runCommandSilent(`title ${playername} title {"text":"Max ${heartIcon}!","bold":false,"color":"#F77F00"}`);
//		event.cancel()
//	return;}	
//	player.runCommandSilent(`health set ${playername} ${newHealth}`);
//	player.persistentData.putInt("customHealth", newHealth);
//	player.runCommandSilent(`title ${playername} title {"text":"${newHealth/2}${heartIcon}!","bold":false,"color":"#F77F00"}`);
//	event.cancel()
//});

ItemEvents.foodEaten('minecraft:golden_apple', event => {
	let player = event.player			
	let playername = player.getName().getString();	
	
	player.runCommandSilent(`summon wrd:ancient_skeleton_skull`);
	
	event.cancel()
});	