import { IBodyCreator } from "./IBodyCreator";

export class CarrierCreator implements IBodyCreator {
    createBody(energy: number): BodyPartConstant[] {
        const levelCost = BODYPART_COST.move * 2 + BODYPART_COST.carry * 3;
        const levels = Math.floor(energy/levelCost);
        const toReturn : BodyPartConstant[] = [];
        for(let i = 0; i < levels; i++){
            toReturn.push(CARRY);
            toReturn.push(CARRY);
            toReturn.push(CARRY);
            toReturn.push(MOVE);
            toReturn.push(MOVE);

        }
        return toReturn;
    }

}