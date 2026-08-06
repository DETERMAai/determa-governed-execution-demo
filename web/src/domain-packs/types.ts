import type { ComparisonDimension, EvaluationInput, RuleFinding, ScenarioFixture } from "../authority/types";

export interface DomainPack {
  domain_id: string;
  version: string;
  display_name: string;
  fixtures: ScenarioFixture[];
  comparison_dimensions: ComparisonDimension[];
  evaluate: (input: EvaluationInput) => RuleFinding[];
}

export function readPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined, source);
}
