import { AbstractActionOrMove } from "./AbstractActionOrMove";

export class Upgrade extends AbstractActionOrMove<StructureController> {
    cancelOnEmpty(): boolean {
        return true;
    }

    cancelOnFull(): boolean {
        return false;
    }

    protected _action(creep: Creep, target: StructureController): ScreepsReturnCode {
        return creep.upgradeController(target);
    }

}
