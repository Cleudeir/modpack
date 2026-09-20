//// Importar o evento de clique direito do item
//ItemEvents.rightClicked('grapplemod:launcheritem', event => {
//    event.player.addItemCooldown(event.item, 120)
//  });
//  
//ItemEvents.rightClicked('minecraft:soul_lantern', event => {
//    event.cancel();
//    event.player.tell("Você não pode colocar uma Soul Lantern no mundo!!");
//
//});
//
//BlockEvents.rightClicked('minecraft:soul_lantern', event => {
//    event.cancel();
//    event.player.tell("Você não pode colocar uma Soul Lantern no mundo!");
//
//});
  
//  
//ItemEvents.firstLeftClicked('grapplemod:grapplinghook{tag: {Damage: 0, custom: {throwspeed: 3.5d, maxlen: 60, enderstaff: 1b}}}', event => {
//    event.player.addItemCooldown(event.item, 120);
//	event.success();
//	//event.cancel();
//  });
//  
////  
////ItemEvents.firstLeftClicked('grapplemod:grapplinghook{tag: {Damage: 0, custom: {throwspeed: 3.5d, maxlen: 60, enderstaff: 1b}}}', event => {
////    event.player.addItemCooldown(event.item, 120)
////  });
////  
//
//// Adicionar efeito de regeneração quando a armadura estiver equipada
////PlayerEvents.tick(event => {
////  let player = event.player;
////  let helmet = player.minecraftInventory.getSlots(5); // 3 corresponde ao slot do capacete
////  
////  if (helmet && helmet.id === 'marbledsarsenal:riot_armor_helmet') {
////    player.addEffect('minecraft:regeneration', 200, 0, false, false);
////  }
////});	