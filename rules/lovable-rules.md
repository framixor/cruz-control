# Lovable Rules

Lovable is **not yet integrated**. This document is preparatory.

When Lovable is wired in, every change Lovable produces — direct or via PR —
is subject to the rules below. A reviewer (human or AI) must reject any
Lovable-authored change that violates them.

---

## What Lovable MAY modify

Lovable is allowed to move the **visual surface** without an ADR:

* Layout (flex/grid arrangement, ordering of children, gap/padding values)
* Spacing (token *values* within the existing spacing scale)
* Responsiveness (breakpoint behavior, mobile/desktop variants)
* Visual hierarchy (typography scale assignment, weight, emphasis)
* Animations (duration, easing, transition properties — within `motion.*`
  token values)
* Color *values* assigned to existing semantic roles
* Radius *values* within the existing radius scale
* Elevation *values* within the existing elevation scale
* Composition of existing `shared/ui` primitives inside a feature
* Adding a new `shared/ui` primitive *only* if it consumes existing tokens and
  does not introduce a new contract surface

The unifying principle:
**Lovable may move pixels and values, not contracts.**

---

## What Lovable MUST NOT modify

Lovable is **forbidden** from changing:

* Visual token *names* or categories (`rules/visual-contracts.md`)
* Tenant content shape or fixtures (`docs/contracts/tenant-content.contract.md`,
  `src/tenants/**`)
* Component public APIs (props, callback signatures, exposed types)
* Contracts under `docs/contracts/`
* `domain/` modules
* `features/**` business logic (rendering changes are allowed; logic changes
  are not)
* Test files (`*.test.ts(x)`) in any layer
* Test utilities under `src/testing/`
* `rules/`, `workflows/`, `FRAMIXOR.md`, `.planning/`
* `AI_CHANGE_REPORT.md` (Lovable changes are reported separately by the
  reviewer, not by Lovable itself)
* `package.json`, lockfiles, build config, CI config
* DDD boundaries (no new top-level folders under `src/`, no cross-boundary
  imports)
* Routing structure
* Adapter boundaries (no new direct `fetch` / `localStorage` / `window` calls)

The unifying principle:
**Lovable may not touch architecture, contracts, tests, or domain.**

---

## Review obligations for Lovable-authored changes

Every Lovable-authored change MUST pass `workflows/review-ui.md`. The reviewer
explicitly checks:

1. No file outside the allow-list above was modified.
2. No new dependency was introduced.
3. No token *name* changed; only token *values* changed.
4. No tenant content shape changed; only tenant *values* changed (and only if
   the change request was scoped to tenant value updates).
5. No component public API changed.
6. No test file changed.
7. All existing tests still pass.
8. Token-existence tests still pass.
9. Tenant-contract tests still pass.

If any check fails, the change is rejected and not merged. The reviewer
records the rejection reason in `AI_CHANGE_REPORT.md`.

---

## Integration mode

Undecided. Options:

* PR-based on a dedicated branch (`lovable/*`) with mandatory review.
* Direct to `develop` with mandatory CI gate **and** a post-merge audit.
* Sandbox-only (Lovable changes are reviewed and re-implemented manually).

The chosen mode must be recorded in an ADR before Lovable is wired in. Until
that ADR exists, Lovable integration is **not** authorized.

---

## Hard rules

* Lovable changes that touch any file under `domain/`, `tenants/`,
  `docs/contracts/`, `rules/`, `workflows/`, `*.test.ts(x)`, `src/testing/`,
  `package.json`, lockfiles, or CI config are **rejected on sight**.
* "Lovable did it" is never a justification. The repository's contracts and
  tests are the source of truth.
* If Lovable proposes a contract or domain change, the proposal is captured as
  an ADR draft by a human or by an AI agent following
  `workflows/feature-implementation.md`. Lovable does not author ADRs.
