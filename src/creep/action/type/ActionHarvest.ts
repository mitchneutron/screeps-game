import { AbstractActionOrMove } from "./AbstractActionOrMove";

export class ActionHarvest extends AbstractActionOrMove<Source | Mineral | Deposit> {
    cancelOnEmpty(): boolean {
        return false;
    }

    cancelOnFull(): boolean {
        return true;
    }

    protected _action(creep: Creep, target: Source | Mineral | Deposit): ScreepsReturnCode {
        return  creep.harvest(target);
    }
}