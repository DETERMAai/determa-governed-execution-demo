# Threat Model (Public Demo Scope)

This demo covers seven threats.

## 1) Replay Attack

Threat:
Reuse the same approved release multiple times.

What can go wrong:
Repeated mutations from a single approval.

How DETERMA blocks or detects it:
Single-use release identity is checked at execution time; reused identity is denied and receipted.

## 2) Stale Approval

Threat:
Execute using old approval after relevant conditions changed.

What can go wrong:
Mutation occurs under outdated authority context.

How DETERMA blocks or detects it:
Legitimacy is recomputed immediately before mutation; stale approvals fail current checks.

## 3) Repository Drift

Threat:
Repository state changes after approval but before execution.

What can go wrong:
A mutation is applied to unexpected content.

How DETERMA blocks or detects it:
Current repository state is compared to the approved basis; mismatch is denied and receipted.

## 4) Scope Escalation

Threat:
Execution tries to mutate outside approved scope.

What can go wrong:
Unauthorized files or actions are changed.

How DETERMA blocks or detects it:
Requested mutation path and operation must stay inside the approved scope; out-of-scope attempts are denied.

## 5) Path Traversal

Threat:
Use path tricks to escape allowed directories.

What can go wrong:
Writes happen outside intended target boundaries.

How DETERMA blocks or detects it:
Paths are normalized and checked against allowed targets; traversal escapes are denied.

## 6) Receipt Tampering

Threat:
Modify history to hide denials or rewrite outcomes.

What can go wrong:
Audit trail becomes untrustworthy.

How DETERMA blocks or detects it:
Receipts are append-only in this demo flow; tampering attempts break continuity and are detectable.

## 7) Duplicate Execution

Threat:
The same mutation is executed twice due to retries or race conditions.

What can go wrong:
Unintended repeated state changes.

How DETERMA blocks or detects it:
Execution identity and replay checks ensure duplicate attempts are denied and recorded.
