# 03 — Server Scripts: Receitas, Tags, Chat, Comandos e Eventos

Scripts de `server_scripts/` rodam **quando o mundo/servidor carrega** e podem ser recarregados com **`/reload`**. São usados para todo tipo de lógica que acontece com o jogo rodando.

> Ordem de execução: eventos de tag → geração de dados → receitas → eventos de runtime.

---

## 1️⃣ Receitas (`ServerEvents.recipes`)

Todo script que modifica receitas deve ficar dentro do callback `ServerEvents.recipes`.

```javascript
ServerEvents.recipes(event => {
  // ... adicionar, remover e modificar receitas aqui
  console.log('O evento de receitas foi disparado!')
})
```

### ➕ Adicionar receitas

#### Shaped (grade ordenada, ex.: mesa de crafting)
```javascript
event.shaped(
  Item.of('minecraft:stone', 3),   // saída
  [                                // forma (máx 3 linhas de 3)
    'A B',
    ' C ',
    'B A'
  ],
  {                                // mapeamento de letras -> itens
    A: 'minecraft:andesite',
    B: 'minecraft:diorite',
    C: 'minecraft:granite'
  }
)
```

#### Shapeless (qualquer posição na grade; total de itens ≤ 9)
```javascript
event.shapeless(
  Item.of('minecraft:dandelion', 3),   // saída
  [                                    // entradas
    'minecraft:bone_meal',
    'minecraft:yellow_dye',
    '3x minecraft:ender_pearl'         // quantidade com prefixo
  ]
)
```

#### Smithing (tabela de ferraria)
```javascript
// 1.20 em diante (4 argumentos — com modelo/trimm)
event.smithing(
  'minecraft:netherite_ingot',                      // saída
  'minecraft:netherite_upgrade_smithing_template',  // modelo (template)
  'minecraft:iron_ingot',                           // item a ser melhorado
  'minecraft:black_dye'                             // item de upgrade
)
```

#### Smelting & Cozinhar (forno, alto-forno, defumador, fogueira)
```javascript
event.smelting('3x minecraft:gravel', 'minecraft:stone')           // Fornalha
event.blasting('10x minecraft:iron_nugget', 'minecraft:iron_ingot') // Alto-forno
event.smoking('minecraft:tinted_glass', 'minecraft:glass').xp(0.35) // Defumador
event.campfireCooking('minecraft:torch', 'minecraft:stick', 0.35, 600) // Fogueira (xp, ticks)
```

#### Stonecutting (cortador de pedra)
```javascript
event.stonecutting('3x minecraft:stick', '#minecraft:planks')  // aceita tags
```

#### Receitas JSON/custom de mods (`event.custom`)
Qualquer mod que usa o sistema de datapack funciona. Pegue o JSON do mod (descompacte o `.jar` ou veja o GitHub dele em `src/generated/resources/data/<mod>/recipes/`).

```javascript
// Ex.: cortar bolo no Farmer's Delight
event.custom({
  type: 'farmersdelight:cutting',
  ingredients: [ { item: 'minecraft:cake' } ],
  tool: { tag: 'forge:tools/knives' },
  result: [ { item: 'farmersdelight:cake_slice', count: 7 } ]
})

// Ex.: liga no Tinkers' Construct
event.custom({
  type: 'tconstruct:alloy',
  inputs: [
    { tag: 'forge:molten_gold', amount: 90 },
    { tag: 'forge:molten_silver', amount: 90 }
  ],
  result: { fluid: 'tconstruct:molten_electrum', amount: 180 },
  temperature: 760
})
```

### ➖ Remover receitas (`event.remove`)

O filtro pode ser por:
- saída: `{output: 'mod:id'}`
- entrada: `{input: 'mod:id'}`
- mod: `{mod: 'mod_id'}`
- ID único: `{id: 'mod:receita'}`
- tags: `{output: '#minecraft:wool'}`
- combinações:
  - **TODAS** as condições: `{a: 'x', b: 'y'}`
  - **QUALQUER** condição: `[{a: 'x'}, {b: 'y'}]`
  - **NEGAÇÃO**: `{not: {condicao: 'valor'}}`

```javascript
event.remove({})                                          // remove TUDO (nadde recomendado!)
event.remove({ output: 'minecraft:stone_pickaxe' })
event.remove({ output: '#minecraft:wool' })               // por tag
event.remove({ input: '#forge:dusts/redstone' })          // por entrada
event.remove({ mod: 'farmersdelight' })                   // tudo de um mod
event.remove({ type: 'minecraft:campfire_cooking' })      // por tipo
event.remove({ not: { type: 'minecraft:smelting' }, output: 'stone' })
event.remove({ output: 'minecraft:cooked_chicken', type: 'minecraft:campfire_cooking' })
event.remove([                                            // blasting OU smelting
  { type: 'minecraft:smelting',  output: 'minecraft:iron_ingot' },
  { type: 'minecraft:blasting',  output: 'minecraft:iron_ingot' }
])
event.remove({ id: 'minecraft:glowstone' })
```

> 🔎 Para descobrir o **ID único** de uma receita: ative tooltips avançados com `F3+H` e passe o mouse sobre a saída.

### 🔄 Modificar receitas (substituir entrada/saída)

```javascript
// Trocar todos os paus por mudas nas receitas que usam pau
event.replaceInput(
  { input: 'minecraft:stick' },   // filtro
  'minecraft:stick',              // item a substituir
  '#minecraft:saplings'           // substitui por (aceita tag)
)

// Trocar saída de pedra por pedregulho em tudo
event.replaceOutput({}, 'minecraft:stone', 'minecraft:cobblestone')
```

### 🛠️ Técnicas avançadas

```javascript
ServerEvents.recipes(event => {
  // Função auxiliar (helper) para não repetir código
  const potting = (output, pottedInput) => {
    event.shaped(output, ['BIB', ' B '], { B: 'minecraft:brick', I: pottedInput })
  }
  potting('kubejs:potted_snowball', 'minecraft:snowball')
  potting('kubejs:potted_lava', 'minecraft:lava_bucket')

  // Loop
  const metais = ['iron', 'copper', 'gold', 'netherite']
  metais.forEach(metal => {
    event.shapeless(`kubejs:${metal}_plate`, [`minecraft:${metal}_ingot`, 'kubejs:hammer'])
      .damageIngredient('kubejs:hammer')
  })
})

// Utilitários úteis para descobrir tipos
ServerEvents.recipes(event => {
  event.printTypes()          // tipos de receita em uso
  event.printAllTypes()       // todos os tipos disponíveis
  event.printExamples('type') // exemplo de receita de um tipo
})
```

### 🗡️ Eventos de receita complementares

| Evento | Uso |
|--------|-----|
| `ServerEvents.afterRecipes` | Roda DEPOIS de todas as receitas |
| `ServerEvents.compostableRecipes` | Adiciona/remove compostáveis (composteira) |
| `ServerEvents.specialRecipeSerializers` | Serializers especiais |
| `ServerEvents.stage(...)` | Receitas por "stage" (gating de receitas) |

```javascript
// Ex.: receita em estágio
ServerEvents.recipes(event => {
  event.shaped('minecraft:diamond', ['DDD','DDD','DDD'], {D: 'minecraft:dirt'})
    .stage('projeto_especial')   // só vai funcionar para quem tiver esse stage
})
// player.stages.add('projeto_especial')
```

---

## 2️⃣ Tags (`ServerEvents.tags`)

Tags são por **item/bloco/fluido/tipo de entidade** (não dá para usar NBT).

```javascript
// Tags de item
ServerEvents.tags('item', event => {
  event.add('forge:cobblestone', 'minecraft:diamond_ore')     // adiciona
  event.remove('forge:cobblestone', 'minecraft:mossy_cobblestone') // remove
  event.removeAll('forge:ingots/copper')                      // esvazia a tag
  event.add('forge:completely_new_tag', 'minecraft:clay_ball') // cria tag nova
  event.add('c:stones', '#forge:stone')                       // tag de tag
  event.removeAllTagsFrom('minecraft:stick')                  // remove todas as tags do item
})

// Tags de bloco — afetam propriedades reais!
ServerEvents.tags('block', event => {
  event.add('minecraft:climbable', 'minecraft:tall_grass')    // agora escalável!
})
```

Outros registros aceitos como 1º argumento: `fluid`, `entity_type`, `enchantment`, e tags de outros mods (use o namespace! `ex.: 'mod_id:minha_tag'`).

> ⚠️ Receitas usam **tags de item** — mesmo para blocos (pedregulho vai como item tag), senão não funciona nas receitas.

---

## 3️⃣ Chat e Comandos

### Evento de chat (`PlayerEvents.chat`) — cancelável
```javascript
PlayerEvents.chat(event => {
  if (event.message.trim().toLowerCase() == 'creeper') {
    event.server.scheduleInTicks(1, event.server, ctx => {   // 1 tick depois
      ctx.data.tell(Text.green('Aw man'))                    // senão sai antes da msg
    })
  }
})

// Cancelar mensagens que começam com "!"
PlayerEvents.chat(event => {
  if (event.message.startsWith('!some_command')) {
    event.player.tell('Oi!')
    event.cancel()        // não envia pro chat
  }
})
```

### Decorar chat (`PlayerEvents.decorateChat`) — não cancelável, 1.19.2+
```javascript
PlayerEvents.decorateChat(event => {
  event.setMessage(event.message.replace(':sword:', '⚔'))
})
```

### Registrar comandos (`ServerEvents.commandRegistry`) — exemplo `/fly`
```javascript
ServerEvents.commandRegistry(event => {
  const { commands: Commands, arguments: Arguments } = event

  event.register(Commands.literal('fly')                      // nome do comando
    .requires(source => source.hasPermission(2))              // precisa OP (perm 2)
    .executes(ctx => fly(ctx.source.player))                  // /fly
    .then(Commands.argument('target', Arguments.PLAYER.create(event))
      .executes(ctx => fly(Arguments.PLAYER.getResult(ctx, 'target')))) // /fly <jogador>
  )

  const fly = (player) => {
    if (player.abilities.mayfly) {
      player.abilities.mayfly = false
      player.abilities.flying = false
      player.displayClientMessage(Component.gold('Voando: ').append(Component.red('desativado')), true)
    } else {
      player.abilities.mayfly = true
      player.displayClientMessage(Component.gold('Voando: ').append(Component.green('ativado')), true)
    }
    player.onUpdateAbilities()
    return 1
  }
})
```

### Comando customizado fácil (`ServerEvents.customCommand`)
```javascript
// Roda com: /kubejs custom_command diamantes
ServerEvents.customCommand('diamantes', event => {
  event.player.give(Item.of('minecraft:diamond', 64))
})
```

---

## 4️⃣ Eventos de Jogador (`PlayerEvents`)

| Evento | Uso | Cancelável? |
|--------|-----|:---:|
| `PlayerEvents.loggedIn` | Jogador entrou | ❌ |
| `PlayerEvents.loggedOut` | Jogador saiu | ❌ |
| `PlayerEvents.respawned` | Jogador renasceu | ❌ |
| `PlayerEvents.tick` | A cada tick do jogador | ❌ |
| `PlayerEvents.advancement` | Jogador ganhou conquista | ✅ |
| `PlayerEvents.chat` | Jogador enviou mensagem | ✅ |
| `PlayerEvents.decorateChat` | Decorar mensagem | ❌ |
| `PlayerEvents.inventoryChanged` | Inventário mudou | ❌ |
| `PlayerEvents.inventoryOpened/Closed` | Abriu/fechou inventário | ✅ |
| `PlayerEvents.chestOpened/Closed` | Abriu/fechou baú | ✅ |
| `PlayerEvents.blockPlace` | Jogador colocou bloco | ✅ |
| `PlayerEvents.blockBreak` | Jogador quebrou bloco | ✅ |

```javascript
PlayerEvents.loggedIn(event => {
  event.player.tell('§aBem-vindo ao servidor, ' + event.player.getName().getString() + '!')
})

PlayerEvents.inventoryChanged(event => {
  // Detecta quando o jogador ganhou um item específico
  if (event.item.id == 'minecraft:diamond') {
    event.player.tell('§bVocê pegou um diamante!')
  }
})
```

---

## 5️⃣ Eventos de Mundo e Entidades

### Blocos (`BlockEvents`)
| Evento | Uso | Cancelável? |
|--------|-----|:---:|
| `BlockEvents.placed` | Bloco colocado | ✅ |
| `BlockEvents.broken` | Bloco quebrado | ✅ |
| `BlockEvents.rightClicked` / `leftClicked` | Bloco clicado | ✅ |
| `BlockEvents.farmlandTrampled` | Plantio pisoteado | ✅ |
| `BlockEvents.modification` | Modifica blocos existentes (startup) | ❌ |

```javascript
BlockEvents.placed(event => {
  if (event.block.id == 'minecraft:tnt') {
    event.player.tell('§cCuidado com a dinamite!')
  }
})
```

### Entidades (`EntityEvents`)
| Evento | Uso | Cancelável? |
|--------|-----|:---:|
| `EntityEvents.spawned` | Entidade nasceu | ❌ |
| `EntityEvents.death` | Entidade morreu | ❌ |
| `EntityEvents.hurt` | Entidade sofreu dano | ✅ |
| `EntityEvents.checkSpawn` | Antes de spawnar | ✅ |

```javascript
EntityEvents.death(event => {
  if (event.entity.type == 'minecraft:zombie') {
    event.entity.level.createExplosion(event.entity.x, event.entity.y, event.entity.z).explode()
  }
})
```

### Níveis/Mundos (`LevelEvents`)
| Evento | Uso |
|--------|-----|
| `LevelEvents.loaded` | Mundo carregou |
| `LevelEvents.unloaded` | Mundo descarregou |
| `LevelEvents.tick` | A cada tick do mundo |
| `LevelEvents.beforeExplosion` / `afterExplosion` | Explosões |

### Itens (`ItemEvents`)
| Evento | Uso | Cancelável? |
|--------|-----|:---:|
| `ItemEvents.crafted` | Item foi fabricado | ❌ |
| `ItemEvents.smelted` | Item saiu da fornalha | ❌ |
| `ItemEvents.foodEaten` | Comida consumida | ❌ |
| `ItemEvents.pickedUp` / `dropped` | Pegou/soltou item | ✅ |
| `ItemEvents.rightClicked` / `leftClicked` | Item usado | ✅ |
| `ItemEvents.entityInteracted` | Item usado numa entidade | ❌ |
| `ItemEvents.modification` | Modifica itens existentes (startup) | ❌ |
| `ItemEvents.dynamicTooltips` | Tooltip dinâmico por frame (client) | ❌ |

```javascript
ItemEvents.crafted(event => {
  if (event.item.id == 'minecraft:diamond_block') {
    event.player.tell('§bProgresso no desafio!')
  }
})
```

---

## 6️⃣ Geração de dados (`ServerEvents.generateData`)

KubeJS permite **gerar datapacks virtuais** via código, em 3 estágios:
`BEFORE_MODS`, `AFTER_MODS`, `LAST`.

```javascript
ServerEvents.generateData('after_mods', event => {
  // Serve para gerar arquivos em 'kubejs/data/...' via código
})
```

> 📦 Na prática, no 1.20.1 o caminho mais simples continua sendo **colocar os arquivos diretamente** em `kubejs/data/` e `kubejs/assets/`.

---

## Próximo: [04-client-scripts.md](04-client-scripts.md) — Tooltips, eventos de cliente e idiomas