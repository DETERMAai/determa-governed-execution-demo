import type { ApprovalSnapshot } from "../authority/types";
export function ApprovalPanel({ approval }: { approval: ApprovalSnapshot }) {
  return <section className="panel immutable"><h2>Approved Authority Snapshot — Immutable</h2><dl><dt>Approval ID</dt><dd>{approval.approval_id}</dd><dt>Action</dt><dd>{approval.approved_action_type}</dd><dt>Target</dt><dd>{approval.approved_target_system} / {approval.approved_target_resource}</dd><dt>Scope</dt><dd>{approval.approved_scope}</dd><dt>Policy</dt><dd>{approval.approved_policy_version}</dd><dt>Expires</dt><dd>{approval.expires_at}</dd><dt>Single use</dt><dd>{String(approval.single_use)}</dd><dt>Used</dt><dd>{String(approval.used)}</dd></dl></section>;
}
