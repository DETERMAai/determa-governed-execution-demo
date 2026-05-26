# Execution Gap

Approval time is not execution time.

```text
approval time != execution time
```

A release can be approved when conditions are true, then executed later when conditions are false.
That gap is where unsafe mutation happens.

## Why This Matters

- Drift: repository content may have changed since approval.
- Replay: an old approved release can be submitted again.
- Stale authority: a prior authorization can be outdated.
- Changed repository state: target files, hashes, or context can differ.

The same release payload can move from legitimate to illegitimate as state changes.

## Governed Execution Response

DETERMA does not trust old approval alone.
It recomputes legitimacy immediately before mutation and then:

- allows execution if current state still matches constraints
- denies execution if current state no longer matches
- appends a receipt for both outcomes

This closes the execution gap for real mutations.
