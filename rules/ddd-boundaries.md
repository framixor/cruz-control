# DDD Boundaries (Lightweight)

This is **not** enterprise DDD. We do not use aggregates, repositories,
factories, application services, or bounded-context maps as ceremony.

We use DDD only for what it is best at:

* **Isolating business meaning** from delivery concerns.
* **Isolating contracts** from implementations.
* **Isolating presentation** from domain.

That is the whole posture. Everything below is the operational consequence.

---

## Layers

```
src/
  app/        # composition root, providers, routing, top-level layout
  features/   # one folder per user-facing capability
  shared/     # cross-cutting primitives (ui, hooks, utils, adapters)
  tenants/    # tenant data, tenant content fixtures, tenant types
  domain/     # pure business meaning, no React, no HTTP, no DOM
  testing/    # test utilities, contract harnesses, fixtures
```

A layer is a **set of folders sharing the same import constraints**, not a
Java-style architectural cathedral.

---

## Layer responsibilities

### `domain/`

Owns:

* Business types and invariants
* Pure functions that encode business rules
* Errors that represent business outcomes

Forbids:

* React, JSX, hooks
* Browser APIs (`window`, `document`, `fetch`, `localStorage`, timers)
* I/O of any kind
* Imports from `tenants/`, `shared/`, `features/`, `app/`
* Network or storage adapters

Test posture:

* Pure unit tests, fast, deterministic.

### `tenants/`

Owns:

* Tenant content fixtures (data, not code)
* Tenant type declarations conforming to
  `docs/contracts/tenant-content.contract.md`
* Tenant theme assignments (when themes exist)

Forbids:

* Logic
* React components
* Side effects
* Importing from `features/`, `shared/`, `app/`

Test posture:

* Tenant-contract tests verify shape conformance.

### `shared/`

Owns:

* Presentation primitives (`shared/ui/*`)
* Token API (`shared/ui/tokens/*`)
* Reusable hooks (`shared/hooks/*`)
* Pure utilities (`shared/utils/*`)
* Adapters for I/O (`shared/adapters/*`) when needed

Forbids:

* Tenant-specific copy or assets
* Business logic that belongs in `domain/`
* Importing from `features/` or `app/`

Test posture:

* Rendering tests for primitives.
* Token-existence tests for the token API.
* Behavior tests for hooks with non-trivial logic.

### `features/`

Owns:

* Composition of `domain` + `tenants` + `shared/ui` for one user-facing
  capability.
* Feature-local hooks, sub-components, and view models.

Forbids:

* Importing from `app/`
* Importing from another feature directly (cross-feature integration goes
  through `app/` or a shared abstraction)
* Reaching into another feature's internal files

Test posture:

* Behavior tests on the feature's public composition.
* Contract tests on any contract the feature exposes.

### `app/`

Owns:

* The composition root (`main.tsx`, top-level `App.tsx`)
* Providers (theme provider, tenant provider, etc.)
* Routing
* Top-level layout

Forbids:

* Business logic
* Component-level styling decisions

Test posture:

* Smoke render of the app shell.
* Routing tests when routing exists.

### `testing/`

Owns:

* Test utilities (custom render, providers wrapper)
* Contract harnesses (token contract harness, tenant contract harness)
* Fixtures shared across multiple test files

Forbids:

* Being imported by production code (any file outside `*.test.*`).

---

## Import direction

Allowed (left may import right):

* `app/` -> `features/`, `shared/`, `tenants/`, `domain/`
* `features/` -> `shared/`, `tenants/`, `domain/`
* `shared/` -> `domain/` (narrow exception — see "Shared -> domain exception" below)
* `tenants/` -> `domain/` (types only)
* `domain/` -> nothing inside this repo
* `testing/` -> any layer

Forbidden:

* `features/` -> `app/`
* `shared/` -> `features/`
* `domain/` -> anything except its own modules
* Any production code -> `testing/`
* Any cycle, ever

When a tempting cycle appears, the answer is almost always:

* Move the shared concept down a layer (often into `domain/`), OR
* Pass the dependency in from `app/`, OR
* Split the feature into smaller features.

---

## Shared -> domain exception

The `shared/` -> `domain/` import edge exists, but it is **narrow**.

Allowed only for:

* shared types
* validation helpers
* constants without business meaning

Forbidden:

* business rules
* invariants
* domain orchestration

Rationale:

* `shared/` is a presentation/utility layer. It must not become a back
  door for business behavior.
* If a feature needs business behavior from `domain/`, the feature imports
  it directly. `shared/` does not act as a re-exporter or wrapper for
  domain rules.
* If a `shared/` primitive grows logic that smells like a business rule
  or invariant, that logic belongs in `domain/` and the primitive must
  receive its result via props or an adapter — not by reaching into
  `domain/` itself to evaluate it.

Test posture for this edge:

* Items legitimately imported from `domain/` into `shared/` (types,
  validation helpers, neutral constants) are covered by their own
  `domain/` unit tests.
* Behavior tests on `shared/` primitives never assert business outcomes.
  Business outcomes belong to feature behavior tests.

When in doubt, do not add this edge. Prefer:

* a typed prop on the primitive,
* a small adapter passed in from `features/` or `app/`,
* or moving the helper into `shared/utils/` if it has no domain meaning.

---

## Cross-feature integration

* Features do not import from each other.
* If two features need to share something, that something is extracted to
  `shared/` (if presentation/utility) or `domain/` (if business meaning).
* If two features need to coordinate, the coordination happens in `app/`.

---

## Complexity escalation rule

Prefer:

* plain functions
* typed contracts
* composition
* props
* simple adapters

before introducing new abstractions.

A new abstraction (service, manager, provider, adapter, helper layer) should
appear only when:

1. behavior repeats in at least 2 distinct features, OR
2. a boundary cannot be tested cleanly without extraction, OR
3. coupling measurably increases.

Frontend complexity must be earned.

Default answer:

simpler > clever

---

## What we are not doing

* No aggregate roots.
* No repositories abstracted across layers for the sake of it.
* No CQRS.
* No event-sourcing.
* No DI container.
* No bounded-context registry.

These are not banned forever. They are banned in the laboratory phase. Any
introduction requires an ADR demonstrating the concrete problem being solved.
