import { IBodyCreator } from "./IBodyCreator";

export class SettlerCreator implements IBodyCreator {
    createBody(energy: number): BodyPartConstant[] {
        const totalCost = BODYPART_COST.claim + BODYPART_COST.tough * 2 + BODYPART_COST.move * 3;
        if(totalCost > energy) return [];

        return [TOUGH, TOUGH, MOVE, MOVE, MOVE, CLAIM];
    }

}