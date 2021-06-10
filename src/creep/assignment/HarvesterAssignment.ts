import { Memory } from "../../../test/unit/mock";
import { IActionAssignment } from "./IActionAssignment";

export class HarvesterAssignment implements IActionAssignment {
    assignAction(creep: Creep): void {
        creep.memory.action = undefined;
        creep.memory.target = undefined;
        if(creep.store.getFreeCapacity() === 0) {
            // creep.room.find()
        }
    }

}