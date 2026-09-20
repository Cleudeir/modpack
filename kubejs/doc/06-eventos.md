# 06 — Lista Completa de Eventos do KubeJS

Referência rápida de **todos os eventos** do KubeJS (1.20.1/Forge). Fonte oficial: [kubejs.com/wiki/events](https://kubejs.com/wiki/events)

Legenda: ❌ = não cancelável | ✅ = cancelável

---

## Simple & Direct

| Evento | Pasta | Cancelável? |
|--------|-------|:---:|
| `StartupEvents.init` | startup | ❌ |
| `StartupEvents.postInit` | startup | ❌ |
| `StartupEvents.registry` (vários registros) | startup | ❌ |
| `StartupEvents.modifyCreativeTab` | startup | ❌ |
| `ServerEvents.loaded` | server | ❌ |
| `ServerEvents.unloaded` | server | ❌ |
| `ServerEvents.tick` | server | ❌ |
| `ServerEvents.tags` | server | ❌ |
| `ServerEvents.recipes` | server | ❌ |
| `ServerEvents.afterRecipes` | server | ❌ |
| `ServerEvents.specialRecipeSerializers` | server | ❌ |
| `ServerEvents.compostableRecipes` | server | ❌ |
| `ServerEvents.recipeTypeRegistry` | server | ❌ |
| `ServerEvents.generateData` | server | ❌ |
| `ServerEvents.commandRegistry` | server | ❌ |
| `ServerEvents.command` | server | ✅ |
| `ServerEvents.customCommand` | server | ✅ |
| `ServerEvents.basicCommand` | server | — |
| `ServerEvents.lowPriorityData` / `highPriorityData` | server | ❌ |

---

## BlockEvents (server)

| Evento | Cancelável? |
|--------|:---:|
| `BlockEvents.broken` | ✅ |
| `BlockEvents.detectorChanged` | ✅ |
| `BlockEvents.detectorPowered` | ✅ |
| `BlockEvents.detectorUnpowered` | ✅ |
| `BlockEvents.farmlandTrampled` | ✅ |
| `BlockEvents.leftClicked` | ✅ |
| `BlockEvents.modification` (startup, modifica blocos existentes) | ❌ |
| `BlockEvents.placed` | ✅ |
| `BlockEvents.rightClicked` | ✅ |

---

## ClientEvents (client)

| Evento | Cancelável? |
|--------|:---:|
| `ClientEvents.highPriorityAssets` | ❌ |
| `ClientEvents.init` | ❌ |
| `ClientEvents.lang` | ❌ |
| `ClientEvents.leftDebugInfo` | ❌ |
| `ClientEvents.rightDebugInfo` | ❌ |
| `ClientEvents.loggedIn` | ❌ |
| `ClientEvents.loggedOut` | ❌ |
| `ClientEvents.painterUpdated` | ✅ |
| `ClientEvents.paintScreen` | ❌ |
| `ClientEvents.tick` | ✅ |
| `ClientEvents.fromServer` / `Events.fromServer` | ✅ |

---

## EntityEvents (server)

| Evento | Cancelável? |
|--------|:---:|
| `EntityEvents.checkSpawn` | ✅ |
| `EntityEvents.death` | ❌ |
| `EntityEvents.hurt` | ✅ |
| `EntityEvents.spawned` | ❌ |

---

## ItemEvents (server, exceto tooltips/dynamicTooltips = client)

| Evento | Cancelável? |
|--------|:---:|
| `ItemEvents.armorTierRegistry` | ❌ |
| `ItemEvents.toolTierRegistry` | ❌ |
| `ItemEvents.canPickUp` | ❌ |
| `ItemEvents.crafted` | ❌ |
| `ItemEvents.dropped` | ✅ |
| `ItemEvents.dynamicTooltips` (client) | ❌ |
| `ItemEvents.entityInteracted` | ❌ |
| `ItemEvents.firstLeftClicked` / `firstRightClicked` | ✅ |
| `ItemEvents.foodEaten` | ❌ |
| `ItemEvents.modelProperties` | ❌ |
| `ItemEvents.modification` (startup) | ❌ |
| `ItemEvents.modifyTooltips` / `modifyTooltipsInfo` (client) | ❌ |
| `ItemEvents.pickedUp` | ✅ |
| `ItemEvents.rightClicked` | ✅ |
| `ItemEvents.smelted` | ❌ |
| `ItemEvents.tooltip` (client) | ❌ |

---

## LevelEvents (server)

| Evento | Cancelável? |
|--------|:---:|
| `LevelEvents.afterExplosion` | ❌ |
| `LevelEvents.beforeExplosion` | ✅ |
| `LevelEvents.loaded` | ❌ |
| `LevelEvents.tick` | ❌ |
| `LevelEvents.unloaded` | ❌ |

---

## NetworkEvents (server/client)

| Evento | Cancelável? |
|--------|:---:|
| `NetworkEvents.dataReceived` | ✅ |
| `Events.fromServer` / `Events.fromClient` | ✅ |

---

## PlayerEvents (server)

| Evento | Cancelável? |
|--------|:---:|
| `PlayerEvents.advancement` | ✅ |
| `PlayerEvents.chat` | ✅ |
| `PlayerEvents.chestClosed` / `chestOpened` | ✅ |
| `PlayerEvents.decorateChat` | ❌ |
| `PlayerEvents.inventoryChanged` | ❌ |
| `PlayerEvents.inventoryClosed` / `inventoryOpened` | ✅ |
| `PlayerEvents.loggedIn` | ❌ |
| `PlayerEvents.loggedOut` | ❌ |
| `PlayerEvents.respawned` | ❌ |
| `PlayerEvents.tick` | ❌ |
| `PlayerEvents.blockPlace` (Forge) | ✅ |
| `PlayerEvents.blockBreak` (Forge) | ✅ |

---

## Registros possíveis no `event.create()` do StartupEvents.registry

`item`, `block`, `fluid`, `enchantment`, `mob_effect`, `sound_event`, `block_entity_type`, `potion`, `particle_type`, `painting_variant`, `custom_stat`, `point_of_interest_type`, `villager_type`, `villager_profession`

---

## Próximo: [07-comandos.md](07-comandos.md) — Comandos úteis e referências