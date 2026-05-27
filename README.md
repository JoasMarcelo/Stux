<div align="center">
  <img src="public/icon.svg" width="64" height="64" alt="Stux logo" />
  <h1>Stux</h1>
  <p><strong>Supere a Procrastinação</strong></p>
  <p>Um cronômetro de estudos gamificado para vencer a inércia, um nível por vez.</p>
</div>

---

## Funcionalidades

- **Cronômetro** — temporizador de sessões com metas progressivas (2%, 10%, 25%, 50%, 80%, 100%, 120%)
- **Sistema de Marcas** — recompensas incrementais a cada percentual atingido da sua meta diária
- **Calor da Chama** — sistema de streak gradual que aumenta conforme seu nível no dia
- **Troféus** — 10 troféus desbloqueáveis ao acumular calor, com animação de celebração
- **Histórico** — visualização de todas as sessões com opção de retomar ou excluir
- **Notificações** — lembretes periódicos com mensagens motivacionais (manhã/tarde/noite)
- **Tema escuro/claro** — alternância entre temas
- **Backup em JSON** — exporte e importe seus dados
- **Notificações programadas** — receba avisos 30 minutos antes do horário que você definir

## Como funciona

O Stux usa **marcos incrementais** para quebrar a procrastinação. Você não precisa estudar horas seguidas — cada pequena sessão conta:

| Marca | % da meta | Efeito no Calor |
|-------|-----------|----------------|
| Bronze | 2% | Mantém |
| Prata | 10% | Mantém |
| Ouro | 25% | +2 🔥 |
| Esmeralda | 50% | +3 🔥 |
| Diamante | 80% | +3 🔥 |
| Lendário | 100% | +4 🔥 |
| Ascensão | 120% | +5 🔥 |

Se não estudar por um dia, perde **-2 de Calor**.

## Tecnologias

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) (Radix primitives)
- [Zustand](https://github.com/pmndrs/zustand) (estado persistido no localStorage)
- [Lucide](https://lucide.dev/) + [HugeIcons](https://hugeicons.com/) (ícones)

## Começando

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Deploy

### Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy
```

O build gera uma exportação estática na pasta `out/`.

## Licença

MIT
