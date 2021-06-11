import { WithdrawAssignment } from "./WithdrawAssignment";

export class StorageWithdrawAssignment extends WithdrawAssignment {
    constructor() {
        super(x => x.structureType === STRUCTURE_STORAGE);
    }
}
