# 04 — Client Scripts: Tooltips, Eventos de Cliente e Idiomas

Scripts de `client_scripts/` rodam **no lado do cliente** e são recarregados com **`F3+T`**. São usados para coisas visuais: tooltips, tela (Painter), traduções, interface de receitas (JEI/REI/EMI).

---

## 1️⃣ Tooltips em itens (`ItemEvents.tooltip`)

```javascript
ItemEvents.tooltip(event => {
  // Tooltip fixo em vários itens
  event.add(['quark:backpack', 'quark:magnet', 'quark:crate'], 'Adicionado pelo pack')

  // Regex (qualquer item do refinedstorage que comece com red_)
  event.add(/refinedstorage:red_/, 'Pode ser de qualquer cor')

  // Várias linhas
  event.add('thermal:latex_bucket', [
    "Não é equivalente ao Latex do IF",
    'Linha 2 aqui'
  ])

  // Usa dados do cliente (nome do jogador)
  event.add('minecraft:skeleton_skull',
    Text.of('Isso já foi a cabeça do ').append(Client.player.name))

  // Tooltip avançado — controla o índice das linhas
  event.addAdvanced('minecraft:beacon', (item, advanced, text) => {
    if (!event.shift) {
      text.add(1, [Text.of('Segure ').gold(), Text.of('Shift ').yellow(), Text.of('para ver mais.').gold()])
    } else {
      text.add(1, Text.green('Dá efeitos positivos em um raio').bold(true))
      text.add(2, Text.red('Requer base de metais preciosos!'))
      text.add(3, [Text.white('Ferro, '), Text.aqua('Diamantes, '), Text.gold('Ouro '), Text.white('ou '), Text.green('Esmeraldas')])
    }
  })

  // Exibir NBT com Alt
  event.addAdvanced(Ingredient.all, (item, advanced, text) => {
    if (event.alt && item.nbt) {
      text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)))
    }
  })

  // Mostrar nome do dono de uma cabeça de jogador
  event.addAdvanced('minecraft:player_head', (item, advanced, text) => {
    const playerName = item.nbt?.SkullOwner?.Name
    if (playerName) {
      text.add(Text.red(`Cabeça de ${playerName}`))
    }
  })
})
```

### Teclas disponíveis no `addAdvanced`
- `event.shift` — Segurar Shift
- `event.alt` — Segurar Alt
- `event.ctrl` — Segurar Ctrl

### `ItemEvents.dynamicTooltips` (por frame, client)
Tooltips que recalculam **a cada frame** — para valores que mudam constantemente.

---

## 2️⃣ Eventos de Cliente (`ClientEvents`)

| Evento | Uso | Cancelável? |
|--------|-----|:---:|
| `ClientEvents.init` | Inicialização do cliente | ❌ |
| `ClientEvents.tick` | A cada tick do cliente | ❌ |
| `ClientEvents.loggedIn` / `loggedOut` | Entrou/saiu do jogo | ❌ |
| `ClientEvents.lang` | Modificar traduções | ❌ |
| `ClientEvents.highPriorityAssets` | Assets de alta prioridade (painter, etc.) | ❌ |
| `ClientEvents.painterUpdated` | Painter atualizado | ❌ |
| `ClientEvents.paintScreen` | Desenhar na tela (Painter API) | ❌ |
| `ClientEvents.leftDebugInfo` / `rightDebugInfo` | Modificar HUD de debug (F3) | ❌ |

### 🌐 Modificar traduções (`ClientEvents.lang`)
```javascript
ClientEvents.lang('en_us', event => {
  event.add('kubejs:meu_item', 'My Item')
  event.addAll({
    'kubejs:item_a': 'Item A',
    'kubejs:item_b': 'Item B'
  })
  event.rename('kubejs:meu_item', 'Novo Nome')
})
```
> Também dá para usar arquivos `kubejs/assets/kubejs/lang/en_us.json` (resource pack virtual).

---

## 3️⃣ Painter API (desenhar na tela)

```javascript
ClientEvents.paintScreen(event => {
  const painter = event.painter
  // Ex.: desenhar um retângulo
  painter.fill(10, 10, 100, 40, Color.RED)
})
```
> Docs completas: [Painter API](https://kubejs.com/wiki/tutorials/painter-api)

---

## 4️⃣ Recipe Viewer (JEI / REI / EMI)

> ⚠️ No 1.20.1 use `REIEvents`; o `RecipeViewerEvents` só existe a partir do 1.21.

```javascript
REIEvents.hide('item', event => {
  event.hide('minecraft:stick')               // esconde o item do JEI
  event.hide(/mod_id:.*/)                     // por regex
})

REIEvents.removeRecipes(event => {
  // remove receitas do JEI
})
```

No jQuery dos `RecipeViewerEvents` (1.21+) estão disponíveis:
`addEntries`, `addInformation`, `groupEntries`, `registerSubtypes`, `removeCategories`, `removeEntries`, `removeEntriesCompletely`, `removeRecipes`.

---

## 5️⃣ Outros: Título e Ícone da Janela

```javascript
// Startup — já fez o mesmo no item builder acima, mas:
// kubejs também permite mudar o título/ícone da janela do jogo
```
Docs: [Changing Window Title and Icon](https://kubejs.com/wiki/tutorials/changing-window) e [Changing Mod Display Names](https://kubejs.com/wiki/tutorials/changing-mod-names)

---

## Próximo: [05-worldgen.md](05-worldgen.md) — Geração de mundo no 1.20.1