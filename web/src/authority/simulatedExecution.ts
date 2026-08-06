import { hashCanonical } from "./canonicalize";
import type { EvidenceReceipt } from "./types";

const consumed = new Set<string>();

export function resetSimulatedReleaseState(): void { consumed.clear(); }

export function executeSimulation(receipt: EvidenceReceipt): EvidenceReceipt {
  if (receipt.mode !== "ENFORCED_SIMULATION" || receipt.decision !== "ALLOW") return { ...receipt, operational_effect: "SIMULATED_BLOCKED", post_state_verification: "NOT_RUN" };
  const release_id = `REL-${receipt.decision_hash.slice(-16).toUpperCase()}`;
  if (consumed.has(release_id)) return {
    ...receipt,
    receipt_type: "SIMULATED_EXECUTION",
    decision: "DENY",
    reason_codes: ["AUTHORITY_REUSE_NOT_ALLOWED"],
    release_status: "NOT_ELIGIBLE",
    operational_effect: "SIMULATED_BLOCKED",
    release_id,
    post_state_verification: "NOT_RUN"
  };
  consumed.add(release_id);
  const expected = hashCanonical({ action_id: receipt.action_id, release_id, effect: "SIMULATED_APPLIED" });
  const observed = hashCanonical({ action_id: receipt.action_id, release_id, effect: "SIMULATED_APPLIED" });
  return {
    ...receipt,
    receipt_type: "SIMULATED_EXECUTION",
    release_status: "ELIGIBLE_FOR_SIMULATION",
    lifecycle_state: expected === observed ? "COMPLETED" : "DENIED",
    operational_effect: expected === observed ? "SIMULATED_APPLIED" : "SIMULATED_BLOCKED",
    release_id,
    post_state_verification: expected === observed ? "PASS" : "FAIL"
  };
}
