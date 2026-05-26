# Demo Output

This is example output from:

```bash
./scripts/run_demo.sh
```

```text
DETERMA governed execution demo (minimal runtime slice)
Execution gap: approval time != execution time

------------------------------------------------------------
1) VALID EXECUTION
scenario=valid
release_id=release-valid-001
decision=ALLOW
reason=witness_match
target_hash_before=6faf39663a9c7460863fdb1698daedd7fa3f00a93b70476f805b22d34260fd2d
target_hash_after=f51ea7e664e78e01906a91345fdfec84b3cb9d52f07a6dcc7d917b79a60e3769
mutation_executed=yes
receipts_total=1

------------------------------------------------------------
2) REPOSITORY DRIFT DENIAL
scenario=drift
release_id=release-drift-001
decision=DENY
reason=repository_drift
mutation_blocked=yes
receipts_total=2

------------------------------------------------------------
3) REPLAY DENIAL
scenario=replay-first
release_id=release-replay-001
decision=ALLOW
reason=witness_match
mutation_executed=yes
receipts_total=3
scenario=replay-second
release_id=release-replay-001
decision=DENY
reason=replay
mutation_blocked=yes
receipts_total=4
```

What this shows:

- Valid release executes.
- Drift between approval and execution is denied before mutation.
- Reuse of the same release is denied as replay.
- Every attempt appends one receipt line.
