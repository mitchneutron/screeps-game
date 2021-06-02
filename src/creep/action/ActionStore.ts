import { AbstractAction } from "./AbstractAction";

export class ActionStore extends AbstractAction<Creep | PowerCreep | Structure> {
    protected _performAction(creep: Creep, target: Creep | PowerCreep | Structure): boolean {
        const result = creep.transfer(target, RESOURCE_ENERGY);
        if (result === ERR_NOT_IN_RANGE) {
            return this.moveCreep(creep, target.pos);
        }
        return this.isValidResult(result);
    }

    cancelOnEmpty(): boolean {
        return true;
    }

    cancelOnFull(): boolean {
        return false;
    }

}