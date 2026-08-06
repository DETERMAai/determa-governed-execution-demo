import type { EvaluationInput, RuleFinding } from "./types";

const finding = (priority: number, outcome: "DENY" | "NEEDS_REVIEW", reason_code: string, evidence: Record<string, unknown>): RuleFinding => ({ priority, outcome, reason_code, evidence });

export function evaluateUniversalRules(input: EvaluationInput): RuleFinding[] {
  const { action, approval, context, policy } = input;
  const out: RuleFinding[] = [];
  const required = [action.action_id, action.actor_id, action.intent_id, action.domain_id, action.action_type, action.target_system, action.target_resource, action.requested_scope, action.approval_id, action.policy_version, action.payload_digest, action.requested_at];
  if (required.some(value => value === undefined || value === null || value === "")) out.push(finding(10, "DENY", "INVALID_ACTION_DESCRIPTOR", { required_fields_present: false }));
  if (!approval) {
    out.push(finding(20, "DENY", "APPROVAL_NOT_FOUND", { approval_id: action.approval_id }));
    return out;
  }
  if (context.actor_status !== "ACTIVE" || (approval.approved_actor_id && approval.approved_actor_id !== action.actor_id)) out.push(finding(30, "DENY", "ACTOR_OR_DELEGATION_INVALID", { actor_id: action.actor_id, actor_status: context.actor_status, approved_actor_id: approval.approved_actor_id }));
  if (Date.parse(action.requested_at) > Date.parse(approval.expires_at)) out.push(finding(40, "DENY", "APPROVAL_EXPIRED", { requested_at: action.requested_at, expires_at: approval.expires_at }));
  if (action.action_type !== approval.approved_action_type) out.push(finding(50, "DENY", "ACTION_TYPE_MISMATCH", { approved: approval.approved_action_type, current: action.action_type }));
  if (action.target_system !== approval.approved_target_system) out.push(finding(60, "DENY", "TARGET_SYSTEM_MISMATCH", { approved: approval.approved_target_system, current: action.target_system }));
  if (action.target_resource !== approval.approved_target_resource) out.push(finding(70, "DENY", "TARGET_RESOURCE_MISMATCH", { approved: approval.approved_target_resource, current: action.target_resource }));
  if (action.requested_scope !== approval.approved_scope) out.push(finding(80, "DENY", "SCOPE_MISMATCH", { approved: approval.approved_scope, current: action.requested_scope }));
  if (action.payload_digest !== approval.approved_payload_digest) out.push(finding(90, "DENY", "PAYLOAD_DIGEST_MISMATCH", { approved: approval.approved_payload_digest, current: action.payload_digest }));
  if (approval.used || context.authority_usage_status === "USED") out.push(finding(100, "DENY", "AUTHORITY_REUSE_NOT_ALLOWED", { approval_used: approval.used, usage_status: context.authority_usage_status }));
  if (context.audit_available === false) out.push(finding(110, "DENY", "AUDIT_UNAVAILABLE", { audit_available: false }));
  if (!policy) out.push(finding(200, "NEEDS_REVIEW", "POLICY_UNAVAILABLE", {}));
  if (policy && (policy.policy_version !== approval.approved_policy_version || context.policy_version !== approval.approved_policy_version)) out.push(finding(210, "NEEDS_REVIEW", "POLICY_VERSION_CHANGED", { approved: approval.approved_policy_version, current_context: context.policy_version, current_policy: policy.policy_version }));
  if (context.context_version !== approval.approved_context_version) out.push(finding(220, "NEEDS_REVIEW", "CONTEXT_DRIFT", { approved: approval.approved_context_version, current: context.context_version }));
  const issued = Date.parse(approval.issued_at);
  const expires = Date.parse(approval.expires_at);
  const requested = Date.parse(action.requested_at);
  if (Number.isFinite(issued) && Number.isFinite(expires) && Number.isFinite(requested) && expires > issued && ((expires - requested) / (expires - issued)) <= 0.1) out.push(finding(230, "NEEDS_REVIEW", "APPROVAL_FRESHNESS_REVIEW", { requested_at: action.requested_at, expires_at: approval.expires_at }));
  return out;
}
