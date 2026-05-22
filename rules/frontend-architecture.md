# Frontend Architecture Rules

Stack (fixed):

* Vite
* React 19
* TypeScript (strict, bundler resolution, ESM)
* Vitest + Testing Library + jsdom
* ESLint (flat config)

Any change to the fixed stack requires an ADR.

---

## Folder layout

Target layout under `src/`:

```
src/
  app/        # composition root: providers, routing, top-level layout
  features/   # one folder per user-facing capability
  shared/     # cross-cutting primitives (ui, hooks, utils)
  tenants/    # tenant data + tenant content fixtures + tenant contracts
  domain/     # pure business meaning, no React, no HTTP
  testing/    # test utilities, contract harnesses, fixtures
```

Rules:

* Folders are created **only when needed**. Do not pre-create empty layers.
* `domain/` is pure TypeScript. No React. No browser APIs. No HTTP.
* `tenants/` contains data and content shape, not styling decisions.
* `shared/ui` contains presentation primitives that consume visual tokens.
* `features/` is the **only** layer allowed to compose `domain` + `tenants`
  + `shared/ui` together.
* `app/` is the **only** layer allowed to wire providers, routes, and the
  top-level layout.
* `testing/` is the **only** layer allowed to expose test fixtures to other
  layers; production code must not import from `testing/`.

---

## Import direction (one-way)

Allowed import edges (left may import right):

* `app/` -> `features/`, `shared/`, `tenants/`, `domain/`
* `features/` -> `shared/`, `tenants/`, `domain/`
* `shared/` -> `domain/` (narrow exception — types, validation helpers, and
  constants without business meaning only; see
  `rules/ddd-boundaries.md` "Shared -> domain exception")
* `tenants/` -> `domain/` (types only)
* `domain/` -> nothing inside this repo
* `testing/` -> any layer
* Production code -> NEVER imports from `testing/`

Forbidden cycles:

* `features/` -> `app/`
* `shared/` -> `features/`
* `domain/` -> `tenants/`
* `domain/` -> `shared/`
* `domain/` -> React, browser APIs, fetch, storage

---

## File conventions

Mandatory:

* TypeScript only. No `.js` in `src/`.
* React function components only. No class components.
* One component per file for non-trivial components.
* Co-locate tests next to the unit under test as `*.test.ts(x)`.
* Co-locate token references with the primitive that uses them.
* Public API of a folder is exposed through its `index.ts`. Consumers import
  from the folder, not from internal files.

Forbidden:

* Default exports for modules that have a clear name (named exports preferred).
* Re-exporting third-party types as if they were our own.
* `any`. Use `unknown` and narrow.
* `// @ts-ignore`, `// @ts-expect-error` without an issue link or ADR.
* Inline visual values (hex, px, ms) in components — use a token reference.
* Hardcoded tenant content (copy, names, URLs) in `shared/` or `features/`.

---

## Module size

Soft limits:

* Component file: aim for <= 200 lines.
* Domain module: aim for <= 300 lines.
* Hook: single responsibility, aim for <= 100 lines.

When exceeded, split. Splitting is preferred over disabling lint.

---

## State

Mandatory:

* Local state lives in components or hooks via `useState` / `useReducer`.
* Cross-cutting state crosses a boundary only via an explicit context inside
  `app/` or a feature.

Forbidden (without ADR):

* Redux, Zustand, Jotai, Recoil, MobX, or any other external state library.
* Global mutable singletons.
* Side-effect imports (modules that mutate global state on import).

---

## Side effects

Mandatory:

* Side effects (network, storage, timers) live behind a typed adapter under
  `shared/` or a feature's `infra/` sub-folder.
* Components consume adapters through hooks. They do not import `fetch`
  directly.

Forbidden:

* Calling `fetch`, `localStorage`, `sessionStorage`, `window.*` directly from
  a component or `domain/` module.

---

## Routing

Routing decisions are deferred until the first slice that needs them. When
routing is introduced, an ADR must record the choice and the constraints.

---

## Public surface vs. internal surface

Every folder declares its public surface in `index.ts`.

Tests, contracts, and ADRs reference the **public surface only**.

Internal files may be refactored freely as long as the public surface and the
contract tests do not change.
