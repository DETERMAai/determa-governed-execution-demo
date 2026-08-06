import { hashCanonical } from "./canonicalize";
import type { AuthorityDecision, EvaluationInput, RuleFinding } from "./types";
import { evaluateUniversalRules } from "./universalRules";
import type { DomainPack } from "../domain-packs/types";

export const EVALUATOR_VERSION = "determa-demo-authority-core-v1";
const allowCodes = ["AUTHORITY_CURRENT", "SCOPE_MATCH", "TARGET_MATCH", "PAYLOAD_MATCH", "FIRST_USE"];

export function evaluateAuthority(input: EvaluationInput, pack: DomainPack): AuthorityDecision {
  if (input.action.domain_id !== pack.domain_id) throw new Error(`Domain pack mismatch: ${input.action.domain_id} != ${pack.domain_id}`);
  const findings: RuleFinding[] = [...evaluateUniversalRules(input), ...pack.evaluate(input)]
    .sort((a, b) => a.priority - b.priority || a.reason_code.localeCompare(b.reason_code));
  const deny = findings.filter(item => item.outcome === "DENY");
  const review = findings.filter(item => item.outcome === "NEEDS_REVIEW");
  const decision = deny.length ? "DENY" : review.length ? "NEEDS_REVIEW" : "ALLOW";
  const reason_codes = decision === "ALLOW" ? allowCodes : findings.filter(item => item.outcome === decision).map(item => item.reason_code);
  const canonical_input_hash = hashCanonical({ action: input.action, approval: input.approval, context: input.context, policy: input.policy, domain_pack_version: input.domain_pack_version, evaluator_version: EVALUATOR_VERSION });
  const evaluation_trace_hash = hashCanonical(findings);
  const decision_hash = hashCanonical({ evaluator_version: EVALUATOR_VERSION, decision, reason_codes, canonical_input_hash, evaluation_trace_hash });
  return {
    evaluator_version: EVALUATOR_VERSION,
    decision,
    reason_codes,
    findings,
    canonical_input_hash,
    evaluation_trace_hash,
    decision_hash,
    lifecycle_state: decision === "DENY" ? "DENIED" : decision === "NEEDS_REVIEW" ? "WAITING_APPROVAL" : input.mode === "SHADOW" ? "EVALUATED" : "READY_TO_EXECUTE",
    release_status: decision !== "ALLOW" ? "NOT_ELIGIBLE" : input.mode === "SHADOW" ? "NOT_ISSUED_SHADOW" : "ELIGIBLE_FOR_SIMULATION",
    operational_effect: "NONE"
  };
}
