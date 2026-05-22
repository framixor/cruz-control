# Visual Contracts Rules

The visual layer is governed by **token contracts**, not by ad-hoc CSS values.

Tokens are the **stable surface** that components, tests, and Lovable rely on.
Token *values* are the unstable surface that designers and Lovable may move
within the contract.

The full visual token surface is defined in
`docs/contracts/visual-tokens.contract.md`.

---

## Token categories

The visual contract defines, at minimum, these categories:

* **Typography** — font family, size, weight, line-height, letter-spacing
* **Surfaces** — semantic color roles (surface, text, accent, border, status)
* **Spacing** — base unit + scale steps
* **Radius** — corner-radius scale
* **Motion** — duration + easing for transitions and animations (added when
  needed)
* **Elevation** — shadow / layering scale (added when needed)
* **Breakpoints** — responsive thresholds (added when needed)

The v1 surface required by the first vertical slice (BeforeAfterGallery) is:
**typography, surfaces, spacing, radius**. Other categories are added when a
slice needs them, via a contract revision.

---

## Naming conventions

Mandatory:

* Names are **semantic**, not value-based.
  * Good: `surface.default`, `spacing.md`, `motion.duration.fast`.
  * Bad: `gray100`, `spacing.16`, `motion.300ms`.
* Names use lowercase dot-separated segments (`category.role.modifier`).
* Names are stable across visual revisions.
* Names are exported from a single source of truth under `src/shared/ui/tokens/`
  (folder created when the first slice needs it).

Forbidden:

* Encoding hex codes, pixel sizes, or millisecond values into token names.
* Renaming a token without a recorded contract revision + consumer migration.
* Two tokens with overlapping meaning (e.g., `surface.primary` and
  `surface.brand.main`).

---

## What is a contract change

Contract change (REQUIRES recorded contract revision + consumer migration):

* Adding a new category.
* Removing a token name.
* Renaming a token.
* Changing a token's category or semantic role.
* Changing the *type* of a token's value (e.g., color hex -> color OKLCH).

A contract change additionally requires an **ADR** when it crosses one of the
ADR-required scopes in `docs/architecture/README.md` — typically when it
constitutes a tenant model change or an architecture boundary change. Pure
"rename for clarity" or "add a token under an existing category" does not
require an ADR; the contract revision is enough.

Value change (does NOT require a contract revision or an ADR):

* Adjusting the hex of `surface.default`.
* Tightening `spacing.md` from 16px to 14px.
* Changing `motion.duration.fast` from 150ms to 120ms.

Lovable is allowed to do **value changes** only. See `rules/lovable-rules.md`.

---

## Component obligations

Mandatory:

* Components consume tokens through the typed token API in
  `src/shared/ui/tokens/`. They do not import raw values.
* A component's visual props that map to tokens must accept a token name, not a
  raw value.
  * Good: `<Box padding="md" />`
  * Bad: `<Box padding="16px" />`
* Default values for visual props reference token names.

Forbidden:

* Inlining hex, px, rem, em, ms, or s literals in a component file under
  `src/shared/ui/` or `src/features/` (test fixtures excluded).
* Bypassing the token API by importing a CSS variable string directly into
  a component.
* Setting visual values from tenant content. Tenant content is *content*, not
  styling.

---

## Token-existence testing

Mandatory:

* Every documented token has a test that asserts it exists and has the correct
  category.
* Removing a token name causes a typecheck failure (the token API exposes a
  union of names) **and** a test failure.

Forbidden:

* Tests that assert a specific *value* of a token. Such tests freeze the
  visual surface and defeat Lovable's purpose.

---

## Theming and tenants

Theming, when introduced, follows these rules:

* A theme is a **value substitution** over the same token surface.
* Different tenants MAY use different themes.
* A tenant MAY NOT introduce new token names.
* A tenant MAY NOT remove token names.
* A tenant MAY NOT alias one token to another.

Forbidden:

* Per-tenant components.
* Per-tenant token surfaces.
* Conditional logic in components keyed on tenant id (use tenant content +
  tenant theme instead).

---

## Forbidden, period

* Tailwind utility classes embedded directly in components when an equivalent
  semantic token exists.
* CSS files outside `src/shared/ui/` declaring colors, spacing, radii, or
  motion values.
* Hard-coded `style={{ ... }}` attributes that bypass the token API.
* "Temporary" inline values committed without a follow-up TODO that references
  an `OPEN_BLOCKERS.md` entry.
