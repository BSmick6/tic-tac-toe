# Tic-Tac-Toe

A classic 3×3 tic-tac-toe game (X moves first) built with React 19 + TypeScript + Vite 8, with a "Play vs bot" mode. Live at https://bsmick6.github.io/tic-tac-toe/.

## How to run

Requires Node 22. Commands from the repo root:

| Command               | Purpose                          |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start the Vite dev server        |
| `npm run build`       | Typecheck (`tsc -b`) + production build |
| `npm run lint`        | ESLint                           |
| `npm run test`        | Run tests once (Vitest)          |
| `npm run test:watch`  | Run tests in watch mode          |
| `npm run preview`     | Preview the built `dist/` locally |

`npm ci` performs a clean install (as used in CI). The app deploys to GitHub Pages at https://bsmick6.github.io/tic-tac-toe/ automatically on pushes to `main`.

## AI tools used

This project was built largely by AI agents:

- **OpenHands** — the primary agent driving development
- **DeepSeek** — the main model running inside OpenHands
- **Kimi K3** — used a little at the start

## Approach

The project grew incrementally, roughly in this order:

1. **Init repo** — create the repository and initial structure
2. **Init React scaffolding** — Vite + React + TypeScript, set up **manually** (the agent got stuck on the scaffold prompt)
3. **One long session** — most of the work then happened in a single continuous session
4. **Direct commits** — committing and pushing straight to `main` at first
5. **Basic CI/CD with PRs** — moved to feature branches with pull requests and CI checks
6. **Prototype locally** — got the core game working locally
7. **Deploy to GitHub Pages** — live at https://bsmick6.github.io/tic-tac-toe/
8. **Refactor** — abstracted components and extracted pure game logic into `src/game.ts`
9. **Tests** — Vitest + Testing Library, co-located with the code
10. **AGENTS.md** — documented commands, conventions, and workflow for future agents
11. **Bot mode & more** — random-move bot ("Play vs bot"), with more features tracked as GitHub issues

The thinking process behind the build is captured in [this Google Doc](https://docs.google.com/document/d/1MHpSPs_AIAMv6G4D1M67w1SHmEp7NjaO-ptwHQZCmks/edit?usp=sharing).

## What I'd improve

- **Make the bot a LOT smarter** — e.g., an unbeatable minimax bot (hard difficulty), difficulty selection, and paced "thinking" moves (issues #5–#8, #14)
- **More features** — the backlog of ideas lives in the GitHub issues (#9–#13 cover saving game history: move logs → localStorage → export/import → server)
- **Server** — for cross-device game history and accounts
- **Dockerfile** — for running the app anywhere
- **Backend persistence** — a real backend and database instead of localStorage
- **Containerized deployment** — ship the app as containers
