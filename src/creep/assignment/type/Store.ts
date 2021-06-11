import { CreepActionConst } from "../../../const/CreepActionConst";
import { CachedActionAssignment } from "./CachedActionAssignment";

export class Store extends CachedActionAssignment<Structure> {
    private readonly filter: (structure: Structure) => boolean;

    constructor(filter: (structure: Structure) => boolean) {
        super();
        this.filter = filter;
    }

    protected _assign(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.Store;
        creep.memory.target = this.getFirstInCache().id;
        creep.say("storing");
        return true;
    }

    protected preCacheShouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity() > 0;
    }

    protected getNewData(creep: Creep): Structure[] {
        return creep.room.find(FIND_MY_STRUCTURES, {
            filter: this.filter,
        });
    }

    protected postCacheShouldAssign(creep: Creep): boolean {
        return true;
    }
}

