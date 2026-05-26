# DETERMA Governed Execution Demo

This repository is a small public proof of governed execution.

The key timing problem:

1. Approval happened earlier.
2. Execution happens now.
3. Reality may have changed.
4. DETERMA recomputes legitimacy immediately before mutation.

## What This Demo Proves

- Prior approval is not enough by itself.
- Execution must be re-validated at execution time.
- Mutations are allowed only when legitimacy still holds now.
- Every attempt gets a receipt, including denials.

## Why Approval Alone Is Not Enough

Approval and execution are separated by time.
Between those times, state can change:

- repository content can drift
- an old approval can be replayed
- scope can be changed
- the same release can be sent twice

If you execute from approval alone, you can mutate the wrong state.

## Governed Execution Flow

```text
proposal
  -> release
  -> legitimacy recomputation at execution time
  -> ALLOW or DENY
  -> mutation executed or blocked
  -> receipt appended
```

## Without DETERMA vs With DETERMA

Without DETERMA:

```text
old approval exists
  -> execute directly
  -> mutation happens even if reality changed
```

With DETERMA:

```text
old approval exists
  -> recompute legitimacy now
  -> only mutate if still valid
```

## Exact Demo Commands

```bash
git clone https://github.com/DETERMAai/determa-governed-execution-demo.git
cd determa-governed-execution-demo
./scripts/run_demo.sh
```

Expected result:

- `valid` => `ALLOW`
- `drift` => `DENY (repository_drift)` and mutation blocked
- `replay` => first `ALLOW`, second `DENY (replay)` and mutation blocked
- receipts appended in `runtime/state/receipts.jsonl`

## Out Of Scope (Intentional)

- cloud deployment
- SaaS product scope
- Kubernetes or orchestration layers
- private/internal architecture and protocols
- policy authoring UX and integrations

See [docs/EXECUTION_GAP.md](docs/EXECUTION_GAP.md), [docs/THREAT_MODEL.md](docs/THREAT_MODEL.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), and [docs/DEMO_OUTPUT.md](docs/DEMO_OUTPUT.md).
