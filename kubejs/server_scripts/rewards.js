//let ticksPerDay = 1000;
//let daysInterval = 1;
//let intervalTicks = ticksPerDay * daysInterval;
//
//PlayerEvents.tick(event => {
//    if (event.player.level.world.time % 20 != 0) return; // Run every 20 ticks (1 second)
//	let a = event.level;
//	let b = event.time;
//	let c = event.level.time;
//	event.player.tell(`${a}`);
//	event.player.tell(`${b}`);
//	event.player.tell(`${c}`);
//
//    let player = event.player;
//    let data = player.persistentData;
//
//    if (!data.tickCount) {
//        data.tickCount = 0;
//    }
//
//    data.tickCount += 20; // Increment by 20 ticks since we check every 20 ticks
//
//    if (data.tickCount >= intervalTicks) {
//        data.tickCount = 0;
//        let bundle = Item.of('minecraft:bundle').withTag({Items: [{id: "minecraft:enchanted_golden_apple", Count: 1}]});
//        player.give(bundle);
//        player.tell('You have received a bundle with an enchanted golden apple!');
//    }
//});