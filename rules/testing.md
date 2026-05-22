# Testing Rules

Mandatory test posture:

**TDD-first.**

Cycle for every change that touches `domain/`, `features/`, `tenants/`, or any
contract:

1. Write a failing test.
2. Write the minimal implementation to make it pass.
3. Refactor with tests still green.
4. Record the cycle in `AI_CHANGE_REPORT.md`.

No code lands without at least one test that would fail without it.

---

## Test categories

Five categories, each with a clear purpose. A change typically touches 1–3.

### 1. Contract tests

Purpose: lock the **shape** of a contract surface so consumers do not silently
break.

Cover:

* Visual token surface (existence + category)
* Tenant content surface (required fields, types)
* Component public API (props, callback signatures)

Live under: `src/testing/contracts/` or co-located with the contract owner.

Forbidden:

* Asserting *values* of tokens (those are allowed to move).
* Asserting tenant content *copy* (that is tenant-specific data).

### 2. Component behavior tests

Purpose: lock **what the component does**, not how it does it.

Cover:

* User-visible interactions (click, input, keyboard)
* State changes that produce observable output
* Conditional rendering driven by props

Tooling: Vitest + Testing Library, query by role / label / text.

Forbidden:

* Querying by class name or `data-testid` when a role/label is available.
* Asserting on internal state via component instance refs.
* Mocking child components to make tests pass.

### 3. Rendering tests

Purpose: confirm a component renders without crashing for the documented prop
permutations.

Cover:

* Required-only props
* Required + optional props
* Edge cases declared in the component contract (empty list, long string, etc.)

Forbidden:

* Snapshot-only suites (see "Snapshots" below).

### 4. Token-existence tests

Purpose: ensure the visual token surface is complete and stable.

Cover:

* Every documented token category exists.
* Every documented token name resolves to a value.
* Removed token names produce a typecheck error.

Forbidden:

* Asserting specific token *values* (Lovable is allowed to change values).

### 5. Tenant-contract tests

Purpose: ensure every tenant fixture conforms to
`docs/contracts/tenant-content.contract.md`.

Cover:

* Required fields per tenant
* Type conformance per field
* Cardinality rules (e.g., min/max items)

Forbidden:

* Asserting tenant copy. Copy is data.

---

## Snapshots

Allowed only for:

* Stable, low-volatility primitives where the rendered tree is the contract
  (e.g. an `Icon` set).

Forbidden:

* Snapshots of feature-level components.
* Snapshots that include tenant copy.
* Snapshots used in place of behavior tests.

Snapshots must never be regenerated as a "fix" without reading the diff.

---

## Mocking

Mandatory:

* Mock at the **adapter** boundary (HTTP, storage, time), not inside
  components.
* Use real domain modules in feature tests; do not mock pure code.

Forbidden:

* Mocking React.
* Mocking child components owned by the same feature.
* Mocking `useState` / `useEffect`.

---

## Coverage

No numeric coverage threshold is enforced in Phase 0. The expectation is:

* Every public function in `domain/` has at least one test.
* Every component with logic in `features/` has at least one behavior test.
* Every contract has at least one contract test.

Coverage thresholds may be introduced in CI via a future ADR.

---

## CI expectations

CI must:

* Run `npx tsc --noEmit`.
* Run `npm test -- --run`.
* Run `npm run build`.

CI should (future):

* Run `npm run lint`.
* Enforce contract test presence for any change under `tenants/` or
  `shared/ui/tokens/`.

---

## Forbidden, period

* Approving a change without tests.
* Disabling tests to ship a feature.
* Editing existing tests to make a failing change pass without recording the
  rationale in `AI_CHANGE_REPORT.md`.
* Using `expect(true).toBe(true)` style placeholder assertions in real suites.
