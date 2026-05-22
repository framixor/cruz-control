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


---

## Round 2 — Plan submitted (2026-05-21)

The BeforeAfterGallery slice plan has been authored and submitted for
review.

Plan artifact:

* `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`

What this round changed:

* Added the plan document under `docs/architecture/`.
* Updated `.planning/NEXT_TASK.md` to reflect that the AI is now
  **stopped after plan submission**.
* Updated `.planning/OPEN_BLOCKERS.md` to shift the process blocker from
  "awaiting authorization to plan" to "awaiting plan review".
* Appended Round 2 entry to `AI_CHANGE_REPORT.md`.

What this round did NOT change:

* No file under `src/`.
* No `package.json`, `tsconfig*.json`, `vite.config.ts`,
  `eslint.config.js`, or `.github/workflows/ci.yml`.
* No file under `rules/` or `workflows/`.
* No file under `docs/contracts/`.
* `FRAMIXOR.md` unchanged.
* `docs/architecture/ADR-0001-foundation-stack.md` and
  `docs/architecture/README.md` unchanged.

Next allowed action:

* Reviewer feedback on the plan (`docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`).
* Implementation requires a **separate** authorization after the plan is
  accepted (with or without amendments).

The Round 2 entry in `AI_CHANGE_REPORT.md` is the audit trail for this
cycle.


---

## Round 2.1 — Plan amendments accepted (2026-05-21)

Reviewer accepted the plan with three focused amendments:

* **A1** — Why BeforeAfterGallery is the preferred first slice
  (vs. Hero / Button / Card / TenantContentBlock). Recorded in plan.
* **A2** — Token surface: implement **full v1** (~43 keys, sensible
  defaults). No contract revision required.
* **A3** — `docs/contracts/component-api.contract.md`: **authored
  alongside** implementation, not before.

Verdict: `READY_FOR_IMPLEMENTATION = YES`.

The plan now contains an "Amendments (Round 2.1, post-review)" section.
Implementation is **not yet authorized**; a separate explicit
authorization phrase is required (see `.planning/NEXT_TASK.md`).

`AI_CHANGE_REPORT.md` Round 2.1 entry covers the audit trail.


---

## Round 3 — BeforeAfterGallery slice implemented (2026-05-21)

The first vertical slice (BeforeAfterGallery) is **implemented and green**.

CI gate (run via WSL Node 20.20.1, mirroring `.github/workflows/ci.yml`
matrix):

* `npx tsc --noEmit` — green.
* `npm test -- --run` — 8 test files, **79 tests, all passed**.
* `npm run build` — green; `vite build` produced `dist/`.

Files created (production):

* `src/shared/ui/tokens/{tokens.css,index.ts}` — full v1 token surface
  (43 keys: 6 spacing + 5 radius + 22 typography + 10 surface).
* `src/shared/ui/before-after-card/{BeforeAfterCard.tsx,
  BeforeAfterCard.module.css,index.ts}` — primitive with native
  `<button>` toggle, `aria-pressed`, accessible name flip.
* `src/shared/ui/index.ts` — barrel.
* `src/features/before-after-gallery/{BeforeAfterGallery.tsx,
  BeforeAfterGallery.module.css,index.ts}` — feature with
  `itemsOverride` + `useOptionalTenant`-backed default source, region
  role, empty-state with `role="status"`.
* `src/app/providers/{tenant.tsx,index.ts}` — `TenantProvider`,
  `useTenant()` (throwing), `useOptionalTenant()` (non-throwing).
* `src/tenants/{types.ts,index.ts}` and
  `src/tenants/cruz-control/index.ts` — v1 contract types and the
  `cruz-control` tenant fixture (3 items across 2 categories).
* `src/testing/{render.tsx,index.ts,cleanup.ts}` and
  `src/testing/fixtures/{empty-tenant.ts,single-tenant.ts,index.ts}`.

Files created (tests):

* `src/shared/ui/tokens/index.test.ts` — token-existence (47 tests).
* `src/shared/ui/before-after-card/{BeforeAfterCard.contract.test.tsx,
  BeforeAfterCard.behavior.test.tsx}` (4 + 6).
* `src/features/before-after-gallery/{BeforeAfterGallery.contract.test.tsx,
  BeforeAfterGallery.render.test.tsx,BeforeAfterGallery.behavior.test.tsx}`
  (3 + 6 + 1).
* `src/tenants/tenants.test.ts` — tenant-contract conformance (10).
* `src/App.test.tsx` — App-shell smoke (2).

Files created (contracts, first authoring per A3):

* `docs/contracts/component-api.contract.md` v1.

Files modified:

* `src/App.tsx` — replaces Vite/React starter with
  `<TenantProvider tenant={cruzControlTenant}><BeforeAfterGallery /></TenantProvider>`.
* `src/main.tsx` — imports `tokens.css` before `index.css`.
* `src/index.css` — minimal token-driven body reset.
* `src/App.css` — emptied (token-driven styles live in CSS Modules).
* `src/App.test.tsx` — repurposed as App-shell smoke test.

Files **NOT** modified (verified): `package.json`, `package-lock.json`,
`tsconfig*.json`, `vite.config.ts`, `eslint.config.js`,
`.github/workflows/ci.yml`, `FRAMIXOR.md`, all of `rules/`, all of
`workflows/`, `docs/architecture/ADR-0001-foundation-stack.md`,
`docs/architecture/README.md`, `docs/contracts/tenant-content.contract.md`,
`docs/contracts/visual-tokens.contract.md`, `docs/contracts/README.md`.
No new runtime or dev dependency.

Verdict:

`IMPLEMENTATION_COMPLETE = YES`

The full audit trail (deviations, decisions, risks, rollback) is in
`AI_CHANGE_REPORT.md` Round 3. The AI is **stopped** as instructed.
