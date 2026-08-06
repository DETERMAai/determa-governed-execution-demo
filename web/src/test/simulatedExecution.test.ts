import { expect, it } from "vitest";
import { evaluateAuthority } from "../authority/evaluator";
import { createReceipt } from "../authority/receipt";
import { executeSimulation, resetSimulatedReleaseState } from "../authority/simulatedExecution";
import { crmOperationsPack as pack } from "../domain-packs/crmOperations";
it("single-use simulated release applies once", () => { resetSimulatedReleaseState(); const f=pack.fixtures[0]; const input={action:f.action,approval:f.approval,context:f.context,policy:f.policy,mode:"ENFORCED_SIMULATION" as const,domain_pack_version:pack.version}; const receipt=createReceipt(evaluateAuthority(input,pack),f.action.action_id,pack.domain_id,pack.version,"ENFORCED_SIMULATION"); const first=executeSimulation(receipt); const second=executeSimulation(receipt); expect(first.operational_effect).toBe("SIMULATED_APPLIED"); expect(first.post_state_verification).toBe("PASS"); expect(second.decision).toBe("DENY"); expect(second.reason_codes).toEqual(["AUTHORITY_REUSE_NOT_ALLOWED"]); });
