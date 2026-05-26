# Examples

This folder contains a small runnable demo for governed execution behavior.

## Scenario 1: Valid Execution

Command:

```bash
powershell -ExecutionPolicy Bypass -File .\examples\governed_demo.ps1 -Scenario valid -Reset
```

Expected:

- legitimacy recomputation returns `ALLOW`
- mutation is executed
- receipt is appended

## Scenario 2: Repository Drift Denial

Command:

```bash
powershell -ExecutionPolicy Bypass -File .\examples\governed_demo.ps1 -Scenario drift -Reset
```

Expected:

- approval exists from earlier state
- repository changes before execution
- recomputation returns `DENY (repository_drift)`
- mutation is blocked
- denial receipt is appended

## Scenario 3: Replay Denial

Command:

```bash
powershell -ExecutionPolicy Bypass -File .\examples\governed_demo.ps1 -Scenario replay -Reset
```

Expected:

- first execution is `ALLOW`
- second execution of same release is `DENY (replay)`
- both outcomes are receipted

## Artifacts

- `examples/target.txt`: file used for mutation
- `examples/receipts.jsonl`: append-only execution receipts
