import type { EvidenceReceipt } from "../authority/types";
export function DecisionPanel({ receipt }: { receipt: EvidenceReceipt | null }) {
  if (!receipt) return <section className="panel decision empty"><h2>Decision</h2><p>Evaluate the current request to produce a deterministic receipt.</p></section>;
  return <section className={`panel decision ${receipt.decision.toLowerCase()}`}><h2>Decision</h2><div className="decision-word" aria-label={`Decision ${receipt.decision}`}>{receipt.decision}</div><dl><dt>Lifecycle</dt><dd>{receipt.lifecycle_state}</dd><dt>Release</dt><dd>{receipt.release_status}</dd><dt>Operational Effect</dt><dd>{receipt.operational_effect}</dd><dt>Human Action</dt><dd>{receipt.human_action}</dd></dl><div className="chips">{receipt.reason_codes.map(code => <code key={code}>{code}</code>)}</div></section>;
}
