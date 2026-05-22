# AI Handoff — Cruz Control

Purpose:

Give any AI assistant joining the Cruz Control repository enough context to
understand the project's governance, current operational state, and allowed
next actions before producing any output.

Important:

Current operational context has precedence over historical snapshots.

When files conflict:

1. `.planning/NEXT_TASK.md` wins (immediate allowed action).
2. `.planning/OPEN_BLOCKERS.md` wins (active blockers only).
3. `.planning/CURRENT_STATE.md` provides narrative operational context.
4. `docs/state/*` are historical snapshots only.

Historical files MUST NOT override current operational state.

Read in this order.

---

## 0. Current operational truth (READ FIRST)

```
.planning/NEXT_TASK.md
.planning/OPEN_BLOCKERS.md
.planning/CURRENT_STATE.md
```

Purpose:

Understand where the project is NOW before reading anything else.

---

## 1. Project constitution

```
FRAMIXOR.md
README.md
```

Purpose:

Understand scope, stack, principles, AI workflow, approval gates, and stop
conditions.

---

## 2. Architectural rules

Read all of:

```
rules/frontend-architecture.md
rules/ddd-boundaries.md
rules/solid-guidelines.md
```

Purpose:

Understand the layer model, allowed import edges, and the pragmatic SOLID
posture for React/TS.

---

## 3. Visual and tenant rules

```
rules/visual-contracts.md
rules/testing.md
rules/lovable-rules.md
```

Purpose:

Understand what is a *contract* (stable, hard to change) vs. what is a *value*
(movable). Understand how tests are categorized. Understand what Lovable may
and may not touch.

---

## 4. Workflows

```
workflows/feature-implementation.md
workflows/review-ui.md
workflows/ai-handoff.md   # this file
```

Purpose:

Understand the required execution and review procedures.

---

## 5. Architecture decisions and contracts

```
docs/architecture/*
docs/contracts/*
```

Purpose:

Understand decisions and contract surfaces that should not be reinvented.

When a referenced ADR or contract does not exist yet, treat the corresponding
area as **blocked** until the missing artifact is authored.

---

## 6. Historical snapshots (READ AS HISTORY ONLY)

```
docs/state/*
AI_CHANGE_REPORT.md (revision log section)
```

Purpose:

Understand project evolution. Do NOT treat these as current truth if they
conflict with `.planning/`.

---

## Hard rules for AI assistants

* Do not write code without an approved plan
  (`workflows/feature-implementation.md` Step 1).
* Do not skip the failing-test step.
* Do not introduce a new dependency without an ADR.
* Do not modify `rules/`, `workflows/`, `FRAMIXOR.md`, or `.planning/` inside a
  feature change.
* Do not modify a contract under `docs/contracts/` inside a feature change.
* Do not import from `src/testing/` in production code.
* Do not bypass `rules/visual-contracts.md` by inlining hex / px / ms / s
  values in components.
* Do not hardcode tenant content outside `src/tenants/`.
* Do not assume a tenant id literal in component logic.
* Do not treat historical snapshots as operational truth.
* Do not "approve to unblock". If something is blocked, fix the block or stop.

---

## When proposing a change, ALWAYS return

```
1. Files read
2. Current interpreted status
3. Proposed change
4. Affected layers
5. Contract impact
6. Test plan
7. Files to create / modify
8. Files that will explicitly NOT change
9. Risks
10. Rollback notes
11. Stop conditions that would force pausing
```

(This mirrors `workflows/feature-implementation.md` Step 1 and is reproduced
here so a fresh AI agent can comply without already having read the workflow
in full.)

---

## Current immediate next action

Single source of truth:

```
.planning/NEXT_TASK.md
```

This file does not restate the next action. Read NEXT_TASK.md.
