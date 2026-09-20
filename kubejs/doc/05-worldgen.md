# 05 — Worldgen (Geração de Mundo) no 1.20.1

> ⚠️ **AVISO IMPORTANTE:** O worldgen do KubeJS no **1.20.1 não funciona bem** (o evento `WorldgenEvents` é limitado/ineficaz nessa versão). A **solução oficial recomendada** é usar um **datapack** na pasta `kubejs/data/`.

---

## Como funciona no 1.20.1

Coloque os arquivos JSON worldgen em:
```
kubejs/data/<namespace>/worldgen/configured_feature/<identificador>.json
```

Um arquivo de "remoção" básico precisa conter:
```json
{
    "type": "minecraft:no_op",
    "config": {}
}
```

---

## 1️⃣ Remover TODOS os minérios do Minecraft

Crie o arquivo:
```
kubejs/data/minecraft/worldgen/configured_feature/ore.json
```
com o conteúdo acima (`type: no_op`).
O identificador `ore` remove **todos** os minérios do minecraft.

## 2️⃣ Remover um minério específico

Ex.: remover o **ferro** →
```
kubejs/data/minecraft/worldgen/configured_feature/ore_iron.json
```

> Lista de identificadores de minérios/features: [minecraft.wiki/w/Ore_(feature)#Data_values](https://minecraft.wiki/w/Ore_(feature)#Data_values)

Identificadores comuns:
- `ore_coal`, `ore_copper`, `ore_iron`, `ore_gold`, `ore_redstone`, `ore_lapis`, `ore_diamond`, `ore_emerald`
- `ore_coal_upper`, `ore_gold_lower`, `ore_gold_extra`, `ore_diamond_large`, etc.

## 3️⃣ Adicionar/modificar features customizadas

Para gerar features customizadas (como geodes), use o **Misode's Configured Feature Generator**:
👉 [https://misode.github.io/worldgen/feature/](https://misode.github.io/worldgen/feature/)

- Use o botão **preset** para ver worldgen vanilla e copiar modelos
- Execute em `WorldgenEvents.add` onde possível ou via JSON datapack
- É possível até adicionar geodes customizados com um preset

---

## Worldgen em outras versões (referência)

| Versão | Suporte |
|--------|---------|
| 1.16.5 | Básico apenas |
| 1.18.2 | Biome Filters (funciona) |
| 1.19.2 | Biome Filters (funciona) |
| **1.20.1** | ❌ Não funciona bem → **usar datapack** |

Exemplo de `WorldgenEvents.add` (para versões que suportam):

```javascript
WorldgenEvents.add(event => {
  event.addOre((ore) => {
    ore.id = 'kubejs:meu_minerio'
    ore.addTarget('minecraft:stone', 'minecraft:diamond_ore')
    ore.count(10).squared().rangeY(0, 64)
  })
})
```
> ⚠️ No 1.20.1 prefira o datapack.

---

## Múltiplos recursos do `.minecraft/worldgen`

Também dá para controlar **bioma** (cor de água, névoa, grama...) via testamento de bioma em client scripts/datapack.

---

## Próximo: [06-eventos.md](06-eventos.md) — Lista completa de eventos