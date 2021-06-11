import { CreepActionConst } from "../../../const/CreepActionConst";
import { IActionAssignment } from "./IActionAssignment";

export class ControllerUpgradeAssignment implements IActionAssignment {
    assign(creep: Creep): boolean {
        const controller = creep.room.controller;
        if (controller == null) return false;
        creep.memory.action = CreepActionConst.Upgrade;
        creep.memory.target = controller.id;
        creep.say("upgrading controller");
        return true;
    }

    shouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0 && creep.room.controller !== undefined;
    }
}
