import { ActionAssignment } from "./ActionAssignment";
import { Build } from "./type/Build";
import { ContainerWithdraw } from "./type/ContainerWithdraw";
import { ControllerUpgrade } from "./type/ControllerUpgrade";
import { Harvest } from "./type/Harvest";
import { IndiscriminateStore } from "./type/IndiscriminateStore";
import { Pickup } from "./type/Pickup";
import { PriorityStore } from "./type/PriorityStore";
import { RandomizedControllerUpgrade } from "./type/RandomizedControllerUpgrade";
import { StorageWithdraw } from "./type/StorageWithdraw";

export class BasicWorkerAssignment extends ActionAssignment {
    constructor() {
        super([
            new Pickup(),
            new ContainerWithdraw(),
            new StorageWithdraw(),
            new Harvest(),
            new RandomizedControllerUpgrade(),
            new PriorityStore(),
            new Build(),
            new IndiscriminateStore(),
            new ControllerUpgrade(),
        ]);
    }
}
