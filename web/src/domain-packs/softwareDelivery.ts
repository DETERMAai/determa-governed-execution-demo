import type { EvaluationInput, RuleFinding } from "../authority/types";
import type { DomainPack } from "./types";

const fixtures = [
  {
    "fixture_id": "SD-ALLOW-001",
    "title": "Authorized PR merge",
    "expected_decision": "ALLOW",
    "expected_reason_codes": [
      "AUTHORITY_CURRENT",
      "SCOPE_MATCH",
      "TARGET_MATCH",
      "PAYLOAD_MATCH",
      "FIRST_USE"
    ],
    "action": {
      "action_id": "ACT-SD-0001",
      "actor_id": "agent-coder-17",
      "delegated_by": "engineer-843",
      "intent_id": "INT-SD-0101",
      "domain_id": "SOFTWARE_DELIVERY",
      "action_type": "MERGE_PULL_REQUEST",
      "target_system": "SCM",
      "target_resource": "repo:demo/pr:41",
      "requested_scope": "PR_MERGE_EXACT_HEAD",
      "approval_id": "APR-SD-0055",
      "context_version": 42,
      "policy_version": "software-delivery-7",
      "payload": {
        "head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts"
        ]
      },
      "payload_digest": "sha256:sd-allow-payload",
      "requested_at": "2026-08-06T03:00:00Z"
    },
    "approval": {
      "approval_id": "APR-SD-0055",
      "approved_actor_id": "agent-coder-17",
      "approved_action_type": "MERGE_PULL_REQUEST",
      "approved_target_system": "SCM",
      "approved_target_resource": "repo:demo/pr:41",
      "approved_scope": "PR_MERGE_EXACT_HEAD",
      "approved_payload_digest": "sha256:sd-allow-payload",
      "approved_payload": {
        "head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts"
        ]
      },
      "approved_context_version": 42,
      "approved_policy_version": "software-delivery-7",
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:00:00Z",
      "context_version": 42,
      "policy_version": "software-delivery-7",
      "actor_status": "ACTIVE",
      "risk_state": "NORMAL",
      "target_state": "OPEN",
      "authority_usage_status": "UNUSED",
      "current_head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "current_base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "current_changed_files": [
        "src/authority.ts",
        "tests/authority.test.ts"
      ],
      "required_checks": [
        "unit",
        "typecheck"
      ],
      "checks_bound_head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "open_blocking_review_threads": 0,
      "protected_branch": true
    },
    "policy": {
      "policy_id": "POL-SD-7",
      "policy_version": "software-delivery-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "software-delivery-v1",
      "rules_enabled": [
        "ALL"
      ]
    }
  },
  {
    "fixture_id": "SD-REVIEW-001",
    "title": "Base branch moved after approval",
    "expected_decision": "NEEDS_REVIEW",
    "expected_reason_codes": [
      "CONTEXT_DRIFT",
      "BASE_BRANCH_MOVED"
    ],
    "action": {
      "action_id": "ACT-SD-0002",
      "actor_id": "agent-coder-17",
      "delegated_by": "engineer-843",
      "intent_id": "INT-SD-0102",
      "domain_id": "SOFTWARE_DELIVERY",
      "action_type": "MERGE_PULL_REQUEST",
      "target_system": "SCM",
      "target_resource": "repo:demo/pr:41",
      "requested_scope": "PR_MERGE_EXACT_HEAD",
      "approval_id": "APR-SD-0056",
      "context_version": 43,
      "policy_version": "software-delivery-7",
      "payload": {
        "head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "base_sha": "cccccccccccccccccccccccccccccccccccccccc",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts"
        ]
      },
      "payload_digest": "sha256:sd-review-payload",
      "requested_at": "2026-08-06T03:10:00Z"
    },
    "approval": {
      "approval_id": "APR-SD-0056",
      "approved_actor_id": "agent-coder-17",
      "approved_action_type": "MERGE_PULL_REQUEST",
      "approved_target_system": "SCM",
      "approved_target_resource": "repo:demo/pr:41",
      "approved_scope": "PR_MERGE_EXACT_HEAD",
      "approved_payload_digest": "sha256:sd-review-payload",
      "approved_payload": {
        "head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts"
        ]
      },
      "approved_context_version": 42,
      "approved_policy_version": "software-delivery-7",
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:10:00Z",
      "context_version": 43,
      "policy_version": "software-delivery-7",
      "actor_status": "ACTIVE",
      "risk_state": "NORMAL",
      "target_state": "OPEN",
      "authority_usage_status": "UNUSED",
      "current_head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "current_base_sha": "cccccccccccccccccccccccccccccccccccccccc",
      "current_changed_files": [
        "src/authority.ts",
        "tests/authority.test.ts"
      ],
      "required_checks": [
        "unit",
        "typecheck"
      ],
      "checks_bound_head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "open_blocking_review_threads": 0,
      "protected_branch": true
    },
    "policy": {
      "policy_id": "POL-SD-7",
      "policy_version": "software-delivery-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "software-delivery-v1",
      "rules_enabled": [
        "ALL"
      ]
    }
  },
  {
    "fixture_id": "SD-DENY-001",
    "title": "PR head and file scope changed",
    "expected_decision": "DENY",
    "expected_reason_codes": [
      "HEAD_SHA_MISMATCH",
      "FILE_SCOPE_EXPANSION"
    ],
    "action": {
      "action_id": "ACT-SD-0003",
      "actor_id": "agent-coder-17",
      "delegated_by": "engineer-843",
      "intent_id": "INT-SD-0103",
      "domain_id": "SOFTWARE_DELIVERY",
      "action_type": "MERGE_PULL_REQUEST",
      "target_system": "SCM",
      "target_resource": "repo:demo/pr:41",
      "requested_scope": "PR_MERGE_EXACT_HEAD",
      "approval_id": "APR-SD-0057",
      "context_version": 44,
      "policy_version": "software-delivery-7",
      "payload": {
        "head_sha": "dddddddddddddddddddddddddddddddddddddddd",
        "base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts",
          "infra/deploy.yml"
        ]
      },
      "payload_digest": "sha256:sd-deny-payload",
      "requested_at": "2026-08-06T03:20:00Z"
    },
    "approval": {
      "approval_id": "APR-SD-0057",
      "approved_actor_id": "agent-coder-17",
      "approved_action_type": "MERGE_PULL_REQUEST",
      "approved_target_system": "SCM",
      "approved_target_resource": "repo:demo/pr:41",
      "approved_scope": "PR_MERGE_EXACT_HEAD",
      "approved_payload_digest": "sha256:sd-deny-payload",
      "approved_payload": {
        "head_sha": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
        "changed_files": [
          "src/authority.ts",
          "tests/authority.test.ts"
        ]
      },
      "approved_context_version": 42,
      "approved_policy_version": "software-delivery-7",
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:20:00Z",
      "context_version": 44,
      "policy_version": "software-delivery-7",
      "actor_status": "ACTIVE",
      "risk_state": "NORMAL",
      "target_state": "OPEN",
      "authority_usage_status": "UNUSED",
      "current_head_sha": "dddddddddddddddddddddddddddddddddddddddd",
      "current_base_sha": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "current_changed_files": [
        "src/authority.ts",
        "tests/authority.test.ts",
        "infra/deploy.yml"
      ],
      "required_checks": [
        "unit",
        "typecheck"
      ],
      "checks_bound_head_sha": "dddddddddddddddddddddddddddddddddddddddd",
      "open_blocking_review_threads": 0,
      "protected_branch": true
    },
    "policy": {
      "policy_id": "POL-SD-7",
      "policy_version": "software-delivery-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "software-delivery-v1",
      "rules_enabled": [
        "ALL"
      ]
    }
  }
] as DomainPack["fixtures"];
const comparison_dimensions = [
  {
    "id": "action_type",
    "label": "Action Type",
    "approved_path": "approval.approved_action_type",
    "current_path": "action.action_type"
  },
  {
    "id": "target",
    "label": "Target",
    "approved_path": "approval.approved_target_resource",
    "current_path": "action.target_resource"
  },
  {
    "id": "head_sha",
    "label": "Head SHA",
    "approved_path": "approval.approved_payload.head_sha",
    "current_path": "context.current_head_sha"
  },
  {
    "id": "base_sha",
    "label": "Base SHA",
    "approved_path": "approval.approved_payload.base_sha",
    "current_path": "context.current_base_sha"
  },
  {
    "id": "changed_files",
    "label": "Changed Files",
    "approved_path": "approval.approved_payload.changed_files",
    "current_path": "context.current_changed_files"
  },
  {
    "id": "checks_head",
    "label": "Checks Bound Head",
    "approved_path": "approval.approved_payload.head_sha",
    "current_path": "context.checks_bound_head_sha"
  }
];
const f = (priority: number, outcome: "DENY" | "NEEDS_REVIEW", reason_code: string, evidence: Record<string, unknown>): RuleFinding => ({ priority, outcome, reason_code, evidence });

function evaluate(input: EvaluationInput): RuleFinding[] {
  const a = input.action;
  const ap = input.approval;
  const c = input.context;
  if (!ap) return [];
  const findings: RuleFinding[] = [];
  const approvedPayload = (ap.approved_payload ?? {}) as Record<string, unknown>;
  if (approvedPayload.head_sha !== undefined && approvedPayload.head_sha !== c.current_head_sha) findings.push(f(1000, "DENY", "HEAD_SHA_MISMATCH", { approved: approvedPayload.head_sha, current: c.current_head_sha }));
  const allowed = Array.isArray(approvedPayload.changed_files) ? approvedPayload.changed_files as string[] : [];
  const current = Array.isArray(c.current_changed_files) ? c.current_changed_files as string[] : [];
  const outside = current.filter(path => !allowed.includes(path));
  if (outside.length) findings.push(f(1010, "DENY", "FILE_SCOPE_EXPANSION", { outside_allowlist: outside }));
  if (c.checks_bound_head_sha !== undefined && c.checks_bound_head_sha !== c.current_head_sha) findings.push(f(1020, "DENY", "CHECKS_NOT_BOUND_TO_CURRENT_HEAD", { checks_bound_head_sha: c.checks_bound_head_sha, current_head_sha: c.current_head_sha }));
  if (a.action_type === "DEPLOY_RELEASE" && a.target_resource !== ap.approved_target_resource) findings.push(f(1030, "DENY", "DEPLOYMENT_TARGET_MISMATCH", { approved: ap.approved_target_resource, current: a.target_resource }));
  if (a.action_type === "DEPLOY_RELEASE" && approvedPayload.release_digest !== undefined && approvedPayload.release_digest !== a.payload.release_digest) findings.push(f(1040, "DENY", "RELEASE_ARTIFACT_DIGEST_MISMATCH", { approved: approvedPayload.release_digest, current: a.payload.release_digest }));
  if (approvedPayload.base_sha !== undefined && approvedPayload.base_sha !== c.current_base_sha) findings.push(f(1100, "NEEDS_REVIEW", "BASE_BRANCH_MOVED", { approved: approvedPayload.base_sha, current: c.current_base_sha }));
  if (typeof c.open_blocking_review_threads === "number" && c.open_blocking_review_threads > 0) findings.push(f(1110, "NEEDS_REVIEW", "BLOCKING_REVIEW_THREAD_OPEN", { count: c.open_blocking_review_threads }));
  return findings;
}

export const softwareDeliveryPack: DomainPack = {
  domain_id: "SOFTWARE_DELIVERY",
  version: "1.0.0",
  display_name: "Software Delivery",
  fixtures,
  comparison_dimensions,
  evaluate
};
