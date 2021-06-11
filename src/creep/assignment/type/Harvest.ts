import { CreepActionConst } from "../../../const/CreepActionConst";
import { IActionAssignment } from "./IActionAssignment";

export class Harvest implements IActionAssignment{
    assign(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.Harvest;
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length === 0) {
            return false;
        }
        // todo pick the source we have assigned to us or the closest one if it has a path
        // just pick a random one to spread it out
        creep.memory.target = sources[Math.floor(Math.random() * sources.length)].id;
        return true;
    }

    shouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity() === 0;
    }

}
