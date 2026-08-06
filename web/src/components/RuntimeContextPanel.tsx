import type { RuntimeContext } from "../authority/types";
export function RuntimeContextPanel({ value, onChange }: { value: RuntimeContext; onChange: (value: RuntimeContext) => void }) {
  const set = (key: string, next: string | number) => onChange({ ...value, [key]: next });
  return <section className="panel"><h2>Current Runtime Context</h2><div className="form-grid">
    <label>Context Version<input aria-label="Runtime Context Version" type="number" value={value.context_version} onChange={e => set("context_version", Number(e.target.value))} /></label>
    <label>Risk State<select aria-label="Risk State" value={value.risk_state} onChange={e => set("risk_state", e.target.value)}><option>NORMAL</option><option>ELEVATED</option><option>CRITICAL</option></select></label>
    <label>Policy Version<input aria-label="Runtime Policy Version" value={value.policy_version} onChange={e => set("policy_version", e.target.value)} /></label>
    <label>Actor Status<select aria-label="Actor Status" value={value.actor_status} onChange={e => set("actor_status", e.target.value)}><option>ACTIVE</option><option>INACTIVE</option></select></label>
    {value.current_head_sha !== undefined && <label>Current Head SHA<input aria-label="Current Head SHA" value={String(value.current_head_sha)} onChange={e => set("current_head_sha", e.target.value)} /></label>}
    {value.current_base_sha !== undefined && <label>Current Base SHA<input aria-label="Current Base SHA" value={String(value.current_base_sha)} onChange={e => set("current_base_sha", e.target.value)} /></label>}
    {value.current_contact_version !== undefined && <label>Customer Record Version<input aria-label="Customer Record Version" type="number" value={Number(value.current_contact_version)} onChange={e => set("current_contact_version", Number(e.target.value))} /></label>}
  </div></section>;
}
