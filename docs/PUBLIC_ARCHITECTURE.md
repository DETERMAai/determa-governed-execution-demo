# DETERMA Public Architecture Overview

## High Level Runtime Model

DETERMA separates:

```text
AI generated intent
```

from:

```text
authorized execution
```

The system introduces a governed execution boundary before real mutation is allowed.

---

# Public Runtime Flow

```text
AI proposal
    ↓
Execution boundary
    ↓
Authority validation
    ↓
Bounded execution grant
    ↓
Constrained executor
    ↓
Verification
    ↓
Append only lineage
```

---

# Public Components

## Proposal Layer

The AI system proposes an action.

The proposal itself does not imply execution legitimacy.

---

## Execution Boundary

The execution boundary evaluates whether the proposal should be allowed to continue.

This layer exists outside the AI model itself.

---

## Authority Validation

The runtime evaluates:

- execution scope
- replay state
- execution constraints
- runtime validity

---

## Constrained Execution

Execution occurs through a bounded execution environment.

The executor receives only the minimum scope required for the approved operation.

---

## Verification and Lineage

Execution results are verified and recorded through append only lineage concepts.

---

# Public Repository Positioning

This repository demonstrates governed execution concepts through a public runtime showcase.

It is intentionally scoped as a public proof layer.
