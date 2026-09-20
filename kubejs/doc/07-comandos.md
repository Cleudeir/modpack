# 07 — Comandos Úteis e Referências Externas

## Comandos in-game do KubeJS

| Comando | Descrição |
|---------|-----------|
| `/reload` | Recarrega todos os server_scripts (e data packs) |
| `/kubejs reload` | Recarrega todos os scripts e dados |
| `/kubejs reload server_scripts` | Recarrega só os scripts de servidor |
| `/kubejs reload startup_scripts` | Recarrega funções `global.*` de startup |
| `/kubejs reload client_scripts` | Recarrega scripts de cliente (ou use `F3+T`) |
| `/kubejs hand` | Mostra o **ID, tags e NBT** do item na mão — MUITO útil! |
| `/kubejs inventory` | Despeja seu inventário em JSON na pasta `kubejs/exported/` |
| `/kubejs export` | Exporta dados do jogo (receitas, tags) para referência |
| `/kubejs custom_command <nome>` | Executa comandos customizados registrados no script |
| `/probejs dump` | Gera o autocompletar do ProbeJS (TypeScript) |

> 🔎 **Dica de ouro:** `/kubejs hand` é a forma mais rápida de descobrir o ID exato, as tags e o NBT de qualquer item — indispensável para escrever receitas, tags e tooltips corretos!

---

## Console de Debug / Erros

- O **log de erros de script** aparece no console do jogo e em `logs/latest.log`.
- Procure por `[KubeJS]` nos logs para ver erros de script.
- Se um script quebrar, ele mostra o **arquivo e a linha** onde o erro aconteceu.

---

## Atalhos importantes

| Tecla | Função |
|-------|--------|
| `F3+T` | Recarrega client_scripts + assets |
| `F3+H` | Tooltips avançados (mostra ID e ID de receita) |

---

## Tipos de scripts: resumo

| Pasta | Uso | Recarregar |
|-------|-----|------------|
| `startup_scripts/` | Itens, blocos, fluidos, efeitos, abas | Reiniciar o jogo |
| `server_scripts/` | Receitas, tags, eventos de servidor/mundo | `/reload` |
| `client_scripts/` | Tooltips, UI, lang | `F3+T` |

---

## Referências Externas (links oficiais)

| Link | Conteúdo |
|------|----------|
| [kubejs.com/wiki](https://kubejs.com/wiki) | Wiki oficial do KubeJS |
| [Wiki / Tutorials](https://kubejs.com/wiki/tutorials) | Tutoriais (receitas, registros, tags, etc.) |
| [Wiki / Events](https://kubejs.com/wiki/events) | Lista completa de eventos |
| [Wiki / Folder Structure](https://kubejs.com/wiki/folder-structure) | Estrutura de pastas |
| [Wiki / Ref](https://kubejs.com/wiki/ref) | Referência de builders (BlockBuilder, ItemBuilder) |
| [Wiki / Global Scope](https://kubejs.com/wiki/global-scope) | Escopo global (`global.*`) |
| [Wiki / Addons](https://kubejs.com/wiki/addons) | Addons do KubeJS |
| [CurseForge KubeJS](https://www.curseforge.com/minecraft/mc-mods/kubejs) | Download do mod |
| [ProbeJS (Modrinth)](https://modrinth.com/mod/probejs) | Autocompletar para VS Code |
| [Misode Worldgen Generator](https://misode.github.io/worldgen/feature/) | Gerador de features worldgen |
| [minecraft.wiki](https://minecraft.wiki) | IDs de items/blocos/ores |

---

## Dicas rápidas

1. **Sempre teste com `/reload`** após mudar server_scripts — se der erro, olhe o `logs/latest.log`.
2. **Use `/kubejs hand`** para descobrir IDs/tags/NBT.
3. **Use ProbeJS** (`/probejs dump`) para autocompletar — aumenta MUITO a produtividade.
4. **Prefira tags** para receitas em vez de itens fixos (funciona com mods que adicionam variantes).
5. **Não dê `event.create` sem restart** — mudanças de startup exigem reiniciar o jogo.
6. **Use `global.*`** para funções que precisam ser chamadas de vários scripts/eventos.
7. **Regex funciona** em `event.remove`, `event.add` (tooltips), `Item.of`, `Ingredient.of` — ex.: `/mod:.*stone.*/`.
8. **Para worldgen no 1.20.1** use datapack em `kubejs/data/` (o evento do KubeJS não funciona direito nessa versão).

---

*Fim da documentação. Consulte o README.md na raiz desta pasta para o índice completo.*