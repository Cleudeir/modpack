# Relatorio de Interacoes e Configuracao dos Mods

**Data:** 19/09/2026
**Versao:** Forge 1.20.1
**Total de Mods:** 300+

---

## Sumario Executivo

Este modpack e configurado para uma experiencia de **sobrevivencia desafiadora com progressao RPG**. Os mods interagem para criar um sistema onde:
- Mobs sao mais perigosos durante o dia (nao queimam ao sol)
- Infeccao zumbi pode infectar jogadores e aldeoes
- Dificuldade escala com o tempo jogado
- Artefatos sao obtidos apenas via combate e exploracao
- Progressao e bloqueada por stages e quests

---

## 1. Configuracoes de Performance

### Embeddium (Sodium para Forge)
Status: OTIMIZADO
- `chunk_builder_threads = 0` (auto-detectar)
- `use_entity_culling = true`
- `use_fog_occlusion = true`
- `use_compact_vertex_format = true`
- **Recomendacao:** Desabilitar `enable_vignette` para economizar GPU

### ModernFix
Status: SUB-CONFIGURADO
- Apenas `blacklist_async_jei_plugins` esta habilitado
- **Problema:** Muitas otimizacoes disponiveis nao estao ativas (dynamic fps, crash fixes, etc.)

### FerriteCore
Status: OTIMIZADO
- Todas as deduplication features habilitadas
- `cacheMultipartPredicates = true`
- `bakedQuadDeduplication = true`
- Reducao significativa de uso de RAM

### MemorySettings
Configuracao Atual:
- Minimo Cliente: 2500 MB
- Maximo Cliente: 8500 MB
- Maximo Servidor: 8500 MB
- **Recomendacao:** Aumentar para 10000+ MB se o sistema tiver 16-32GB RAM

### Entity Culling
Status: BOM
- `tracingDistance = 88` (levemente agressivo)
- `tickCulling = true`
- Whitelist correta para Create contraptions e Botania

---

## 2. Configuracoes de Gameplay

### Create
Status: HABILITADO (worldgen desabilitado)
- `disableWorldGen = true`
- Create e puramente tech/automation, sem geracao de terreno
- **Impacto:** Copper e zinc devem vir de outras fontes

### Quark (1950 linhas de config)
Status: ALTAMENTE CONFIGURADO

**Features Habilitadas:**
- Variant Chests (substitui baus vanilla por tipo de madeira)
- Vertical Slabs
- Compressed Blocks
- Glass Item Frame
- Hollow Logs
- Ancient Tomes (loot em strongholds, dungeons, etc.)
- Pickarang (Diamond level, 800 durabilidade)
- Matrix Enchanting
- Pipes

**Nerfs Significativos (Game Rules):**

| Nerf | Status |
|------|--------|
| Mending nerfado (Unmending) | Habilitado |
| Desconto de aldeao resetado na zombificacao | Habilitado |
| Golems de ferro nao dropam ferro | Habilitado |
| Estradas de gelo desabilitadas | Habilitado |
| Wool nao dropa de ovelhas | Habilitado |
| Elytra trancada no The End | Habilitado |
| Fix de duplicacao de falling blocks | Habilitado |

**Geracao de Mundo:**
- Monster Boxes: 30% por chunk
- Fairy Rings: 0.625% em florestas
- Fallen Logs: 70% chance ocos
- Blossom Trees: 5 variedades bioma-especificas

**Mobs Quark:**
- Crabs: Beaches (spawn weight 5)
- Forgotten: 5% substituem esqueletos abaixo de Y=0
- Foxhound: Nether (speed up furnaces)
- Stonelings: Overworld (tamable)
- Toretoise: Overworld (regrows ore when fed)

---

## 3. Configuracoes de Mobs e Spawning

### In Control
Status: ALTAMENTE CONFIGURADO

**Mobs Bloqueados (Overworld):**
- `zombie_extreme:boomer` (workaround de erro)
- Todos `scguns:*` projectiles/mobs (18 entradas)
- Todos `mutantmonsters:*` entities

**Regras Customizadas:**
- `zombie_extreme` mobs: APENAS em cidades (`incity: true`)
- Mobs underground elites (realmrpg_demons, alexscaves:watcher): abaixo de Y=0

**Atributos Modificados (Fase "first"):**

| Regra | Chance | Stats | Efeito |
|-------|--------|-------|--------|
| Tier 1 | 50% | 0.8x HP/Speed/Dmg, 0.4x Armor | Bad Omen |
| Tier 2 | 30% | 0.6x HP/Speed/Dmg, 0.4x Armor | Nausea |

**Problema Potencial:** Bad Omen em 50% dos mobs pode causar raids nao intencionais

### Hordes
Status: PARCIALMENTE HABILITADO

**Horde Event:** DESABILITADO (`enableHordeEvent = false`)

**Infection System:** HABILITADO
- Aldeoes: 85% chance de infeccao
- Jogadores: 0.5% chance por hit
- 4 estagios de 6000 ticks cada
- Zombie players spawn na morte

**Configuracoes Criticas:**

| Setting | Valor | Impacto |
|---------|-------|---------|
| Zombies queimam ao sol | NAO | Ameaca constante |
| Esqueletos queimam ao sol | NAO | Ameaca constante |
| Cura de zombie villager | DESABILITADO | Perda permanente de trades |
| Zombie horses agressivos | SIM | Atacam jogadores |

### Zombie Awareness
Status: CONFIGURADO
- Range de consciencia: 64 blocos
- Sound awareness: HABILITADO
- Scent/blood: DESABILITADO
- Light tracking: DESABILITADO
- Noisy zombies: DESABILITADO

### Improved Mobs
Status: ALTAMENTE CONFIGURADO

**Dificuldade Progressiva:**
- Aumento: 0.1/dia ate 0.3/dia apos 14 ate 0.5/dia apos 30
- Integra com Scaling Health, PlayerEX, LevelZ, Pehkui

**Features Perigosas:**

| Feature | Chance | Impacto |
|---------|--------|---------|
| Block breaking | 80% | Mobs quebram tudo exceto netherite/iron/diamond |
| Stealer | 3% | Mobs roubam do inventario |
| Neutral aggro | 1% | Mobs neutros podem virar hostis |

**Stats no Maximo:**
- Health: ate 5x
- Damage: ate 10x
- Speed: ate 2x
- Projectile damage: ate 2x

### Infernal Mobs
Status: HABILITADO
- 28 modifiers ativos
- 380+ entity types permitidos
- Rarity: Elite 65, Ultra 40, Infernal 40
- Loot: Diamond tier para infernal

### Spawn Balance Utility
Status: HABILITADO
- Balanceamento de spawns por bioma: ATIVADO
- Fix de spawn values: ATIVADO
- Range: min 10, max 80

---

## 4. Configuracoes de Mundo

### TerraBlender
Status: CONSERVADOR
- `overworld_region_size = 2` (minimo)
- `vanilla_overworld_region_weight = 10`
- Biomes modedados sao granulares, nao dominam vanilla

### YUNG's Better Structures
Status: COMPLETAMENTE CONFIGURADO

| Estrutura | Vanilla Substituida |
|-----------|---------------------|
| Desert Temples | SIM |
| Dungeons | SIM |
| Nether Fortresses | SIM |
| Ocean Monuments | SIM |
| Strongholds | SIM |
| Jungle Temples | SIM |
| Witch Huts | SIM |
| End Island | SIM |

### Towns and Towers
Status: ALTAMENTE CONFIGURADO

**Estruturas Habilitadas:**
- 23 variantes de towers + 7 exclusivas
- 18 variantes de towns + 9 exclusivas
- mimic_desert, wreckage_ocean

**Frequencia:**
- Towers: spacing 48, separation 24
- Towns: spacing 56, separation 28 (17% mais raro que vanilla)

### Expanded Ecosphere
Status: CONFIGURADO
- Mode: DEFAULT (sem compatibilidade TerraBlender)
- `removeOreBlobs = true` (remove andesite/diorite/granite underground)
- Biome replacement: DESABILITADO

**Problema Potencial:** DEFAULT mode pode conflitar com TerraBlender

---

## 5. Interacoes Entre Mods

### 5.1 Conflitos Potenciais

| Mods | Conflito | Severidade |
|------|----------|------------|
| InControl vs Spawn Balance Utility | Ambos modificam spawn weights | Media |
| InControl vs Improved Mobs | Ambos modificam stats de mobs (podem compor) | Alta |
| Expanded Ecosphere vs TerraBlender | EE em DEFAULT mode pode nao registrar biomes corretamente | Media |
| Hordes vs Infection | Hordes desabilitado, mas infection ativa cria dinamica diferente | Baixa |
| Quark Mending Nerf vs Apothic Attributes | Mending funciona como Unmending | Intencional |

### 5.2 Sinergias Positivas

| Mods | Sinergia |
|------|----------|
| Embeddium + Entity Culling | Performance otimizada em conjunto |
| FerriteCore + MemorySettings | Reducao de RAM combinada |
| KubeJS + CraftTweaker | Customizacao flexivel de recipes |
| Quark + Create | Complementam-se em automacao e building |
| FTB Quests + Game Stages | Progressao organizada |
| Jade + JEI | Information overlay + recipe lookup |
| Artifacts + Curios | Equipment slots para trinkets |

### 5.3 Dependencias Criticas

| Mod | Depende De |
|-----|------------|
| KubeJS | Rhino (JavaScript engine) |
| Alex's Mobs | Citadel (library) |
| Create | GeckoLib (animations) |
| All YUNG's mods | YUNG's API |
| Twilight Forest | GeckoLib |
| CraftTweaker | KubeJS (parcialmente) |

---

## 6. KubeJS Customizacoes

### Scripts Ativos

| Script | Tipo | Descricao |
|--------|------|-----------|
| admin_panel.js | Server | Painel admin com 50+ comandos (SEM PERMISSOES!) |
| custom_equipment.js | Server | Remove recipes mods, adiciona 40+ recipes customizadas |
| game_over.js | Server | Buffs no respawn, syringe summon boss |
| initial_item.js | Server | Loot inicial com artefatos rank S/A/B/C |
| item_category.js | Server | Organiza itens em tags KubeJS |
| way_sign.js | Server | Localiza way signs no primeiro login |
| admin_item.js | Startup | Registra item admin_remote |
| custom_item_attributes.js | Startup | Buff armor Marbled's Arsenal (10 protection) |
| admin_gui.js | Client | GUI overlay para admin panel |

### Scripts Desativados (Comentados)

| Script | Conteudo |
|--------|----------|
| block_replace.js | Block event experiments |
| custom_equipment_effect.js | Equipment effects |
| rewards.js | Timed rewards |
| custom_structures.js | Structure frequency |
| worldgen.js | World generation modifications |

### Problemas Criticos no KubeJS

| Problema | Severidade | Local |
|----------|------------|-------|
| SEM SISTEMA DE PERMISSOES no admin panel | Critico | admin_panel.js |
| Typo `artificats` (falta 'e') | Alto | initial_item.js:34 |
| Recipes duplicadas para attacker armor | Medio | custom_equipment.js |
| Client commands podem nao executar server-side | Alto | admin_gui.js:196 |
| Loop infinito potencial (steel sheet-ingot) | Medio | custom_equipment.js |

---

## 7. Resumo de Dificuldade

### Perfil de Dificuldade

| Aspecto | Nivel | Descricao |
|---------|-------|-----------|
| Sobrevivencia Diurna | ALTO | Zombies e esqueletos nao queimam |
| Infeccao | MEDIO | 0.5% chance por hit, 4 estagios |
| Trade de Aldeoes | ALTO | Sem cura de zombie villagers + nerf de desconto |
| Progressao | MEDIO | Game stages + FTB quests |
| Mobs Melhorados | ALTO | Block breaking, stealing, 10x damage |
| Loot | MEDIO | Artefatos apenas via combate/arqueologia |

### Progressao Temporal

| Dias | Fase | Eventos |
|------|------|---------|
| 0-4 | First | Mobs mais fracos (0.6-0.8x), debuffs |
| 5-13 | Early | Difficulty scaling ativo |
| 14-20 | Mid | Difficulty aumenta para 0.3/dia |
| 21-28 | Late Mid | Mobs com equipamento |
| 29-35 | Late | Stats altos, block breaking comum |
| 36-60 | Endgame | 5x HP, 10x damage |
| 60+ | Post-End | Maxima dificuldade |

---

## 8. Recomendacoes

### Prioridade Alta

1. **Habilitar mais features do ModernFix** - Dynamic FPS, block multipart caching
2. **Corrigir typo `artificats`** em initial_item.js
3. **Adicionar sistema de permissoes** ao admin panel
4. **Verificar conflito InControl vs Improved Mobs** - podem estar compondo stats

### Prioridade Media

5. **Aumentar `betterfpsdist` stretch** para 1.5-2.0 se jogando em terreno com caves
6. **Desabilitar vignette** no Embeddium para economizar GPU
7. **Aumentar memoria maxima** para 10000+ MB se o sistema tiver RAM disponivel
8. **Verificar Expanded Ecosphere** vs TerraBlender (mode DEFAULT pode conflitar)

### Prioridade Baixa

9. **Remover scripts KubeJS mortos** (block_replace.js, rewards.js, etc.)
10. **Consolidar recipes duplicadas** em custom_equipment.js
11. **Revisar configuração de Towns and Towers** - towns 17% mais raros que vanilla

---

## 9. Tabela de Resumo dos Mods Principais

| Mod | Categoria | Status | Impacto |
|-----|-----------|--------|---------|
| Embeddium | Performance | OTIMIZADO | Alto (FPS boost) |
| ModernFix | Performance | SUB-CONFIGURADO | Potencial alto |
| FerriteCore | Performance | OTIMIZADO | Alto (RAM reduction) |
| Create | Technology | HABILITADO | Alto (automation) |
| Quark | Utility | ALTAMENTE CONFIGURADO | Alto (gameplay changes) |
| Twilight Forest | Adventure | HABILITADO | Medio (dimension) |
| In Control | Mobs | ALTAMENTE CONFIGURADO | Alto (spawning rules) |
| Hordes | Mobs | PARCIAL | Alto (infection system) |
| Improved Mobs | Mobs | ALTAMENTE CONFIGURADO | Alto (difficulty scaling) |
| Infernal Mobs | Mobs | HABILITADO | Medio (elite mobs) |
| KubeJS | Utility | CONFIGURADO | Alto (customizations) |
| FTB Quests | RPG | HABILITADO | Medio (progression) |
| Artifacts | Equipment | CONFIGURADO | Medio (loot balance) |
| Farmer's Delight | Farming | HABILITADO | Medio (food system) |
| YUNG's Suite | Worldgen | COMPLETO | Alto (structure variety) |

---

**Relatorio gerado automaticamente em 19/09/2026**
