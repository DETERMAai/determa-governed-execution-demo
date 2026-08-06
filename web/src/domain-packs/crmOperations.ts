import type { EvaluationInput, RuleFinding } from "../authority/types";
import type { DomainPack } from "./types";

const fixtures = [
  {
    "fixture_id": "CRM-ALLOW-001",
    "title": "Authorized contact detail update",
    "expected_decision": "ALLOW",
    "expected_reason_codes": [
      "AUTHORITY_CURRENT",
      "SCOPE_MATCH",
      "TARGET_MATCH",
      "PAYLOAD_MATCH",
      "FIRST_USE"
    ],
    "action": {
      "action_id": "ACT-CRM-0001",
      "actor_id": "agent-service-17",
      "delegated_by": "employee-843",
      "intent_id": "INT-CRM-0101",
      "domain_id": "CRM_OPERATIONS",
      "action_type": "CRM_PROFILE_UPDATE",
      "target_system": "CRM",
      "target_resource": "customer:458211",
      "requested_scope": "PROFILE_CONTACT_UPDATE",
      "approval_id": "APR-CRM-0055",
      "context_version": 42,
      "policy_version": "crm-ai-7",
      "payload": {
        "contact": {
          "address": "12 Demo Street",
          "phone": "+1-555-0100"
        }
      },
      "payload_digest": "sha256:crm-allow-payload",
      "requested_at": "2026-08-06T03:00:00Z"
    },
    "approval": {
      "approval_id": "APR-CRM-0055",
      "approved_actor_id": "agent-service-17",
      "approved_action_type": "CRM_PROFILE_UPDATE",
      "approved_target_system": "CRM",
      "approved_target_resource": "customer:458211",
      "approved_scope": "PROFILE_CONTACT_UPDATE",
      "approved_payload_digest": "sha256:crm-allow-payload",
      "approved_context_version": 42,
      "approved_policy_version": "crm-ai-7",
      "approved_risk_state": "NORMAL",
      "approved_contact_version": 17,
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:00:00Z",
      "context_version": 42,
      "policy_version": "crm-ai-7",
      "actor_status": "ACTIVE",
      "risk_state": "NORMAL",
      "target_state": "ACTIVE_CUSTOMER",
      "authority_usage_status": "UNUSED",
      "customer_resource": "customer:458211",
      "current_contact_version": 17,
      "allowed_contact_fields": [
        "contact.address",
        "contact.phone"
      ]
    },
    "policy": {
      "policy_id": "POL-CRM-7",
      "policy_version": "crm-ai-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "crm-operations-v1",
      "rules_enabled": [
        "ALL"
      ]
    }
  },
  {
    "fixture_id": "CRM-REVIEW-001",
    "title": "Customer risk and context changed",
    "expected_decision": "NEEDS_REVIEW",
    "expected_reason_codes": [
      "CONTEXT_DRIFT",
      "RISK_STATE_CHANGED",
      "CUSTOMER_RECORD_VERSION_CHANGED"
    ],
    "action": {
      "action_id": "ACT-CRM-0002",
      "actor_id": "agent-service-17",
      "delegated_by": "employee-843",
      "intent_id": "INT-CRM-0102",
      "domain_id": "CRM_OPERATIONS",
      "action_type": "CRM_PROFILE_UPDATE",
      "target_system": "CRM",
      "target_resource": "customer:458211",
      "requested_scope": "PROFILE_CONTACT_UPDATE",
      "approval_id": "APR-CRM-0056",
      "context_version": 43,
      "policy_version": "crm-ai-7",
      "payload": {
        "contact": {
          "address": "12 Demo Street",
          "phone": "+1-555-0100"
        }
      },
      "payload_digest": "sha256:crm-review-payload",
      "requested_at": "2026-08-06T03:10:00Z"
    },
    "approval": {
      "approval_id": "APR-CRM-0056",
      "approved_actor_id": "agent-service-17",
      "approved_action_type": "CRM_PROFILE_UPDATE",
      "approved_target_system": "CRM",
      "approved_target_resource": "customer:458211",
      "approved_scope": "PROFILE_CONTACT_UPDATE",
      "approved_payload_digest": "sha256:crm-review-payload",
      "approved_context_version": 42,
      "approved_policy_version": "crm-ai-7",
      "approved_risk_state": "NORMAL",
      "approved_contact_version": 17,
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:10:00Z",
      "context_version": 43,
      "policy_version": "crm-ai-7",
      "actor_status": "ACTIVE",
      "risk_state": "ELEVATED",
      "target_state": "ACTIVE_CUSTOMER",
      "authority_usage_status": "UNUSED",
      "customer_resource": "customer:458211",
      "current_contact_version": 18,
      "allowed_contact_fields": [
        "contact.address",
        "contact.phone"
      ]
    },
    "policy": {
      "policy_id": "POL-CRM-7",
      "policy_version": "crm-ai-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "crm-operations-v1",
      "rules_enabled": [
        "ALL"
      ]
    }
  },
  {
    "fixture_id": "CRM-DENY-001",
    "title": "Contact approval reused for risk classification",
    "expected_decision": "DENY",
    "expected_reason_codes": [
      "ACTION_TYPE_MISMATCH",
      "TARGET_SYSTEM_MISMATCH",
      "SCOPE_MISMATCH",
      "RISK_CLASSIFICATION_REQUIRES_DEDICATED_SCOPE"
    ],
    "action": {
      "action_id": "ACT-CRM-0003",
      "actor_id": "agent-service-17",
      "delegated_by": "employee-843",
      "intent_id": "INT-CRM-0103",
      "domain_id": "CRM_OPERATIONS",
      "action_type": "CUSTOMER_RISK_STATUS_CHANGE",
      "target_system": "RISK",
      "target_resource": "customer:458211",
      "requested_scope": "RISK_CLASSIFICATION_UPDATE",
      "approval_id": "APR-CRM-0057",
      "context_version": 42,
      "policy_version": "crm-ai-7",
      "payload": {
        "risk_classification": "HIGH"
      },
      "payload_digest": "sha256:crm-deny-payload",
      "requested_at": "2026-08-06T03:20:00Z"
    },
    "approval": {
      "approval_id": "APR-CRM-0057",
      "approved_actor_id": "agent-service-17",
      "approved_action_type": "CRM_PROFILE_UPDATE",
      "approved_target_system": "CRM",
      "approved_target_resource": "customer:458211",
      "approved_scope": "PROFILE_CONTACT_UPDATE",
      "approved_payload_digest": "sha256:crm-deny-payload",
      "approved_context_version": 42,
      "approved_policy_version": "crm-ai-7",
      "approved_risk_state": "NORMAL",
      "approved_contact_version": 17,
      "issued_at": "2026-08-06T02:00:00Z",
      "expires_at": "2026-08-06T05:00:00Z",
      "single_use": true,
      "used": false
    },
    "context": {
      "captured_at": "2026-08-06T03:20:00Z",
      "context_version": 42,
      "policy_version": "crm-ai-7",
      "actor_status": "ACTIVE",
      "risk_state": "NORMAL",
      "target_state": "ACTIVE_CUSTOMER",
      "authority_usage_status": "UNUSED",
      "customer_resource": "customer:458211",
      "current_contact_version": 17,
      "allowed_contact_fields": [
        "contact.address",
        "contact.phone"
      ]
    },
    "policy": {
      "policy_id": "POL-CRM-7",
      "policy_version": "crm-ai-7",
      "effective_at": "2026-08-01T00:00:00Z",
      "universal_rule_set_version": "universal-v1",
      "domain_rule_set_version": "crm-operations-v1",
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
    "id": "scope",
    "label": "Scope",
    "approved_path": "approval.approved_scope",
    "current_path": "action.requested_scope"
  },
  {
    "id": "context_version",
    "label": "Context Version",
    "approved_path": "approval.approved_context_version",
    "current_path": "context.context_version"
  },
  {
    "id": "risk",
    "label": "Risk State",
    "approved_path": "approval.approved_risk_state",
    "current_path": "context.risk_state"
  },
  {
    "id": "authority_use",
    "label": "Authority Use",
    "approved_path": "approval.used",
    "current_path": "context.authority_usage_status"
  }
];
const f = (priority: number, outcome: "DENY" | "NEEDS_REVIEW", reason_code: string, evidence: Record<string, unknown>): RuleFinding => ({ priority, outcome, reason_code, evidence });

function flattenLeaves(value: unknown, prefix = ""): string[] {
  if (!value || typeof value !== "object" || Array.isArray(value)) return prefix ? [prefix] : [];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => flattenLeaves(child, prefix ? `${prefix}.${key}` : key));
}

function evaluate(input: EvaluationInput): RuleFinding[] {
  const a = input.action;
  const ap = input.approval;
  const c = input.context;
  if (!ap) return [];
  const findings: RuleFinding[] = [];
  if (c.customer_resource !== undefined && c.customer_resource !== a.target_resource) findings.push(f(1000, "DENY", "CUSTOMER_RESOURCE_MISMATCH", { current_resource: c.customer_resource, requested: a.target_resource }));
  const allowed = Array.isArray(c.allowed_contact_fields) ? c.allowed_contact_fields as string[] : [];
  if (a.action_type === "CRM_PROFILE_UPDATE") {
    const requested = flattenLeaves(a.payload);
    const outside = requested.filter(path => !allowed.includes(path));
    if (outside.length) findings.push(f(1010, "DENY", "FIELD_SCOPE_VIOLATION", { outside_allowed_fields: outside }));
  }
  if (a.action_type === "CUSTOMER_OWNER_CHANGE" && a.requested_scope !== "CUSTOMER_OWNER_UPDATE") findings.push(f(1020, "DENY", "OWNER_CHANGE_REQUIRES_DEDICATED_SCOPE", { requested_scope: a.requested_scope }));
  if (a.action_type === "CUSTOMER_RISK_STATUS_CHANGE" && ap.approved_scope !== "RISK_CLASSIFICATION_UPDATE") findings.push(f(1030, "DENY", "RISK_CLASSIFICATION_REQUIRES_DEDICATED_SCOPE", { approved_scope: ap.approved_scope }));
  if (c.actor_status !== "ACTIVE") findings.push(f(1040, "DENY", "ACTOR_INACTIVE", { actor_status: c.actor_status }));
  if (ap.approved_risk_state !== undefined && ap.approved_risk_state !== c.risk_state) findings.push(f(1100, "NEEDS_REVIEW", "RISK_STATE_CHANGED", { approved: ap.approved_risk_state, current: c.risk_state }));
  if (ap.approved_contact_version !== undefined && ap.approved_contact_version !== c.current_contact_version) findings.push(f(1110, "NEEDS_REVIEW", "CUSTOMER_RECORD_VERSION_CHANGED", { approved: ap.approved_contact_version, current: c.current_contact_version }));
  return findings;
}

export const crmOperationsPack: DomainPack = {
  domain_id: "CRM_OPERATIONS",
  version: "1.0.0",
  display_name: "CRM Operations",
  fixtures,
  comparison_dimensions,
  evaluate
};
