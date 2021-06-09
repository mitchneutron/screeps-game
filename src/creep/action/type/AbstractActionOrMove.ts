import { AbstractAction } from "./AbstractAction";

export abstract class AbstractActionOrMove<T extends {pos: RoomPosition}> extends AbstractAction<T> {
    protected _performAction(creep: Creep, target: T): boolean {
        const result = this._action(creep, target);
        if (result === ERR_NOT_IN_RANGE) return this.moveCreep(creep, target.pos);
        return this.isValidResult(result);
    }

    protected abstract _action(creep: Creep, target: T): ScreepsReturnCode;
}

