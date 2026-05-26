# DETERMA Governed Execution Demo

![Scope](https://img.shields.io/badge/scope-governed_execution_only-blue)
![Runtime](https://img.shields.io/badge/runtime-minimal-success)
![Model](https://img.shields.io/badge/model-deny_before_mutation-critical)
![Proof](https://img.shields.io/badge/proof-execution_time_legitimacy-informational)

Small public proof of governed execution legitimacy.

## Why This Matters Now

AI-generated changes are moving from suggestion to mutation.
The risk is not only bad intent generation.
The risk is stale execution authority:

```text
approval happened earlier
execution happens now
state changed in between
```

If legitimacy is not recomputed at mutation time, stale approvals can still mutate real state.

## Core Claim

DETERMA does one thing in this demo:

```text
recompute legitimacy immediately before mutation
then ALLOW or DENY
```

## Governed Execution Flow

```text
proposal
  -> release
  -> legitimacy recomputation (now)
  -> ALLOW / DENY
  -> mutation executed or blocked
  -> append-only receipt
```

## ALLOW vs DENY (Terminal)

Run:

```bash
./scripts/run_demo.sh
```

ALLOW example:

```text
scenario=valid
decision=ALLOW
reason=witness_match
mutation_executed=yes
```

DENY example (drift):

```text
scenario=drift
decision=DENY
reason=repository_drift
mutation_blocked=yes
```

DENY example (replay):

```text
scenario=replay-second
decision=DENY
reason=replay
mutation_blocked=yes
```

Receipt append visibility:

```text
receipts_total=1
receipts_total=2
receipts_total=3
receipts_total=4
```

## Why Existing Approaches Are Insufficient

These controls are useful, but they do not settle execution-time legitimacy by themselves.

| Approach | What it helps with | What it misses at mutation time |
|---|---|---|
| Approval systems | Human sign-off and policy intent | Approval can become stale before execution |
| Audit logging | Historical trace after actions | Logging does not prevent stale execution before write |
| Observability | Metrics, traces, and alerts | Detection is often after mutation, not a pre-write legitimacy gate |
| CI/CD gates | Build/test checks before merge/deploy | Gate pass can be true earlier and false at execution time |

## Threat Demonstration Table

| Threat | What goes wrong traditionally | What DETERMA does |
|---|---|---|
| Replay | Reuse approved release to mutate again | Single-use `release_id` check returns `DENY (replay)` |
| Repository drift | Approved state no longer matches current state | Witness hash recomputation returns `DENY (repository_drift)` |
| Dirty workspace | Local uncommitted change invalidates approved basis | Current witness differs from approved witness, mutation blocked |
| Scope escalation | Execution attempts out-of-scope path/action | Scope check denies before write |
| Path traversal | Path tricks escape intended target | Normalized path must match approved target or DENY |
| Receipt tampering | History rewritten to hide denials | Append-only receipt chain exposes continuity breaks |
| Duplicate execution | Retry/race executes same mutation twice | Replay/identity checks deny second execution |

## Comparison: Without vs With DETERMA

Without DETERMA:

```text
approval exists
  -> execute directly
  -> mutation can happen under stale reality
```

With DETERMA:

```text
approval exists
  -> recompute legitimacy now
  -> mutate only if still legitimate now
```

## Exact Demo Commands

```bash
git clone https://github.com/DETERMAai/determa-governed-execution-demo.git
cd determa-governed-execution-demo
./scripts/run_demo.sh
```

What to look for:

- one `ALLOW` valid execution
- one `DENY (repository_drift)` with blocked mutation
- one `DENY (replay)` with blocked duplicate mutation
- append-only receipt growth in `runtime/state/receipts.jsonl`

## Out Of Scope

- cloud deployment
- SaaS scope
- networking services
- orchestration systems
- databases
- agent frameworks
- private/internal architecture

## Minimal Scope Reminder

This repository is intentionally small.
It demonstrates execution-time legitimacy checks only.

See [docs/EXECUTION_GAP.md](docs/EXECUTION_GAP.md), [docs/THREAT_MODEL.md](docs/THREAT_MODEL.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), and [docs/DEMO_OUTPUT.md](docs/DEMO_OUTPUT.md).
