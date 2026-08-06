export type Decision = "ALLOW" | "NEEDS_REVIEW" | "DENY";
export type DemoMode = "SHADOW" | "ENFORCED_SIMULATION";
export type OperationalEffect = "NONE" | "SIMULATED_APPLIED" | "SIMULATED_BLOCKED";
export type LifecycleState = "EVALUATED" | "WAITING_APPROVAL" | "READY_TO_EXECUTE" | "COMPLETED" | "DENIED";
export type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export interface ActionDescriptor {
  action_id: string;
  actor_id: string;
  delegated_by?: string;
  intent_id: string;
  domain_id: string;
  action_type: string;
  target_system: string;
  target_resource: string;
  requested_scope: string;
  approval_id: string;
  context_version: number;
  policy_version: string;
  payload: Record<string, unknown>;
  payload_digest: string;
  requested_at: string;
}

export interface ApprovalSnapshot {
  approval_id: string;
  approved_actor_id?: string;
  approved_action_type: string;
  approved_target_system: string;
  approved_target_resource: string;
  approved_scope: string;
  approved_payload_digest: string;
  approved_payload?: Record<string, unknown>;
  approved_context_version: number;
  approved_policy_version: string;
  approved_risk_state?: string;
  approved_contact_version?: number;
  issued_at: string;
  expires_at: string;
  single_use: boolean;
  used: boolean;
  [key: string]: unknown;
}

export interface RuntimeContext {
  captured_at: string;
  context_version: number;
  policy_version: string;
  actor_status: string;
  risk_state: string;
  target_state: string;
  authority_usage_status: string;
  audit_available?: boolean;
  [key: string]: unknown;
}

export interface PolicySnapshot {
  policy_id: string;
  policy_version: string;
  effective_at: string;
  universal_rule_set_version: string;
  domain_rule_set_version: string;
  rules_enabled: string[];
}

export interface ScenarioFixture {
  fixture_id: string;
  title: string;
  expected_decision: Decision;
  expected_reason_codes: string[];
  action: ActionDescriptor;
  approval: ApprovalSnapshot;
  context: RuntimeContext;
  policy: PolicySnapshot;
}

export interface RuleFinding {
  priority: number;
  outcome: "DENY" | "NEEDS_REVIEW";
  reason_code: string;
  evidence: Record<string, unknown>;
}

export interface EvaluationInput {
  action: ActionDescriptor;
  approval?: ApprovalSnapshot | null;
  context: RuntimeContext;
  policy?: PolicySnapshot | null;
  mode: DemoMode;
  domain_pack_version: string;
}

export interface AuthorityDecision {
  evaluator_version: string;
  decision: Decision;
  reason_codes: string[];
  findings: RuleFinding[];
  canonical_input_hash: string;
  evaluation_trace_hash: string;
  decision_hash: string;
  lifecycle_state: LifecycleState;
  release_status: "NOT_ELIGIBLE" | "NOT_ISSUED_SHADOW" | "ELIGIBLE_FOR_SIMULATION";
  operational_effect: OperationalEffect;
}

export interface EvidenceReceipt extends AuthorityDecision {
  receipt_id: string;
  receipt_type: "AUTHORITY_EVALUATION" | "EVALUATION_REPLAY" | "SIMULATED_EXECUTION";
  action_id: string;
  domain_id: string;
  domain_pack_version: string;
  mode: DemoMode;
  human_action: "NONE" | "REVIEW_REQUIRED" | "BLOCKED";
  observed_decision_time_ms: number;
  environment: "LOCAL_SYNTHETIC_DEMO";
  created_at: string;
  replay_of?: string;
  deterministic_match?: boolean;
  release_id?: string;
  post_state_verification?: "NOT_RUN" | "PASS" | "FAIL";
}

export interface ComparisonDimension {
  id: string;
  label: string;
  approved_path: string;
  current_path: string;
}
