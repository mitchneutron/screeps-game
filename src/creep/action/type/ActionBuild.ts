import { AbstractActionOrMove } from "./AbstractActionOrMove";

export class ActionBuild extends AbstractActionOrMove<ConstructionSite> {
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