# ADR-0001 — Foundation Stack

Status:
**Accepted**

Date:
2026-05-21

Supersedes:
none

Superseded by:
none

---

## Context

Cruz Control is the controlled experiment for the next generation of the
Framixor frontend pipeline. The repository validates an AI-governed,
contract-first, tenant-aware frontend workflow with TDD and lightweight DDD
boundaries. Once validated here, the patterns are intended to be promoted to
the wider Framixor product surface.

Constraints driving this decision:

* The repository was scaffolded with Vite + React 19 + TypeScript, a sanity
  Vitest suite, ESLint, and a CI pipeline that runs typecheck + tests +
  build. The pipeline is already green.
* The pipeline must support TDD with fast feedback (sub-second test runs,
  HMR for development).
* The stack must remain **lean**. The wider Framixor product separates
  backend (Supabase) from frontend; this repository must not pull backend
  SDKs, heavy state libraries, UI kits that own the design system, or
  CSS-in-JS runtimes.
* Lovable will be introduced later under guardrails (`rules/lovable-rules.md`).
  The stack must be a target Lovable can operate on without bespoke setup.
* Decisions made here affect every later slice and feature, so changing the
  stack later is expensive.

This decision is therefore in the **ADR REQUIRED** scope per
`docs/architecture/README.md`.

---

## Decision

The foundation stack is fixed as:

| Concern | Choice | Notes |
|---|---|---|
| Build tool | **Vite** | Already in use. Fast dev server, ESM-native, well supported by Lovable. |
| UI runtime | **React 19** | Already in use. Server Components / Actions are not used in this repo (no SSR). |
| Language | **TypeScript** (strict, bundler module resolution, ESM) | Already configured via `tsconfig.app.json`. `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `verbatimModuleSyntax`, `erasableSyntaxOnly` stay on. |
| Test runner | **Vitest** | Already in use. Co-located `*.test.ts(x)` files. |
| Test DOM | **jsdom** | Already in dev deps. |
| Test library | **Testing Library (React) + jest-dom** | Already in dev deps. Query by role/label/text per `rules/testing.md`. |
| Lint | **ESLint (flat config)** with `typescript-eslint`, `react-hooks`, `react-refresh` | Already configured. |
| CI | **GitHub Actions** running `tsc --noEmit`, `vitest run`, `vite build` on `develop` and `main` | Already configured at `.github/workflows/ci.yml`. |
| Package manager | **npm** | `package-lock.json` already committed. |
| Node version | **20 LTS** in CI | Matches `actions/setup-node@v4` matrix. |

The stack is treated as **fixed**:

* Any change to the stack table above (adding, removing, or replacing a tool)
  requires a superseding ADR.
* Any new runtime dependency requires its own ADR.
* Dev-only tooling additions (e.g., a missing ESLint plugin) do not require
  an ADR if they support an already-fixed tool, but they must be recorded
  in `AI_CHANGE_REPORT.md` for the change that introduces them.

---

## Alternatives considered

### Build tool

* **Next.js** — rejected. Cruz Control is not an SSR/SSG site; it is a
  laboratory. Next would couple the repository to a routing model, a server
  runtime, and a deployment shape that we explicitly do not need at this
  phase. Re-evaluable later, would require a superseding ADR.
* **Remix / React Router framework** — rejected for the same reason as Next:
  premature framework gravity.
* **Create React App** — rejected. Unmaintained, slower feedback, and
  inferior ESM story compared to Vite.
* **Plain Webpack or Rollup setup** — rejected. Reinventing the dev server
  and config is overhead with no benefit at this stage.

### UI runtime

* **React 18** — rejected. The repo was scaffolded on 19 and downgrading
  buys nothing. We do not rely on any 19-only experimental feature, so the
  upgrade path remains conservative.
* **Preact / SolidJS / Svelte / Vue** — rejected. The wider Framixor surface
  is React-oriented, and Lovable's strongest support is React.

### Test runner

* **Jest** — rejected. Vitest integrates with Vite's transform pipeline,
  removes a parallel config surface, and ships ESM-first. It is already in
  use.
* **Playwright Component Testing** — rejected as the *primary* runner.
  Useful later for end-to-end coverage; not a replacement for unit /
  behavior tests in `rules/testing.md`.

### State management

* **None at the framework level.** Local `useState` / `useReducer` are
  sufficient for the laboratory phase. External state libraries (Redux,
  Zustand, Jotai, MobX) are explicitly forbidden without a superseding ADR
  per `FRAMIXOR.md`. This avoids the most common cause of "small frontend
  becomes big frontend" drift.

### Styling

* **Tailwind / CSS-in-JS / UI kits** — all rejected for now. The repository
  uses plain CSS files under `src/` today. The first vertical slice
  (BeforeAfterGallery) will introduce the typed token API in
  `src/shared/ui/tokens/` per `docs/contracts/visual-tokens.contract.md`.
  When and how that token API is implemented (CSS variables, CSS modules,
  vanilla-extract, etc.) is an *implementation* decision that does NOT
  require an ADR per the lighter ADR scope, as long as the token surface
  and import direction stay inside the contract. Introducing a UI kit that
  owns the design system would be a contract change and would require an
  ADR.

### Linting / formatting

* Adding **Prettier** is permitted as a dev-tooling decision (no ADR
  needed) provided it does not conflict with the active ESLint rules. Not
  required by this ADR.

### Dependency manager

* **pnpm / yarn** — rejected for now. `package-lock.json` is already
  committed and CI uses `npm ci`. Changing the package manager would
  invalidate the lockfile and the CI cache; it is not worth doing at this
  stage.

---

## Consequences

Enables:

* TDD-first cycles (fast Vitest, HMR Vite) from day one.
* Predictable CI surface: typecheck, test, build are the only gates.
* A clean separation between *contract* (token API, tenant content shape) and
  *implementation* (CSS strategy, component organization), since the stack
  does not impose a styling DSL.
* Straightforward Lovable integration later — Lovable operates on Vite +
  React + TypeScript natively.

Forecloses (until a superseding ADR is authored):

* Server-side rendering, server actions, server components.
* Routing libraries beyond a single proven choice (which itself needs an
  ADR when introduced — backlog item in `docs/architecture/README.md`).
* External state libraries.
* UI kits that own the design system.
* CSS-in-JS runtime libraries.
* Backend SDKs (Supabase, Firebase, etc.). Cruz Control does not integrate
  backend in any phase covered by this ADR.

---

## Risks

1. **React 19 churn.** React 19 introduced new patterns (use, Actions). We
   deliberately do not adopt them in this phase. If a slice needs them, a
   small architecture note (not necessarily an ADR) records the adoption
   scope.
2. **No router yet.** When the first slice that needs routing arrives, the
   absence of a chosen router will be a blocker. The ADR for routing must
   precede that slice.
3. **No styling decision yet.** The first slice introduces CSS via the token
   API. A poor CSS implementation choice can leak inline values into
   components and violate `rules/visual-contracts.md`. The slice plan must
   call out the chosen CSS strategy explicitly.
4. **npm vs pnpm.** Sticking with npm trades some install-speed for
   continuity. Acceptable for the laboratory phase.

---

## Validation

This ADR is validated by the existing green CI pipeline:

* `npx tsc --noEmit` passes.
* `npm test -- --run` passes (sanity test only at this point).
* `npm run build` passes.

No code change is required by this ADR. It records the existing fixed stack
as the foundation.
