import { ActionAssignment } from "./ActionAssignment";
import { ContainerWithdraw } from "./type/ContainerWithdraw";
import { IndiscriminateStore } from "./type/IndiscriminateStore";
import { Pickup } from "./type/Pickup";
import { PriorityStore } from "./type/PriorityStore";
import { StorageWithdraw } from "./type/StorageWithdraw";

export class CarrierAssignment extends ActionAssignment {
    constructor() {
        super([
            new Pickup(),
            new ContainerWithdraw(),
            new StorageWithdraw(),
            new PriorityStore(),
            new IndiscriminateStore(),
        ]);
    }
}
