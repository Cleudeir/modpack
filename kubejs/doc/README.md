# 📚 Documentação KubeJS — Modpack Forge 1.20.1

Documentação **completa** sobre o que é possível fazer com KubeJS, salva localmente para consulta rápida.

> Fonte oficial: [https://kubejs.com/wiki](https://kubejs.com/wiki) — Conteúdo adaptado para **KubeJS 1.20.1 / Forge**.

---

## Índice dos arquivos

| Arquivo | Conteúdo |
|---------|----------|
| [`01-estrutura-e-conceitos.md`](01-estrutura-e-conceitos.md) | O que é o KubeJS, estrutura de pastas, conceitos básicos, ProbeJS |
| [`02-startup-scripts.md`](02-startup-scripts.md) | Registro de **itens**, **blocos**, **fluidos**, **efeitos de mob** e abas criativas |
| [`03-server-scripts.md`](03-server-scripts.md) | **Receitas**, **tags**, **chat e comandos**, eventos de jogador/mundo |
| [`04-client-scripts.md`](04-client-scripts.md) | **Tooltips**, eventos de cliente, idiomas (lang), Painter API |
| [`05-worldgen.md`](05-worldgen.md) | Geração de mundo (worldgen) no 1.20.1 (via datapack) |
| [`06-eventos.md`](06-eventos.md) | Lista completa de todos os eventos do KubeJS |
| [`07-comandos.md`](07-comandos.md) | Comandos úteis in-game e referências externas |

---

## Resumo rápido: o que dá para fazer?

- ➕ **Criar itens** personalizados (comida, armas, ferramentas, armaduras, itens com barra de durabilidade customizada)
- 🧱 **Criar blocos** personalizados (slab, stairs, fence, wall, porta, botão, plantas, etc.)
- 💧 **Criar fluidos** personalizados (clones de água/lava e outros)
- 🧪 **Criar efeitos de status** (mob effects) personalizados
- 🍳 **Adicionar/remover/modificar receitas** de qualquer mod (shaped, shapeless, smelting, blasting, smoking, campfire, stonecutting, smithing, custom JSON)
- 🏷️ **Modificar tags** (item, bloco, fluido, entidade)
- 💬 **Interagir com chat** (bloquear/cancelar mensagens, decorar mensagens)
- 🔧 **Criar comandos** customizados (`/kubejs custom_command`, command registry)
- 👤 **Eventos de jogador** (logar, deslogar, morrer, renascer, pegar itens, abrir baús, achievements, chat)
- 🌍 **Eventos de mundo** (blocos quebrados/colocados, entidades nasceram/morreram/sofreram dano, explosões)
- 🔍 **Tooltips** dinâmicos em itens (client-side, com Shift/Alt/Ctrl e NBT)
- 🌐 **Modificar traduções** (lang) e nomes de mods
- 🗺️ **Geração de mundo** (no 1.20.1 via datapack em `kubejs/data/`)
- 📦 **Datapacks virtuais** (gerar data packs no `kubejs/data/` e `kubejs/assets/`)
- ⚙️ **Modificar propriedades** de itens/blocos existentes (dureza, som, drops, etc.)
- 🖼️ **Painter API** (desenhar coisas na tela do cliente — painel customizado)
- 🔌 **Integração com mods** (receitas de mods via `event.custom({...})`, tags, eventos)

---

## Onde estão os scripts no seu modpack

```
kubejs/
├── startup_scripts/   → Registro de itens, blocos, fluidos, efeitos (precisa reiniciar o jogo)
├── server_scripts/    → Receitas, tags, eventos de jogador/mundo (recarrega com /reload)
├── client_scripts/    → Tooltips, UI, lang (recarrega com F3+T)
├── data/              → Datapack virtual (worldgen, loot tables, etc.)
├── assets/            → Resource pack virtual (texturas, modelos)
├── config/            → Configurações do KubeJS
└── exported/          → Dumps gerados pelos comandos de exportação
```

---

*Última atualização: adaptado da [wiki oficial do KubeJS](https://kubejs.com/wiki) — versão 1.20.1/Forge.*