import type { EvidenceReceipt } from "../authority/types";
export function AuditTimeline({ receipts }: { receipts: EvidenceReceipt[] }) {
  return <section className="panel"><h2>Append-Only Session Timeline</h2>{receipts.length ? <ol>{receipts.map(r => <li key={r.receipt_id}><time>{r.created_at}</time><strong>{r.receipt_type}</strong><span>{r.decision} · {r.operational_effect}</span></li>)}</ol> : <p>No session events.</p>}</section>;
}
