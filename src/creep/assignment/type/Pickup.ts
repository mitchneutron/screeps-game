import { CreepActionConst } from "../../../const/CreepActionConst";
import { CachedActionAssignment } from "./CachedActionAssignment";

export class Pickup extends CachedActionAssignment<Resource> {
    protected _assign(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.PickUp;
        creep.memory.target = this.getFirstInCache().id;
        return true;
    }

    protected preCacheShouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity() === 0;
    }

    protected getNewData(creep: Creep): Resource[] {
        return creep.room.find(FIND_DROPPED_RESOURCES);
    }

    protected postCacheShouldAssign(creep: Creep): boolean {
        return true;
    }

}
