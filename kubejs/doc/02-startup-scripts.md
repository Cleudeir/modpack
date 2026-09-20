# 02 — Startup Scripts: Registro de Itens, Blocos, Fluidos e Efeitos

Scripts de `startup_scripts/` rodam **uma única vez na inicialização**, nos dois lados (cliente e servidor). São usados para **registrar e modificar** coisas no início do jogo.

> ⚠️ **Não são recarregáveis** com `/reload`. Requerem reiniciar o jogo (exceto funções `global.*`, que podem ser recarregadas com `/kubejs reload startup_scripts`).

---

## Evento de Registro

O evento principal é `StartupEvents.registry`. O segundo argumento é o **tipo de registro**:

```javascript
StartupEvents.registry('item', event => { })
StartupEvents.registry('block', event => { })
StartupEvents.registry('fluid', event => { })
StartupEvents.registry('enchantment', event => { })
StartupEvents.registry('mob_effect', event => { })
StartupEvents.registry('sound_event', event => { })
StartupEvents.registry('block_entity_type', event => { })
StartupEvents.registry('potion', event => { })
StartupEvents.registry('particle_type', event => { })
StartupEvents.registry('painting_variant', event => { })
StartupEvents.registry('custom_stat', event => { })
StartupEvents.registry('point_of_interest_type', event => { })
StartupEvents.registry('villager_type', event => { })
StartupEvents.registry('villager_profession', event => { })
```

Todos os itens/blocos criados ficam sob o namespace **`kubejs:`** (ex.: `kubejs:test_item`).

---

## 🎒 Registro de Itens (`startup_scripts`)

```javascript
StartupEvents.registry('item', event => {
  // Item básico. Textura em: kubejs/assets/kubejs/textures/item/test_item.png
  event.create('test_item')

  // Textura em local diferente
  event.create('test_item_1').texture('mobbo:item/lava') // -> kubejs/assets/mobbo/textures/item/lava.png

  // Encadear métodos do builder
  event.create('test_item_2').maxStackSize(16).glow(true)

  // Tipo de item no 2º argumento
  event.create('custom_sword', 'sword').tier('diamond').attackDamageBaseline(10)
})
```

### Tipos de item válidos
- `basic` (padrão)
- `sword`, `pickaxe`, `axe`, `shovel`, `shears`, `hoe`
- `helmet`, `chestplate`, `leggings`, `boots`

### Métodos do Item Builder (encadeáveis após `create()`)
| Método | Descrição |
|--------|-----------|
| `maxStackSize(size)` | Tamanho máximo da pilha |
| `unstackable()` | Igual a `maxStackSize(1)` |
| `maxDamage(damage)` | Durabilidade |
| `burnTime(ticks)` | Tempo de queima como combustível |
| `fireResistant(true/false)` | Resistente a fogo? |
| `rarity(rarity)` | `'common'`, `'uncommon'`, `'rare'`, `'epic'` |
| `glow(true/false)` | Brilho de encantado |
| `tooltip(text...)` | Tooltip(s) fixo(s) ex: `.tooltip('Minha descrição')` |
| `color(index, colorHex)` | Cor de tint por camada |
| `color((itemstack, tintIndex) => ...)` | Cor dinâmica por camada |
| `displayName(name)` | Nome de exibição |
| `name(itemstack => ...)` | Nome dinâmico |
| `textureJson(json)` / `modelJson(json)` | Modelo/textura via JSON |
| `texture(customTextureLocation)` | Textura custom |
| `texture(key, location)` | Textura de camada específica |
| `barColor(itemstack => ...)` / `barWidth(itemstack => ...)` | Barra de durabilidade custom |
| `useAnimation(animation)` | `'spear'`, `'crossbow'`, `'eat'`, `'drink'`, `'bow'`, `'block'`, `'spyglass'`, `'none'` |
| `useDuration(itemstack => ...)` | Duração de uso |
| `use((level, player, hand) => ...)` | Ação ao usar |
| `finishUsing((itemstack, level, entity) => ...)` | Ação ao terminar uso |
| `releaseUsing((itemstack, level, entity, tick) => ...)` | Ação ao soltar o botão |
| `tag(resourceLocation)` | Adiciona tag |
| `modifyAttribute(attribute, identifier, d, operation)` | Atributo (dano, velocidade, etc.) |
| `group(groupId)` | Aba criativa (ver IDs abaixo) |
| `containerItem(itemId)` | Item restante (ex.: balde vazio) |
| `subtypes(itemstack => ...)` | Subtipos |
| `food(foodBuilder => ...)` | Torna comestível |
| `modifyTier(tier => ...)` | Modifica tier (armas/armaduras) |

### Métodos de ferramenta (tipo `sword`, `pickaxe`, etc.)
- `tier(toolTier)` — tiers: `wood`, `stone`, `iron`, `gold`, `diamond`, `netherite`
- `modifyTier(tier => ...)`
- `attackDamageBaseline(damage)` / `attackDamageBonus(damage)`
- `speedBaseline(speed)` / `speed(speed)`

### Métodos de armadura (tipo `helmet`, `chestplate`, etc.)
- `tier(armorTier)` — tiers: `leather`, `chainmail`, `iron`, `gold`, `diamond`, `turtle`, `netherite`
- `modifyTier(tier => ...)`

### IDs de abas criativas (vanilla)
`search`, `buildingBlocks`, `decorations`, `redstone`, `transportation`, `misc`, `food`, `tools`, `combat`, `brewing`

---

### 🍖 Comida personalizada

```javascript
StartupEvents.registry('item', event => {
  event.create('magic_steak').food(food => {
    food
      .nutrition(6)             // fome
      .saturation(6)            // saturação
      .effect('minecraft:speed', 600, 0, 1)  // efeito aplicado
      .removeEffect('minecraft:poison')       // remove efeito
      .alwaysEdible()           // como maçã dourada
      .fastToEat()              // como kelp seco
      .meat()                   // cães comem
      .eaten(ctx => {           // código ao comer
        ctx.player.tell(Text.gold('Gostoso!'))
      })
  })
})
```

> 💡 Para o callback `.eaten()` ser recarregável, referencie uma função `global.*`:
> ```javascript
> global.minhaFuncao = ctx => { ctx.player.tell('Mudou! Recarregue!') }
> // ... .eaten(ctx => global.minhaFuncao(ctx))
> ```

---

### ⚔️ Uso personalizado de item (drink, explosão, etc.)

```javascript
StartupEvents.registry('item', event => {
  event.create('nuke_soda')
    .tooltip('§5Sabor de explosão!')
    .useAnimation('drink')
    .useDuration(itemstack => 64)
    .use((level, player, hand) => true)
    .finishUsing((itemstack, level, entity) => {
      entity.potionEffects.add('minecraft:haste', 120 * 20)
      itemstack.shrink(1)
      if (entity.player) {
        entity.minecraftPlayer.addItem(Item.of('minecraft:glass_bottle').itemStack)
      }
      return itemstack
    })
    .releaseUsing((itemstack, level, entity, tick) => {
      itemstack.shrink(1)
      level.createExplosion(entity.x, entity.y, entity.z).explode()
    })
})
```

### 📊 Barra de durabilidade customizada

```javascript
StartupEvents.registry('item', event => {
  event.create('hammer')
    // 0 = vazio, 13 = cheio (acima de 13 some)
    .barWidth(itemstack => itemstack.nbt?.getInt('hit_count') / 13 || 0)
    .barColor(itemstack => Color.AQUA)
})
```

---

## 🧱 Registro de Blocos (`startup_scripts`)

```javascript
StartupEvents.registry('block', event => {
  // Bloco básico -> ID 'kubejs:example_block'
  event.create('example_block')
    .displayName('Meu Bloco Customizado')
    .soundType('wool')          // material (som/propriedades)
    .hardness(1)                // dureza (tempo de mineração)
    .resistance(1)              // resistência à explosão
    .requiresTool(true)         // precisa ferramenta p/ dropar
    .tagBlock('minecraft:mineable/axe')        // minera mais rápido com machado
    .tagBlock('minecraft:mineable/pickaxe')    // ou picareta
    .tagBlock('minecraft:needs_iron_tool')     // tier mínimo de ferro
})
```

### Tipos de bloco (2º argumento do `create`)
| Key | Exemplo |
|-----|---------|
| `basic` | Qualquer bloco (padrão) |
| `slab` | Laje de carvalho |
| `stairs` | Escadas |
| `fence` | Cerca |
| `fence_gate` | Portão |
| `pressure_plate` | Placa de pressão |
| `wall` | Muro |
| `button` | Botão |
| `falling` | Areia |
| `crop` | Trigo (métodos `.survive()`, `.crop()`, `.growTick()`, `.item()` = semente) |
| `cardinal` | Blocos orientáveis |
| `detector` | Detector |

> Métodos completos do BlockBuilder: [https://kubejs.com/wiki/ref/BlockBuilder](https://kubejs.com/wiki/ref/BlockBuilder)

---

## 💧 Registro de Fluidos (`startup_scripts`)

```javascript
const $SoundEvents   = Java.loadClass('net.minecraft.sounds.SoundEvents')
const $ParticleTypes = Java.loadClass('net.minecraft.core.particles.ParticleTypes')

StartupEvents.registry('fluid', event => {
  // 'thin' = visual semelhante à água (textura translúcida)
  event.create('water_clone', 'thin')
    .displayName('Water Clone')
    .tint(0x3F76E4)
    .type(type => type
      .renderType(3)                 // 3 = translucent
      .stillTexture('kubejs:block/thin_fluid_still')
      .flowingTexture('kubejs:block/thin_fluid_flow')
      .addDripstoneDripping(1, $ParticleTypes.DRIPPING_DRIPSTONE_WATER,
        'minecraft:water_cauldron', $SoundEvents.POINTED_DRIPSTONE_DRIP_WATER)
    )

  // 'thick' = visual semelhante à lava
  event.create('lava_clone', 'thick')
    .displayName('Lava Clone')
    .tint(0xff6600)
    .type(type => type
      .renderType(0)                 // 0 = solid
      .stillTexture('kubejs:block/thick_fluid_still')
      .flowingTexture('kubejs:block/thick_fluid_flow')
      .canSwim(false).canDrown(false)
      .density(3000).viscosity(6000)
      .lightLevel(15)
      .addDripstoneDripping(1, $ParticleTypes.DRIPPING_DRIPSTONE_LAVA,
        'minecraft:lava_cauldron', $SoundEvents.POINTED_DRIPSTONE_DRIP_LAVA)
    )
})
```

### Métodos do Fluid Builder
- `displayName(string)`, `translationKey(string)`, `formattedDisplayName(...)`
- `tag(string | string[])`
- `type(builder)`, `tint(color)`
- Tipo (`stillTexture`, `flowingTexture`, `renderType(int)`, `translucent()`)
- `slopeFindDistance(int)`, `levelDecreasePerBlock(int)`, `explosionResistance(float)`, `tickRate(int)`, `noBucket()`, `noBlock()`
- Tipo de fluido: `screenOverlayTexture`, `motionScale`, `canPushEntity`, `canSwim`, `canDrown`, `fallDistanceModifier`, `canExtinguish`, `canConvertToSource`, `supportsBoating`, `pathType`, `sound`, `canHydrate`, `lightLevel(0-15)`, `density`, `temperature`, `viscosity`, `rarity`, `addDripstoneDripping`

### Render types
`0` = solid, `1` = cutout, `2` = cutout mipped, `3` = translucent

### Cores
3 modos: `Color.RED` (wrapper), `0xFF0000` (RGB hex), `0x7F0000FF` (ARGB hex).

---

## 🧪 Efeitos de Mob (Mob Effects)

```javascript
StartupEvents.registry('mob_effect', event => {
  event.create('custom_effect')          // kubejs:custom_effect
    .color(0x000000)                     // cor das partículas
    .beneficial()                        // ou .harmful()
    .effectTick((entity, lvl) => {       // lógica a cada tick sob o efeito
      if (entity.age % 20 != 0) return   // 1x por segundo
      entity.heal(1 * lvl)               // cura (como regeneração)
    })
    .modifyAttribute('minecraft:generic.attack_damage',
      'e0f4e796-3d3d-11ee-be56-0242ac183754',  // UUID único
      1, 'multiply_base')                        // operação
})
```

Métodos: `beneficial()`, `harmful()`, `category(category)`, `color(hex)`, `effectTick(callback)`, `modifyAttribute(attribute, name, number, operation)`.

---

## 📂 Criar/modificar abas criativas

```javascript
// Criar aba criativa nova
StartupEvents.registry('item', event => {
  event.create('meu_icone').texture('kubejs:item/meu_icone')
})
```
E depois (via `StartupEvents.modifyCreativeTab`):
```javascript
StartupEvents.modifyCreativeTab('kubejs:minha_aba', event => {
  event.add('minecraft:stick')
})
```
> Docs detalhadas: [Creating and modifying creative tabs](https://kubejs.com/wiki/tutorials/creative-tabs)

---

## Outros eventos de Startup

| Evento | Uso |
|--------|-----|
| `StartupEvents.init` | Roda no início (register blocks/items/etc.) |
| `StartupEvents.postInit` | Roda depois do init |
| `StartupEvents.registry(...)` | Registro de conteúdo |
| `StartupEvents.modifyCreativeTab` | Modifica abas criativas |
| `ItemEvents.modification` / `BlockEvents.modification` | Modifica itens/blocos **existentes** (propriedades) |
| `ItemEvents.modelProperties` | Model properties para o item |

---

## Próximo: [03-server-scripts.md](03-server-scripts.md) — Receitas, tags, chat e comandos