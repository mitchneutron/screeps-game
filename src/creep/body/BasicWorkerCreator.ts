import { IBodyCreator } from "./IBodyCreator";

export class BasicWorkerCreator implements IBodyCreator {
    createBody(energy: number): BodyPartConstant[] {
        const perLevelCost = BODYPART_COST.carry + BODYPART_COST.work + BODYPART_COST.move;
        const levels = Math.floor(energy / perLevelCost);
        const toReturn : BodyPartConstant[] = [];
        for(let i = 0; i < levels; i++) {
            toReturn.push(CARRY);
            toReturn.push(WORK);
            toReturn.push(MOVE);
        }

        return toReturn;
    }
}