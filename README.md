# DETERMA Governed Execution Demo

![Status](https://img.shields.io/badge/status-public_showcase-blue)
![Demo](https://img.shields.io/badge/demo-governed_execution-success)
![Runtime](https://img.shields.io/badge/runtime-fail_closed-critical)
![Scope](https://img.shields.io/badge/scope-public_proof-lightgrey)

Public showcase for governed AI execution.

DETERMA demonstrates how AI generated actions can be governed before they are allowed to mutate real systems.

---

## Core Principle

```text
AI proposes.
Authority governs.
Execution is constrained.
Lineage is recorded.
Unsafe replay attempts fail closed.
```

---

## Demonstration Status

This public repository currently presents the governed execution concept, split demonstration model, and public architecture overview.

Executable runtime files are not included in this public showcase repository yet. Runtime demonstrations are available through curated walkthroughs and private technical review.

---

## Execution Without Governance vs With DETERMA

Split demonstration mode contrasts fail-open execution with fail-closed governed execution.

### Without Governance

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

### With DETERMA

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

---

## Public Architecture Flow

```text
AI generated proposal
        ↓
Execution boundary
        ↓
Authority check
        ↓
Bounded execution grant
        ↓
Constrained execution
        ↓
Verification
        ↓
Lineage record
```

---

## Why Governed Execution

Most AI systems today focus on:

- generation
- orchestration
- observability
- copilots
- prompt controls

DETERMA focuses on a different question:

```text
Should this specific machine generated action be allowed to execute now?
```

That question becomes critical when AI systems begin modifying:

- code
- infrastructure
- workflows
- operational systems
- permissions
- runtime state

---

## Public Demo Focus

The public showcase currently demonstrates:

- governed code mutation
- constrained execution
- replay blocking behavior
- without governance vs governed execution contrast
- append only lineage concepts
- runtime verification
- fail closed execution behavior

---

## Documentation

| Document | Purpose |
|---|---|
| `docs/DEMO_OVERVIEW.md` | Public demo walkthrough |
| `docs/SPLIT_DEMONSTRATION.md` | Without governance vs with DETERMA demo contrast |
| `docs/PUBLIC_ARCHITECTURE.md` | High level architecture overview |
| `docs/PRESENTATION.md` | Public presentation layer |
| `docs/GETTING_STARTED.md` | Quick onboarding |
| `docs/FAQ.md` | Common questions |
| `docs/SECURITY_MODEL.md` | Public security model |
| `docs/PUBLIC_SCOPE.md` | Public vs private scope |

---

## Repository Scope

Public equals proof.

Private equals full authority system.

This repository intentionally contains only the public governed execution showcase layer.

---

## Public Roadmap

```text
Phase 1 — Public governed execution showcase
Phase 2 — Runtime walkthrough expansion
Phase 3 — Design partner evaluation
Phase 4 — Curated technical diligence
```

---

## Contact

For strategic, enterprise, research, or technical review requests regarding governed execution systems and execution authority infrastructure, contact the DETERMA team.

To request the full presentation or express interest in participating as a Design Partner, email:

```text
determa.ai@gmail.com
```

---

## License

Copyright © DETERMA.

Public showcase materials are provided for evaluation and research discussion purposes only.
