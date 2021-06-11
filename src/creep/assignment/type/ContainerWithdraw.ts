import { Withdraw } from "./Withdraw";

export class ContainerWithdraw extends Withdraw {
    constructor() {
        super(x => x.structureType === STRUCTURE_CONTAINER);
    }
}
