// priority: 10
// Admin Remote - Item Customizado para Painel Admin

StartupEvents.registry('item', event => {
    event.create('admin_remote')
        .displayName('§6§lAdmin Remote')
        .tooltip('§eClique direito para abrir o painel')
        .tooltip('§cSegure Shift + Clique para ver comandos')
        .rarity('epic')
        .maxStackSize(1)
})
