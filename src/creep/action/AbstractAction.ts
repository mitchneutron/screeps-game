import { ICreepAction } from "./ICreepAction";

export abstract class AbstractAction<T> implements ICreepAction {
    performAction(creep: Creep): boolean {
        if(this.cancelOnEmpty() && creep.store.getUsedCapacity() === 0) return false;
        if(this.cancelOnFull() && creep.store.getFreeCapacity() === 0) return false;

        const target : T | null = Game.getObjectById<T>(creep.memory.target!);
        if(target == null) return false;
        return this._performAction(creep, target);
    }
    protected abstract _performAction(creep: Creep, target: T): boolean
    abstract cancelOnEmpty() : boolean
    abstract cancelOnFull() : boolean

    protected moveCreep(
        creep: Creep,
        target: RoomPosition,
    ): boolean {
        const result =  creep.moveTo(target, {
            reusePath: 8,
            visualizePathStyle: {
                fill: "transparent",
                stroke: "#fff",
                lineStyle: "dashed",
                strokeWidth: 0.15,
                opacity: 0.1,
            },
        });
        return this.isValidResult(result);
    }

    protected isValidResult(result : ScreepsReturnCode) : boolean {
        return result === OK ||
            result === ERR_TIRED ||
            result === ERR_BUSY;
    }
}

