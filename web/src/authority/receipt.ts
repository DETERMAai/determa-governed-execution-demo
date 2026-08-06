import type { AuthorityDecision, DemoMode, EvidenceReceipt } from "./types";
import { hashCanonical } from "./canonicalize";

let sequence = 0;
export function createReceipt(decision: AuthorityDecision, action_id: string, domain_id: string, domain_pack_version: string, mode: DemoMode, elapsedMs = 0, type: EvidenceReceipt["receipt_type"] = "AUTHORITY_EVALUATION"): EvidenceReceipt {
  sequence += 1;
  const created_at = new Date().toISOString();
  const receipt_id = `RCT-${hashCanonical({ action_id, decision_hash: decision.decision_hash, sequence, created_at }).slice(7, 23).toUpperCase()}`;
  return {
    ...decision,
    receipt_id,
    receipt_type: type,
    action_id,
    domain_id,
    domain_pack_version,
    mode,
    human_action: decision.decision === "NEEDS_REVIEW" ? "REVIEW_REQUIRED" : decision.decision === "DENY" ? "BLOCKED" : "NONE",
    observed_decision_time_ms: Number(elapsedMs.toFixed(3)),
    environment: "LOCAL_SYNTHETIC_DEMO",
    created_at,
    post_state_verification: "NOT_RUN"
  };
}
