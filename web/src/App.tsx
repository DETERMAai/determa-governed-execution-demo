import { useMemo, useState } from "react";
import "./styles.css";
import type { ActionDescriptor, DemoMode, EvidenceReceipt, RuntimeContext, ScenarioFixture } from "./authority/types";
import { evaluateAuthority } from "./authority/evaluator";
import { createReceipt } from "./authority/receipt";
import { replayEvaluation } from "./authority/replay";
import { executeSimulation } from "./authority/simulatedExecution";
import { softwareDeliveryPack } from "./domain-packs/softwareDelivery";
import { crmOperationsPack } from "./domain-packs/crmOperations";
import { ScenarioSelector } from "./components/ScenarioSelector";
import { ActionPanel } from "./components/ActionPanel";
import { ApprovalPanel } from "./components/ApprovalPanel";
import { RuntimeContextPanel } from "./components/RuntimeContextPanel";
import { DecisionPanel } from "./components/DecisionPanel";
import { ComparisonTable } from "./components/ComparisonTable";
import { ReceiptPanel } from "./components/ReceiptPanel";
import { AuditTimeline } from "./components/AuditTimeline";
import { MetricsStrip } from "./components/MetricsStrip";

const packs = [softwareDeliveryPack, crmOperationsPack];
const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

export default function App() {
  const [domain, setDomain] = useState(packs[0].domain_id);
  const pack = useMemo(() => packs.find(item => item.domain_id === domain) ?? packs[0], [domain]);
  const initial = pack.fixtures[0];
  const [fixtureId, setFixtureId] = useState(initial.fixture_id);
  const [fixture, setFixture] = useState<ScenarioFixture>(clone(initial));
  const [mode, setMode] = useState<DemoMode>("SHADOW");
  const [receipt, setReceipt] = useState<EvidenceReceipt | null>(null);
  const [receipts, setReceipts] = useState<EvidenceReceipt[]>([]);

  const load = (nextDomain: string, nextFixture?: string) => {
    const nextPack = packs.find(item => item.domain_id === nextDomain) ?? packs[0];
    const selected = nextPack.fixtures.find(item => item.fixture_id === nextFixture) ?? nextPack.fixtures[0];
    setDomain(nextDomain); setFixtureId(selected.fixture_id); setFixture(clone(selected)); setReceipt(null);
  };
  const evaluate = () => {
    const start = performance.now();
    const decision = evaluateAuthority({ action: fixture.action, approval: fixture.approval, context: fixture.context, policy: fixture.policy, mode, domain_pack_version: pack.version }, pack);
    const next = createReceipt(decision, fixture.action.action_id, pack.domain_id, pack.version, mode, performance.now()-start);
    setReceipt(next); setReceipts(items => [...items, next]);
  };
  const replay = () => {
    if (!receipt) return;
    const next = replayEvaluation({ action: fixture.action, approval: fixture.approval, context: fixture.context, policy: fixture.policy, mode, domain_pack_version: pack.version }, pack, receipt);
    setReceipt(next); setReceipts(items => [...items, next]);
  };
  const execute = () => {
    if (!receipt) return;
    const next = executeSimulation(receipt);
    setReceipt(next); setReceipts(items => [...items, next]);
  };
  return <main>
    <header><div><p className="eyebrow">DETERMA</p><h1>Runtime Execution Authority Console</h1><p>Agents propose. Authority decides. Constrained executors mutate. Evidence proves.</p></div><div className="status"><strong>Synthetic Environment — No Production Access</strong><span>Policy: {fixture.policy.policy_version}</span><span>Local Demo Status: READY</span></div></header>
    <MetricsStrip receipts={receipts} />
    <section className="toolbar"><label>Workflow Domain<select aria-label="Workflow Domain" value={domain} onChange={e => load(e.target.value)}>{packs.map(item => <option key={item.domain_id} value={item.domain_id}>{item.display_name}</option>)}</select></label><label>Mode<select aria-label="Mode" value={mode} onChange={e => setMode(e.target.value as DemoMode)}><option value="SHADOW">Shadow</option><option value="ENFORCED_SIMULATION">Enforced Simulation</option></select></label></section>
    <ScenarioSelector pack={pack} selected={fixtureId} onSelect={id => load(domain,id)} />
    <section className="columns"><ActionPanel value={fixture.action} onChange={(action: ActionDescriptor)=>setFixture({...fixture,action})}/><ApprovalPanel approval={fixture.approval}/><RuntimeContextPanel value={fixture.context} onChange={(context: RuntimeContext)=>setFixture({...fixture,context})}/></section>
    <section className="action-row"><button className="primary" onClick={evaluate}>Evaluate Execution Authority</button><button onClick={replay} disabled={!receipt}>Replay Same Evaluation</button><button onClick={execute} disabled={!receipt || mode !== "ENFORCED_SIMULATION" || receipt.decision !== "ALLOW"}>Execute Simulated Release</button>{receipt?.deterministic_match !== undefined && <strong>Deterministic Match: {String(receipt.deterministic_match).toUpperCase()}</strong>}</section>
    <DecisionPanel receipt={receipt}/>
    <ComparisonTable dimensions={pack.comparison_dimensions} source={fixture}/>
    <section className="columns bottom"><ReceiptPanel receipt={receipt}/><AuditTimeline receipts={receipts}/></section>
    <footer>All data is synthetic. Observed decision time is local-demo telemetry and is not an enterprise latency claim.</footer>
  </main>;
}
