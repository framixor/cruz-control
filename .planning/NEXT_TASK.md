# Next Task

Last updated:
2026-05-21 (Round 3 — BeforeAfterGallery implemented, green)

Current phase:

Phase 1 — First slice (DONE)

---

## Status

Round 3 — **BeforeAfterGallery slice implemented and green.**

* `tsc --noEmit` — green
* `vitest run` — 8 files / 79 tests, all passed
* `vite build` — green
* `IMPLEMENTATION_COMPLETE = YES`

The AI is **stopped**.

---

## Allowed immediate next action

**Reviewer feedback on the implemented slice.**

Reviewer reads:

* `docs/architecture/FIRST_SLICE_BEFORE_AFTER_GALLERY_PLAN.md`
  (plan + Amendments 2.1)
* `docs/contracts/component-api.contract.md` v1 (first authoring)
* The `AI_CHANGE_REPORT.md` Round 3 entry
* The diff under `src/`, plus `docs/contracts/component-api.contract.md`

Reviewer returns one of:

1. **Accept.** Slice is done; cycle closes.
2. **Accept with follow-ups.** Reviewer states the follow-ups; each is
   captured as its own future cycle (separate authorization).
3. **Reject.** Reviewer states the reason; the AI returns to plan / fix
   per `workflows/feature-implementation.md`.

---

## Hard prohibitions until next authorization

* No further `src/` change, no new test, no contract revision, no rule /
  workflow / `FRAMIXOR.md` change, no `package.json` change, no CI
  change without explicit authorization.
* Do not start a second slice. Do not generalize patterns from this
  slice into new abstractions absent the Complexity Escalation Rule's
  thresholds.

---

## Done when

This task is "done" when the reviewer accepts the implemented slice
(with or without follow-ups) and `.planning/CURRENT_STATE.md`,
`.planning/NEXT_TASK.md`, `.planning/OPEN_BLOCKERS.md` are updated to
reflect the next phase.
