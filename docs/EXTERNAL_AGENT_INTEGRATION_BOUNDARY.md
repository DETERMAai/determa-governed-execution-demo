# External Agent Integration Boundary

## Purpose

This document defines the public integration boundary for external coding agents such as Gemini CLI, Antigravity CLI, Codex, and similar tools when used with the DETERMA governed execution demo.

The boundary is intentionally narrow:

> External agents may analyze and propose. They do not receive mutation authority from this demo.

## Why This Boundary Exists

Coding agents can be useful for codebase analysis, review findings, patch drafts, and test proposals. They can also be capable of modifying files or invoking commands in their own operating environments.

That capability is not equivalent to governed execution authority.

The demo exists to show a different control principle:

```text
proposal
  -> release
  -> legitimacy recomputation at execution time
  -> ALLOW or DENY
  -> mutation executed or blocked
  -> receipt appended
```

An agent-generated proposal does not bypass this sequence.

## Permitted External Agent Outputs

An external agent may produce inert proposal material, including:

- analysis findings
- review comments
- patch drafts
- test proposals
- risk observations
- explanations of suspected drift or replay exposure

These outputs are inputs for review. They are not authority to mutate a repository.

## Prohibited Authority Assumptions

For purposes of this public demo, an external agent is not authorized merely because it can technically operate on a workspace.

It must not be treated as authorized to:

- apply a patch directly to the governed target as an approved execution
- treat an earlier approval as sufficient when execution-time state may have changed
- replay a previously used release
- expand the approved mutation scope
- represent a mutation as DETERMA-governed without an ALLOW result and appended receipt

## Integration Pattern

The safe integration pattern is:

```text
Gemini CLI / Antigravity CLI / Codex / another coding agent
  -> analysis or proposed patch
  -> DETERMA governed release input
  -> execution-time legitimacy recomputation
  -> ALLOW or DENY
  -> receipted outcome
```

The unsafe pattern is:

```text
coding agent
  -> direct mutation
  -> claim that the change was governed after the fact
```

Post-hoc reporting is not equivalent to pre-mutation authority.

## Sandbox Does Not Replace Authority

A sandbox may restrict where an agent can operate or reduce environmental damage. It does not, by itself, establish that a particular mutation is still legitimate at the moment it is attempted.

The public demo focuses on three execution-time failures that must remain denyable:

- repository drift after an earlier release
- replay of a previously used release
- mutation attempts without a currently valid governed path

## Public Demo Scope

This document describes the integration boundary for the public Git mutation demo only.

It does not claim:

- general production integration with any named external agent
- complete coverage of all execution environments
- cloud, deployment, browser, payment, or infrastructure governance
- a complete universal authority plane

## Acceptance Rule

An external-agent scenario is consistent with this demo only when:

1. the agent output is treated as a proposal or review input;
2. the mutation attempt passes through the governed execution flow;
3. legitimacy is recomputed immediately before mutation;
4. denial remains possible when drift or replay is detected; and
5. the outcome is appended as a receipt.

Anything else may still be useful tooling, but it is not demonstrated DETERMA-governed execution.
