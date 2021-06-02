import { AbstractAction } from "./AbstractAction";

export class ActionBuild extends AbstractAction<ConstructionSite> {
    protected _performAction(creep: Creep, target: ConstructionSite): boolean {
        const result = creep.build(target);
        if(result === ERR_NOT_IN_RANGE) return this.moveCreep(creep, target.pos);
        return this.isValidResult(result);
    }

    cancelOnEmpty(): boolean {
        return false;
    }

    cancelOnFull(): boolean {
        return false;
    }

}