# Feature Implementation Workflow

Mandatory for any change touching `src/` beyond trivial fixes.

This workflow enforces the Cruz Control AI-governed cycle:

**plan -> tests -> approval -> code -> report.**

No step is optional. No step is skipped because "it's small".

---

## Step 0 — Read first

Before writing or proposing anything, read in this order:

```
FRAMIXOR.md
.planning/CURRENT_STATE.md
.planning/NEXT_TASK.md
.planning/OPEN_BLOCKERS.md
rules/frontend-architecture.md
rules/ddd-boundaries.md
rules/solid-guidelines.md
rules/visual-contracts.md
rules/testing.md
rules/lovable-rules.md       # if the feature touches the visual surface
docs/contracts/*.md          # any contract relevant to the feature
docs/architecture/ADR-*.md   # any ADR relevant to the feature
```

If `OPEN_BLOCKERS.md` lists a blocker covering the requested feature area, STOP
and surface the blocker. Do not propose work around it without an explicit
override from the reviewer.

---

## Step 1 — Plan (return BEFORE writing code)

Return, in writing, a plan that contains:

1. **Goal** — one sentence.
2. **Files read** — the actual list (from Step 0 + any code files inspected).
3. **Interpreted constraints** — bullet list of constraints that apply.
4. **Affected layers** — `domain` / `tenants` / `shared` / `features` /
   `app` / `testing`.
5. **Contract impact** — visual tokens, tenant content, component APIs:
   * adds (new contract surface)
   * changes (breaking vs non-breaking)
   * none
6. **Boundary impact** — which DDD edges are crossed, why each crossing is
   allowed.
7. **SOLID notes** — any non-obvious application or intentional skip.
8. **Test plan** — categories that will be added (contract / behavior /
   rendering / token-existence / tenant-contract) and the failing-test list.
9. **Files to be created.**
10. **Files to be modified.**
11. **Files that will explicitly NOT change.**
12. **Risks.**
13. **Rollback notes.**
14. **Stop conditions** that would force the AI to pause.

Wait for approval. Do not write code in this step.

---

## Step 2 — Failing tests first

After approval:

* Write the failing tests listed in the test plan, in the categories declared.
* Run `npm test -- --run`. They MUST fail for the right reason. A test that
  fails because of a typo or missing import is not a real failing test.
* Commit (or stage, if commits are out of scope) the failing tests as a
  distinct change so the reviewer can see them red first.

Forbidden in this step:

* Writing implementation code.
* Editing existing tests to "make room" for the new ones unless the plan
  authorized it.

---

## Step 3 — Minimal implementation

Write the smallest code that turns the failing tests green.

Rules:

* No code outside the file list approved in the plan.
* No new dependency.
* No drive-by refactors.
* No new exports beyond what the test plan requires.
* `domain/` modules stay pure.
* No raw visual values; consume tokens via `shared/ui/tokens/`.
* No tenant content hardcoded outside `tenants/`.

Run, in order:

1. `npx tsc --noEmit`
2. `npm test -- --run`
3. `npm run build`

All three must be green. If any fails, fix and re-run once. If still failing,
stop and report.

---

## Step 4 — Refactor

With tests green:

* Improve names, structure, cohesion.
* Apply SOLID per `rules/solid-guidelines.md` only where there is a concrete
  problem.
* Re-run typecheck + tests + build after each non-trivial refactor pass.

Forbidden:

* Refactors that change the public surface beyond the approved plan.
* Refactors driven by personal taste without a stated cohesion reason.

---

## Step 5 — AI_CHANGE_REPORT

Append a new revision to `AI_CHANGE_REPORT.md`. Include:

* **Objective** — one paragraph.
* **Files changed** — table with status (new / modified) and purpose.
* **Decisions** — numbered, terse.
* **Deviations** — anything that differs from the approved plan and why.
* **Risks** — concrete, not generic.
* **Validation steps** — exact commands run, exact outputs (or "green").
* **Rollback notes** — how to undo this change.
* **Remaining concerns** — what is still open.
* **Stop conditions still in force.**
* **Revision log** — append a new entry to the log.

Forbidden:

* Reporting completion without running tests.
* Reporting completion while OPEN_BLOCKERS.md still blocks the change.
* Editing past revision-log entries (append-only).

---

## Step 6 — Update operational truth

Update:

* `.planning/CURRENT_STATE.md` — reflect the new completed cycle and any
  newly created folders/contracts/ADRs.
* `.planning/NEXT_TASK.md` — replace with the next allowed action.
* `.planning/OPEN_BLOCKERS.md` — clear or expand blockers.

These updates are part of the same change set, not a follow-up.

---

## Stop conditions (any one halts the workflow)

* The plan was not approved.
* A new dependency is needed but no ADR exists for it.
* The feature requires a contract change but no contract draft exists.
* `OPEN_BLOCKERS.md` blocks the feature area.
* Tests do not fail in Step 2 for the right reason.
* `tsc`, `vitest`, or `build` are red after one fix attempt.
* The change starts touching files outside the approved list.

When stopped: write the reason in the plan thread, do not commit further.
