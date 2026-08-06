import { expect, it } from "vitest";
import { evaluateAuthority } from "../authority/evaluator";
import { softwareDeliveryPack as pack } from "../domain-packs/softwareDelivery";
it("one head mutation changes ALLOW to DENY", () => { const fixture=JSON.parse(JSON.stringify(pack.fixtures[0])); fixture.context.current_head_sha="cccccccccccccccccccccccccccccccccccccccc"; const result=evaluateAuthority({ action:fixture.action, approval:fixture.approval, context:fixture.context, policy:fixture.policy, mode:"SHADOW", domain_pack_version:pack.version },pack); expect(result.decision).toBe("DENY"); expect(result.reason_codes).toContain("HEAD_SHA_MISMATCH"); });
