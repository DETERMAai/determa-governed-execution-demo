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

## Run the Governed Execution Demonstration

| Demo Mode | Command |
|---|---|
| One-command demo | `python scripts/demo_governed_flow.py` |
| Interactive dashboard | `uvicorn runtime.api_shell:app --host 0.0.0.0 --port 8000` |
| Docker runtime | `docker compose -f docker-compose.runtime.yml up` |

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
- append only lineage concepts
- runtime verification
- fail closed execution behavior

---

## Documentation

| Document | Purpose |
|---|---|
| `docs/DEMO_OVERVIEW.md` | Public demo walkthrough |
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

---

## License

Copyright © DETERMA.

Public showcase materials are provided for evaluation and research discussion purposes only.
