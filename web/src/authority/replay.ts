import type { EvidenceReceipt, EvaluationInput } from "./types";
import type { DomainPack } from "../domain-packs/types";
import { evaluateAuthority } from "./evaluator";
import { createReceipt } from "./receipt";

export function replayEvaluation(input: EvaluationInput, pack: DomainPack, original: EvidenceReceipt): EvidenceReceipt {
  const decision = evaluateAuthority(input, pack);
  const replay = createReceipt(decision, input.action.action_id, pack.domain_id, pack.version, input.mode, 0, "EVALUATION_REPLAY");
  return {
    ...replay,
    replay_of: original.receipt_id,
    deterministic_match: replay.decision === original.decision &&
      JSON.stringify(replay.reason_codes) === JSON.stringify(original.reason_codes) &&
      replay.canonical_input_hash === original.canonical_input_hash &&
      replay.evaluation_trace_hash === original.evaluation_trace_hash &&
      replay.decision_hash === original.decision_hash,
    operational_effect: "NONE"
  };
}
