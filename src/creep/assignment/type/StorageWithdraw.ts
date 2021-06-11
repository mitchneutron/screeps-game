import { Withdraw } from "./Withdraw";

export class StorageWithdraw extends Withdraw {
    constructor() {
        super(x => x.structureType === STRUCTURE_STORAGE);
    }
}
