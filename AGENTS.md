# AGENTS.md

## Project

Tic-tac-toe (3×3, X moves first) built with React 19 + TypeScript + Vite 8. Deployed to GitHub Pages at https://bsmick6.github.io/tic-tac-toe/.

## Commands

| Command           | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the Vite dev server        |
| `npm run build`   | Typecheck (`tsc -b`) + production build |
| `npm run lint`    | ESLint                          |
| `npm run test`    | Run tests once (Vitest)         |
| `npm run test:watch` | Run tests in watch mode       |
| `npm run preview` | Preview the built `dist/` locally |
| `npm ci`          | Clean install (used in CI)      |

Node 22 is used locally and in CI.

## Project structure

```
src/
  game.ts                 Pure game logic (no React): Player/Squares types,
                          WINNING_LINES, createEmptyBoard, calculateWinner, makeMove
  components/
    Board.tsx             Owns game state; renders squares + strike line + restart button
    Square.tsx            Presentational cell button
    StrikeLine.tsx        Winning-line SVG (geometry constants live here)
  App.tsx                 Thin composition shell: <h1> + <Board>
  index.css               Design tokens (CSS vars) incl. light/dark themes
  main.tsx                Entry point
  setup.ts                Test setup (jest-dom matchers + RTL cleanup)
  *.test.ts(x)            Tests, co-located next to the code under test
.github/workflows/
  ci.yml                  Lint + test + build on pull requests
  deploy.yml              Test + build + publish to GitHub Pages on main
```

`dist/` is the gitignored build output.

## Conventions

- Keep game rules in pure functions in `src/game.ts` — no React, no mutation (functions return new state).
- Keep presentation composable in `src/components/`; `Board` owns state.
- Use `import type` for type-only imports (project uses `verbatimModuleSyntax`).
- Style with the CSS variables in `src/index.css` (respect light/dark theme). No inline styles.
- Style: no semicolons, single quotes, 2-space indent.
- Prefer the shortest idiomatic expression (existing code uses e.g. `Array(9).fill(null)`, nested ternaries).

## Testing

- Vitest 5 + @testing-library/react + jest-dom; jsdom environment; user-event for interaction.
- Import `describe`/`it`/`expect` explicitly from `vitest` (globals are disabled); Testing Library cleanup is registered in `src/setup.ts`.
- New features/fixes should ship with co-located tests.
- Run `npm run test` after changes; CI blocks merges and deploys on failures.

## Deployment & CI

- GitHub Pages via the official Pages Actions (`actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`).
- The site lives under the `/tic-tac-toe/` subpath — do not change `base` in `vite.config.ts`.
- `ci.yml` runs on PRs; `deploy.yml` runs on pushes to `main` (and manual `workflow_dispatch`).
- Merging to `main` auto-redeploys: build → upload artifact → deploy.

## Git workflow

- One feature/fix per branch; open a PR against `main` (never push straight to `main`).
- The maintainer squash-merges PRs from the GitHub UI and stays on `main`.
- Local checkout is on `main`; after a merge, run `git checkout main && git pull` to sync.