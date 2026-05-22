# docs/contracts

Purpose:

Contract definitions for Cruz Control. A **contract** is a stable surface that
multiple consumers depend on. Changing a contract is a deliberate, auditable
event.

---

## What lives here

* **visual-tokens.contract.md** — token categories, naming convention, what is
  stable vs. what is movable. (Not yet authored.)
* **tenant-content.contract.md** — shape of tenant-driven content, required
  fields, type rules, cardinality rules. (Not yet authored.)
* **component-api.contract.md** — conventions for `shared/ui` and `features/`
  public component APIs. (Authored when the first primitive lands.)

Each contract document declares:

1. **Surface** — exactly what is part of the contract.
2. **Stability** — which parts are stable (changing them is a contract
   change), which parts are movable (Lovable / designers may change values).
3. **Versioning rules** — how additive changes vs. breaking changes are
   handled.
4. **Test obligations** — which tests under `src/testing/contracts/` lock the
   surface.
5. **Consumer expectations** — what consumers may and may not assume.

---

## What does NOT live here

* Code that *implements* a contract — that lives under `src/`.
* Tests that *enforce* a contract — those live under `src/testing/contracts/`
  or co-located with the contract owner.
* Architectural decisions — those live under `docs/architecture/` (ADRs).

---

## Contract change protocol

A contract change requires:

1. An ADR under `docs/architecture/` describing the change.
2. A migration plan for affected consumers.
3. An update to the corresponding contract document.
4. Updates to contract tests.
5. An entry in `AI_CHANGE_REPORT.md` flagging the breaking change explicitly.

A contract change is **never** introduced inside a feature PR. It is its own
change set.

---

## Backlog (not yet authored)

* `visual-tokens.contract.md`
* `tenant-content.contract.md`
* `component-api.contract.md` (after the first `shared/ui` primitive lands)
