# Open Blockers

Last updated:
2026-05-21 (Round 1)

---

## Foundation blockers

NONE.

The Vite + React + TS + Vitest stack is in place, CI is green, and
ADR-0001 records the stack as fixed.

---

## Governance blockers

NONE.

The governance bootstrap was approved with adjustments on 2026-05-21. The
adjustments are reflected in:

* `docs/architecture/README.md` (ADR scope formalized).
* `FRAMIXOR.md` (ADR-scope pointer added).
* `rules/visual-contracts.md` (ADR coupling softened to recorded contract
  revision; ADR escalated only for tenant-model / boundary changes).
* `.planning/CURRENT_STATE.md` (approval recorded).
* `.planning/NEXT_TASK.md` (BeforeAfterGallery scope written).

---

## Contract blockers

NONE for the BeforeAfterGallery slice.

* `docs/contracts/tenant-content.contract.md` v1 — defines `BeforeAfterItem`
  with `title`, `description`, `category`, `beforeImage`, `afterImage`.
* `docs/contracts/visual-tokens.contract.md` v1 — defines `spacing.*`,
  `radius.*`, `typography.*`, `surface.*`.

The slice plan must consume these contracts as-is. Any change to either
contract is a separate, governed cycle (revision + migration; ADR if it
crosses the tenant-model or boundary scope).

---

## Architecture blockers

NONE.

* DDD layers under `src/` do not exist yet, by design. The slice creates
  only the folders it needs.
* No layer is missing on the critical path for the slice plan.

---

## Tooling blockers

Backlog (not blocking):

* `npm run lint` is not yet a CI step.
* No coverage threshold.
* No ESLint rule enforcing "no inline visual values" — the rule lives in
  `rules/visual-contracts.md` and is enforced by review.
* No path alias (`@/`) configured. If the slice plan wants one, it must
  propose it as part of the plan; it is a small implementation detail and
  does not require an ADR.

These items remain open and may be addressed after the first slice lands.

---

## Lovable blockers

* Lovable is **not** integrated. Integration mode is undecided.
* `rules/lovable-rules.md` describes preventive guardrails only.
* An ADR is required before Lovable is wired in
  (`docs/architecture/README.md` ADR scope: "Lovable integration changes").

This is **not** a blocker for the BeforeAfterGallery slice. The slice does
not depend on Lovable.

---

## Process blockers

* The AI is **stopped, awaiting reviewer authorization** to begin slice
  planning. See `.planning/NEXT_TASK.md`.
* No work proceeds without that authorization.

---

## Blocked initiatives

* Implementing BeforeAfterGallery (planning must come first, and planning
  itself is gated on authorization).
* Building any other UI section.
* Replacing the Vite/React starter visuals.
* Adding new runtime dependencies.
* Supabase / backend integration.
* Lovable wiring.

Reason:

Awaiting reviewer authorization to begin slice planning. Once the plan is
authored and reviewed, a separate authorization is required to begin
implementation.

---

## Current status

* Foundation tooling: **GREEN**
* Governance text: **APPROVED WITH ADJUSTMENTS**
* ADR-0001: **ACCEPTED**
* Contracts (v1): **ACCEPTED** (tenant-content, visual-tokens)
* Ready for slice planning: **YES, awaiting explicit authorization**
* Ready for implementation: **NO**


---

## Future work (NOT blocking)

Recorded only. No implementation in this round. No new workflows.

These items are tracked here for continuity. They do not block the
BeforeAfterGallery slice and they do not block any current cycle. Each will
be picked up via its own change cycle when authorized.

* **CI enforcement for inline visual values.** Today, the rule that forbids
  hex / px / rem / em / ms / s literals in components under `shared/ui/` and
  `features/` (per `rules/visual-contracts.md`) is enforced by review only.
  A future cycle may add an ESLint rule (or equivalent) and wire it into
  `.github/workflows/ci.yml`. Out of scope until then.
* **Lovable integration ADR.** Authorization, integration mode (PR-based,
  branch-based, sandbox), scope, and review obligations for Lovable-authored
  changes need a recorded decision. The ADR is required before Lovable is
  wired in. `rules/lovable-rules.md` already lists the allow/deny surface;
  the ADR will pin *how* Lovable is delivered and *who* approves it. Out of
  scope until Lovable wiring is requested.
* **PR checklist for `.planning/` artifacts.** A short, repeatable checklist
  to verify that any change which closes a cycle also updates
  `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`, and
  `.planning/OPEN_BLOCKERS.md` consistently and appends an
  `AI_CHANGE_REPORT.md` revision. The checklist itself is not a new
  workflow — it is a single page intended to live alongside existing
  workflows. Out of scope until authorized.
