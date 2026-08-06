import type { EvidenceReceipt } from "../authority/types";
export function ReceiptPanel({ receipt }: { receipt: EvidenceReceipt | null }) {
  return <section className="panel wide"><h2>Evidence Receipt</h2>{receipt ? <><p><strong>{receipt.receipt_id}</strong> · {receipt.environment} · {receipt.observed_decision_time_ms} ms observed locally</p><pre>{JSON.stringify(receipt, null, 2)}</pre></> : <p>No receipt yet.</p>}</section>;
}
