import { AbstractAction } from "./AbstractAction";

export class ActionHarvest extends AbstractAction<Source | Mineral | Deposit> {
    protected _performAction(creep: Creep, target: Source | Mineral | Deposit): boolean {
        const result = creep.harvest(target);
        if(result === ERR_NOT_IN_RANGE) {
            return this.moveCreep(creep, target.pos);
        }
        return this.isValidResult(result);
    }

    cancelOnEmpty(): boolean {
        return false;
    }

    cancelOnFull(): boolean {
        return true;
    }

}