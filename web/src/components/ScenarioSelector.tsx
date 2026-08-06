import type { DomainPack } from "../domain-packs/types";
export function ScenarioSelector({ pack, selected, onSelect }: { pack: DomainPack; selected: string; onSelect: (id: string) => void }) {
  return <section className="panel"><h2>Scenario</h2><div className="scenario-grid">{pack.fixtures.map(item => <button key={item.fixture_id} className={selected === item.fixture_id ? "selected" : ""} onClick={() => onSelect(item.fixture_id)}><strong>{item.expected_decision}</strong><span>{item.title}</span></button>)}</div></section>;
}
