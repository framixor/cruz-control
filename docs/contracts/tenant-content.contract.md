# Tenant Content Contract

Status:
**v1 — Accepted 2026-05-21**

This contract governs the shape of all tenant-driven content consumed by Cruz
Control. Content is **data**, not code. Components in `shared/` and
`features/` consume content through the typed API exposed by
`src/tenants/`; they never hardcode tenant copy or assets.

---

## Surface

The tenant content surface is composed of:

1. **Tenant identity** — the small, stable record that identifies one tenant.
2. **Content collections** — typed collections of content items, one type per
   user-facing capability. The first collection introduced in v1 is
   `beforeAfterItems`.

The surface is exposed under `src/tenants/<tenantId>/index.ts` (folder
created in the slice that needs it). The export shape is:

```ts
// pseudo-shape; concrete types live in src/tenants/types.ts
type Tenant = {
  id: string;
  beforeAfterItems: BeforeAfterItem[];
  // future collections appear here as additive, optional fields
};
```

Consumers always import the **typed** shape from `src/tenants/` (or its
re-export through a context in `app/`). Direct file imports of a tenant's
fixture from a presentational component are **forbidden** — see "Consumer
expectations" below.

---

## Tenant identity

```ts
type TenantId = string;        // stable, non-empty, lowercase-kebab
type Tenant = {
  id: TenantId;
  // collections below
  beforeAfterItems: BeforeAfterItem[];
};
```

Rules:

* `id` is stable. Once published, a `TenantId` does not change.
* `id` is not used for *visual* decisions (no `if (tenant.id === "x")`
  branching for styling). It may be used for routing or selection.
* The `Tenant` type is **append-only** in v1. New collections are added as
  additional optional or required fields. Removing or renaming a field is a
  contract change (see "Versioning").

---

## Content item: `BeforeAfterItem` (v1)

The first concrete content type. Required by the BeforeAfterGallery slice.

```ts
type BeforeAfterItem = {
  title: string;
  description: string;
  category: string;
  beforeImage: ImageRef;
  afterImage: ImageRef;
};

type ImageRef = {
  src: string;          // resolvable URL or imported asset URL
  alt: string;          // accessibility-required, non-empty
  width?: number;       // intrinsic pixel width if known (perf hint)
  height?: number;      // intrinsic pixel height if known (perf hint)
};
```

Field rules:

| Field | Type | Required | Constraints |
|---|---|---|---|
| `title` | `string` | yes | Non-empty. Plain text. No markup. |
| `description` | `string` | yes | Plain text. Soft cap ~280 chars (not enforced in v1). No markup. |
| `category` | `string` | yes | Non-empty. Used for grouping/filtering. Stable across versions. |
| `beforeImage` | `ImageRef` | yes | `alt` non-empty. |
| `afterImage` | `ImageRef` | yes | `alt` non-empty. |
| `width` / `height` on `ImageRef` | `number` | no | Positive integers when present. |

What `BeforeAfterItem` is **not**:

* It is not a styling configuration. It carries content, not visual values
  (no colors, no spacing, no typography overrides).
* It is not a logic carrier. It does not embed callbacks, ids, routing
  targets, or feature flags.
* It does not embed HTML/JSX/Markdown. Strings are plain text.
* `category` is not an enum at the contract level. Tenants may introduce new
  category values without a contract revision. Components MUST treat
  unknown categories gracefully.

---

## Versioning rules

Additive (NO contract revision required):

* Adding a new optional field to `BeforeAfterItem`.
* Adding a new optional field to `Tenant`.
* Adding a new tenant fixture under `src/tenants/<newTenantId>/`.
* Adding new `category` values in tenant fixtures.

Contract revision (REQUIRED, append revision section to this document):

* Adding a new content type (e.g., `TestimonialItem`).
* Adding a new required field to `BeforeAfterItem` or `Tenant`.
* Tightening a constraint (e.g., enforcing a max length on `description`).

Breaking (REQUIRED contract revision **and** an ADR per
`docs/architecture/README.md`'s "tenant model changes" scope):

* Removing a field.
* Renaming a field.
* Changing a field's type.
* Changing the meaning of an existing field.
* Removing or renaming a tenant id that has consumers.

When a contract revision is recorded, this document gains a new section
under "Revision log" with date, change summary, migration notes for
consumers, and the AI_CHANGE_REPORT entry that introduced it.

---

## Consumer expectations

What consumers MAY assume:

* Required fields are present and pass the constraints in the table above.
* `ImageRef.alt` is non-empty.
* The number of items in `beforeAfterItems` is finite. Components must
  render correctly for 0, 1, and N items (see "Cardinality" below).

What consumers MUST NOT assume:

* A specific count of items.
* A specific set of `category` values.
* A specific tenant id is always present in the runtime.
* Image URLs resolve synchronously. Components handle load and error states.
* Strings are short. Components must handle long titles and descriptions
  without breaking layout.

---

## Cardinality

For `beforeAfterItems`:

* **0 items** is valid. Features must render an empty state without
  crashing.
* **1 item** is valid.
* **N items** is valid. There is no upper bound at the contract level;
  features may paginate or virtualize at their own discretion.

Tests in the **rendering** category MUST cover 0, 1, and a representative N.

---

## Test obligations

Mandatory tests, lived under `src/testing/contracts/` or co-located with
`src/tenants/`:

1. **Tenant-contract test (v1)** — for every tenant fixture under
   `src/tenants/`, assert it conforms to `Tenant`:
   * `id` non-empty, kebab-case.
   * `beforeAfterItems` is an array.
   * Every item satisfies the `BeforeAfterItem` field rules in the table.
   * Every `ImageRef.alt` is non-empty.
2. **Type test** — `tsc --noEmit` covers structural conformance via the
   exported `Tenant` and `BeforeAfterItem` types. Removing or renaming a
   field causes a typecheck failure in consumers.
3. **Cardinality test** — fixtures used by feature tests cover 0, 1, and N
   items.

Tests in the **contract** category MUST NOT assert specific copy. Copy is
data; contract tests assert *shape*.

---

## Forbidden patterns

* Importing a tenant fixture file directly from a presentational component
  in `shared/` or `features/`. Tenant data flows through a typed
  context/provider in `app/` or through props injected at composition time.
* Embedding HTML, Markdown, or JSX in any string field.
* Embedding URLs that depend on a runtime tenant *condition* in a primitive
  under `shared/`. Primitives receive resolved `ImageRef` values.
* Conditional logic keyed on `tenant.id` literals inside components. Use
  tenant content + (future) tenant theme.
* Carrying styling decisions (color, spacing, radius, typography) inside
  tenant content. Styling lives in tokens; content lives here.

---

## Revision log

* **v1 — 2026-05-21.** Initial contract. Defines `Tenant`, `TenantId`,
  `ImageRef`, and the `BeforeAfterItem` content type required by the
  BeforeAfterGallery slice. No prior version. Authored as part of the
  governance bootstrap, Round 1.
