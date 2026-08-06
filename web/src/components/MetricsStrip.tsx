import type { EvidenceReceipt } from "../authority/types";
export function MetricsStrip({ receipts }: { receipts: EvidenceReceipt[] }) {
  const count = (value: string) => receipts.filter(r => r.decision === value).length;
  const avg = receipts.length ? receipts.reduce((sum,r)=>sum+r.observed_decision_time_ms,0)/receipts.length : 0;
  return <section className="metrics" aria-label="Synthetic Demo Metrics"><span><b>{receipts.length}</b> Evaluated</span><span><b>{count("ALLOW")}</b> ALLOW</span><span><b>{count("NEEDS_REVIEW")}</b> REVIEW</span><span><b>{count("DENY")}</b> DENY</span><span><b>{avg.toFixed(2)} ms</b> Local average</span></section>;
}
