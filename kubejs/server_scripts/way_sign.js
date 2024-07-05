
PlayerEvents.loggedIn(event => {
    const player = event.player;

    // Verifique se o jogador está entrando pela primeira vez
    if (!player.persistentData.hasJoinedBefore) {
        // Marque que o jogador já entrou no servidor
        player.persistentData.hasJoinedBefore = true;

        // Execute o comando "locate structure supplementaries:way_sign"
        player.server.runCommandSilent(`/execute as ${player.name.string} run locate structure supplementaries:way_sign`);
    }
});