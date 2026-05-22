# SOLID Guidelines (Pragmatic, React/TS)

SOLID is applied as **a checklist for cohesion**, not as a doctrine. Each
principle below is restated in terms that make sense for React + TypeScript.
When the principle does not apply, it is acceptable to skip it — but the
decision must be intentional.

---

## S — Single Responsibility

Each component, hook, or module has **one reason to change**.

Apply by asking:

* "If a designer changes the layout, does this file change? If yes, does the
  same file also change when business rules change?"
* "Does this hook do one thing, or does it do data fetching + caching +
  formatting + analytics?"

Operational rules:

* A component that fetches, transforms, renders, and dispatches analytics is
  doing four things. Split.
* A hook returning more than 5 distinct concerns is usually two hooks.
* `domain/` modules expose narrow functions, not "service" objects with many
  unrelated methods.

Forbidden:

* "Manager" / "Helper" / "Utils" components or modules with mixed
  responsibilities.

---

## O — Open / Closed

Modules are **open for extension, closed for modification** — within reason.

Apply by:

* Designing component APIs so consumers can compose, not patch.
* Using slot-style composition (`children`, render props, sub-components)
  instead of growing a prop list of booleans.
* Extending domain behavior via new pure functions, not by editing an existing
  function with another `if` branch.

Operational rules:

* When a component grows a third boolean prop (`isLoading && hasError &&
  isCompact`), reach for composition.
* Prefer "configuration via composition" over "configuration via flags".

Forbidden:

* Boolean prop explosions (>3 unrelated boolean props on one component).
* Modifying a stable domain function instead of adding a new one for a new
  rule.

---

## L — Liskov Substitution

Subtypes / variants must **behave like the parent type** from the consumer's
point of view.

In React/TS, the equivalents are:

* A polymorphic component (`as` prop) must keep its public contract regardless
  of the underlying tag.
* A specialization of a primitive (e.g., `PrimaryButton` extending `Button`)
  must accept a superset of inputs and produce the same observable behavior on
  the shared subset.
* A domain variant (e.g., `ActiveTenant` vs `Tenant`) must be substitutable
  wherever the broader type is accepted.

Operational rules:

* If a "specialized" component throws or no-ops on inputs the base accepts,
  the specialization is wrong; rename it or split it.

Forbidden:

* Components that break their parent's accessibility contract (e.g., a
  `Button` variant that drops keyboard handlers).

---

## I — Interface Segregation

Consumers should **not depend on props/types they do not use**.

Apply by:

* Splitting a component's prop type when different consumers need different
  subsets.
* Splitting a hook's return tuple/object when consumers consistently use only
  a subset.
* Designing tenant content types to expose narrow projections per feature.

Operational rules:

* A component prop type with 20 fields and an "all optional" posture is a
  smell. The component is probably two components.
* When a feature only reads `tenant.brand.name`, do not pass the whole
  `Tenant` object through five components — pass the slice.

Forbidden:

* God-prop types that every component in the tree drills down.
* "Just put it in context" as a reflexive answer to prop drilling without
  considering whether the type itself is too wide.

---

## D — Dependency Inversion

High-level modules (features, app) should **depend on abstractions**, not on
concrete adapters.

In this repo this means:

* `domain/` defines the shape of what it needs (e.g., a `Clock` type).
* `shared/adapters/` and `app/` provide concrete implementations.
* Features receive the abstraction via context or hook, not by importing the
  adapter directly.

Operational rules:

* If a feature imports `fetch` directly, it is depending on a concrete
  adapter. Move the call behind a typed hook in `shared/adapters/` or the
  feature's `infra/` folder.
* `domain/` never imports `shared/adapters/`. The abstraction lives in
  `domain/` (as a type) and the implementation lives outside it.

Forbidden:

* `domain/` modules importing fetch / storage / DOM / React.
* Features importing concrete network clients directly.

---

## When SOLID does NOT apply

* Tiny presentational primitives (`<Box>`, `<Stack>`) do not need DIP. They
  consume tokens and render. That is the whole job.
* One-off utilities used in exactly one place do not need OCP. Inline them
  until duplication makes the abstraction obvious.
* Test code does not need ISP. Tests can be verbose and explicit.

The principle to remember:

**Cohesion first, abstraction only when the cost of cohesion exceeds the cost
of the abstraction.**

---

## Forbidden, period

* "SOLID violation" used as a vague reason to refactor without a concrete
  problem.
* Pre-emptive abstractions added for hypothetical future variants ("we might
  need it later"). YAGNI applies.
* Wrapping every external call in a custom abstraction "just in case".
