# Execution Without Governance vs With DETERMA

## Purpose

This split demonstration illustrates the difference between:

- fail open execution
- fail closed governed execution

The comparison is intended to make the governed execution boundary visible and intuitive.

---

# Without Governance

```text
AI generates action
        ↓
Direct execution
        ↓
System mutation occurs
        ↓
Replay or reuse may succeed
        ↓
No constrained authority boundary
```

## Characteristics

- direct execution path
- implicit trust in generated actions
- weak mutation boundaries
- replay exposure
- mutation legitimacy assumed

---

# With DETERMA

```text
AI generates proposal
        ↓
Execution boundary intercepts request
        ↓
Authority validation occurs
        ↓
Replay validation occurs
        ↓
Constrained execution is granted only if valid
        ↓
Mutation is allowed only through governed execution
        ↓
Append only lineage is recorded
```

## Characteristics

- governed execution boundary
- constrained mutation flow
- replay blocking behavior
- explicit authority validation
- append only lineage concepts
- fail closed execution model

---

# Public Demonstration Goal

The public showcase is intended to demonstrate why execution authority matters when AI systems are allowed to perform real mutations.
