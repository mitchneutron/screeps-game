import { CreepActionConst } from "../../../const/CreepActionConst";
import { CachedActionAssignment } from "./CachedActionAssignment";

export class Build extends CachedActionAssignment<ConstructionSite> {
    protected _assign(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.Build;
        creep.memory.target = this.getFirstInCache().id;
        creep.say("Building " + this.getFirstInCache().structureType);
        return true;
    }

    protected preCacheShouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity(RESOURCE_ENERGY) >= 0;
    }

    protected getNewData(creep: Creep): ConstructionSite[] {
        return creep.room.find(FIND_MY_CONSTRUCTION_SITES);
    }

    protected postCacheShouldAssign(creep: Creep): boolean {
        return true;
    }

}
