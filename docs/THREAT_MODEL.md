# Threat Model (Operational Demo View)

This demo is execution-focused.
Each threat is evaluated at mutation time, not only at approval time.

## Runtime Checks In Scope

```text
1) replay check
2) repository witness check
3) scope/path check
4) deny-before-mutation
5) append-only receipt
```

## Operational Threat Table

| Threat | What can go wrong at execution time | Runtime check | Observable demo signal |
|---|---|---|---|
| Replay attack | Same approved release is executed again | `release_id` single-use check | `decision=DENY` and `reason=replay` |
| Repository drift | State changed after approval | Approved witness hash vs current hash | `reason=repository_drift` and `mutation_blocked=yes` |
| Dirty workspace | Uncommitted/local change invalidates approved basis | Current witness differs from approved witness | Same deny path as drift |
| Scope escalation | Requested mutation extends beyond approved target | Scope match check before write | `decision=DENY` before mutation |
| Path traversal | Escaped path writes outside target boundary | Path normalization and strict target match | `decision=DENY` before mutation |
| Receipt tampering | Denials or outcomes are hidden/rewritten | Append-only receipt logging | Receipt continuity mismatch is detectable |
| Duplicate execution | Same mutation runs twice (retry/race) | Replay/identity check on second attempt | First ALLOW, second DENY |

## Concrete Execution Outcomes

### Valid execution

```text
decision=ALLOW
reason=witness_match
mutation_executed=yes
```

### Drift denial

```text
decision=DENY
reason=repository_drift
mutation_blocked=yes
```

### Replay denial

```text
decision=DENY
reason=replay
mutation_blocked=yes
```

## Why This Is Execution-Centric

Traditional controls can approve or observe.
This runtime also decides legitimacy immediately before write.
If legitimacy fails now, mutation does not happen.

## How To Reproduce

```bash
./scripts/run_demo.sh
```

Then confirm:

- ALLOW appears for `scenario=valid`
- DENY appears for `scenario=drift` and `scenario=replay-second`
- receipts count increments per attempt
- denied scenarios show `mutation_blocked=yes`
