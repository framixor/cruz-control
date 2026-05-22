# Next Task

Last updated:
2026-05-21 (Round 1)

Current phase:

Phase 0 — Governance Bootstrap (CLOSING)

---

## Status

Governance bootstrap: **APPROVED WITH ADJUSTMENTS** (recorded in
`.planning/CURRENT_STATE.md`).

Round 1 deliverables: **DONE**.

* ADR-0001 (foundation stack) — accepted.
* `tenant-content.contract.md` v1 — accepted.
* `visual-tokens.contract.md` v1 — accepted.
* ADR scope formalized in `docs/architecture/README.md`.
* `FRAMIXOR.md` and `rules/visual-contracts.md` reconciled with the lighter
  ADR posture.

The AI assistant has **stopped** as instructed. No further work is
automatic.

---

## Allowed immediate next action

**None automatically.** Await explicit authorization from the reviewer.

When authorized, the next action is:

> Plan (do NOT implement) the **BeforeAfterGallery** vertical slice using
> `workflows/feature-implementation.md` Step 1.

Authorization phrase the AI must wait for (or a clear equivalent):

> "Authorized: plan the BeforeAfterGallery slice."

Until that phrase (or equivalent) appears, the AI does not proceed.

---

## Approved scope of the BeforeAfterGallery slice (when authorized)

This is the binding scope for the slice plan. The plan must not exceed it.

Goal:

Exercise contracts, tokens, tenant data, tests, and architecture boundaries
using a real Cruz Control scenario. The slice validates the governed
frontend pipeline. **It is not visual polish.**

Tenant contract (already drafted in `docs/contracts/tenant-content.contract.md`):

* `BeforeAfterItem.title`
* `BeforeAfterItem.description`
* `BeforeAfterItem.category`
* `BeforeAfterItem.beforeImage`
* `BeforeAfterItem.afterImage`

Visual token contract (already drafted in `docs/contracts/visual-tokens.contract.md`):

* `spacing.*`
* `radius.*`
* `typography.*`
* `surface.*`

Required tests (per `rules/testing.md` and the contracts above):

1. Contract tests — lock the public surface of the slice.
2. Rendering tests — cover 0-item, 1-item, and N-item cardinality.
3. Token-existence tests — every documented v1 token resolves.
4. Tenant-contract tests — every tenant fixture conforms to v1.
5. Component behavior tests — observable interactions on the gallery.

Slice rules (binding):

* No hardcoded content. All text/images come from a tenant fixture under
  `src/tenants/`.
* No inline visual values. All spacing / radius / typography / colors flow
  through the typed token API in `src/shared/ui/tokens/`.
* No direct tenant fixture imports inside presentational primitives in
  `src/shared/`. Tenant data is provided to features via composition in
  `src/app/` (or a tenant context).
* Tests before implementation where practical (TDD cycle in
  `workflows/feature-implementation.md`).

Out of scope of the slice:

* Visual polish.
* Animations / motion tokens (no `motion.*` in v1).
* Elevation / shadows (no `elevation.*` in v1).
* Responsive breakpoint contract (`breakpoint.*` not in v1).
* Filtering / sorting / search UI on top of the gallery (out of slice unless
  the plan justifies one of them as the smallest meaningful end-to-end
  scenario).
* Routing.
* Lovable integration.
* Backend / Supabase.
* Any new runtime dependency.

---

## Required deliverables of the slice plan (when authorized)

Per `workflows/feature-implementation.md` Step 1, the plan must include:

1. Goal (one sentence).
2. Files read.
3. Interpreted constraints.
4. Affected layers (which of `app`/`features`/`shared`/`tenants`/`domain`/
   `testing` will be created or touched).
5. Contract impact (must be: no contract changes; consume v1 only).
6. Boundary impact statement (every cross-layer import justified).
7. SOLID notes for non-obvious calls.
8. Test plan listing the failing tests in the five categories above.
9. Files to be created.
10. Files to be modified (should be small; ideally only `src/main.tsx` or
    `src/App.tsx` to mount the new feature).
11. Files that will explicitly NOT change (tests baseline, contracts, rules,
    workflows, configs, CI).
12. Risks.
13. Rollback notes.
14. Stop conditions.

Then **STOP**. Implementation requires a separate authorization after the
plan is reviewed.

---

## Hard prohibitions in this state

Until the slice plan is reviewed and implementation is authorized, the AI
MUST NOT:

* Create any file under `src/` (no `app/`, `features/`, `shared/`,
  `tenants/`, `domain/`, `testing/`).
* Modify `src/App.tsx`, `src/main.tsx`, `src/App.css`, `src/index.css`, or
  `src/App.test.tsx`.
* Install any package or modify `package.json` / `package-lock.json`.
* Modify CI, ESLint, TypeScript, or Vite configuration.
* Modify any contract under `docs/contracts/`.
* Modify any rule under `rules/`.
* Modify any workflow under `workflows/`.
* Modify `FRAMIXOR.md`.
* Treat this `NEXT_TASK.md` as authorization. It is a description of the
  *next* authorized action; the *current* state is **stopped, awaiting
  reviewer authorization**.

---

## Done when

This task is "done" when:

* The reviewer authorizes the slice planning.
* The slice plan is produced per `workflows/feature-implementation.md`
  Step 1 and submitted for review.
* No code is written.
* `.planning/*` is updated to reflect that the plan has been submitted and
  what is now blocked on plan review.
