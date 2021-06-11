import { WithdrawAssignment } from "./WithdrawAssignment";

export class ContainerWithdrawAssignment extends WithdrawAssignment {
    constructor() {
        super(x => x.structureType === STRUCTURE_CONTAINER);
    }
}
