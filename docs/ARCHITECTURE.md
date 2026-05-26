# Architecture (Public Demo)

Public flow only:

```text
proposal
  -> release
  -> legitimacy recomputation
  -> ALLOW / DENY
  -> mutation executed or blocked
  -> receipt appended
```

Notes:

- Approval can exist before execution.
- Legitimacy is checked again at execution time.
- Denials are first-class outcomes and always receipted.
