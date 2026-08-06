import type { ComparisonDimension } from "../authority/types";
import { readPath } from "../domain-packs/types";
const format = (value: unknown) => typeof value === "string" ? value : JSON.stringify(value);
export function ComparisonTable({ dimensions, source }: { dimensions: ComparisonDimension[]; source: unknown }) {
  return <section className="panel wide"><h2>Authority Comparison</h2><table><thead><tr><th>Dimension</th><th>Approved</th><th>Current</th><th>Result</th></tr></thead><tbody>{dimensions.map(d => { const approved=readPath(source,d.approved_path); const current=readPath(source,d.current_path); const match=JSON.stringify(approved)===JSON.stringify(current); return <tr key={d.id}><th>{d.label}</th><td>{format(approved)}</td><td>{format(current)}</td><td>{match ? "✓ Match" : "! Changed"}</td></tr>; })}</tbody></table></section>;
}
