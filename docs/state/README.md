# docs/state

Purpose:

Historical snapshots of operational state. Read-only archive.

---

## Relationship to `.planning/`

* `.planning/CURRENT_STATE.md` — the **current** operational truth.
* `.planning/NEXT_TASK.md` — the **current** allowed action.
* `.planning/OPEN_BLOCKERS.md` — the **current** blockers.

* `docs/state/STATE_YYYY-MM-DD.md` — a **historical snapshot** of the operational
  truth at a specific date. Read-only after creation.
* `docs/state/MILESTONE_*.md` — snapshots tied to a milestone (e.g., governance
  approval, first slice merged, first Lovable cycle).

When `.planning/*` and `docs/state/*` disagree, `.planning/*` wins. Snapshots
do not override current state. See `workflows/ai-handoff.md`.

---

## When to write a snapshot

Write a snapshot to `docs/state/` when:

* A governance milestone is reached (e.g., "governance bootstrap approved").
* A foundation is validated (e.g., "first slice merged and CI green").
* A risk profile materially changes (e.g., "Lovable integration authorized").
* The reviewer requests a snapshot for audit purposes.

Snapshots are append-only. They are never edited after creation.

---

## File naming

* `STATE_YYYY-MM-DD.md` — generic snapshot.
* `MILESTONE_<short-name>_YYYY-MM-DD.md` — milestone snapshot.

Each snapshot includes:

* Date.
* Phase.
* Summary of completed cycles.
* Open blockers at the time.
* Next allowed action at the time.
* What was explicitly NOT in scope.

---

## Backlog

No snapshots exist yet. The first snapshot will be written when the governance
bootstrap is approved.
