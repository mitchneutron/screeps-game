import { AbstractAction } from "./AbstractAction";

export class ActionUpgrade extends AbstractAction<StructureController> {
    _performAction(creep: Creep, target: StructureController): boolean {
        const result = creep.upgradeController(target);
        if (result === ERR_NOT_IN_RANGE) {
            return  this.moveCreep(creep, target.pos);
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