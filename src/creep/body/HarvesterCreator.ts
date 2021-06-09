import { IBodyCreator } from "./IBodyCreator";

export class HarvesterCreator implements IBodyCreator {
    createBody(energy: number): BodyPartConstant[] {
        const cost = 5 * BODYPART_COST.work + 2 * BODYPART_COST.move + 2 * BODYPART_COST.carry;
        if(cost > energy) return [];

        return [WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,CARRY,CARRY];
    }
    
}