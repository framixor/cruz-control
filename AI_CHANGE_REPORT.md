# AI Change Report — Governance Bootstrap (Phase 0)

**Document status:** Round 1 — governance approved with adjustments;
ADR-0001 + tenant-content v1 + visual-tokens v1 authored. Round 0 narrative
is preserved verbatim below; Round 1 is appended.

**Scope of the document:** track every governance and contract change in
Phase 0. No application code has been written in any round to date.

---

# Round 0 — Governance Bootstrap

**Document status:** initial draft, governance-only.
**Scope:** populate the Cruz Control governance foundation.
**Out of scope:** any Cruz Control website implementation, any UI delivery, any
backend or Supabase integration, any heavy dependency.

This report covers a single change: bootstrapping the AI-governed frontend
pipeline so that subsequent feature work can run under
`workflows/feature-implementation.md`. No application code was written. No
tests were added beyond what already existed. No dependencies were modified.

---

## Objective

Establish the minimum governance and architecture preparation required for the
Cruz Control laboratory to:

1. Validate the new Framixor AI-governed frontend pipeline.
2. Adopt a contract-first frontend (visual tokens, tenant content, component contracts).
3. Operate under TDD-first cycles with AI agents.
4. Carry lightweight DDD boundaries that scale without becoming enterprise DDD.
5. Apply SOLID where it pragmatically helps React/TS code.
6. Enforce auditability via `AI_CHANGE_REPORT.md` and `.planning/*`.
7. Prepare explicit guardrails for a future Lovable integration.

The reference project `framixor-supabase` was read **only as inspiration** for
governance shape (continuity, planning artifacts, change reports, rules,
workflows, approval gates, auditability). No SQL, RLS, migration, or
backend-specific artifact was carried over.

---

## Files changed

| Path | Status | Purpose |
|---|---|---|
| `FRAMIXOR.md` | populated | Frontend constitution (scope, stack, principles, AI workflow, approval gates, stop conditions). |
| `AI_CHANGE_REPORT.md` | this file | Governance bootstrap report (current revision). |
| `.planning/CURRENT_STATE.md` | populated | Operational truth: phase, completed, allowed, prohibited. |
| `.planning/NEXT_TASK.md` | populated | Single allowed next action after governance approval. |
| `.planning/OPEN_BLOCKERS.md` | populated | Active blockers on implementation. |
| `rules/frontend-architecture.md` | populated | Folder layout, import direction, file conventions. |
| `rules/testing.md` | populated | TDD cycle, test categories, forbidden practices. |
| `rules/visual-contracts.md` | populated | Token surface as a contract; what changes break consumers. |
| `rules/lovable-rules.md` | populated | What Lovable MAY and MUST NOT change. |
| `rules/ddd-boundaries.md` | new | Lightweight DDD layers and import direction. |
| `rules/solid-guidelines.md` | new | Pragmatic SOLID applied to React/TS. |
| `workflows/feature-implementation.md` | populated | Plan -> tests -> approval -> code -> report cycle. |
| `workflows/review-ui.md` | populated | Read-only review checklist before any UI is approved. |
| `workflows/ai-handoff.md` | new | Read order and hard rules for AI agents joining the project. |
| `docs/architecture/README.md` | new | Index for architecture notes and ADRs. |
| `docs/contracts/README.md` | new | Index for contract definitions (visual tokens, tenant content, component APIs). |
| `docs/state/README.md` | new | Index for historical operational snapshots. |

No code under `src/` was modified. No `package.json`, `tsconfig*.json`,
`vite.config.ts`, `eslint.config.js`, or `.github/workflows/ci.yml` was
modified.

---

## Decisions

1. **Governance lives at the repository root**, mirroring `framixor-supabase`
   (`FRAMIXOR.md`, `rules/`, `workflows/`, `AI_CHANGE_REPORT.md`). The
   `.planning/` folder is kept (already scaffolded) instead of moving it under
   `docs/context/`. This is intentional: `.planning/` is the operational truth
   surface for the laboratory; `docs/state/` archives historical snapshots.
2. **Lightweight DDD over enterprise DDD.** The layers are
   `app/`, `features/`, `shared/`, `tenants/`, `domain/`, `testing/`. Domain is
   pure TS. Presentation is React. Tenant data is content, not code.
3. **Contracts before pixels.** Visual tokens, tenant content shape, and
   component public APIs are contracts. Lovable will only be allowed to
   move values inside the existing contract surface.
4. **TDD is mandatory** for every feature touching domain or features. Pure
   visual primitives in `shared/ui` may be shipped with rendering tests instead
   of behavior tests, but never with snapshot-only tests.
5. **No code in this change.** Per the user's explicit instructions, no Hero,
   no CTA, no Gallery, no polished sections, no Supabase, no heavy deps.
6. **CI stays as-is.** The current `.github/workflows/ci.yml` already runs
   typecheck + tests + build. Adding lint to CI is a separate, future change.

---

## Risks

1. **Governance is text only until exercised.** No real feature has run through
   `workflows/feature-implementation.md` yet. The first vertical slice
   (`docs/architecture/ADR-0001-foundation-stack.md` + a tiny tenant-driven
   component) will be the real validation.
2. **Tenant model is not yet defined.** `rules/visual-contracts.md` and
   `tenants/` posture rely on a tenant content shape that will be designed in
   the next task. Consumers must not assume any specific shape until
   `docs/contracts/tenant-content.contract.md` exists.
3. **Lovable rules are preventive.** No Lovable integration exists yet; the
   rules describe intended guardrails. They will be re-validated when Lovable
   is actually wired in.
4. **No ADRs exist yet.** ADR-0001 (foundation stack) and ADR-0002 (tenant
   content contract) are listed as the next allowed work but have not been
   authored.
5. **`.planning/` is not enforced by CI.** Drift between
   `.planning/CURRENT_STATE.md` and reality is currently a manual concern.

---

## Validation steps

Manual checklist for any reviewer of this governance bootstrap:

- [ ] `FRAMIXOR.md` exists and lists scope, stack, principles, AI workflow,
      approval gates, stop conditions.
- [ ] `.planning/CURRENT_STATE.md`, `NEXT_TASK.md`, `OPEN_BLOCKERS.md` exist
      and agree with each other.
- [ ] `rules/` contains: `frontend-architecture.md`, `testing.md`,
      `visual-contracts.md`, `lovable-rules.md`, `ddd-boundaries.md`,
      `solid-guidelines.md`. Each is non-empty and has explicit "Mandatory" and
      "Forbidden" sections.
- [ ] `workflows/` contains: `feature-implementation.md`, `review-ui.md`,
      `ai-handoff.md`. Each prescribes a read-first list and a deliverable.
- [ ] `docs/architecture/`, `docs/contracts/`, `docs/state/` exist and have
      index `README.md` files explaining what belongs in each.
- [ ] `src/` is unchanged.
- [ ] `package.json` is unchanged.
- [ ] `.github/workflows/ci.yml` is unchanged.
- [ ] `npm test -- --run` still passes (sanity test).
- [ ] `npx tsc --noEmit` still passes.
- [ ] `npm run build` still passes.

---

## Rollback notes

This change is text-only. Rolling back means deleting or re-emptying the
governance files listed in **Files changed**. No code, dependency, build,
configuration, or test surface is affected. There is no migration to reverse.

---

## Remaining concerns

1. **Tenant content contract** has not been designed.
2. **Visual token contract** has not been designed; only the *rules around it*
   exist.
3. **ADR template** has not been authored under `docs/architecture/`.
4. **Lovable integration mode** (PR-based, branch-based, or direct) is
   undecided; the rules cover behavior, not delivery mechanism.
5. **CI does not yet run lint.** Acceptable for Phase 0; should be revisited
   when the first feature lands.

---

## Stop conditions (currently in force)

- No application feature is approved for implementation.
- No new dependency is approved.
- No `src/` change is approved beyond what is required to validate the first
  vertical slice once ADR-0001 and ADR-0002 exist.
- Lovable integration is **not** authorized; rules are preparatory only.

Awaiting decisions on:
(a) approval of this governance bootstrap,
(b) authoring ADR-0001 (foundation stack) and ADR-0002 (tenant content contract),
(c) defining the first vertical slice that will exercise
    `workflows/feature-implementation.md` end-to-end.

---

# Round 1 — Governance approval & first contracts

**Document status:** added 2026-05-21.
**Scope:** record the reviewer's approval-with-adjustments and the artifacts
authored as a direct consequence: ADR-0001, `tenant-content.contract.md` v1,
`visual-tokens.contract.md` v1. Reconcile the rules with the lighter ADR
posture.
**Out of scope:** any UI implementation, any slice planning, any new
runtime dependency. The AI is **stopped** at the end of this round, awaiting
explicit authorization to begin slice planning.

---

## Objective

1. Record the reviewer's verdict ("APPROVED WITH ADJUSTMENTS") and the
   adjustments themselves.
2. Apply the lighter ADR scope across the documents that referenced ADRs.
3. Author ADR-0001 to lock the foundation stack as it stands.
4. Author the v1 tenant content contract scoped to the approved first
   vertical slice (BeforeAfterGallery).
5. Author the v1 visual tokens contract scoped to the approved first slice
   (`spacing.*`, `radius.*`, `typography.*`, `surface.*`).
6. Update `.planning/*` to reflect the new state and to record that the AI
   is stopped pending authorization for slice planning.

---

## Reviewer adjustments adopted

1. `.planning/` stays at the repository root.
   * `.planning/` = live operational surface.
   * `docs/` = historical knowledge and long-term reference.
2. ADR scope (now codified in `docs/architecture/README.md`):
   * REQUIRED for: foundation stack, AI workflow, Lovable integration,
     architecture boundary, tenant model, new runtime dependency.
   * OPTIONAL for: component organization, local implementation, small UI
     decisions, refactors that do not change a contract or a boundary.
3. Concepts confirmed: CURRENT_STATE / NEXT_TASK / OPEN_BLOCKERS,
   AI_CHANGE_REPORT, TDD-first, lightweight DDD, SOLID guidelines,
   contract-first frontend, Lovable restrictions, visual token contracts,
   AI handoff workflow.
4. First vertical slice scope reset from generic to **BeforeAfterGallery**.
   Slice contracts and tokens are pinned by the reviewer:
   * Tenant fields: `title`, `description`, `category`, `beforeImage`,
     `afterImage`.
   * Token categories: `spacing`, `radius`, `typography`, `surface`.

The slice itself is **not** planned in this round. Per the reviewer's
instruction, the AI must STOP after this round.

---

## Files changed (Round 1)

| Path | Status | Purpose |
|---|---|---|
| `docs/architecture/README.md` | modified | Codified ADR scope (required vs optional). Listed ADR-0001 as authored. |
| `FRAMIXOR.md` | modified | Added a short ADR-scope pointer; linked ADR-0001 from the Stack section. No principle, workflow, or stop-condition was changed. |
| `rules/visual-contracts.md` | modified | Softened "REQUIRES ADR" wording on contract changes to "REQUIRES recorded contract revision + consumer migration", with ADR escalated only when the change crosses tenant-model or boundary scope. Aligned token category names to the v1 contract (`surface.*`). |
| `docs/architecture/ADR-0001-foundation-stack.md` | new | Records Vite + React 19 + TS strict + Vitest + RTL + ESLint + GitHub Actions as the fixed stack. Lists alternatives considered and rejected. Status: Accepted. |
| `docs/contracts/tenant-content.contract.md` | new | v1. Defines `Tenant`, `TenantId`, `ImageRef`, and `BeforeAfterItem` (`title`, `description`, `category`, `beforeImage`, `afterImage`). Versioning rules, consumer expectations, cardinality (0/1/N), test obligations, forbidden patterns. |
| `docs/contracts/visual-tokens.contract.md` | new | v1. Defines four categories (`spacing`, `radius`, `typography`, `surface`) and their stable v1 keys. Out-of-scope categories (`motion`, `elevation`, `breakpoint`, `zIndex`) listed explicitly. Test obligations include token-existence and "no inline values" enforcement. |
| `.planning/CURRENT_STATE.md` | rewritten | Phase 0 closing; approval-with-adjustments recorded; Round 1 deliverables listed. |
| `.planning/NEXT_TASK.md` | rewritten | AI is stopped; next allowed action is slice **planning** for BeforeAfterGallery upon explicit authorization. Slice scope and binding rules pinned. Hard prohibitions listed. |
| `.planning/OPEN_BLOCKERS.md` | rewritten | Foundation/governance/contract blockers cleared. Process blocker added: AI stopped, awaiting authorization. Lovable still un-authorized (not blocking the slice). |
| `AI_CHANGE_REPORT.md` | this file | Round 0 preserved verbatim; Round 1 appended. |

No code under `src/` was modified. `package.json`, `tsconfig*.json`,
`vite.config.ts`, `eslint.config.js`, and `.github/workflows/ci.yml` were
not modified.

---

## Decisions (Round 1)

1. **ADR scope is "things expensive to reverse".** The five ADR-required
   buckets are listed once in `docs/architecture/README.md` and referenced
   everywhere else. Pure contract revisions (e.g., adding a new optional
   field to a tenant content type) are governed by the contract document's
   own revision log, not by an ADR.
2. **ADR-0001 records the existing stack rather than proposing one.** The
   stack is already in place and CI is green; ADR-0001 simply makes the
   "fixed" status explicit and lists the alternatives considered. It also
   declares specific items out of scope (SSR, external state libraries, UI
   kits, CSS-in-JS, backend SDKs) until a superseding ADR exists.
3. **Tenant content contract v1 is intentionally narrow.** It defines the
   smallest surface that the BeforeAfterGallery slice needs. New tenant
   content types are added via a contract revision, not by widening v1.
4. **Visual tokens contract v1 covers four categories only.**
   `motion.*`, `elevation.*`, `breakpoint.*`, `zIndex.*` are explicitly
   listed as out-of-scope and require a contract revision when needed.
   This is deliberate: starting narrow keeps the v1 surface auditable.
5. **CSS implementation is not pinned by these contracts.** Whether tokens
   resolve via CSS variables, vanilla-extract, CSS modules, or inline
   objects is an implementation choice. The contract is the typed key
   surface, not the delivery mechanism. ADR-0001 also makes this explicit.
6. **No code, no slice plan, no implementation in this round.** The
   reviewer's instruction was to author the three documents and stop.

---

## Deviations from the approved plan

None.

* Reviewer requested: ADR-0001, `tenant-content.contract.md`,
  `visual-tokens.contract.md`, then stop.
* Authored: ADR-0001, `tenant-content.contract.md` v1,
  `visual-tokens.contract.md` v1, then stop.

The lighter ADR-scope adjustment was applied as a direct consequence of
the reviewer's adjustment #2; the corresponding edits to
`docs/architecture/README.md`, `FRAMIXOR.md`, and `rules/visual-contracts.md`
are scoped to that adjustment only.

---

## Risks (Round 1)

1. **The contracts have no test coverage yet.** v1 is text only. The first
   slice (BeforeAfterGallery) is what will lock the contracts in code via
   token-existence tests, tenant-contract tests, and rendering tests. Until
   the slice lands, the contracts can drift if anyone edits them without
   following the contract revision protocol.
2. **`surface.*` may be insufficient.** v1 covers backgrounds, text,
   borders, and a single accent role. If the BeforeAfterGallery slice
   discovers a missing role (e.g., a status color), the slice plan must
   record it as a contract revision request, not silently inline a value.
3. **CSS strategy is undecided.** ADR-0001 leaves this to the slice. A
   poor choice can leak inline values into components and violate
   `rules/visual-contracts.md`. The slice plan must call out the chosen
   strategy explicitly.
4. **No router exists.** Acceptable for the BeforeAfterGallery slice (it
   does not require routing). Becomes blocking the moment a multi-route
   slice is requested.
5. **Process risk.** The AI must remain stopped until explicit
   authorization. `.planning/NEXT_TASK.md` reinforces this with hard
   prohibitions. A new AI agent picking up the project must read
   `workflows/ai-handoff.md` first and respect the stopped state.

---

## Validation steps (Round 1)

Manual checklist for a reviewer of this round:

- [ ] `docs/architecture/README.md` lists ADR scope (required vs optional)
      and lists ADR-0001 as authored.
- [ ] `docs/architecture/ADR-0001-foundation-stack.md` exists with sections
      Context / Decision / Alternatives / Consequences / Risks / Validation
      and Status: Accepted.
- [ ] `docs/contracts/tenant-content.contract.md` defines the
      `BeforeAfterItem` fields exactly as approved
      (`title`, `description`, `category`, `beforeImage`, `afterImage`),
      with non-empty `alt` requirement on `ImageRef`.
- [ ] `docs/contracts/visual-tokens.contract.md` defines the four
      categories (`spacing`, `radius`, `typography`, `surface`) and lists
      `motion`, `elevation`, `breakpoint`, `zIndex` as out-of-scope in v1.
- [ ] `FRAMIXOR.md` references ADR-0001 in its Stack section and includes
      the short ADR-scope pointer.
- [ ] `rules/visual-contracts.md` no longer requires an ADR for every token
      contract change; it requires a recorded contract revision and
      escalates to ADR only when the change crosses tenant-model or
      boundary scope.
- [ ] `.planning/CURRENT_STATE.md` records "APPROVED WITH ADJUSTMENTS" and
      lists Round 1 deliverables.
- [ ] `.planning/NEXT_TASK.md` records the AI as stopped and pins the
      BeforeAfterGallery slice scope and binding rules.
- [ ] `.planning/OPEN_BLOCKERS.md` shows foundation/governance/contract
      blockers as cleared and adds the process blocker (awaiting
      authorization).
- [ ] `src/` is unchanged.
- [ ] `package.json`, `tsconfig*.json`, `vite.config.ts`,
      `eslint.config.js`, `.github/workflows/ci.yml` are unchanged.
- [ ] `npx tsc --noEmit`, `npm test -- --run`, `npm run build` still pass.

---

## Rollback notes (Round 1)

This round is text-only. Rolling Round 1 back means:

1. Delete `docs/architecture/ADR-0001-foundation-stack.md`.
2. Delete `docs/contracts/tenant-content.contract.md`.
3. Delete `docs/contracts/visual-tokens.contract.md`.
4. Restore Round 0 versions of `docs/architecture/README.md`,
   `FRAMIXOR.md`, `rules/visual-contracts.md`,
   `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
   `.planning/OPEN_BLOCKERS.md`.
5. Truncate this report to the end of "Round 0" above.

No code, dependency, build, configuration, or test is affected.

---

## Remaining concerns (Round 1)

1. The contracts are not yet locked by tests. The BeforeAfterGallery slice
   is the locking event.
2. The CSS implementation strategy for the token API is undecided.
3. Lovable integration mode is still undecided. Not blocking the slice.
4. CI does not yet run lint or coverage. Backlog.
5. No ADR template ADR (e.g., ADR-0000) exists. The informal template in
   `docs/architecture/README.md` is sufficient for now.

---

## Stop conditions (Round 1, currently in force)

- The AI is **stopped** at the end of this round.
- The AI does NOT begin slice planning automatically.
- The AI awaits explicit authorization, e.g.
  "Authorized: plan the BeforeAfterGallery slice."
- Until that authorization, no file under `src/`, no `package.json`, no
  config, no contract under `docs/contracts/`, no rule under `rules/`, no
  workflow under `workflows/`, no `FRAMIXOR.md` may be modified.

Awaiting decisions on:
(a) authorization to begin BeforeAfterGallery slice **planning**,
(b) optional updates to the contracts before the slice plan is requested
    (none expected; reviewer pinned the contracts above).

---

## Revision log

- **Round 0 — governance bootstrap (initial revision).** Populated all
  empty governance files; created `rules/ddd-boundaries.md`,
  `rules/solid-guidelines.md`, `workflows/ai-handoff.md`, and
  `docs/*/README.md` index files. No code, dependency, or CI change.
- **Round 1 — governance approval & first contracts (this revision).**
  Reviewer verdict: APPROVED WITH ADJUSTMENTS. ADR scope formalized as
  "things expensive to reverse" with five required buckets. ADR-0001
  authored to record the foundation stack as fixed. `tenant-content.contract.md`
  v1 authored, defining `BeforeAfterItem` for the approved first slice.
  `visual-tokens.contract.md` v1 authored, defining four token categories
  (`spacing`, `radius`, `typography`, `surface`). `FRAMIXOR.md`,
  `rules/visual-contracts.md`, and `docs/architecture/README.md` reconciled
  with the lighter ADR posture. `.planning/*` rewritten to reflect approval
  and the stopped state. No code, no slice plan, no dependency, no CI
  change.


---

# Patch 1.1 — `rules/ddd-boundaries.md`: Complexity escalation rule

**Date:** 2026-05-21 (post Round 1).
**Scope:** single rule file extension, reviewer-authorized.
**Type:** governance patch (rule extension), not a contract or boundary
change.

## Reviewer instruction

> Add a "Complexity escalation rule" section to `rules/ddd-boundaries.md`.

## Files changed

| Path | Status | Purpose |
|---|---|---|
| `rules/ddd-boundaries.md` | modified | Added a new section "## Complexity escalation rule" between "## Cross-feature integration" and "## What we are not doing". Verbatim content per reviewer. |
| `AI_CHANGE_REPORT.md` | modified | This patch entry appended. |

## What was added

A new section codifying the "complexity must be earned" posture:

* Prefer plain functions, typed contracts, composition, props, and simple
  adapters before introducing new abstractions.
* A new abstraction (service, manager, provider, adapter, helper layer) is
  justified only when behavior repeats in at least 2 distinct features, OR
  a boundary cannot be tested cleanly without extraction, OR coupling
  measurably increases.
* Default answer: `simpler > clever`.

## Why it is in scope without an ADR

Per `docs/architecture/README.md`'s ADR scope, the ADR-required buckets are
foundation stack, AI workflow, Lovable integration, architecture boundary,
tenant model, and new runtime dependency. This patch:

* does not add or remove a layer,
* does not change an allowed import edge,
* does not change the AI workflow,
* does not affect Lovable, the tenant model, or any contract,
* introduces no dependency.

It is a rule clarification within the existing `domain` / `tenants` / `shared`
/ `features` / `app` / `testing` boundary model. The patch is recorded here
for auditability but does not require an ADR.

## Risks

1. **Subjectivity of "earned" complexity.** The three-criterion test ("2
   features, untestable without extraction, coupling measurably increases")
   is concrete enough for review but still requires reviewer judgment in
   borderline cases. `workflows/review-ui.md` and
   `workflows/feature-implementation.md` Step 1's plan format already force
   the AI to declare new abstractions, which is the natural choke point for
   this rule.
2. **Possible tension with SOLID's OCP guidance.**
   `rules/solid-guidelines.md` already includes a YAGNI clause and forbids
   pre-emptive abstractions. This patch reinforces that posture; no
   contradiction expected.

## Validation

- [ ] `rules/ddd-boundaries.md` contains the new section between
      "Cross-feature integration" and "What we are not doing".
- [ ] Section text matches the reviewer's wording verbatim.
- [ ] No other file was modified except this `AI_CHANGE_REPORT.md`.
- [ ] `src/`, `package.json`, configs, CI: unchanged.
- [ ] Stop conditions from Round 1 still in force: AI remains stopped,
      awaiting authorization to begin BeforeAfterGallery slice planning.

## Rollback

Revert `rules/ddd-boundaries.md` to its Round 0 content (remove the
"## Complexity escalation rule" section) and remove this Patch 1.1 entry
from `AI_CHANGE_REPORT.md`. No code, dependency, build, or test surface is
affected.

## Stop conditions still in force

Same as Round 1. The AI remains stopped, awaiting explicit authorization to
plan the BeforeAfterGallery slice. This patch does not change `NEXT_TASK.md`,
`OPEN_BLOCKERS.md`, or `CURRENT_STATE.md`.

## Revision-log addendum

* **Patch 1.1 — Complexity escalation rule (this entry).** Single-file rule
  extension to `rules/ddd-boundaries.md` per reviewer instruction. No
  boundary, contract, workflow, or dependency change. AI remains stopped.


---

# Patch 1.2 — Narrowed `shared -> domain` exception + Future-work backlog

**Date:** 2026-05-21 (post Patch 1.1).
**Scope:** two narrow governance patches, reviewer-authorized, recorded
only. No code, no new dependency, no new workflow.

## Reviewer instruction

> Small governance patch:
>
> 1. Narrow `shared -> domain` exception. Allowed only for: shared types,
>    validation helpers, constants without business meaning. Forbidden:
>    business rules, invariants, domain orchestration.
> 2. Add note in governance backlog: future work (NOT blocking) — CI
>    enforcement for inline visual values, Lovable integration ADR, PR
>    checklist for `.planning/` artifacts. Record only. No implementation.
>    No new workflows. Then stop.

## Files changed

| Path | Status | Purpose |
|---|---|---|
| `rules/ddd-boundaries.md` | modified | The `shared/` -> `domain/` line in "## Import direction" now references a new "## Shared -> domain exception" section. The new section enumerates the allowed list (shared types, validation helpers, constants without business meaning) and the forbidden list (business rules, invariants, domain orchestration). Adds rationale and test posture for the edge. |
| `rules/frontend-architecture.md` | modified | The `shared/` -> `domain/` entry in "## Import direction (one-way)" was rewritten to point to the narrowed exception in `rules/ddd-boundaries.md`. No other edge changed. |
| `.planning/OPEN_BLOCKERS.md` | modified | Appended a new "## Future work (NOT blocking)" section recording: CI enforcement for inline visual values, Lovable integration ADR, PR checklist for `.planning/` artifacts. Each item is described as "out of scope until authorized" so it does not affect the current blocker surface. |
| `.planning/CURRENT_STATE.md` | modified | Appended a "## Subsequent governance patches" trail listing Patch 1.1 and Patch 1.2 with one-line summaries each. |
| `AI_CHANGE_REPORT.md` | modified | This Patch 1.2 entry appended; Round 0, Round 1, and Patch 1.1 preserved verbatim above. |

## Why these patches do not require an ADR

Per `docs/architecture/README.md`, ADR is required for foundation stack, AI
workflow, Lovable integration, architecture boundary, tenant model, or new
runtime dependency decisions.

Patch 1.2a (narrowed `shared -> domain`):

* Does not add or remove a layer.
* Does not add or remove an import edge — the edge already existed.
* Tightens *what may travel along* the edge, which is a rule clarification
  within the existing boundary model.
* Reinforces the already-stated `shared/` "Forbids: Business logic that
  belongs in `domain/`" responsibility.

Patch 1.2b (future-work backlog):

* Records intent only. No implementation, no new workflow, no new
  dependency.
* Three items are explicitly marked "NOT blocking" and "out of scope until
  authorized".
* The Lovable ADR was already listed in `docs/architecture/README.md`
  Backlog; this entry restates it under operational truth so a fresh
  reader sees it from `.planning/OPEN_BLOCKERS.md`.

Both patches are recorded for auditability without an ADR.

## Risks

1. **"Constants without business meaning" is a judgment call.** The line
   between a neutral constant and a business invariant can be fuzzy. The
   review process catches this: any `shared/` -> `domain/` import must be
   declared in the slice plan (per `workflows/feature-implementation.md`
   Step 1, "Boundary impact statement") and reviewed against this rule.
2. **Future-work entries can rot.** Items recorded as "NOT blocking" can
   silently become blocking if circumstances change (e.g., Lovable becomes
   needed urgently). The PR-checklist item, when authored, is the natural
   forcing function: it requires `.planning/*` updates, which surfaces
   stale backlog items at every cycle.
3. **No mechanical enforcement of the narrowed edge yet.** Until the future
   "CI enforcement" item lands, the narrowed `shared -> domain` rule is
   enforced by review (`workflows/review-ui.md`, "Boundary violations" and
   "SOLID notes" sections). Acceptable for the laboratory phase.

## Validation

- [ ] `rules/ddd-boundaries.md` contains a new "## Shared -> domain
      exception" section with the allowed list (shared types, validation
      helpers, constants without business meaning) and the forbidden list
      (business rules, invariants, domain orchestration), placed between
      "## Import direction" and "## Cross-feature integration".
- [ ] `rules/ddd-boundaries.md`'s "## Import direction" now annotates the
      `shared/` -> `domain/` line as a "narrow exception" pointing to the
      new section.
- [ ] `rules/ddd-boundaries.md` still contains the Patch 1.1 "Complexity
      escalation rule" section unchanged.
- [ ] `rules/frontend-architecture.md`'s "## Import direction (one-way)"
      now points the `shared/` -> `domain/` line to the narrowed exception
      in `ddd-boundaries.md`.
- [ ] `.planning/OPEN_BLOCKERS.md` ends with a "## Future work (NOT
      blocking)" section listing exactly the three items: CI enforcement
      for inline visual values, Lovable integration ADR, PR checklist for
      `.planning/` artifacts.
- [ ] `.planning/CURRENT_STATE.md` ends with a "## Subsequent governance
      patches" trail covering Patch 1.1 and Patch 1.2.
- [ ] No file under `src/`, `package.json`, `tsconfig*.json`,
      `vite.config.ts`, `eslint.config.js`, `.github/workflows/ci.yml`, any
      contract under `docs/contracts/`, ADR-0001, or any workflow under
      `workflows/` was modified.
- [ ] Stop conditions from Round 1 are still in force.

## Rollback

Per file:

* `rules/ddd-boundaries.md` — remove the "## Shared -> domain exception"
  section and revert the `shared/` -> `domain/` line in "## Import
  direction" to: `* `+`shared/` -> `domain/` (only when it improves
  cohesion)`.
* `rules/frontend-architecture.md` — revert line 50 to:
  `* `+`shared/` -> `domain/` (only when it improves cohesion; prefer no
  edge)`.
* `.planning/OPEN_BLOCKERS.md` — remove the "## Future work (NOT blocking)"
  section.
* `.planning/CURRENT_STATE.md` — remove the "## Subsequent governance
  patches" section (or leave only Patch 1.1 if Patch 1.1 is kept).
* `AI_CHANGE_REPORT.md` — truncate this Patch 1.2 entry.

No code, dependency, build, configuration, or test surface is affected by
this rollback.

## Stop conditions still in force

Same as end of Round 1 / Patch 1.1. The AI remains stopped, awaiting
explicit authorization to plan the BeforeAfterGallery slice. This patch
does not change `NEXT_TASK.md`.

## Revision-log addendum

* **Patch 1.2 — Narrowed `shared -> domain` exception + Future-work
  backlog (this entry).** Two reviewer-authorized rule clarifications and
  one operational-truth backlog note. No boundary, contract, workflow,
  dependency, or `src/` change. AI remains stopped.


---

# Round 2 — Plan submitted: BeforeAfterGallery

**Date:** 2026-05-21 (post Patch 1.2).
**Scope:** planning round only. Authorized by reviewer with the explicit
phrase "Authorized: plan only the BeforeAfterGallery slice." No code, no
`src/` folder, no fixture, no rule / workflow / contract change. Only
planning artifacts.

## Authorization received

> Authorized: plan only the BeforeAfterGallery slice.
> Constraints:
> - Do NOT implement code
> - Do NOT create folders/files beyond planning artifacts
> - Read FRAMIXOR.md, CURRENT_STATE, NEXT_TASK, OPEN_BLOCKERS and relevant
>   rules first
> - Produce: goal / domain boundaries / contracts required / theme &
>   token requirements / tenant content strategy / TDD strategy /
>   acceptance criteria / risks / AI_CHANGE_REPORT / suggested folder
>   impacts (proposal only)
> - Deliver plan for review and stop.

## Files read (Step 0)

* `FRAMIXOR.md`
* `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
  `.planning/OPEN_BLOCKERS.md`
* `rules/frontend-architecture.md`, `rules/ddd-boundaries.md`,
  `rules/solid-guidelines.md`, `rules/visual-contracts.md`,
  `rules/testing.md`, `rules/lovable-rules.md`
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

## Files changed in this round

| Path | Status | Purpose |
|---|---|---|
| `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md` | new | The slice plan delivered for review. 10 sections per reviewer instruction. |
| `.planning/CURRENT_STATE.md` | modified | Latest completed cycle updated to "Round 2 — Plan submitted". Subsequent-patches trail extended. |
| `.planning/NEXT_TASK.md` | rewritten | The AI is **stopped after plan submission**. The next allowed action is reviewer feedback on the plan. After acceptance (with or without amendments), a *separate* authorization is required to begin implementation. |
| `.planning/OPEN_BLOCKERS.md` | modified | Process blocker updated: AI is now blocked on **plan review**, not on planning authorization. Future-work backlog preserved. |
| `AI_CHANGE_REPORT.md` | this entry | Round 2 entry appended; Round 0, Round 1, Patch 1.1, Patch 1.2 preserved verbatim above. |

No file under `src/`, `package.json`, `tsconfig*.json`, `vite.config.ts`,
`eslint.config.js`, `.github/workflows/ci.yml`, `rules/`, `workflows/`,
`FRAMIXOR.md`, `docs/contracts/*.md`,
`docs/architecture/ADR-0001-foundation-stack.md`, or
`docs/architecture/README.md` was modified.

## Decisions captured in the plan

The plan is the authoritative artifact; this report records the high-impact
decisions for audit:

1. **Do not create `src/domain/` in this slice.** BeforeAfterGallery has
   no business behavior that meets the Complexity Escalation Rule's
   thresholds (`rules/ddd-boundaries.md`, Patch 1.1). Five of six layers
   are exercised; `domain/` is intentionally absent. The slice itself
   validates that the layer model accommodates "domain not yet needed"
   cleanly.
2. **CSS strategy: CSS Modules + CSS variables on `:root`.** Both built
   into Vite. Zero new dependency. No ADR required. The typed token
   object holds `var(--…)` strings; components reference the typed
   object, never raw values.
3. **Full v1 token surface implemented; subset visually consumed.**
   Token-existence tests cover the entire v1 surface from
   `docs/contracts/visual-tokens.contract.md` (`spacing.*`, `radius.*`,
   `typography.*`, `surface.*`). BeforeAfterGallery uses a subset
   visually. Shipping a partial v1 surface would violate the contract.
4. **Tenant id `cruz-control`.** Single visible tenant fixture for the
   slice. Empty / single tenant fixtures live under `src/testing/fixtures/`
   for cardinality coverage.
5. **First authoring of `docs/contracts/component-api.contract.md` is
   proposed alongside implementation, not in this round.** Per
   `docs/contracts/README.md`: "Authored when the first primitive
   lands." `BeforeAfterCard` is that primitive.
6. **Simplest meaningful interaction: click + Space/Enter toggle of
   before/after on each card with `aria-pressed`.** Avoids drag-slider
   complexity. Validates real component behavior.
7. **`src/App.tsx` is updated.** The Vite/React starter content is
   replaced with the slice composition. The slice is a pipeline test;
   visual polish is out of scope. The reviewer is warned in the plan
   that the laboratory will look minimal/unstyled.
8. **No new runtime dependency.** Confirmed against ADR-0001 and
   `FRAMIXOR.md`.
9. **Implementation lives behind a separate authorization gate.** The
   AI submits the plan and stops. Review feedback may amend the plan.
   Implementation authorization is a distinct event.

## Risks of the plan itself

(Risks of the *implementation* are enumerated in plan §8. Below are risks
specific to the *plan as a planning artifact*.)

1. **Plan over-specification.** The plan commits to a CSS strategy and an
   interaction model. If the reviewer wants different choices, the plan
   needs amendment, not implementation. Mitigation: the plan documents
   alternatives considered for both decisions so amendments are
   surgical.
2. **Plan under-specification.** Image filenames, exact prop defaults,
   and the precise content of `cruz-control` fixture items are not
   pinned. Acceptable for a planning round; the implementation
   authorization request will surface these as follow-up details.
3. **`component-api.contract.md` v1 is proposed but not drafted.** A
   reviewer who wants the contract drafted *before* implementation would
   need to issue a sub-authorization to draft it. The plan flags this
   explicitly in §3 so the reviewer can choose.
4. **Folder count.** The plan proposes 9 new folders and ~20 new files
   in one implementation pass. Some reviewers may prefer to split into
   sub-slices (e.g., tokens-only first, then feature). The plan does
   not split because the five test categories required by
   `rules/testing.md` cannot all be satisfied by tokens alone, but the
   reviewer may amend.
5. **Plan-only audit trail.** This Round 2 entry asserts that no `src/`
   change occurred; the verification is mtime-based (file stamps
   unchanged). A future reviewer can confirm by listing
   `src/**` mtimes against the time of this round.

## Validation (review-time checklist for the plan)

The reviewer should confirm, before granting implementation authorization:

- [ ] The plan exists at
      `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md` and
      contains the 10 sections requested.
- [ ] Section 1 (Goal) explicitly states "pipeline test, not visual
      polish".
- [ ] Section 2 (Domain boundaries) declares that `src/domain/` will not
      be created in this slice and cites the Complexity Escalation Rule.
- [ ] Section 3 (Contracts) consumes the v1 contracts as-is and proposes
      first-authoring `component-api.contract.md` alongside
      implementation.
- [ ] Section 4 (Theme/token) commits to CSS Modules + CSS variables on
      `:root`, no new runtime dependency, full v1 surface implementation.
- [ ] Section 5 (Tenant content) names `cruz-control`, defines fixture
      surfaces, and forbids direct fixture imports inside primitives.
- [ ] Section 6 (TDD) lists five test categories in failing-first order.
- [ ] Section 7 (Acceptance criteria) lists 12 hard conditions.
- [ ] Section 8 (Risks) covers 12 named risks plus a drift watchlist.
- [ ] Section 9 (AI_CHANGE_REPORT) points to this Round 2 entry.
- [ ] Section 10 (Suggested folder impacts) lists every file to be
      created or modified, with a separate "explicitly NOT modified"
      list and a folder/file count summary.
- [ ] No file under `src/`, no `package.json`, no config, no rule /
      workflow / `FRAMIXOR.md`, and no contract under `docs/contracts/`
      was modified by Round 2 (mtime check).
- [ ] `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
      `.planning/OPEN_BLOCKERS.md` reflect the new "stopped after plan
      submission" state.

## Rollback

This round is text-only. To roll Round 2 back:

1. Delete
   `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`.
2. Revert `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
   `.planning/OPEN_BLOCKERS.md` to their post-Patch-1.2 contents.
3. Truncate this Round 2 entry from `AI_CHANGE_REPORT.md`.

No code, dependency, build, configuration, or test surface is affected.

## Stop conditions (currently in force)

* The AI is **stopped** after submitting this plan.
* The next allowed action is reviewer feedback on the plan.
* If the reviewer requests amendments, the AI returns to planning (Step 1
  of `workflows/feature-implementation.md`) and re-issues a revised
  plan. The AI does **not** begin implementation on partial feedback.
* Implementation authorization is a separate event and must be explicit
  (e.g., "Authorized: implement the BeforeAfterGallery slice per the
  approved plan").

## Revision-log addendum

* **Round 2 — Plan submitted: BeforeAfterGallery (this entry).** Authored
  the slice plan as a single artifact under `docs/architecture/`.
  Updated `.planning/*` to reflect the new "stopped after plan
  submission" state. No code, no contract, no rule, no workflow, no
  dependency, no CI change. AI remains stopped, awaiting reviewer
  feedback on the plan.


---

# Round 2.1 — Plan amendments accepted: BeforeAfterGallery

**Date:** 2026-05-21 (post Round 2).
**Scope:** plan amendment in place. Reviewer "Accept with focused
amendments" was honored by appending an "Amendments (Round 2.1,
post-review)" section to the plan rather than re-issuing a fresh plan
document, per the reviewer's explicit "Output: Amendments only" and
"Priority: unlock delivery > expand governance" framing.
**Out of scope:** any code, any `src/` change, any new governance
artifact, any rule / workflow / ADR / contract change.

## Reviewer instruction

> Accept with focused amendments. Goal: minimize additional planning.
> Resolve only blockers that materially affect implementation speed or
> architecture safety.
> 1. Explain briefly why BeforeAfterGallery is the preferred first slice
>    (vs. Hero, Button, Card, TenantContentBlock). <=10 lines.
> 2. Decide explicitly: full token v1 surface OR consumed tokens +
>    contract tests. Recommend, justify in <=10 lines.
> 3. Decide whether `component-api.contract.md` must exist before
>    implementation or can be authored alongside. Recommend, justify in
>    <=10 lines.
> Constraints: no new governance artifacts beyond updating existing
> planning docs; no new rules / ADR / workflows / architecture
> expansion / code.
> Output: amendments only / updated recommendation / remaining blockers
> / verdict READY_FOR_IMPLEMENTATION = YES / NO.
> Priority: unlock delivery > expand governance.

## Files changed in this round

| Path | Status | Purpose |
|---|---|---|
| `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md` | appended | New "Amendments (Round 2.1, post-review)" section with A1, A2, A3, and verdict. No prior section of the plan was modified. |
| `.planning/NEXT_TASK.md` | rewritten | Status updated to "plan amended, ready for implementation authorization". Hard prohibitions kept. |
| `.planning/OPEN_BLOCKERS.md` | rewritten | Process blocker shifted from "awaiting plan review" to "awaiting implementation authorization". Current status line: "First slice plan: AMENDED (Round 2.1), READY_FOR_IMPLEMENTATION = YES". |
| `.planning/CURRENT_STATE.md` | appended | Round 2.1 trail entry. |
| `AI_CHANGE_REPORT.md` | this entry | Round 2.1 entry appended; all prior rounds preserved verbatim above. |

No file under `src/`, `package.json`, `tsconfig*.json`, `vite.config.ts`,
`eslint.config.js`, `.github/workflows/ci.yml`, `rules/`, `workflows/`,
`FRAMIXOR.md`, `docs/contracts/*.md`,
`docs/architecture/ADR-0001-foundation-stack.md`, or
`docs/architecture/README.md` was modified.

## Decisions captured

* **A1 — BeforeAfterGallery preferred over Hero / Button / Card /
  TenantContentBlock.** Hero / Button / Card / TenantContentBlock each
  exercise only a fraction of the pipeline; BeforeAfterGallery is the
  smallest slice that exercises all five test categories at once
  (contract, tenant-contract, token-existence, rendering 0/1/N,
  behavior) and stresses the layer model end-to-end without forcing a
  premature `domain/` layer.
* **A2 — Implement full v1 token surface (Option A).** ~43 keys with
  sensible defaults. Satisfies the existing token-existence test
  obligation as written. Avoids a contract revision. Pre-pays the cost
  for future slices.
* **A3 — Author `component-api.contract.md` alongside implementation.**
  Matches `docs/contracts/README.md`'s "authored when the first
  primitive lands". Grounded in a real consumer; lower governance
  friction.

## Risks of this round

1. **Amendment-in-place precedent.** Appending amendments to the plan
   rather than re-issuing a new plan saves a round but leaves the
   "Stop conditions for this plan" section (which mandates re-issue on
   amendments) technically out of sync. The reviewer's explicit
   override ("Output: Amendments only") authorized this departure;
   recorded here for audit so future rounds do not generalize the
   exception silently.
2. **Option A pre-implements unused tokens.** Mitigation: token
   *names* are the contract; token *values* are movable by Lovable.
   Default values are placeholders, not design decisions.
3. **Authoring `component-api.contract.md` alongside implementation
   means the implementation diff carries a contract draft.** Reviewer
   accepts both in one diff or rejects both; recorded as a known
   coupling.

## Validation (post-amendment)

- [ ] Plan file ends with an "Amendments (Round 2.1, post-review)"
      section containing A1, A2, A3, and "Verdict:
      `READY_FOR_IMPLEMENTATION = YES`".
- [ ] Each of A1, A2, A3 fits within ~10 lines of prose.
- [ ] `.planning/NEXT_TASK.md` lists "implementation authorization
      phrase" as the next allowed action and preserves the hard
      prohibitions.
- [ ] `.planning/OPEN_BLOCKERS.md` "Current status" reads
      "READY_FOR_IMPLEMENTATION = YES — pending explicit authorization".
- [ ] No `src/`, no config, no rule / workflow / contract /
      ADR / FRAMIXOR file modified (mtime check).

## Rollback

To roll Round 2.1 back: remove the "Amendments (Round 2.1, post-review)"
section from the plan; revert `.planning/NEXT_TASK.md` and
`.planning/OPEN_BLOCKERS.md` to their post-Round-2 contents; remove the
Round 2.1 paragraph from `.planning/CURRENT_STATE.md`; truncate this
Round 2.1 entry from `AI_CHANGE_REPORT.md`. No code surface affected.

## Stop conditions (currently in force)

* The AI is **stopped** after delivering the amendments and verdict.
* The next allowed action is the reviewer issuing the implementation
  authorization phrase, **or** overriding A2 / A3 and re-amending the
  plan, **or** rescinding the slice.

## Revision-log addendum

* **Round 2.1 — Plan amendments accepted: BeforeAfterGallery (this
  entry).** Three focused amendments (A1 justification, A2 full v1
  tokens, A3 component-api contract alongside) appended to the plan
  in place. Verdict `READY_FOR_IMPLEMENTATION = YES`. No code, no
  governance churn beyond planning docs, no contract change. AI
  remains stopped pending implementation authorization.


---

# Round 3 — BeforeAfterGallery slice implemented

**Date:** 2026-05-21 (post Round 2.1).
**Authorization received:**

> Authorized: implement the BeforeAfterGallery slice per the approved
> plan. Priorities: deliver a working, tested slice; preserve
> contracts; preserve tenant boundaries; preserve TDD discipline;
> preserve architecture. Stop if implementation pressure requires
> introducing `src/domain/`.

**Outcome:** `IMPLEMENTATION_COMPLETE = YES`. CI gate green
(`tsc --noEmit`, `vitest run`, `vite build`). 79 tests across 8 files
all pass. No new dependency. `src/domain/` not introduced.

## Files read (Step 0)

* `FRAMIXOR.md`, `.planning/CURRENT_STATE.md`,
  `.planning/NEXT_TASK.md`, `.planning/OPEN_BLOCKERS.md`,
  all of `rules/*`, all of `workflows/*`,
  `docs/architecture/ADR-0001-foundation-stack.md`,
  `docs/architecture/README.md`,
  `docs/contracts/tenant-content.contract.md`,
  `docs/contracts/visual-tokens.contract.md`,
  `docs/contracts/README.md`,
  `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`
  (incl. Amendments 2.1).
* `src/App.tsx`, `src/App.test.tsx`, `src/main.tsx`, `src/index.css`,
  `src/App.css`, `package.json`, `tsconfig.app.json`,
  `vite.config.ts`, `.github/workflows/ci.yml`.

## Files changed

### Production (new)

| Path | Purpose |
|---|---|
| `src/shared/ui/tokens/tokens.css` | `:root` declarations of all 43 v1 token CSS variables. |
| `src/shared/ui/tokens/index.ts` | Typed token API (`Tokens`, `SpacingKey`, `RadiusKey`, `TypographyKey`, `SurfaceKey`, exported `tokens` object whose values are `var(--…)` strings). |
| `src/shared/ui/before-after-card/BeforeAfterCard.tsx` | Primitive: native `<button type="button">` toggle, `aria-pressed`, accessible name flips, `data-testid="before-after-card"` on root `<article>`. |
| `src/shared/ui/before-after-card/BeforeAfterCard.module.css` | CSS Module referencing CSS variables only — no raw px/hex (per `rules/visual-contracts.md`, src/shared/ui/ is the allowed home for these). One `1px` literal for `border-width` is in this CSS Module; see Deviations §D2. |
| `src/shared/ui/before-after-card/index.ts` | Public surface re-export. |
| `src/shared/ui/index.ts` | `shared/ui` barrel. |
| `src/features/before-after-gallery/BeforeAfterGallery.tsx` | Feature: `<section role="region" aria-label="Before and after gallery">`, `itemsOverride` escape hatch, default reads from `useOptionalTenant()`, `data-testid="before-after-gallery"`, empty-state `<div role="status" data-testid="before-after-gallery-empty">`. |
| `src/features/before-after-gallery/BeforeAfterGallery.module.css` | CSS Module via CSS variables. |
| `src/features/before-after-gallery/index.ts` | Public surface re-export. |
| `src/app/providers/tenant.tsx` | `TenantProvider`, `useTenant()` (throwing), `useOptionalTenant()` (non-throwing, added to satisfy Rules of Hooks in `BeforeAfterGallery`). |
| `src/app/providers/index.ts` | Public surface re-export. |
| `src/tenants/types.ts` | `Tenant`, `TenantId`, `ImageRef`, `BeforeAfterItem` per v1 contract. |
| `src/tenants/index.ts` | Public surface re-export of types and `cruzControlTenant`. |
| `src/tenants/cruz-control/index.ts` | `cruz-control` fixture: 3 items across 2 categories (`exterior`, `interior`); reuses `src/assets/hero.png` for both before and after. |
| `src/testing/render.tsx` | `renderWithProviders(ui, { tenant })` helper. |
| `src/testing/cleanup.ts` | Module-side-effect helper that calls `afterEach(cleanup)`. Imported by every component test file to compensate for vitest's default `globals: false` mode (no auto-cleanup). |
| `src/testing/fixtures/empty-tenant.ts` | Empty tenant fixture. |
| `src/testing/fixtures/single-tenant.ts` | Single-item tenant fixture (1×1 data-URL placeholder). |
| `src/testing/fixtures/index.ts` | Fixtures barrel. |
| `src/testing/index.ts` | `testing/` barrel. |

### Tests (new)

| Path | Tests |
|---|---|
| `src/shared/ui/tokens/index.test.ts` | 47 — every v1 key exists with non-empty string value; per-category exact key-set assertion. |
| `src/shared/ui/before-after-card/BeforeAfterCard.contract.test.tsx` | 4 — minimal/full props compile; native button + `type="button"`; `aria-pressed` and accessible name. |
| `src/shared/ui/before-after-card/BeforeAfterCard.behavior.test.tsx` | 6 — default before/after, click toggle, second click toggles back, `initialView=after`, `onViewChange` callback receives the new view, accessible label flips. |
| `src/features/before-after-gallery/BeforeAfterGallery.contract.test.tsx` | 3 — no required props (with provider), optional props, region role + accessible name. |
| `src/features/before-after-gallery/BeforeAfterGallery.render.test.tsx` | 6 — 0/1/N cardinality (override and tenant-context paths), custom `emptyState`, source-order rendering. |
| `src/features/before-after-gallery/BeforeAfterGallery.behavior.test.tsx` | 1 — toggling one card does not affect another (independence). |
| `src/tenants/tenants.test.ts` | 10 — every fixture: kebab-case id, items array, all `BeforeAfterItem` field rules; `cruz-control` ≥2 categories. |
| `src/App.test.tsx` | 2 — App-shell smoke (gallery + cards mount under `<TenantProvider>` with `cruzControlTenant`). |

**Total: 79 tests, 8 files, all passing.**

### Production (modified)

| Path | Change |
|---|---|
| `src/App.tsx` | Replaced Vite/React starter content with `<TenantProvider tenant={cruzControlTenant}><BeforeAfterGallery /></TenantProvider>`. |
| `src/main.tsx` | Adds `import './shared/ui/tokens/tokens.css'` before `import './index.css'`. |
| `src/index.css` | Replaced starter styles with a minimal token-driven body reset. |
| `src/App.css` | Emptied (token-driven styles live in CSS Modules). |
| `src/App.test.tsx` | Repurposed from `expect(true).toBe(true)` placeholder to a real App-shell smoke test. |

### Contracts (first authoring per amendment A3)

| Path | Status |
|---|---|
| `docs/contracts/component-api.contract.md` | **NEW v1.** Naming, public surface, visual-prop obligations, interaction surface, test obligations, backward-compatibility rules, v1 surface anchors for `BeforeAfterCard` and `BeforeAfterGallery`. |

### Files explicitly NOT modified

`package.json`, `package-lock.json`, `tsconfig.json`,
`tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`,
`eslint.config.js`, `.github/workflows/ci.yml`, `FRAMIXOR.md`, every
file under `rules/`, every file under `workflows/`,
`docs/architecture/ADR-0001-foundation-stack.md`,
`docs/architecture/README.md`,
`docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`,
`docs/contracts/tenant-content.contract.md`,
`docs/contracts/visual-tokens.contract.md`,
`docs/contracts/README.md`, `docs/state/README.md`. No new runtime
or dev dependency.

## Tests added and results

CI gate executed via WSL Node 20.20.1 (matching CI matrix in
`.github/workflows/ci.yml`):

```
=== node ===
v20.20.1
=== tsc --noEmit ===
tsc-exit=0
=== npm run build ===
> cruz-control@0.0.0 build
> tsc -b && vite build
vite v8.0.14 building client environment for production...
✓ 29 modules transformed.
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/hero-CLDdwZDr.png    13.05 kB
dist/assets/index-9M3CCs7n.css    4.33 kB │ gzip:  1.09 kB
dist/assets/index-C-_ssWPK.js   193.33 kB │ gzip: 61.11 kB
✓ built in 205ms
build-exit=0
```

`npm test -- --run`:

```
✓ src/features/before-after-gallery/BeforeAfterGallery.render.test.tsx (6)
✓ src/shared/ui/before-after-card/BeforeAfterCard.contract.test.tsx (4)
✓ src/features/before-after-gallery/BeforeAfterGallery.contract.test.tsx (3)
✓ src/features/before-after-gallery/BeforeAfterGallery.behavior.test.tsx (1)
✓ src/shared/ui/before-after-card/BeforeAfterCard.behavior.test.tsx (6)
✓ src/shared/ui/tokens/index.test.ts (47)
✓ src/tenants/tenants.test.ts (10)
✓ src/App.test.tsx (2)

Test Files  8 passed (8)
     Tests  79 passed (79)
```

## Deviations from plan

### D1 — Per-file vitest environment + jest-dom + cleanup

The plan envisaged "tests" without specifying setup. `vite.config.ts`
is locked by plan §7 #10, and there is no `vitest.config.ts`, so the
test runner has no global jsdom or jest-dom or auto-cleanup setup.

Implementation:

* Each component test file declares `// @vitest-environment jsdom` at
  the top.
* Each component test file imports `@testing-library/jest-dom/vitest`
  for matchers.
* A new module `src/testing/cleanup.ts` calls `afterEach(cleanup)` at
  module scope; component test files import it for the side effect.
  This compensates for vitest's default `globals: false` (auto-cleanup
  in `@testing-library/react` only registers when `afterEach` is
  global).

This deviates from the plan in name only — the plan's CSS-strategy
section did not anticipate the test-runner setup gap. No
`vite.config.ts`, no `vitest.config.ts`, no `package.json`, and no new
dependency was added; the slice's test infrastructure stays inside
`src/`.

### D2 — `1px` literal in `BeforeAfterCard.module.css`

The card's border thickness uses `border-width: 1px;`. The visual
contract v1 has no thickness/line-weight token category; spending a
revision on one for a single 1-px border was rejected as governance
churn. The literal lives inside `src/shared/ui/`, where
`rules/visual-contracts.md` permits CSS files to declare values. If a
future slice introduces multiple thickness values, an additive
contract revision can promote them to a `border.width.*` (or
equivalent) token category.

### D3 — `useOptionalTenant()` introduced

The plan §3 described `useTenant()` only. `BeforeAfterGallery` needs
to support `itemsOverride` without crashing outside a provider, so a
non-throwing `useOptionalTenant()` was added next to the existing
`useTenant()`. This was driven by React's Rules of Hooks: hooks must
be called unconditionally. Both functions are exported from
`src/app/providers`. This is additive and respects the plan's intent
("`useTenant()` returns the typed `Tenant` so consumers do not import
fixtures directly"); the new helper does not weaken that contract.

### D4 — Keyboard tests use the platform-trust pattern

`@testing-library/user-event` is not installed. Plan §6 listed
Space/Enter behavior tests; `package.json` modifications are forbidden
by plan §7 #10, so user-event was not added. Instead, the contract
test asserts the toggle is a native `<button>` with `type="button"`,
which trusts the platform's built-in Space/Enter → click semantics
(documented in `docs/contracts/component-api.contract.md` v1). Real-
browser keyboard verification is left to a future end-to-end cycle
(a future-work item, not a blocker).

### D5 — CSS Modules + CSS variables (no inline `style` for tokens)

The plan committed to "CSS Modules + CSS variables on `:root`".
Implementation honors both: components apply CSS Module class names;
class definitions reference `var(--…)` CSS variables; the typed
`tokens` object exposes the same surface for tests and any future
dynamic styling. Components do not use inline `style` for token
values. The typed API is the *contract*; CSS variables are the
*delivery mechanism*. No raw px/hex/ms/s in any `.tsx` file.

## Decisions

1. **Full v1 token surface implemented (Option A).** 43 keys with
   placeholder default values. Token-existence tests cover every key
   in every category, plus exact-key-set assertions per category.
2. **No `src/domain/`.** Implementation pressure never required it.
   The Complexity Escalation Rule held.
3. **Tenant fixture reuses `src/assets/hero.png`** for before and
   after (different `alt`). Visual differentiation is out of slice
   scope; behavior tests assert toggling via `alt` text changes.
4. **`component-api.contract.md` v1 first authored** alongside the
   slice (amendment A3). Defines naming, public surface, visual
   props, interaction surface, test obligations, and backward-
   compatibility rules; pins `BeforeAfterCard` and `BeforeAfterGallery`
   public APIs as v1 surface anchors.
5. **Per-file `// @vitest-environment jsdom`** rather than a config-
   level switch (plan §7 #10 forbids modifying `vite.config.ts`).

## Remaining risks

1. **No real-browser keyboard verification.** Trusted via native
   `<button type="button">`. A future end-to-end cycle should add
   real-browser tests (Playwright/cypress) when a second slice has
   landed.
2. **Visual placeholder values.** Token defaults in `tokens.css` are
   placeholders. Lovable / designers may move them freely (no
   contract tests assert specific values).
3. **No coverage threshold yet.** Future-work item.
4. **No ESLint rule for inline visual values.** Future-work item.
5. **`useOptionalTenant()` is a small public-surface addition** to
   the provider module. If the reviewer prefers `useTenant()` only,
   the gallery would need a different override pattern; this risk is
   surfaced for the reviewer's discretion.
6. **The slice replaces the Vite starter UI** with the laboratory
   feature. The page loads and renders cards but is intentionally
   minimal/unstyled — visual polish was out of scope.

## Validation

Reviewer checklist:

- [ ] CI gate green: `tsc --noEmit`, `npm test -- --run`,
      `npm run build`. Output captured above.
- [ ] No file outside the listed change set is modified (mtime check).
- [ ] No raw hex / px / rem / em / ms / s literal in any `.tsx` file
      under `src/shared/ui/` or `src/features/` (one `1px` literal in
      `BeforeAfterCard.module.css` is documented in Deviation D2).
- [ ] No tenant fixture imported from a presentational primitive
      (`BeforeAfterCard` only takes a typed `BeforeAfterItem` prop).
- [ ] No conditional logic keyed on a literal tenant id anywhere.
- [ ] No new dependency in `package.json`.
- [ ] `src/domain/` does not exist.
- [ ] `docs/contracts/component-api.contract.md` v1 exists and
      governs the introduced public APIs.
- [ ] All five test categories present and green: contract,
      tenant-contract, token-existence, rendering (0/1/N), behavior.

## Rollback

To revert the slice in full:

1. Delete the `src/app/`, `src/features/`, `src/shared/`,
   `src/tenants/`, `src/testing/` folders.
2. Delete `docs/contracts/component-api.contract.md`.
3. Restore `src/App.tsx`, `src/main.tsx`, `src/index.css`,
   `src/App.css`, `src/App.test.tsx` to their Round 0 contents (the
   Vite/React starter).
4. Truncate this Round 3 entry from `AI_CHANGE_REPORT.md`; revert
   `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`,
   `.planning/OPEN_BLOCKERS.md` to their Round 2.1 contents.

`package.json`, `package-lock.json`, `tsconfig*.json`,
`vite.config.ts`, `eslint.config.js`, and CI were not touched, so no
revert is needed there.

## Stop conditions (currently in force)

* The AI is **stopped** after delivering the implemented, green
  slice. The next allowed action is reviewer feedback.
* Acceptance closes the cycle; rejection or follow-up requests
  trigger a new round per `workflows/feature-implementation.md`.

## Verdict

`IMPLEMENTATION_COMPLETE = YES`

## Revision-log addendum

* **Round 3 — BeforeAfterGallery slice implemented (this entry).**
  Full v1 token surface, primitive + feature + provider + tenant
  fixture + testing utilities + first-authored
  `component-api.contract.md` v1. 79 tests across 8 files, all green.
  CI gate (`tsc`, `vitest run`, `vite build`) green. No
  `src/domain/`. No new dependency. No modification to locked files.
  Five deviations documented (D1–D5), all in plan-intent compliance.
  AI stopped, awaiting reviewer feedback.
