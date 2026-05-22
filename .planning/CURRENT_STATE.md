# Current State

Last updated:
2026-05-21 (Round 1)

Project:
Cruz Control (Framixor frontend laboratory)

Current phase:

Phase 0 — Governance Bootstrap (CLOSING)

Foundation status:

**APPROVED WITH ADJUSTMENTS** (2026-05-21)

Branch:

`develop`

---

## Approval record

The reviewer approved the governance bootstrap with the following adjustments,
all of which are now in force:

1. `.planning/` stays at the repository root.
   * `.planning/` = live operational surface.
   * `docs/` = historical knowledge and long-term reference.
2. ADR usage tightened to "things expensive to reverse":
   * ADR REQUIRED for foundation stack, AI workflow, Lovable integration,
     architecture boundary, tenant model, and new runtime dependency
     decisions.
   * ADR OPTIONAL for component organization, local implementation details,
     small UI decisions, and refactors that do not change a contract or a
     boundary.
   * Recorded in `docs/architecture/README.md` and referenced from
     `FRAMIXOR.md` and `rules/visual-contracts.md`.
3. Concepts accepted:
   CURRENT_STATE / NEXT_TASK / OPEN_BLOCKERS, AI_CHANGE_REPORT, TDD-first,
   lightweight DDD, SOLID guidelines, contract-first frontend, Lovable
   restrictions, visual token contracts, AI handoff workflow.
4. First vertical slice scope reset:
   The generic "first vertical slice" is rejected. The approved first slice
   is **BeforeAfterGallery** (planning only — see `NEXT_TASK.md`).

---

## What exists

Tooling:

* Vite, React 19, TypeScript (strict, bundler), Vitest, Testing Library,
  jsdom, ESLint flat config, GitHub Actions CI (typecheck + tests + build).
* `develop` branch active.

Code:

* `src/main.tsx`, `src/App.tsx`, `src/App.css`, `src/index.css` — Vite/React
  starter (untouched).
* `src/App.test.tsx` — sanity test only (untouched).
* `src/assets/*` — starter assets (untouched).

Governance (Round 0 + Round 1):

* `FRAMIXOR.md` (Round 1: ADR-scope pointer added).
* `AI_CHANGE_REPORT.md` (Round 1 appended).
* `.planning/CURRENT_STATE.md` (this file).
* `.planning/NEXT_TASK.md`
* `.planning/OPEN_BLOCKERS.md`
* `rules/frontend-architecture.md`
* `rules/testing.md`
* `rules/visual-contracts.md` (Round 1: ADR coupling softened to
  "recorded contract revision + consumer migration" with ADR escalated only
  for tenant-model / boundary changes).
* `rules/lovable-rules.md`
* `rules/ddd-boundaries.md`
* `rules/solid-guidelines.md`
* `workflows/feature-implementation.md`
* `workflows/review-ui.md`
* `workflows/ai-handoff.md`
* `docs/architecture/README.md` (Round 1: ADR scope formalized).
* `docs/architecture/ADR-0001-foundation-stack.md` **(NEW, Round 1)**
* `docs/contracts/README.md`
* `docs/contracts/tenant-content.contract.md` **(NEW v1, Round 1)**
* `docs/contracts/visual-tokens.contract.md` **(NEW v1, Round 1)**
* `docs/state/README.md`

---

## What does NOT exist yet

Architecture (intentional):

* `src/app/`
* `src/features/`
* `src/shared/`
* `src/tenants/`
* `src/domain/`
* `src/testing/`

These folders are created by the slice that needs them, not pre-emptively.

Tests (intentional):

* No tests beyond the existing sanity `App.test.tsx` until the
  BeforeAfterGallery slice plan is approved.

CI hardening:

* `npm run lint` is not yet a CI step.
* No coverage threshold.
* Both items remain backlog; not blocking.

---

## Latest completed cycle

Round 1 — Governance approval & first contracts:

* ADR scope adjustment applied.
* ADR-0001 (foundation stack) authored and accepted.
* Tenant content contract v1 authored (defines `Tenant`, `TenantId`,
  `ImageRef`, and `BeforeAfterItem`).
* Visual tokens contract v1 authored (defines `spacing.*`, `radius.*`,
  `typography.*`, `surface.*`).
* `.planning/*` updated to reflect approval and the next-authorized scope.
* `AI_CHANGE_REPORT.md` Round 1 revision appended.

No source code change in this cycle. Tooling and CI unchanged.

---

## Current objective

The repository is now ready for the first vertical slice.

The next allowed action is **planning only** for the BeforeAfterGallery
slice, and it is **gated** behind explicit authorization from the reviewer.
See `.planning/NEXT_TASK.md`.

---

## Currently allowed work

* Awaiting authorization. No further work is automatic.

When the reviewer authorizes the slice planning:

* Read all rules, workflows, contracts, ADR-0001.
* Produce the slice plan per `workflows/feature-implementation.md` Step 1.
* Stop after the plan is submitted. Do NOT implement.

---

## Currently prohibited work

* Implementing BeforeAfterGallery (no code yet).
* Building any other UI section.
* Replacing the Vite/React starter content with marketing copy.
* Adding any runtime dependency.
* Adding Supabase or any backend SDK.
* Integrating Lovable.
* Modifying contracts under `docs/contracts/` outside an explicit revision
  cycle.
* Modifying `rules/*` or `workflows/*` outside an explicit governance change.
* Skipping the TDD cycle in `workflows/feature-implementation.md`.


---

## Subsequent governance patches

Cumulative trail of small post-approval patches. Each is recorded in detail
in `AI_CHANGE_REPORT.md`.

* **Patch 1.1 — Complexity escalation rule.** Added to
  `rules/ddd-boundaries.md`: prefer plain functions, typed contracts,
  composition, props, and simple adapters; new abstractions only when
  behavior repeats in 2+ features, a boundary cannot be tested cleanly
  without extraction, or coupling measurably increases. Default answer:
  simpler > clever.
* **Patch 1.2 — Narrowed `shared -> domain` exception + future-work
  backlog.**
  * `rules/ddd-boundaries.md`: the `shared/` -> `domain/` import edge is
    now explicitly narrow — allowed only for shared types, validation
    helpers, and constants without business meaning. Forbidden for
    business rules, invariants, and domain orchestration.
  * `rules/frontend-architecture.md`: the same edge in the import-direction
    list now points to the narrowed exception in `ddd-boundaries.md`.
  * `.planning/OPEN_BLOCKERS.md`: a new "Future work (NOT blocking)"
    section records three deferred items: CI enforcement for inline visual
    values, Lovable integration ADR, PR checklist for `.planning/`
    artifacts.

These patches do not change any contract, any layer, the AI workflow, the
Lovable allow/deny surface, the tenant model, or the foundation stack. The
AI remains stopped pending authorization to plan the BeforeAfterGallery
slice.
