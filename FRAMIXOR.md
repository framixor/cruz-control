# Cruz Control — Framixor Frontend Constitution

Purpose:

This repository is the controlled experiment for the next generation of the
Framixor frontend pipeline. The Cruz Control website is the laboratory used to
validate an AI-governed, contract-first, tenant-aware frontend workflow before
the patterns are promoted to the wider Framixor product surface.

This is NOT a marketing site project.
This IS a governance and architecture validation project.

---

## Scope

In scope:

- AI-governed frontend workflow
- Contract-first frontend (visual tokens, tenant content, component contracts)
- Tenant-driven content rendering
- Lightweight DDD boundaries
- SOLID principles where they apply pragmatically to React/TS
- TDD-first development
- CI validation
- Future Lovable integration under explicit guardrails

Out of scope (in this repository):

- Backend implementation
- Supabase integration
- Database concerns
- Auth flows
- Server-side rendering frameworks
- Heavy state management libraries
- Marketing copywriting or final brand visuals (until governance is ready)

---

## Stack

Fixed (see `docs/architecture/ADR-0001-foundation-stack.md`):

- Vite
- React
- TypeScript (strict, bundler resolution)
- Vitest + Testing Library
- ESLint
- GitHub Actions CI

Forbidden additions without ADR:

- Backend SDKs (Supabase, Firebase, etc.)
- CSS-in-JS runtime libraries
- UI kits that own the design system (MUI, Chakra, AntD, etc.)
- State libraries (Redux, Zustand, Jotai, etc.)
- Form libraries
- Routing libraries beyond a single proven choice, and only after an ADR
- Animation libraries beyond a single proven choice, and only after an ADR

---

## Engineering Principles

Mandatory:

- Contract-first architecture
- Visual token contracts before visual design
- Tenant-driven content (no hardcoded tenant copy in components)
- Lightweight DDD: isolate domain, contracts, and presentation
- SOLID applied pragmatically (see `rules/solid-guidelines.md`)
- TDD cycle for every feature
- Reversible, small changes
- AI governance: every change goes through plan -> approval -> implementation -> AI_CHANGE_REPORT
- Auditability via `AI_CHANGE_REPORT.md` and `.planning/`

Forbidden:

- Hardcoded tenant content inside generic components
- Hidden coupling between domain and presentation
- Visual values inlined in components instead of token references
- Snapshot tests as the primary test strategy
- Tests that assert implementation detail instead of behavior
- Architectural decisions made silently inside a feature PR
- Polished UI delivered before contracts and tests exist

---

## DDD posture

Lightweight DDD. Not enterprise DDD.

Boundaries to honor:

- `domain/` — business meaning, pure, no React, no HTTP
- `features/` — orchestration of domain + presentation for one user-facing capability
- `shared/` — cross-cutting primitives (utilities, primitive UI, hooks)
- `tenants/` — tenant data, tenant contracts, tenant-driven content
- `app/` — composition root, routing, providers
- `testing/` — test utilities, contract harnesses, fixtures

See `rules/ddd-boundaries.md` and `rules/frontend-architecture.md`.

---

## AI Workflow

Before generating code, AI MUST:

1. Read `FRAMIXOR.md`
2. Read `.planning/CURRENT_STATE.md`, `.planning/NEXT_TASK.md`, `.planning/OPEN_BLOCKERS.md`
3. Read applicable `rules/*`
4. Read applicable `workflows/*`
5. Summarize interpreted constraints
6. Produce implementation plan
7. Produce test plan (TDD-first)
8. Wait for approval
9. Generate failing tests
10. Generate minimal implementation
11. Refactor
12. Produce `AI_CHANGE_REPORT.md` entry

Hard rules:

- Do NOT introduce new dependencies without an ADR.
- Do NOT modify `rules/*`, `workflows/*`, or `FRAMIXOR.md` inside a feature change.
- Do NOT bypass `workflows/feature-implementation.md`.
- Do NOT skip the test step.
- Do NOT integrate Lovable changes that touch contracts or tests
  (see `rules/lovable-rules.md`).

---

## ADR scope

ADRs record decisions that are expensive to reverse. They are not a per-PR
ceremony. The full scope is defined in `docs/architecture/README.md`.

In short:

- ADR REQUIRED for foundation stack, AI workflow, Lovable integration,
  architecture boundary, tenant model, and new runtime dependency decisions.
- ADR OPTIONAL for component organization, local implementation, small UI
  decisions, and refactors that do not change a contract or a boundary.

---

## Approval Gates

No frontend change is approved without:

- Implementation plan
- Test plan
- Contract impact statement (visual tokens, tenant contracts, component contracts)
- Boundary impact statement (which DDD boundary is affected, and why it stays clean)
- AI_CHANGE_REPORT entry

No new dependency is approved without an ADR under `docs/architecture/`.

---

## Stop conditions

The AI MUST stop and ask when:

- A task requires changing a contract that has consumers
- A task requires introducing a new dependency
- A task requires changing tenant structure
- A task requires changing a DDD boundary
- A task touches files marked as approved foundation
- `OPEN_BLOCKERS.md` has an active blocker covering the task area
