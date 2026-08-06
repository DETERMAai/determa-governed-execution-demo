import { describe, expect, it } from "vitest";
import { evaluateAuthority } from "../authority/evaluator";
import { softwareDeliveryPack } from "../domain-packs/softwareDelivery";
import { crmOperationsPack } from "../domain-packs/crmOperations";

for (const pack of [softwareDeliveryPack, crmOperationsPack]) {
  describe(pack.domain_id, () => {
    for (const fixture of pack.fixtures) it(`${fixture.fixture_id} -> ${fixture.expected_decision}`, () => {
      const result = evaluateAuthority({ action: fixture.action, approval: fixture.approval, context: fixture.context, policy: fixture.policy, mode: "SHADOW", domain_pack_version: pack.version }, pack);
      expect(result.decision).toBe(fixture.expected_decision);
      expect(result.reason_codes).toEqual(fixture.expected_reason_codes);
    });
  });
}
