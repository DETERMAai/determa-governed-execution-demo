# Getting Started

## Purpose

This repository demonstrates the execution gap and governed execution in a small local demo.

## Quick Start

Run from repository root:

```bash
./scripts/run_demo.sh
```

## Expected Behavior

- `valid` allows mutation and appends a receipt
- `drift` denies stale mutation with `repository_drift`
- `replay` allows once, then denies replay and blocks duplicate mutation

## Scope

This public repo is intentionally limited to proof of governed execution.
