import { AbstractActionOrMove } from "./AbstractActionOrMove";

export class PickUp extends AbstractActionOrMove<Resource> {
    cancelOnEmpty(): boolean {
        return false;
    }

    cancelOnFull(): boolean {
        return true;
    }

    protected _action(creep: Creep, target: Resource): ScreepsReturnCode {
        return creep.pickup(target);
    }

}
