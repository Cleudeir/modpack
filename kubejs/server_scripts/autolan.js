// ================================================================
//  AUTO OPEN TO LAN
//  Automatically opens the singleplayer world to LAN on server start.
// ================================================================

var $GameType = Java.loadClass('net.minecraft.world.level.GameType');

ServerEvents.loaded(function (event) {
    try {
        var server = event.server;
        
        // Check class name to determine if it's IntegratedServer (singleplayer)
        var className = server.getClass().getName();
        console.log('[AutoLAN] Server class: ' + className);
        
        if (className.indexOf('IntegratedServer') !== -1) {
            // Direct method calls — Rhino auto-dispatches to Java
            if (!server.isPublished()) {
                server.publishServer($GameType.SURVIVAL, true, 0);
                console.log('[AutoLAN] World opened to LAN (port auto-assigned)');
            } else {
                console.log('[AutoLAN] World already published to LAN');
            }
        }
    } catch (e) {
        console.log('[AutoLAN] Error: ' + e);
    }
});
