// Importando o módulo fs para manipulação de arquivos
const fs = require('fs');

// Função para obter a data atual no formato yyyymmdd
function getFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// Evento que é executado quando o datapack do servidor é carregado pela primeira vez
StartupEvents.registry('minecraft:item', event => {
    const dateString = getFormattedDate();
    const serverPropertiesPath = './server.properties';

    try {
        let serverProperties = fs.readFileSync(serverPropertiesPath, 'utf8');
        serverProperties = serverProperties.replace(/motd=.*/, `motd=Servidor_${dateString}`);
        fs.writeFileSync(serverPropertiesPath, serverProperties, 'utf8');
        console.log(`Nome do servidor atualizado para: Servidor_${dateString}`);
    } catch (error) {
        console.error('Erro ao atualizar o nome do servidor:', error);
    }
});