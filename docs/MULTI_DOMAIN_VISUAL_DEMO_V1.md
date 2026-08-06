# DETERMA Multi-Domain Visual Demo v1

**Status:** PROVISIONAL · SYNTHETIC · LOCAL DEMO ONLY  
**Production claim:** None  
**External mutation:** None

This visual demonstration adds two bounded domain packs over one deterministic Authority Core:

1. `SOFTWARE_DELIVERY`
2. `CRM_OPERATIONS`

The domain packs supply vocabulary, fixtures, comparison dimensions and bounded domain rules. They do not grant authority and cannot override universal `DENY` or `NEEDS_REVIEW` semantics.

## Run locally

```bash
cd web
npm ci
npm run typecheck
npm run test
npm run build
npm run dev
```

## Truth boundary

The interface uses synthetic fixtures only. `Enforced Simulation` creates an in-memory, single-use simulated release and a synthetic post-state verification. It does not connect to GitHub, CRM, customer systems, production services or external APIs.

`ALLOW` is a decision, not proof that a real mutation happened. The UI separately reports decision, release status, operational effect and post-state verification.
