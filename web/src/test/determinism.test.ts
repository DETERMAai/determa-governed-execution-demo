import { expect, it } from "vitest";
import { evaluateAuthority } from "../authority/evaluator";
import { softwareDeliveryPack as pack } from "../domain-packs/softwareDelivery";
it("same canonical input has same decision hashes", () => { const fixture=pack.fixtures[0]; const input={ action:fixture.action, approval:fixture.approval, context:fixture.context, policy:fixture.policy, mode:"SHADOW" as const, domain_pack_version:pack.version }; expect(evaluateAuthority(input,pack)).toEqual(evaluateAuthority(JSON.parse(JSON.stringify(input)),pack)); });
