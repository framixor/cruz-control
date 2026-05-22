# Visual Tokens Contract

Status:
**v1 — Accepted 2026-05-21**

This contract governs the visual token surface consumed by Cruz Control.
Tokens are the **stable surface** that components, tests, and Lovable rely
on. Token *values* are the unstable surface that designers and Lovable may
move within the contract.

The companion rule document is `rules/visual-contracts.md`.

---

## Surface

In v1, the visual token surface defines four categories:

* `spacing.*`
* `radius.*`
* `typography.*`
* `surface.*`

The token API is exported from `src/shared/ui/tokens/` (folder created in
the slice that needs it). The export shape is a typed object whose keys are
**stable**:

```ts
// pseudo-shape; concrete API lives in src/shared/ui/tokens/index.ts
type Tokens = {
  spacing: Record<SpacingKey, string>;     // resolves to e.g. "0.5rem"
  radius: Record<RadiusKey, string>;       // resolves to e.g. "0.5rem"
  typography: Record<TypographyKey, TypographyValue>;
  surface: Record<SurfaceKey, string>;     // resolves to e.g. "#0b0c0f" or var()
};
```

The **keys** (`SpacingKey`, `RadiusKey`, `TypographyKey`, `SurfaceKey`) are
the contract. The **values** they resolve to are not.

How the values are produced (CSS variables, vanilla CSS, vanilla-extract,
inline objects, etc.) is an implementation choice that does not require an
ADR per `docs/architecture/README.md`, as long as the import direction and
the typed key surface stay inside this contract.

---

## Naming convention

* Lowercase dot-separated segments: `category.role.modifier`.
* Names are **semantic**, not value-based.
  * Good: `surface.default`, `spacing.md`, `typography.body.size`.
  * Bad: `surface.gray100`, `spacing.16`, `typography.16px`.
* No hex codes, pixel sizes, or millisecond values in names.

---

## `spacing.*`

Purpose: a single discrete scale used for padding, margin, gap, and any
geometric distance between children.

Stable keys (v1):

| Key | Intended scale role | Example consumer |
|---|---|---|
| `spacing.none` | 0 | reset values |
| `spacing.xs` | smallest gap (e.g., between an icon and adjacent text) | inline groups |
| `spacing.sm` | tight stacking | card internals |
| `spacing.md` | default stacking | section internals |
| `spacing.lg` | breathing room | between sections |
| `spacing.xl` | major separation | page-level rhythm |

Values:

* All values resolve to a CSS length string (`rem` preferred). Lovable may
  move values within the scale; consumers do not depend on specific values.
* Negative spacing is not part of the contract.

What is allowed without a revision:

* Tightening or loosening any value (Lovable scope).

What requires a contract revision:

* Adding or removing a key.
* Changing the *unit* of values (e.g., switching to `clamp()` outputs in
  ways that change the type signature).

---

## `radius.*`

Purpose: corner-radius scale for surfaces, cards, controls, and images.

Stable keys (v1):

| Key | Intended role |
|---|---|
| `radius.none` | sharp corners |
| `radius.sm` | small elements (badges, chips) |
| `radius.md` | controls and small cards |
| `radius.lg` | cards and surfaces |
| `radius.full` | circular / pill-shaped elements |

Values resolve to a CSS length string. `radius.full` is a sentinel and
typically resolves to `9999px` or an equivalent.

Allowed without revision: changing values (Lovable scope).
Requires revision: adding/removing/renaming keys.

---

## `typography.*`

Purpose: typographic system. v1 covers the minimum needed by the
BeforeAfterGallery slice (a heading scale and a body scale).

Stable keys (v1):

```ts
type TypographyKey =
  | "display.size"   | "display.weight"   | "display.lineHeight"   | "display.letterSpacing"
  | "heading.size"   | "heading.weight"   | "heading.lineHeight"   | "heading.letterSpacing"
  | "subheading.size"| "subheading.weight"| "subheading.lineHeight"| "subheading.letterSpacing"
  | "body.size"      | "body.weight"      | "body.lineHeight"      | "body.letterSpacing"
  | "caption.size"   | "caption.weight"   | "caption.lineHeight"   | "caption.letterSpacing"
  | "fontFamily.sans"
  | "fontFamily.mono";
```

Each `*.size` resolves to a CSS length, `*.weight` to a numeric weight
(`400`, `500`, `700`, ...), `*.lineHeight` to a unitless multiplier or a
length, `*.letterSpacing` to a CSS length or `normal`.

Allowed without revision:

* Adjusting any value (Lovable scope).
* Swapping the font family value while keeping the key.

Requires revision:

* Adding a new role (e.g., `quote.*`).
* Removing a role.
* Changing a key's category (e.g., moving `body.size` out of typography).

---

## `surface.*`

Purpose: semantic color roles. Names describe the **role** the color plays,
not the color itself. Tenants and Lovable may swap palettes freely.

Stable keys (v1):

| Key | Role |
|---|---|
| `surface.default` | primary page background |
| `surface.raised` | elevated background (cards, panels) |
| `surface.sunken` | recessed background (insets, code blocks) |
| `surface.text.primary` | primary text on default surface |
| `surface.text.secondary` | de-emphasized text on default surface |
| `surface.text.inverse` | text on a dark/inverse background |
| `surface.border.default` | default separator and outline color |
| `surface.border.strong` | emphasized separator/outline |
| `surface.accent` | tenant brand / highlight role |
| `surface.accent.contrast` | text/icon color readable on `surface.accent` |

Values resolve to a CSS color string (hex, rgb(), oklch(), or `var(--...)`).
Lovable may swap color values freely; the keys are stable.

Allowed without revision:

* Changing any color value (Lovable scope).
* Switching the underlying color space (hex -> oklch) **only** if every key
  still returns a CSS color string.

Requires revision:

* Adding/removing/renaming a key.
* Splitting a role (e.g., introducing `surface.text.muted` as a new role).
* Introducing a new sub-category (e.g., `surface.status.*`).

---

## Out of scope in v1

These categories are **not** part of v1. A slice that needs one introduces
it via a contract revision:

* `motion.*` (duration, easing) — not needed by BeforeAfterGallery.
* `elevation.*` (shadow scale) — not needed by BeforeAfterGallery.
* `breakpoint.*` (responsive thresholds) — responsive behavior in v1 uses
  inline media queries inside `shared/ui/` primitives. A breakpoint contract
  is added when more than one primitive needs to share thresholds.
* `zIndex.*` — added when stacking conflicts appear.

---

## Tenant theming

A theme is a value substitution over the same keyset.

* A tenant MAY ship a theme that re-binds any value.
* A tenant MAY NOT add new keys.
* A tenant MAY NOT remove keys.
* A tenant MAY NOT alias one key to another.
* A theme MAY NOT be selected by a literal tenant id inside a component.
  Themes are wired in `app/` and consumed via the same token API.

---

## Test obligations

Mandatory:

1. **Token-existence test.** For every documented key in v1, assert it
   exists on the exported token API and resolves to a non-empty value.
2. **Typed-surface test (typecheck).** Removing or renaming a key causes a
   typecheck failure in any consumer that referenced it.
3. **No-inline-values lint or test.** Components under `shared/ui/` and
   `features/` MUST NOT contain hex codes, `px`/`rem`/`em` literals, or
   color literals outside the token implementation. This is enforced by
   review (`workflows/review-ui.md`); future hardening may add an ESLint
   rule. Test fixtures are exempt.

Forbidden:

* Tests that assert specific *values* (e.g., `expect(spacing.md).toBe('1rem')`).
  Such tests freeze the visual surface and defeat Lovable's purpose.

---

## Revision log

* **v1 — 2026-05-21.** Initial contract. Defines four categories
  (`spacing`, `radius`, `typography`, `surface`) and their v1 keys, scoped
  to the BeforeAfterGallery slice. Out-of-scope categories listed
  explicitly. Authored as part of the governance bootstrap, Round 1.
