# Getting Started

## Purpose

This repository demonstrates governed execution concepts for AI generated actions.

The public demo focuses on constrained execution and execution authority boundaries.

---

## Quick Start

### One Command Demo

```bash
python scripts/demo_governed_flow.py
```

---

### Interactive Dashboard

```bash
uvicorn runtime.api_shell:app --host 0.0.0.0 --port 8000
```

Open:

```text
http://localhost:8000/demo
```

---

### Docker Runtime

```bash
docker compose -f docker-compose.runtime.yml up
```

---

## Expected Demonstration Behavior

The demo is designed to demonstrate:

- governed execution boundaries
- constrained mutation flow
- replay blocking behavior
- append only lineage concepts
- execution verification
- fail closed execution behavior

---

## Repository Scope

This repository is intentionally limited to the public showcase layer.
