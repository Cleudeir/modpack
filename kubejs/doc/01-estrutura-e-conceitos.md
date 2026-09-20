# 01 — Estrutura e Conceitos do KubeJS

## O que é o KubeJS?

KubeJS é uma **biblioteca de scripts** que permite personalizar o Minecraft usando **JavaScript**. Com ele você pode:

- Criar itens, blocos, fluidos e efeitos personalizados
- Modificar receitas de qualquer mod
- Mudar tags de itens/blocos
- Tratar eventos de servidor (jogador, mundo, entidades)
- Personalizar a interface do cliente (tooltips, painel)

Ele funciona como **uma API unificada** para Forge, Fabric e NeoForge (via Architectury), e apenas **envolve (wraps) classes do Minecraft** — ou seja, usa eventos, registros e datapacks do próprio jogo.

> ⚠️ **Importante:** É obrigatório saber o **básico de JavaScript** antes de usar KubeJS (funções, arrays, objetos, arrow functions, callbacks).

---

## Estrutura de Pastas

Quando você roda o jogo com o KubeJS instalado, a pasta `kubejs/` é gerada dentro da sua pasta do Minecraft (`versions/modpack/kubejs/` no seu caso).

| Pasta | Função | Recarregável? |
|-------|--------|---------------|
| `startup_scripts/` | Registro de itens, blocos, fluidos, efeitos, abas criativas | ❌ Requer reiniciar o jogo (ou `/kubejs reload startup_scripts` para funções globais) |
| `server_scripts/` | Receitas, tags, eventos de jogador/mundo, geração de dados | ✅ `/reload` ou `/kubejs reload server_scripts` |
| `client_scripts/` | Tooltips, UI, idiomas, eventos de cliente | ✅ `F3+T` ou `/kubejs reload client_scripts` |
| `data/` | Funciona como uma **pasta de datapack** (worldgen, loot tables, advanvements...) — sempre carrega por último | — |
| `assets/` | Funciona como uma **pasta de resource pack** (texturas, modelos, lang) — sempre carrega | — |
| `config/` | Configurações do próprio KubeJS | — |
| `exported/` | Dumps de dados (texture atlases, inventário, etc.) gerados por comandos | — |

### Server Startup
Além dos 3 tipos principais, existe também o **Server Startup**: scripts que rodam quando o servidor carrega, ANTES dos eventos normais de servidor. Se você colocar um script na pasta server_scripts que registra um evento *de uma vez*, ou que precisa executar código imediatamente no carregamento do servidor, ele roda como Server Startup.

---

## Conceitos Básicos

### Modelo orientado a eventos

KubeJS usa um modelo **baseado em eventos**. Você registra "listeners" (funções de callback) que são chamados em pontos específicos do ciclo de vida do jogo:

```javascript
// Sintaxe: GrupoDeEventos.NomeDoEvento(callback => { ... })
ServerEvents.recipes(event => {
  // código que roda quando o servidor está pronto para modificar receitas
})

PlayerEvents.loggedIn(event => {
  // código que roda quando um jogador entra no servidor
})

StartupEvents.registry('item', event => {
  // código que roda no registro de itens (startup)
})
```

### Grupos de eventos (Event Groups)

| Grupo | Script | Finalidade |
|-------|--------|------------|
| `StartupEvents` | startup | Modificações de registro (`INIT`, `REGISTRY`, `POST_INIT`) |
| `ServerEvents` | server | Lógica do servidor (`RECIPES`, `LOADED`, `TAGS`, `GENERATE_DATA`) |
| `ClientEvents` | client | UI e renderização do lado do cliente |
| `LevelEvents` | server | Eventos de mundo (blocos, entidades, explosões) |
| `PlayerEvents` | server | Ações do jogador (login, chat, inventário) |
| `ItemEvents` | server | Interações com itens (crafting, smelting) |
| `BlockEvents` | server | Interações com blocos (colocar, quebrar, modificar) |
| `EntityEvents` | server | Eventos de entidades (spawn, morte, dano) |
| `NetworkEvents` | server/client | Pacotes de rede |
| `RecipeViewerEvents` | client | JEI/REI/EMI (ocultar entradas/receitas) |

### Objetos globais úteis

| Objeto | Uso |
|--------|-----|
| `Item.of('mod:id')` | Cria/referencia um item (aceita NBT, `'3x minecraft:stone'` para contagem) |
| `Ingredient.of(...)` | Cria um ingrediente (aceita item, tag `'#minecraft:planks'`, regex `/mod_id:.*/`) |
| `Text.gold('...')`, `Text.of(...)` | Cria componentes de texto com cor/formatação |
| `Component.gold(...)` | Mesma coisa que `Text`, alias de componente |
| `Color.RED`, `Color.AQUA` | Cores prontas |
| `Java.loadClass('classe.java')` | Acessa classes Java do Minecraft/mods |
| `global.minhaFuncao = ...` | Compartilha funções entre scripts (global scope) |
| `event.server`, `event.player`, `event.level` | Objetos do servidor/jogador/mundo |
| `event.server.scheduleInTicks(n, data, cb)` | Agenda tarefas para daqui a N ticks |

---

## ProbeJS (essencial!)

[ProbeJS](https://modrinth.com/mod/probejs) é um **addon indispensável** do KubeJS que gera **autocompletar de código** (IntelliSense) no VS Code baseado em TypeScript.

Como usar:
1. Instale o ProbeJS junto com o KubeJS
2. Inicie o jogo, entre em um mundo e rode `/probejs dump`
3. Abra a pasta do modpack no VS Code e abra a pasta `kubejs`
4. Pronto: autocompletar com documentação de métodos, objetos e eventos!

> 💡 Com ProbeJS você descobre **quais métodos existem** para cada builder sem precisar de docs externas.

---

## Vida útil dos scripts (lifecycle)

1. **Startup** → roda 1x na inicialização, antes dos registries serem congelados. Usado para registrar itens/blocos/fluidos/efeitos.
2. **Server** → roda quando o mundo/servidor carrega, **nessa ordem**:
   - eventos de **tags** (pre-tag) → `ServerEvents.tags`
   - **geração de dados** → `ServerEvents.generateData`
   - **receitas** → `ServerEvents.recipes` (e `afterRecipes`)
   - **eventos de runtime** → players, levels, blocks, entities
3. **Client** → roda no cliente para UI, tooltips, assets.

> ⚠️ Scripts de startup **não podem ser recarregados** porque os registries são congelados após a inicialização. Receitas e eventos de servidor sim.

---

## Próximo: [02-startup-scripts.md](02-startup-scripts.md) — Registro de itens, blocos, fluidos e efeitos