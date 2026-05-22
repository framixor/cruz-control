# First Slice Plan — BeforeAfterGallery

Status:
**Submitted for review** (2026-05-21, Round 2 — planning only)

Author:
AI assistant operating under `workflows/feature-implementation.md` Step 1.

Type:
Planning artifact. No code, no `src/` folders, no fixtures, no contract or
rule changes. Implementation requires a separate authorization.

Reviewer instruction this plan responds to:

> Authorized: plan only the BeforeAfterGallery slice. Do NOT implement code.
> Do NOT create folders/files beyond planning artifacts. Read FRAMIXOR.md,
> CURRENT_STATE, NEXT_TASK, OPEN_BLOCKERS and relevant rules first. Produce:
> goal / domain boundaries / contracts required / theme & token requirements /
> tenant content strategy / TDD strategy / acceptance criteria / risks /
> AI_CHANGE_REPORT / suggested folder impacts. Deliver plan for review and
> stop.

Files read (Step 0):

* `FRAMIXOR.md`
* `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`, `.planning/OPEN_BLOCKERS.md`
* `rules/frontend-architecture.md`, `rules/ddd-boundaries.md`, `rules/solid-guidelines.md`,
  `rules/visual-contracts.md`, `rules/testing.md`, `rules/lovable-rules.md`
* `workflows/feature-implementation.md`, `workflows/review-ui.md`,
  `workflows/ai-handoff.md`
* `docs/architecture/ADR-0001-foundation-stack.md`,
  `docs/architecture/README.md`
* `docs/contracts/tenant-content.contract.md` (v1),
  `docs/contracts/visual-tokens.contract.md` (v1),
  `docs/contracts/README.md`
* `src/App.tsx`, `src/App.test.tsx`, `src/main.tsx`, `src/index.css`,
  `src/App.css`, `package.json`, `tsconfig.app.json`,
  `.github/workflows/ci.yml`

---

## 1. Goal of the slice

Validate the AI-governed Cruz Control frontend pipeline end-to-end using
**BeforeAfterGallery** as the smallest realistic scenario.

The slice is a *pipeline test*, not visual polish. Its purpose is to prove
that:

1. Tenant content reaches the screen via the typed `Tenant` →
   `BeforeAfterItem` contract, with no hardcoded copy in any
   presentational component.
2. Visual decisions reach the screen exclusively through the typed token
   API in `src/shared/ui/tokens/`, with no inline hex / px / rem / ms / s
   in any component.
3. Layer boundaries (`app/`, `features/`, `shared/`, `tenants/`,
   `testing/`) hold up under a real composition.
4. The TDD cycle (failing tests → minimal implementation → refactor)
   produces all five test categories defined in `rules/testing.md`.
5. CI (`tsc --noEmit`, `vitest run`, `vite build`) stays green.

Out of scope of the slice (explicit):

* Visual polish, brand fidelity, animations, motion design.
* Filtering, searching, sorting, pagination, or any gallery affordance
  beyond the simplest meaningful interaction.
* Routing.
* `motion.*`, `elevation.*`, `breakpoint.*`, `zIndex.*` tokens (out of v1).
* Lovable wiring.
* Any backend or Supabase work.
* Any new runtime dependency.
* Creating `src/domain/` (see §2).

---

## 2. Domain boundaries

### Layers created in this slice

`app/`, `features/`, `shared/`, `tenants/`, `testing/`. Five of six layers
defined in `rules/ddd-boundaries.md`. Each is created **only because the
slice needs it**.

### Layer that is intentionally NOT created: `domain/`

BeforeAfterGallery is presentation-heavy with very thin behavior. The only
candidate "domain" operations are trivial pure helpers (e.g.,
`uniqueCategories(items)`, `isToggleable(item)`). Per the
**Complexity escalation rule** in `rules/ddd-boundaries.md` — "behavior
repeats in at least 2 distinct features, OR a boundary cannot be tested
cleanly without extraction, OR coupling measurably increases" — none of
those criteria are met here.

Decision: **do not create `src/domain/` in this slice.** Any pure helper
that is needed lives privately inside `src/features/before-after-gallery/`
and graduates to `src/domain/` only when a second consumer appears.

This is itself a validation point: the layer model accommodates "domain
not yet needed" cleanly. The `tenants/` → `domain/` and `shared/` →
`domain/` allowed edges remain unused in this slice; that is correct.

### Per-layer responsibility for this slice

| Layer | What it owns in this slice | What it forbids |
|---|---|---|
| `app/` | Composition root: a tenant context provider wrapping `<BeforeAfterGallery />`, mounted from `App.tsx`. | Business logic. Component-level styling decisions. Direct tenant fixture imports inside primitives (the provider re-exports the typed data). |
| `features/before-after-gallery/` | The composition that consumes tenant data via the tenant context hook and renders one `BeforeAfterCard` primitive per item. Local "view-model" hooks if any. | Importing from `app/`. Importing from another feature. Inlining visual values. Hardcoding tenant copy. Reaching into another folder's internals. |
| `shared/ui/tokens/` | Typed token API exposing v1 surface (`spacing.*`, `radius.*`, `typography.*`, `surface.*`). CSS variables backing the typed values. | Tenant-specific values. Business logic. Importing from `features/` or `app/`. |
| `shared/ui/before-after-card/` | A presentation primitive that takes a `BeforeAfterItem` via props and exposes a documented public API (see §3). Uses tokens for all visual decisions. | Direct tenant fixture imports. Inline visual values. Side effects beyond local component state. |
| `tenants/` | `Tenant`, `TenantId`, `ImageRef`, `BeforeAfterItem` type declarations conforming to the v1 contract. One concrete tenant fixture (`cruz-control`) plus minimal additional fixtures used by tests for cardinality (0 / 1 / N). | Logic. React components. Side effects. Importing from `features/`, `shared/`, `app/`. Carrying styling decisions. |
| `testing/` | A `renderWithProviders` test helper, an empty/single/multi tenant fixture set, and contract harnesses for token existence + tenant conformance. | Being imported by production code. |

### Import edges actually used

* `app/` → `features/`, `tenants/`
* `features/before-after-gallery/` → `shared/ui/before-after-card`,
  `shared/ui/tokens`, `tenants/` (types only)
* `shared/ui/before-after-card/` → `shared/ui/tokens`, `tenants/` (types only)
* `tenants/` → no internal imports
* `testing/` → all layers (tests only)

Edges NOT used (and that is fine): every edge involving `domain/` and the
narrow `shared/` → `domain/` exception.

### Boundary justification per cross-layer import

| Edge | Justification |
|---|---|
| `app/` → `features/` | Composition root mounting the feature. Standard. |
| `app/` → `tenants/` | The provider needs the tenant data + types to populate context. Standard. |
| `features/` → `shared/ui/*` | Feature consumes presentation primitives. Standard. |
| `features/` → `tenants/` (types only) | Feature props consume `BeforeAfterItem[]` via context; types travel to feature for prop typing. Type-only import via `import type`. |
| `shared/ui/before-after-card/` → `tenants/` (types only) | The card's prop type IS `BeforeAfterItem`. Type-only import. No runtime coupling to tenant data. |

The `tenants/ → domain/` edge in `rules/frontend-architecture.md` is not
used. The narrowed `shared/ → domain/` edge is not used.

---

## 3. Contracts required

This slice consumes the **already-accepted** contracts as-is. **No
contract revision** is requested in this slice.

| Contract | Version | Source | Slice usage |
|---|---|---|---|
| Tenant content | v1 | `docs/contracts/tenant-content.contract.md` | `Tenant`, `TenantId`, `ImageRef`, `BeforeAfterItem` are consumed verbatim. |
| Visual tokens | v1 | `docs/contracts/visual-tokens.contract.md` | Four categories implemented; only a subset of keys is *visually rendered* by this slice, but the **full v1 surface** is implemented and tested (see §4 and §6). |

### New contract proposed (drafted in this slice, not yet authored)

`docs/contracts/component-api.contract.md` — first version. Per
`docs/contracts/README.md`: *"Authored when the first primitive lands."*
The first primitive in this slice is `BeforeAfterCard`, and the first
feature public API is `BeforeAfterGallery`. The plan therefore proposes
authoring this contract **alongside** the slice implementation (not in
this planning round).

Proposed v1 minimum surface for the component-api contract:

* Naming: PascalCase exported names; camelCase props.
* Default exports forbidden; named exports only (already in
  `rules/frontend-architecture.md`, restated for component context).
* Mandatory `aria-*` coverage when a component carries an interactive
  role.
* Public prop types live next to the component and are re-exported from
  the folder's `index.ts`.
* Primitives (`shared/ui/*`) accept token *names*, not raw values, for any
  visual prop (already in `rules/visual-contracts.md`, restated as a
  component-API obligation).
* Backward-compatibility rules: adding optional props is additive; making
  an optional prop required, removing a prop, or changing a callback
  signature is a contract change.

Authorship of this contract is part of the **implementation** authorization
request, not this planning authorization.

### Public surfaces this slice introduces (drafted, subject to review)

#### `BeforeAfterCard` (primitive in `shared/ui`)

```ts
type BeforeAfterCardProps = {
  item: BeforeAfterItem;        // from tenants/types
  initialView?: "before" | "after";   // optional, default "before"
  onViewChange?: (view: "before" | "after") => void; // optional
};
```

* Renders `item.title`, `item.description`, `item.category`.
* Renders one of `item.beforeImage` / `item.afterImage` based on internal
  toggle state.
* Toggle is a button-role element with `aria-pressed`, click + keyboard
  (Space / Enter) parity.
* Visual decisions (spacing, radius, typography, surface) flow through
  tokens.

#### `BeforeAfterGallery` (feature in `features/before-after-gallery`)

```ts
type BeforeAfterGalleryProps = {
  // Feature reads items from the tenant context by default.
  // For tests and storybook-style usage, an explicit override is allowed:
  itemsOverride?: BeforeAfterItem[];
  emptyState?: React.ReactNode;     // optional fallback when items.length === 0
};
```

* Empty / single / N rendering paths are first-class (see §6).
* No filtering, sorting, search, pagination in v1.
* No internal state beyond what the cards manage themselves.

#### `TenantProvider` + `useTenant()` (in `app/providers/tenant`)

```ts
type TenantProviderProps = { tenant: Tenant; children: React.ReactNode };
function useTenant(): Tenant;     // throws if used outside provider
```

* The provider does **not** select a tenant. Selection happens at the
  composition root (`App.tsx`) where the active `Tenant` is passed in.
* `useTenant()` returns the typed `Tenant` so consumers do not import
  fixtures directly.

---

## 4. Theme / token requirements

### v1 surface to implement (full, even if partly unused visually)

Per `docs/contracts/visual-tokens.contract.md` and the **token-existence
test obligation** in `rules/testing.md` and the visual contract:

* `spacing.*`: `none, xs, sm, md, lg, xl`
* `radius.*`: `none, sm, md, lg, full`
* `typography.*`: `display.*, heading.*, subheading.*, body.*, caption.*`
  (each with `size`, `weight`, `lineHeight`, `letterSpacing`) +
  `fontFamily.sans`, `fontFamily.mono`
* `surface.*`: `default, raised, sunken, text.primary, text.secondary,
  text.inverse, border.default, border.strong, accent, accent.contrast`

**All v1 keys above must be present and non-empty in the implementation,
even if BeforeAfterGallery does not visually render every one.** This is
the contract test obligation; the slice cannot ship a partial v1 surface.

### Subset actually consumed by BeforeAfterGallery v1

* `spacing.sm`, `spacing.md`, `spacing.lg`
* `radius.md`, `radius.lg`
* `typography.heading.*`, `typography.body.*`, `typography.caption.*`,
  `typography.fontFamily.sans`
* `surface.default`, `surface.raised`, `surface.text.primary`,
  `surface.text.secondary`, `surface.border.default`, `surface.accent`,
  `surface.accent.contrast`

### CSS implementation strategy proposed

Per ADR-0001, the CSS strategy is left to the slice. The plan proposes:

* **CSS variables on `:root`** for token values, declared in
  `src/shared/ui/tokens/tokens.css`.
* **Typed object** in `src/shared/ui/tokens/index.ts` whose values are
  `var(--…)` strings. Components consume the typed object; CSS variables
  are an implementation detail behind the type.
* **CSS Modules** (zero-dependency, built into Vite) for component-scoped
  styles. Class names use the CSS variables; components reference class
  names via the imported module.
* No Tailwind, no styled-components, no vanilla-extract. No new
  dependency.

Rationale:

* Zero new runtime dependency → no ADR.
* CSS Modules give scoping; CSS variables give themability and Lovable a
  natural seam to swap values later (`rules/lovable-rules.md`).
* The typed object (`tokens.spacing.md` etc.) keeps `rules/visual-contracts.md`
  satisfied: component code references the typed key, never a raw value.

Alternative considered and rejected: vanilla-extract (would require a new
dependency and an ADR; defer until a concrete need appears).

### Theming posture in v1

Single theme. The CSS variables resolve to one set of values. The contract
already permits a tenant theme override later via value substitution; v1
does not exercise this path because there is only one tenant fixture used
visually (`cruz-control`).

---

## 5. Tenant content strategy

### Tenant id

`cruz-control` (kebab-case, per `tenant-content.contract.md`).

### Fixture surface

Three fixtures, all conforming to v1:

| Fixture | Location (proposed) | Purpose |
|---|---|---|
| `cruz-control` | `src/tenants/cruz-control/index.ts` | The active tenant used by `App.tsx`. Multiple `BeforeAfterItem`s across at least 2 distinct categories. |
| Empty-tenant test fixture | `src/testing/fixtures/empty-tenant.ts` | Empty `beforeAfterItems`. Used by rendering tests for the 0-item case. |
| Single-tenant test fixture | `src/testing/fixtures/single-tenant.ts` | Exactly 1 `BeforeAfterItem`. Used by rendering tests for the 1-item case. |

The `cruz-control` fixture itself covers the N case for behavior tests.

### Image strategy

* Image fields use `ImageRef` per the contract; `alt` is non-empty in
  every fixture.
* For the visible `cruz-control` fixture, the slice will reuse existing
  starter assets (`src/assets/hero.png`) and add **at most two**
  additional images only if the slice cannot demonstrate ≥2 categories
  otherwise. The plan does not commit to specific filenames here; the
  implementation step will propose the minimal asset set as part of its
  request.
* Test fixtures use 1×1 placeholder data URLs to avoid asset churn.

### Tenant data delivery

* `App.tsx` imports the `cruz-control` fixture and passes it to
  `<TenantProvider tenant={cruzControl}>`.
* `BeforeAfterGallery` reads items via `useTenant()` from
  `app/providers/tenant`.
* `BeforeAfterCard` (a primitive in `shared/ui`) does **not** import
  tenant fixtures; it receives a `BeforeAfterItem` via props.

This satisfies all four binding rules from `.planning/NEXT_TASK.md`:

1. No hardcoded content (everything flows from the fixture).
2. No inline visual values (everything flows through tokens).
3. No direct tenant fixture imports inside presentational primitives.
4. Tests before implementation where practical (see §6).

---

## 6. TDD strategy

### Test categories and order (failing first, per `rules/testing.md`)

The implementation step will write tests in this order, watch them fail
for the right reason, then write the minimum production code to make them
pass.

#### Stage A — Token-existence tests
Owner: `src/shared/ui/tokens/index.test.ts` (or co-located in
`src/testing/contracts/`).

* Assert every v1 key in each category exists on the exported token API
  and resolves to a non-empty string.
* Assert each `typography.<role>.size`, `.weight`, `.lineHeight`,
  `.letterSpacing` resolves to a string.
* Forbidden: assertions on specific values.
* Type test: a TypeScript declaration test confirms the union of
  `SpacingKey | RadiusKey | TypographyKey | SurfaceKey` is exactly v1
  (removing or renaming a key produces a `tsc` failure).

#### Stage B — Tenant-contract tests
Owner: `src/tenants/tenants.test.ts`.

* For each fixture under `src/tenants/`, assert it conforms to `Tenant`:
  `id` is non-empty kebab-case; `beforeAfterItems` is an array; every
  item has the five required fields; every `ImageRef.alt` is non-empty.
* Additional assertion for `cruz-control`: ≥2 distinct `category` values
  to exercise the N-category path.
* Forbidden: assertions on specific copy.

#### Stage C — Component contract tests
Owner: `src/shared/ui/before-after-card/BeforeAfterCard.contract.test.tsx`
and `src/features/before-after-gallery/BeforeAfterGallery.contract.test.tsx`.

* Assert the public prop signature matches §3 (TypeScript-level test
  using a `expectTypeOf` pattern or a deliberate compile-error fixture).
* Assert that the `data-*` / `role` / `aria-*` surface that tests rely
  on is present.

#### Stage D — Rendering tests (cardinality 0 / 1 / N)
Owner: `src/features/before-after-gallery/BeforeAfterGallery.render.test.tsx`.

* 0-item: `<BeforeAfterGallery itemsOverride={[]} />` renders an empty
  state without crashing. If `emptyState` prop is provided, it appears.
* 1-item: renders exactly one card, with title/description/category text
  visible (queried by role / text, not class).
* N-item: renders N cards for the `cruz-control` fixture, in source
  order.

#### Stage E — Component behavior tests
Owner: `src/shared/ui/before-after-card/BeforeAfterCard.behavior.test.tsx`
(primitive-level) and
`src/features/before-after-gallery/BeforeAfterGallery.behavior.test.tsx`
(feature-level).

* Card click toggles `before` ↔ `after`; the visible image's `alt`
  changes correspondingly; `aria-pressed` flips.
* Card keyboard (Space / Enter) achieves the same toggle.
* Optional `onViewChange` callback fires on every toggle with the new
  view.
* Feature-level: with two cards rendered, toggling one does not affect
  the other (independence).

### Test infrastructure

* `src/testing/render.tsx` exposes `renderWithProviders(ui, { tenant })`
  that wraps in `<TenantProvider>` for behavior tests.
* `src/testing/fixtures/` exposes the empty / single / multi tenant
  fixtures referenced in §5.
* Production code never imports from `src/testing/`.

### What is NOT tested

* Specific token *values* (forbidden).
* Specific tenant *copy* (forbidden).
* Snapshot-only suites (forbidden).
* Cross-feature integration (only one feature exists).
* Routing (none yet).
* Accessibility *appearance* details such as color contrast (color values
  are Lovable's surface; contrast becomes a future token-relationship
  test once `surface.*` semantic pairs are formalized — out of v1).

### CI gate per workflow Step 3

After tests turn green:

1. `npx tsc --noEmit`
2. `npm test -- --run`
3. `npm run build`

All three must be green. One fix-and-retry attempt allowed; if still red,
stop and report.

---

## 7. Acceptance criteria

The slice is **done** when **all** of the following are true:

1. `src/shared/ui/tokens/` exposes the full v1 token surface; every key
   in `spacing`, `radius`, `typography`, `surface` resolves to a non-empty
   string; the typed key surface matches v1 exactly.
2. `src/tenants/types.ts` re-exports `Tenant`, `TenantId`, `ImageRef`,
   `BeforeAfterItem` exactly per v1.
3. `src/tenants/cruz-control/index.ts` is a `Tenant` fixture with `id =
   "cruz-control"` and ≥2 distinct categories across its
   `beforeAfterItems`.
4. `src/shared/ui/before-after-card/` exports a primitive
   `BeforeAfterCard` that consumes `BeforeAfterItem` via props, renders
   title / description / category, toggles between `beforeImage` and
   `afterImage` via click and keyboard, exposes `aria-pressed`, and uses
   tokens for every visual decision.
5. `src/features/before-after-gallery/` exports `BeforeAfterGallery`
   which reads items from the tenant context by default (with an
   `itemsOverride` escape hatch for tests) and renders 0 / 1 / N
   correctly.
6. `src/app/providers/tenant.tsx` provides `TenantProvider` and
   `useTenant`. `useTenant` throws when used outside the provider.
7. `src/App.tsx` is updated to mount the new feature inside
   `<TenantProvider tenant={cruzControl}>`. Any starter content that has
   no place in the slice is removed.
8. All five test categories pass: token-existence, tenant-contract,
   component contract, rendering (0/1/N), component behavior.
9. `npx tsc --noEmit`, `npm test -- --run`, `npm run build` all green.
10. No file under `rules/`, `workflows/`, `FRAMIXOR.md`, `docs/contracts/*`,
    `docs/architecture/ADR-0001-foundation-stack.md`, `package.json`,
    `tsconfig*.json`, `vite.config.ts`, `eslint.config.js`, or
    `.github/workflows/ci.yml` is modified during the slice.
    *Exception:* `docs/contracts/component-api.contract.md` is **created**
    (v1 first authoring) per §3.
11. `AI_CHANGE_REPORT.md` Round 3 (implementation) entry is appended.
12. `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
    `.planning/OPEN_BLOCKERS.md` are updated to reflect the slice landing
    and the next allowed work.

The slice is **not** "done" if any test is skipped, any contract is
silently widened, any inline visual value sneaks into a component, or any
tenant copy is hardcoded.

---

## 8. Risks / architecture drift risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | CSS strategy choice (CSS Modules + CSS variables) leaks raw values into components if a developer takes a shortcut. | Medium | Medium | All visual decisions go through the typed token object; review checks for hex / px / rem / em / ms / s in components per `rules/visual-contracts.md`; future "CI enforcement for inline visual values" item from `.planning/OPEN_BLOCKERS.md` will harden this. |
| 2 | Token-existence tests freeze the surface but say nothing about layout. A primitive could legally read `tokens.spacing.md` and produce a broken layout. | Medium | Low | Behavior + rendering tests catch user-visible regressions; visual polish is explicitly out of scope. |
| 3 | The slice creates 5 of 6 layers in one go; this could feel like over-scaffolding. | Medium | Low | Each layer is justified by a concrete slice need (§2); none are pre-emptive. The Complexity Escalation Rule kept `domain/` out. |
| 4 | Tenant context could become a god-context if future slices add unrelated content surfaces. | Low | Medium | The provider is currently a single `Tenant` value object, not a registry. Future slices that introduce new content surfaces will revisit the provider shape, possibly via a contract revision. Recorded as a future-work concern, not a blocker. |
| 5 | `useTenant()` throwing outside the provider can cause a confusing test failure in suites that forget to wrap. | Low | Low | `src/testing/render.tsx` wraps by default; documented in the test helper. |
| 6 | Adding `docs/contracts/component-api.contract.md` mid-slice could blur the line between "consume contracts" and "introduce contracts". | Low | Medium | The component-api contract is **first authoring**, not a *change* to an existing contract. Authoring it alongside the first primitive matches `docs/contracts/README.md`'s "Authored when the first primitive lands". Recorded explicitly in §3 so the reviewer can accept or defer it. |
| 7 | The slice changes `src/App.tsx` away from the Vite starter, which is visible in the laboratory but unstyled. A reviewer expecting visuals might mistake "minimal" for "broken". | Medium | Low | The plan and AI_CHANGE_REPORT both state visual polish is out of scope. Acceptance criteria do not include visual fidelity. |
| 8 | Image strategy: if the implementation step proposes new asset files, that is "files beyond planning" relative to *this* round but normal for the implementation round. | n/a | n/a | Listed transparently in §5 as a deferred decision; the implementation request must include an explicit asset list. |
| 9 | `verbatimModuleSyntax` (in `tsconfig.app.json`) requires `import type { ... }` for type-only imports. The `tenants/` → `features/` and `tenants/` → `shared/ui/before-after-card/` edges are type-only; missing `type` keyword breaks the build. | Medium | Low | Plan calls these edges out as type-only (§2). Implementation review will check `import type` usage. |
| 10 | `noUnusedLocals` / `noUnusedParameters` may bite when scaffolding (e.g., a `TenantProviderProps` field defined but not yet wired). | Medium | Low | TDD posture limits this: tests force every declared prop to be exercised. |
| 11 | The slice could quietly grow scope (e.g., add filtering "while we're here"). | Medium | High | Acceptance criteria §7 lock the surface. Anything beyond §7 is rejected at review. The Complexity Escalation Rule reinforces this. |
| 12 | Lovable rules are preventive only; this slice does not exercise them. If a reviewer simulates a Lovable change later on this slice, edge cases may surface. | Low | Low | Acceptable. Lovable wiring is gated on its own ADR per `.planning/OPEN_BLOCKERS.md` future-work entry. |

### Architecture-drift watchlist for review

The reviewer should reject the slice if any of the following appears:

* A `src/domain/` folder created without justification.
* A primitive in `shared/ui/` that imports a tenant fixture file directly.
* A token-existence test that asserts a *value* (e.g., `expect(spacing.md).toBe('1rem')`).
* A test asserting tenant *copy* (e.g., `expect(...).toHaveTextContent('Specific copy')`).
* A snapshot-only test suite.
* Any inline `style={{ color: '#...' }}` or string literal containing
  `px` / `rem` / `em` / `ms` / `s` in any component file under
  `src/shared/ui/` or `src/features/`.
* Any new runtime dependency in `package.json`.
* Any change to `rules/`, `workflows/`, `FRAMIXOR.md`, `docs/contracts/*.md`
  except the first authoring of `component-api.contract.md`,
  `docs/architecture/ADR-0001-foundation-stack.md`, or
  `.github/workflows/ci.yml`.
* A cross-feature import (only one feature exists; an attempt would be
  meaningless).
* A `features/` → `app/` import.
* A `domain/` import of any kind (the layer should not exist yet).

---

## 9. AI_CHANGE_REPORT

This planning round is recorded as **Round 2 — Plan submitted: BeforeAfterGallery**
in `AI_CHANGE_REPORT.md`. The report entry covers:

* Objective and constraints of the planning authorization.
* Files read.
* Decisions taken in this plan (especially: do not create `src/domain/`;
  CSS Modules + CSS variables; full v1 token surface implementation;
  `cruz-control` as tenant id; toggle interaction as the simplest
  meaningful behavior; first authoring of `component-api.contract.md`
  proposed alongside implementation, not in this round).
* Files created in this round (the plan itself plus the report entry plus
  `.planning/*` updates).
* Risks (mirrors §8 of this plan).
* Validation steps (review-time checklist for the plan; implementation
  validation lives in workflow Step 3 of the next round).
* Rollback (delete the plan, revert `.planning/*`).
* Stop conditions still in force (the AI is stopped after this plan; the
  next authorization is to **implement** the slice, separate from the
  planning authorization received here).
* Revision-log addendum: "Round 2 — Plan submitted: BeforeAfterGallery".

The report entry does not duplicate this plan; it references it.

---

## 10. Suggested folder impacts (proposal only)

Implementation (separate authorization, not this round) **will create**
the following files. Folders are created only because their files require
them.

### Files created — production code

```
src/app/providers/tenant.tsx
src/app/providers/index.ts

src/features/before-after-gallery/BeforeAfterGallery.tsx
src/features/before-after-gallery/BeforeAfterGallery.module.css
src/features/before-after-gallery/index.ts

src/shared/ui/before-after-card/BeforeAfterCard.tsx
src/shared/ui/before-after-card/BeforeAfterCard.module.css
src/shared/ui/before-after-card/index.ts
src/shared/ui/index.ts

src/shared/ui/tokens/tokens.css
src/shared/ui/tokens/index.ts

src/tenants/types.ts
src/tenants/index.ts
src/tenants/cruz-control/index.ts
```

### Files created — tests

```
src/shared/ui/tokens/index.test.ts
src/shared/ui/before-after-card/BeforeAfterCard.contract.test.tsx
src/shared/ui/before-after-card/BeforeAfterCard.behavior.test.tsx
src/features/before-after-gallery/BeforeAfterGallery.contract.test.tsx
src/features/before-after-gallery/BeforeAfterGallery.render.test.tsx
src/features/before-after-gallery/BeforeAfterGallery.behavior.test.tsx
src/tenants/tenants.test.ts
```

### Files created — testing utilities (not production code)

```
src/testing/render.tsx
src/testing/fixtures/empty-tenant.ts
src/testing/fixtures/single-tenant.ts
src/testing/index.ts
```

### Files created — contract (first authoring)

```
docs/contracts/component-api.contract.md
```

(v1; subject to its own reviewer acceptance during the implementation
round.)

### Files modified

```
src/App.tsx           # replace starter content with <TenantProvider> + <BeforeAfterGallery />
src/main.tsx          # likely unchanged; possibly imports tokens.css if the strategy requires it
src/index.css         # likely emptied or replaced with a minimal reset that does not declare visual values
src/App.css           # likely deleted or emptied (starter visual values removed)
src/App.test.tsx      # may be repurposed as an App-shell smoke test, or deleted if duplicated by feature tests
```

### Files explicitly NOT modified

```
FRAMIXOR.md
AI_CHANGE_REPORT.md     # appended (new round), not modified in place
.planning/CURRENT_STATE.md     # updated, not rewritten beyond the latest cycle
.planning/NEXT_TASK.md         # updated to reflect implementation authorization request
.planning/OPEN_BLOCKERS.md     # updated; future-work backlog kept

rules/                       # all rule files
workflows/                   # all workflow files

docs/architecture/README.md
docs/architecture/ADR-0001-foundation-stack.md
docs/contracts/tenant-content.contract.md     # consumed as v1, not modified
docs/contracts/visual-tokens.contract.md      # consumed as v1, not modified
docs/contracts/README.md
docs/state/README.md

package.json
package-lock.json
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vite.config.ts
eslint.config.js
.github/workflows/ci.yml
```

### Folder count summary

| Layer | New folders |
|---|---|
| `src/app/providers/` | 1 |
| `src/features/before-after-gallery/` | 1 |
| `src/shared/ui/`, `src/shared/ui/before-after-card/`, `src/shared/ui/tokens/` | 3 |
| `src/tenants/`, `src/tenants/cruz-control/` | 2 |
| `src/testing/`, `src/testing/fixtures/` | 2 |
| **Total new folders** | **9** |
| **Total new files** | **~20 (production + tests + utilities + contract)** |

Each folder has at least one file; no empty layers are created.

---

## Stop conditions for this plan

* This plan is a **planning artifact only**. No code, no `src/` folder, no
  fixture, no rule or workflow change.
* The plan is **submitted for review**. The AI **stops** after delivery.
* The next allowed action is reviewer feedback on this plan. After
  feedback (accept / amend / reject), and only if accepted (with or
  without amendments), a **separate authorization** is required to begin
  implementation per `workflows/feature-implementation.md` Step 2.
* If amendments are requested, the AI returns to Step 1 (planning) and
  re-issues a revised plan. It does **not** begin implementation on
  partial feedback.


---

## Amendments (Round 2.1, post-review)

The reviewer accepted this plan with three focused amendments. Each is
recorded inline below. No other section of the plan is changed.

### A1 — Why BeforeAfterGallery is the preferred first slice

Hero / Button / Card / TenantContentBlock each exercise only a fraction
of the pipeline: Hero is one item with no cardinality, Button is tokens
+ a11y only, Card is a primitive without a feature layer, and
TenantContentBlock would freeze a generic content envelope before any
concrete content type exists. BeforeAfterGallery is the smallest slice
that exercises all five test categories at once — contract,
tenant-contract, token-existence, rendering (0/1/N), behavior (toggle
with `aria-pressed`) — and stresses the layer model end-to-end
(primitive in `shared/ui`, feature in `features/`, tenant data via
`app/` context) without forcing a `domain/` layer that is not yet
earned.

### A2 — Token surface: full v1 vs consumed-only

Recommendation: **implement full v1 surface (Option A).** ~43 keys with
sensible defaults sit in one CSS-variables file plus one typed map.
Option A satisfies the existing contract test obligation in
`docs/contracts/visual-tokens.contract.md` v1 as written, so no contract
revision and no governance round interrupt implementation. Option B
would require either narrowing the contract's test obligation (a
governance round) or letting token-existence tests fail for unconsumed
tokens (a contract violation). Option A also pre-pays the cost for
future slices: any v1 token can be consumed later without re-opening
token implementation. Net: faster and governance-clean.

### A3 — `component-api.contract.md` timing

Recommendation: **author alongside implementation (not before).**
`docs/contracts/README.md` already specifies this contract as "authored
when the first primitive lands"; `BeforeAfterCard` is that primitive,
so authoring it now is grounded in a real consumer. "Before" would add
a separate planning round to draft a contract without a concrete user
and risks specifying conventions the actual primitive then bends to
fit. "Alongside" lets the reviewer accept or reject the contract in the
same diff as the code; if rejected, both fall together and re-work is
small. Net: lower governance friction, no loss of rigor.

### Verdict

`READY_FOR_IMPLEMENTATION = YES`

Subject to the reviewer issuing the implementation authorization phrase
(e.g., "Authorized: implement the BeforeAfterGallery slice per the
approved plan"). No remaining technical blockers from the plan side. No
further amendments expected unless the reviewer overrides A2 or A3
above.
