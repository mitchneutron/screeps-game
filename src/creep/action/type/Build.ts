import { AbstractActionOrMove } from "./AbstractActionOrMove";

export class Build extends AbstractActionOrMove<ConstructionSite> {
    cancelOnEmpty(): boolean {
        return true;
    }

    cancelOnFull(): boolean {
        return false;
    }

    protected _action(creep: Creep, target: ConstructionSite): ScreepsReturnCode {
        return creep.build(target);
    }

}
