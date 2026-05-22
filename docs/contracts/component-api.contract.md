# Component API Contract

Status:
**v1 — Accepted 2026-05-21** (first authored alongside the
BeforeAfterGallery slice, per the slice plan amendment A3 and per
`docs/contracts/README.md` — "Authored when the first primitive
lands.")

This contract governs the public API of components exported from
`src/shared/ui/*` (primitives) and `src/features/*` (feature
compositions). The "public API" is the surface that tests and other
modules can rely on. Internal implementation details are NOT part of
the contract.

The companion documents are:

* `rules/frontend-architecture.md` — file conventions and folder layout.
* `rules/visual-contracts.md` — token consumption obligations.
* `docs/contracts/tenant-content.contract.md` — tenant data shape.
* `docs/contracts/visual-tokens.contract.md` — token surface.

---

## Naming

Mandatory:

* Components are exported with PascalCase names: `BeforeAfterCard`,
  `BeforeAfterGallery`.
* Component prop types are exported with the `<ComponentName>Props`
  suffix: `BeforeAfterCardProps`, `BeforeAfterGalleryProps`.
* Auxiliary types referenced by props live next to the component and
  are re-exported from the folder's `index.ts`: e.g.,
  `BeforeAfterCardView`.
* Named exports only. Default exports are forbidden (already in
  `rules/frontend-architecture.md`; restated for the component
  context).

---

## Public surface

The public surface of a component folder consists of:

1. The component function (PascalCase).
2. The exported `<ComponentName>Props` type.
3. Any auxiliary types referenced by the props.

Anything else (internal helpers, sub-components, CSS modules) is
internal.

The folder's `index.ts` re-exports only the public surface. Consumers
import from the folder, not from internal files.

---

## Visual props

Mandatory:

* Components in `src/shared/ui/*` consume token values through
  CSS Modules (which reference CSS variables) or through the typed
  token API in `src/shared/ui/tokens/`. They MUST NOT inline raw
  visual values.
* When a visual prop maps to a token category, the prop accepts a
  token *name*, not a raw value.
  * Good: `<Box padding="md" />` (the prop value `"md"` is a
    `SpacingKey` from `tokens`).
  * Bad: `<Box padding="16px" />`.
* Default values for visual props reference token names.

---

## Interaction surface

Mandatory:

* Interactive elements use a native HTML element with the correct
  semantic role (e.g., `<button type="button">`) when one is
  available.
* Components have an accessible name reachable via `aria-label`,
  `aria-labelledby`, or visible text content.
* Toggle-style components expose `aria-pressed` (or the appropriate
  ARIA state) reflecting their current state.
* Components SHOULD rely on platform-provided keyboard semantics for
  native elements (e.g., Space / Enter on `<button>`). Custom
  keyboard handling is allowed only when no native element fits, and
  must be covered by behavior tests.

---

## Test obligations

Mandatory:

* Every primitive in `src/shared/ui/*` ships at least one contract
  test file (`<Name>.contract.test.tsx`) asserting:
  * required vs optional props compile correctly,
  * the documented role / `aria-*` attributes are present,
  * the documented `data-testid` (if any) is present.
* Every primitive with interactive behavior also ships a behavior
  test file (`<Name>.behavior.test.tsx`) covering the interactions
  documented in this contract (click, ARIA state flip, callback
  invocations).
* Every feature in `src/features/*` ships:
  * a contract test (`<Name>.contract.test.tsx`),
  * a rendering test covering 0 / 1 / N cardinality where the feature
    consumes a collection,
  * a behavior test covering observable interactions.

Forbidden:

* Snapshot-only suites for components governed by this contract.
* Tests that assert tenant *copy* (use controlled fixtures inside the
  test, not tenant copy).
* Tests that assert specific token *values*.

---

## Backward compatibility

Additive (NOT a contract change):

* Adding a new optional prop with a sensible default.
* Widening the accepted values of a prop's union type without
  removing any existing value.
* Adding a new auxiliary export that does not change the existing
  public surface.

Contract change (REQUIRES a recorded contract revision in this
document and a consumer migration):

* Removing a prop.
* Renaming a prop.
* Changing a prop's type in a way that breaks existing callers.
* Making an optional prop required.
* Changing a callback's signature (parameter shape, parameter count,
  or return type).
* Removing or renaming an exported component or type.

A contract change additionally requires an ADR per
`docs/architecture/README.md` only when it constitutes an architecture
boundary or tenant model change. Pure component-API renames or
deprecations do not require an ADR; the contract revision is enough.

---

## v1 surface anchors (slice 1)

The following components were introduced under v1 of this contract by
the BeforeAfterGallery slice. Their public APIs are now part of the
v1 surface:

* `BeforeAfterCard` (in `src/shared/ui/before-after-card/`)
  * Props: `BeforeAfterCardProps = { item: BeforeAfterItem;
    initialView?: BeforeAfterCardView; onViewChange?: (view:
    BeforeAfterCardView) => void; }`
  * Auxiliary type: `BeforeAfterCardView = "before" | "after"`
  * Role: `button` (native `<button type="button">`) with
    `aria-pressed` reflecting `view === "after"` and an
    `aria-label` describing the next action.
  * `data-testid="before-after-card"` on the root `<article>`.
* `BeforeAfterGallery` (in `src/features/before-after-gallery/`)
  * Props: `BeforeAfterGalleryProps = { itemsOverride?:
    BeforeAfterItem[]; emptyState?: ReactNode; }`
  * Default item source: tenant context via `useOptionalTenant()`.
  * Role: `region` (native `<section aria-label="Before and after
    gallery">`).
  * `data-testid="before-after-gallery"` on the root `<section>`.
  * Empty-state element carries
    `data-testid="before-after-gallery-empty"` and `role="status"`.

Future components added under v1 follow the rules above without
appearing in this anchor list unless their introduction is itself
recorded in the slice's `AI_CHANGE_REPORT.md` entry.

---

## Revision log

* **v1 — 2026-05-21.** Initial contract. Authored alongside the
  BeforeAfterGallery slice (Round 3). Defines naming, public surface,
  visual props, interaction surface, test obligations, backward-
  compatibility rules, and the v1 surface anchors for `BeforeAfterCard`
  and `BeforeAfterGallery`.
