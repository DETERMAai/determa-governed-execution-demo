import { expect, it } from "vitest";
import { evaluateAuthority } from "../authority/evaluator";
import { createReceipt } from "../authority/receipt";
import { replayEvaluation } from "../authority/replay";
import { crmOperationsPack as pack } from "../domain-packs/crmOperations";
it("evaluation replay has no effect and matches deterministically", () => { const f=pack.fixtures[0]; const input={action:f.action,approval:f.approval,context:f.context,policy:f.policy,mode:"SHADOW" as const,domain_pack_version:pack.version}; const original=createReceipt(evaluateAuthority(input,pack),f.action.action_id,pack.domain_id,pack.version,"SHADOW"); const replay=replayEvaluation(input,pack,original); expect(replay.deterministic_match).toBe(true); expect(replay.operational_effect).toBe("NONE"); expect(replay.receipt_id).not.toBe(original.receipt_id); });
