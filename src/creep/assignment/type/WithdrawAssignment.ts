import { CreepActionConst } from "../../../const/CreepActionConst";
import { CachedActionAssignment } from "./CachedActionAssignment";

export class WithdrawAssignment extends CachedActionAssignment<Structure> {
    private readonly filter: (structure: Structure) => boolean;

    constructor(filter: (structure: Structure) => boolean) {
        super();
        this.filter = filter;
    }

    _assign(creep: Creep): boolean {
        creep.memory.target = this.getFirstInCache().id;
        creep.memory.action = CreepActionConst.Withdraw;
        return true;
    }

    _shouldAssign(creep: Creep): boolean {
        return creep.store.getUsedCapacity() === 0;
    }

    getNewData(creep: Creep): Structure[] {
        return creep.room.find(FIND_STRUCTURES, { filter: this.filter });
    }
}

