import { CreepActionConst } from "../../../const/CreepActionConst";
import { IActionAssignment } from "./IActionAssignment";

export class Drop implements IActionAssignment {
    assign(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.Drop;
        return true;
    }

    shouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity() > 0;
    }
}
