# docs/architecture

Purpose:

Architecture Decision Records (ADRs) and architectural notes for Cruz Control.

---

## ADR scope (approved 2026-05-21)

ADRs exist to record decisions that are **expensive to reverse**. They are
not a per-PR ceremony.

ADR REQUIRED for:

* Foundation stack decisions (e.g., framework, build tool, type system,
  test runner)
* AI workflow changes (anything that touches `workflows/*` or `FRAMIXOR.md`'s
  AI Workflow / Approval Gates / Stop Conditions sections)
* Lovable integration changes (authorization, integration mode, scope changes)
* Architecture boundary changes (top-level `src/*` layers, allowed import
  edges, what counts as `domain` / `tenants` / `features` / `shared` /
  `app` / `testing`)
* Tenant model changes (the shape of tenant content, the addition of a new
  tenant content surface, changes to the tenant identity model)
* Adding a new runtime dependency

ADR OPTIONAL for:

* Component organization within a feature
* Local implementation details
* Small UI decisions
* Refactors that do not change a contract or a boundary
* Naming inside a single module

The principle:

**ADR for things that bind the future. No ADR for things that bind only
today's file.**

When in doubt, prefer a concise ADR over a long PR description. ADRs are short
(half a page is fine).

---

## What lives here

* **ADR-XXXX-*.md** — one ADR per decision, sequentially numbered.
* **Architecture notes** — short documents that describe a single
  architectural concern in depth (e.g., a slice plan).

---

## What does NOT live here

* Contract definitions — those live under `docs/contracts/`.
* Operational state — that lives under `.planning/`.
* Historical snapshots — those live under `docs/state/`.
* Implementation code — that lives under `src/`.

---

## ADR template (informal)

Each ADR contains:

1. **Context** — what problem, what constraints.
2. **Decision** — what we are going to do.
3. **Alternatives considered** — what we are NOT doing, and why.
4. **Consequences** — what this decision enables, what it forecloses.
5. **Status** — proposed / accepted / superseded by ADR-YYYY.
6. **Date.**

ADRs are append-only. If a decision is reversed, a new ADR supersedes the old
one; the old one is not edited (only its `Status` is updated to point to the
superseding ADR).

---

## Authored

* `ADR-0001-foundation-stack.md` — accepted 2026-05-21.

## Backlog (authored when the corresponding decision becomes due)

* ADR for Lovable integration mode (when authorization is requested).
* ADR for routing choice (when routing becomes necessary).
* ADR for any new runtime dependency at the moment it is proposed.
