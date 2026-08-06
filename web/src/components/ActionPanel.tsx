import type { ActionDescriptor } from "../authority/types";
export function ActionPanel({ value, onChange }: { value: ActionDescriptor; onChange: (value: ActionDescriptor) => void }) {
  const set = (key: keyof ActionDescriptor, next: string | number) => onChange({ ...value, [key]: next });
  return <section className="panel"><h2>Current Action Request</h2><div className="form-grid">
    <label>Action Type<input aria-label="Action Type" value={value.action_type} onChange={e => set("action_type", e.target.value)} /></label>
    <label>Target System<input aria-label="Target System" value={value.target_system} onChange={e => set("target_system", e.target.value)} /></label>
    <label>Target Resource<input aria-label="Target Resource" value={value.target_resource} onChange={e => set("target_resource", e.target.value)} /></label>
    <label>Requested Scope<input aria-label="Requested Scope" value={value.requested_scope} onChange={e => set("requested_scope", e.target.value)} /></label>
    <label>Context Version<input aria-label="Action Context Version" type="number" value={value.context_version} onChange={e => set("context_version", Number(e.target.value))} /></label>
    <label>Payload Digest<input aria-label="Payload Digest" value={value.payload_digest} onChange={e => set("payload_digest", e.target.value)} /></label>
  </div><details><summary>Payload JSON</summary><textarea aria-label="Payload JSON" value={JSON.stringify(value.payload, null, 2)} onChange={e => { try { onChange({ ...value, payload: JSON.parse(e.target.value) }); } catch { /* keep last valid value */ } }} /></details></section>;
}
