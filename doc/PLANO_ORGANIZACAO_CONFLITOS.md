# Plano de Organizacao e Prevencao de Conflitos

**Data:** 19/09/2026
**Objetivo:** Organizar interacoes entre mods, prevenir conflitos e garantir progressao gradual de desafios

---

## Sumario

1. [Diagnostico dos Conflitos Atuais](#1-diagnostico-dos-conflitos-ativos)
2. [Sistema de Progressao Gradual](#2-sistema-de-progressao-gradual)
3. [Reconfiguracao do InControl](#3-reconfiguracao-do-incontrol)
4. [Ajustes no Improved Mobs](#4-ajustes-no-improved-mobs)
5. [Correcao do Hordes](#5-correcao-do-hordes)
6. [Prevencao de Conflitos entre Mods](#6-prevencao-de-conflitos-entre-mods)
7. [Plano de Acao](#7-plano-de-acao)
8. [Tabela de Referencia Rapida](#8-tabela-de-referencia-rapida)

---

## 1. Diagnostico dos Conflitos Atuais

### 1.1 Conflitos Criticos

| Conflito | Mods Envolvidos | Impacto | Solucao |
|----------|-----------------|---------|---------|
| Stats compostos | InControl + Improved Mobs | Mobs podem ficar 10x mais fortes rapidamente | Usar apenas um sistema de scaling |
| Bad Omen nao intencional | InControl + Raids | Raids podem iniciar sem querer | Remover Bad Omen dos spawns |
| Block breaking precoce | Improved Mobs | Mobs quebram tudo desde o inicio | Aumentar dificuldade minima |
| Spawn weights conflitantes | InControl + Spawn Balance Utility | Regras podem se anular | Desabilitar um dos dois |
| Zombie sem queima | Hordes | Ameaca constante mesmo durante o dia | Manter intencional (dificuldade) |

### 1.2 Problemas de Configuracao

| Problema | Local | Solucao |
|----------|-------|---------|
| Fases definidas mas nao usadas | phases.json / spawn.json | Implementar regras por fase |
| Admin panel sem permissoes | admin_panel.js | Adicionar sistema de roles |
| Typo `artificats` | initial_item.js | Corrigir ortografia |
| Recipes duplicadas | custom_equipment.js | Consolidar recipes |

---

## 2. Sistema de Progressao Gradual

### 2.1 Conceito

O sistema deve introduzir desafios gradualmente, evitando que jogadores novos enfrentem ameacas impossiveis e garantindo que jogadores avancados continuem desafiados.

### 2.2 Fases de Progressao

| Fase | Dias | Dificuldade | Mobs Desbloqueados | Features Desbloqueadas |
|------|------|-------------|---------------------|------------------------|
| **Tutorial** | 0-2 | 0.0-0.2 | Zombies basicos, esqueletos | Nenhuma |
| **Sobrevivencia** | 3-6 | 0.2-0.5 | + Spiders, creepers melhorados | Block breaking (10%) |
| **Exploracao** | 7-13 | 0.5-1.0 | + Zombie Extreme (cidades) | Block breaking (30%) |
| **Perigo** | 14-20 | 1.0-2.0 | + Demons, mutants underground | Block breaking (50%), Stealing (1%) |
| **Ameaca** | 21-28 | 2.0-4.0 | + Infernal mobs, elite enemies | Block breaking (70%), Stealing (3%) |
| **Horror** | 29-35 | 4.0-8.0 | + All mob types | Block breaking (80%), Full AI |
| **Apocalipse** | 36-60 | 8.0-15.0 | + Enhanced stats | Max difficulty |
| **Endgame** | 60+ | 15.0-25.0 | + All features | Everything enabled |

### 2.3 Curva de Dificuldade

```
Dificuldade
    |
25  |                                          *****
    |                                      ****
20  |                                  ****
    |                              ****
15  |                         ****
    |                    ****
10  |               ****
    |          ****
 5  |     ****
    |****
 0  +----+----+----+----+----+----+----+----+----+---> Dias
    0    7    14   21   28   35   42   49   56   63
```

---

## 3. Reconfiguracao do InControl

### 3.1 Spawn.json - Novas Regras por Fase

**Fase Tutorial (Dias 0-2):**
```json
{
  "phase": "first",
  "random": 0.3,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft"],
  "when": "onjoin",
  "healthmultiply": 0.7,
  "speedmultiply": 0.7,
  "armormultiply": 0.3,
  "damagemultiply": 0.7,
  "result": "default"
}
```

**Fase Sobrevivencia (Dias 3-6):**
```json
{
  "phase": "after_day7",
  "random": 0.5,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1"],
  "when": "onjoin",
  "healthmultiply": 0.9,
  "speedmultiply": 0.9,
  "armormultiply": 0.5,
  "damagemultiply": 0.9,
  "result": "default"
}
```

**Fase Exploracao (Dias 7-13):**
```json
{
  "phase": "after_day7",
  "random": 0.6,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme"],
  "when": "onjoin",
  "healthmultiply": 1.0,
  "speedmultiply": 1.0,
  "armormultiply": 0.6,
  "damagemultiply": 1.0,
  "result": "default"
}
```

**Fase Perigo (Dias 14-20):**
```json
{
  "phase": "after_day14",
  "random": 0.7,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot"],
  "when": "onjoin",
  "healthmultiply": 1.2,
  "speedmultiply": 1.1,
  "armormultiply": 0.7,
  "damagemultiply": 1.2,
  "result": "default"
}
```

**Fase Ameaca (Dias 21-28):**
```json
{
  "phase": "after_day21",
  "random": 0.8,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons"],
  "when": "onjoin",
  "healthmultiply": 1.5,
  "speedmultiply": 1.2,
  "armormultiply": 0.8,
  "damagemultiply": 1.5,
  "result": "default"
}
```

**Fase Horror (Dias 29-35):**
```json
{
  "phase": "after_day28",
  "random": 0.9,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
  "when": "onjoin",
  "healthmultiply": 2.0,
  "speedmultiply": 1.3,
  "armormultiply": 0.9,
  "damagemultiply": 2.0,
  "result": "default"
}
```

**Fase Apocalipse (Dias 36-60):**
```json
{
  "phase": "after_day35",
  "random": 1.0,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
  "when": "onjoin",
  "healthmultiply": 3.0,
  "speedmultiply": 1.5,
  "armormultiply": 1.0,
  "damagemultiply": 3.0,
  "result": "default"
}
```

**Fase Endgame (Dias 60+):**
```json
{
  "phase": "after_day60",
  "random": 1.0,
  "seesky": true,
  "hostile": true,
  "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
  "when": "onjoin",
  "healthmultiply": 5.0,
  "speedmultiply": 2.0,
  "armormultiply": 1.0,
  "damagemultiply": 5.0,
  "result": "default"
}
```

### 3.2 Remocao do Bad Omen

**Problema:** Bad Omen em 50% dos mobs causa raids nao intencionais.

**Solucao:** Remover o efeito Bad Omen das regras de spawn e adicionar apenas em contextos especificos.

### 3.3 Spawner.json - Ajustes

- Reduzir `persecond` de 0.7 para 0.4 nas primeiras fases
- Aumentar gradualmente ao longo do tempo
- Adicionar restricoes de fase para mobs mais fortes

---

## 4. Ajustes no Improved Mobs

### 4.1 Cooldown de Dificuldade

```toml
# Atrasar o inicio da escalada
"Difficulty Delay" = 48000  # 2 dias completos

# Escalada mais gradual
"Difficulty Increase" = ["0-0.05", "7-0.1", "14-0.2", "21-0.3", "28-0.4", "35-0.5"]
```

### 4.2 Reducao de Block Breaking

```toml
# Aumentar dificuldade minima para block breaking
"Difficulty Break AI" = 2.0  # Apenas apos dificuldade 2.0

# Reduzir chance inicial
"Breaker Chance" = 0.3  # De 0.8 para 0.3

# Aumentar cooldown
"Breaker Cooldown" = 5  # De 1 para 5
"Breaker Initial Cooldown" = 240  # De 120 para 240
```

### 4.3 Reducao de Stealing

```toml
# Aumentar dificuldade minima para stealing
"Difficulty Steal AI" = 5.0  # Apenas apos dificuldade 5.0

# Reduzir chance
"Stealer Chance" = 0.01  # De 0.03 para 0.01
```

### 4.4 Limites de Stats

```toml
# Reduzir limites maximos para evitar compostacao extrema
"Max Health Increase" = 3.0  # De 5.0 para 3.0
"Max Damage Increase" = 5.0  # De 10.0 para 5.0
"Max Speed" = 0.5  # De 1.0 para 0.5
```

---

## 5. Correcao do Hordes

### 5.1 Habilitar Horde Event com Progressao

```toml
# Habilitar horde event
enableHordeEvent = true

# Configuracao inicial conservadora
spawnAmount = 10  # De 25 para 10
hordeSpawnMultiplier = 1.1  # De 1.05 para 1.1
hordeSpawnDays = 7  # De 3 para 7 (mais raro no inicio)
hordeSpawnMax = 40  # De 80 para 40
hordeSpawnDuration = 4000  # De 6000 para 4000
```

### 5.2 Ajustes de Infeccao

```toml
# Reduzir chance de infeccao no inicio
playerInfectChance = 0.002  # De 0.005 para 0.002

# Aumentar duracao dos estagios
ticksForEffectStage = 8000  # De 6000 para 8000

# Manter其他设置不变
```

### 5.3 Queima de Zombies

**Recomendacao:** Manter `zombiesBurn = false` para manter a dificuldade, mas adicionar:

- Zombies queimam apenas em dificuldade > 10
- Ou: Zombies queimam durante o dia, mas nao durante a noite (inversao)

---

## 6. Prevencao de Conflitos entre Mods

### 6.1 InControl vs Improved Mobs

**Problema:** Ambos modificam stats de mobs, causando compostacao.

**Solucao:**
1. Desabilitar atributos do InControl (usar apenas Improved Mobs)
2. Ou: Reduzir escalada do Improved Mobs para compensar

**Recomendacao:** Usar apenas Improved Mobs para scaling, InControl para spawning rules.

### 6.2 InControl vs Spawn Balance Utility

**Problema:** Ambos modificam spawn weights.

**Solucao:**
1. Desabilitar `balanceBiomeSpawnValues` no Spawn Balance Utility
2. Ou: Usar apenas Spawn Balance Utility para weights, InControl para rules

**Recomendacao:** Usar apenas InControl para spawning, desabilitar SBU.

### 6.3 Expanded Ecosphere vs TerraBlender

**Problema:** EE em DEFAULT mode pode nao registrar biomes corretamente.

**Solucao:**
1. Mudar EE para COMPATIBLE mode
2. Ou: Desabilitar biomes do EE

**Recomendacao:** Mudar para COMPATIBLE mode.

### 6.4 Quark vs KubeJS Recipes

**Problema:** Recipes podem conflitar.

**Solucao:**
1. Revisar todas as recipes no custom_equipment.js
2. Remover duplicatas
3. Verificar loops infinitos

---

## 7. Plano de Acao

### 7.1 Prioridade Alta (Imediato)

| Acao | Arquivo | Responsavel |
|------|---------|-------------|
| Corrigir typo `artificats` | initial_item.js | KubeJS |
| Remover Bad Omen dos spawns | spawn.json | InControl |
| Adicionar dificuldade minima para block breaking | common.toml | Improved Mobs |
| Reduzir chance de block breaking | common.toml | Improved Mobs |
| Verificar recipes duplicadas | custom_equipment.js | KubeJS |

### 7.2 Prioridade Alta (1-2 semanas)

| Acao | Arquivo | Responsavel |
|------|---------|-------------|
| Implementar regras por fase no InControl | spawn.json | InControl |
| Ajustar escalada de dificuldade | common.toml | Improved Mobs |
| Habilitar Horde Event com configuracao conservadora | hordes-common.toml | Hordes |
| Reduzir chance de infeccao | hordes-common.toml | Hordes |
| Desabilitar Spawn Balance Utility | common.toml | SBU |

### 7.3 Prioridade Media (2-4 semanas)

| Acao | Arquivo | Responsavel |
|------|---------|-------------|
| Revisar sistema de permissao do admin panel | admin_panel.js | KubeJS |
| Consolidar recipes duplicadas | custom_equipment.js | KubeJS |
| Mudar EE para COMPATIBLE mode | config.json5 | Expanded Ecosphere |
| Testar progressao em novo mundo | World test | QA |
| Ajustar spawn rates por fase | spawner.json | InControl |

### 7.4 Prioridade Baixa (1-2 meses)

| Acao | Arquivo | Responsavel |
|------|---------|-------------|
| Remover scripts KubeJS mortos | block_replace.js, etc. | KubeJS |
| Otimizar configs de performance | modernfix-common.toml | ModernFix |
| Documentar todas as mudancas | doc/ | Documentation |
| Criar guia para novos jogadores | patchouli | In-Game |

---

## 8. Tabela de Referencia Rapida

### 8.1 Configuracoes Recomendadas

| Config | Atual | Recomendado | Motivo |
|--------|-------|-------------|--------|
| InControl Bad Omen | 50% chance | 0% | Previne raids nao intencionais |
| Improved Mobs Block Break | 80% | 30% | Evita destruicao precoce |
| Improved Mobs Steal | 3% | 1% | Menos frustrante |
| Hordes Horde Event | Disabled | Enabled (10 mobs) | Eventos progressivos |
| Hordes Infection | 0.5% | 0.2% | Menos punitivo no inicio |
| Spawn Balance Utility | Enabled | Disabled | Evita conflito com InControl |
| EE Mode | DEFAULT | COMPATIBLE | Melhor compatibilidade |

### 8.2 Limites de Stats por Fase

| Fase | HP Max | Damage Max | Speed Max | Block Break |
|------|--------|------------|-----------|-------------|
| Tutorial | 1.5x | 1.3x | 1.1x | 0% |
| Sobrevivencia | 2.0x | 1.5x | 1.2x | 10% |
| Exploracao | 2.5x | 2.0x | 1.3x | 30% |
| Perigo | 3.0x | 2.5x | 1.4x | 50% |
| Ameaca | 3.5x | 3.0x | 1.5x | 70% |
| Horror | 4.0x | 3.5x | 1.5x | 80% |
| Apocalipse | 4.5x | 4.0x | 1.5x | 80% |
| Endgame | 5.0x | 5.0x | 1.5x | 80% |

### 8.3 Spawn Rates por Fase

| Fase | Zombies/sec | Zombie Extreme | Elite Mobs |
|------|-------------|----------------|------------|
| Tutorial | 0.1 | 0 (locked) | 0 (locked) |
| Sobrevivencia | 0.2 | 0 (locked) | 0 (locked) |
| Exploracao | 0.3 | 0.3 | 0 (locked) |
| Perigo | 0.4 | 0.5 | 0.3 |
| Ameaca | 0.5 | 0.6 | 0.5 |
| Horror | 0.6 | 0.7 | 0.6 |
| Apocalipse | 0.7 | 0.7 | 0.7 |
| Endgame | 0.7 | 0.7 | 0.7 |

---

## 9. Script de Implementacao

### 9.1 spawn.json (Novo)

```json
[
  // Mobs Bloqueados (mantido)
  {
    "dimension": "minecraft:overworld",
    "hostile": true,
    "mob": ["zombie_extreme:boomer", "scguns:*", "mutantmonsters:*"],
    "result": "deny"
  },

  // Zombie Extreme apenas em cidades (mantido)
  {
    "dimension": "minecraft:overworld",
    "hostile": true,
    "mod": "zombie_extreme",
    "incity": false,
    "result": "deny"
  },

  // Tutorial Phase (Dias 0-2)
  {
    "phase": "first",
    "random": 0.3,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft"],
    "when": "onjoin",
    "healthmultiply": 0.7,
    "speedmultiply": 0.7,
    "armormultiply": 0.3,
    "damagemultiply": 0.7,
    "result": "default"
  },

  // Sobrevivencia Phase (Dias 3-6)
  {
    "phase": "after_day7",
    "random": 0.5,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1"],
    "when": "onjoin",
    "healthmultiply": 0.9,
    "speedmultiply": 0.9,
    "armormultiply": 0.5,
    "damagemultiply": 0.9,
    "result": "default"
  },

  // Exploracao Phase (Dias 7-13)
  {
    "phase": "after_day7",
    "random": 0.6,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme"],
    "when": "onjoin",
    "healthmultiply": 1.0,
    "speedmultiply": 1.0,
    "armormultiply": 0.6,
    "damagemultiply": 1.0,
    "result": "default"
  },

  // Perigo Phase (Dias 14-20)
  {
    "phase": "after_day14",
    "random": 0.7,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot"],
    "when": "onjoin",
    "healthmultiply": 1.2,
    "speedmultiply": 1.1,
    "armormultiply": 0.7,
    "damagemultiply": 1.2,
    "result": "default"
  },

  // Ameaca Phase (Dias 21-28)
  {
    "phase": "after_day21",
    "random": 0.8,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons"],
    "when": "onjoin",
    "healthmultiply": 1.5,
    "speedmultiply": 1.2,
    "armormultiply": 0.8,
    "damagemultiply": 1.5,
    "result": "default"
  },

  // Horror Phase (Dias 29-35)
  {
    "phase": "after_day28",
    "random": 0.9,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
    "when": "onjoin",
    "healthmultiply": 2.0,
    "speedmultiply": 1.3,
    "armormultiply": 0.9,
    "damagemultiply": 2.0,
    "result": "default"
  },

  // Apocalipse Phase (Dias 36-60)
  {
    "phase": "after_day35",
    "random": 1.0,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
    "when": "onjoin",
    "healthmultiply": 3.0,
    "speedmultiply": 1.5,
    "armormultiply": 1.0,
    "damagemultiply": 3.0,
    "result": "default"
  },

  // Endgame Phase (Dias 60+)
  {
    "phase": "after_day60",
    "random": 1.0,
    "seesky": true,
    "hostile": true,
    "mod": ["minecraft", "born_in_chaos_v1", "zombie_extreme", "world_of_rot", "realmrpg_demons", "creeperoverhaul"],
    "when": "onjoin",
    "healthmultiply": 5.0,
    "speedmultiply": 2.0,
    "armormultiply": 1.0,
    "damagemultiply": 5.0,
    "result": "default"
  },

  // Nerfs especificos (mantidos)
  {
    "mob": "born_in_chaos_v1:maggot",
    "when": "onjoin",
    "damagemultiply": 0.5,
    "healthmultiply": 0.5,
    "result": "default"
  },
  {
    "mob": "world_of_rot:crawler",
    "when": "onjoin",
    "speedmultiply": 0.5,
    "healthmultiply": 0.5,
    "result": "default"
  }
]
```

### 9.2 improvedmobs/common.toml (Ajustes)

```toml
[general]
"Enable difficulty scaling" = true
"Difficulty Delay" = 48000
"Difficulty Increase" = ["0-0.05", "7-0.1", "14-0.2", "21-0.3", "28-0.4", "35-0.5"]
"Difficulty type" = "PLAYERMAX"

[ai]
"Block Break Whitelist" = ["minecraft:netherite_brick", "minecraft:iron_block", "minecraft:diamond_block"]
"Breaklist as Blacklist" = true
"Breaker Chance" = 0.3
"Breaker Initial Cooldown" = 240
"Breaker Cooldown" = 5
"Difficulty Break AI" = 2.0
"Stealer Chance" = 0.01
"Difficulty Steal AI" = 5.0
"Neutral Aggressive Chance" = 0.005

[attributes]
"Max Health Increase" = 3.0
"Max Damage Increase" = 5.0
"Max Speed" = 0.5
"Max Knockback" = 0.3
"Max Magic Resistance" = 0.3
"Max Projectile Damage" = 1.5
"Max Explosion Damage" = 1.25
```

### 9.3 hordes-common.toml (Ajustes)

```toml
["Horde Event"]
enableHordeEvent = true
spawnAmount = 10
hordeSpawnMultiplier = 1.1
hordeSpawnDuration = 4000
hordeSpawnInterval = 1500
hordeStartTime = 14000
hordeSpawnDays = 7
hordeSpawnVariation = 2
hordeSpawnMax = 40

[Infection]
enableMobInfection = true
infectVillagers = true
villagerInfectChance = 0.7
infectPlayers = true
playerInfectChance = 0.002
ticksForEffectStage = 8000
effectStageTickReduction = 0.6

[Misc]
zombiesBurn = false
skeletonsBurn = false
zombieVillagersCanBeCured = true
```

---

## 10. Checklist de Implementacao

- [ ] Corrigir typo `artificats` em initial_item.js
- [ ] Atualizar spawn.json com regras por fase
- [ ] Ajustar improvedmobs/common.toml
- [ ] Atualizar hordes-common.toml
- [ ] Desabilitar Spawn Balance Utility
- [ ] Mudar Expanded Ecosphere para COMPATIBLE mode
- [ ] Revisar recipes em custom_equipment.js
- [ ] Testar progressao em novo mundo
- [ ] Documentar todas as mudancas
- [ ] Criar backup das configuracoes originais

---

**Plano criado em 19/09/2026**
**Proxima revisao:** 03/10/2026
