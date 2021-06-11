import { AbstractActionOrMove } from "./AbstractActionOrMove";

// todo need to be able to specify the type of energy to withdraw.
export class Withdraw extends AbstractActionOrMove<StructureContainer | StructureStorage> {
    protected _action(creep: Creep, target: Structure | Tombstone | Ruin): ScreepsReturnCode {
        return creep.withdraw(target, RESOURCE_ENERGY);
    }

    cancelOnEmpty(): boolean {
        return false;
    }

    cancelOnFull(): boolean {
        return true;
    }

}
