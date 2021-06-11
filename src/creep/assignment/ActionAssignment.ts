import { BuildAssignment } from "./type/BuildAssignment";
import { ContainerWithdrawAssignment } from "./type/ContainerWithdrawAssignment";
import { ControllerUpgradeAssignment} from "./type/ControllerUpgradeAssignment";
import { HarvestAssignment } from "./type/HarvestAssignment";
import { IActionAssignment } from "./type/IActionAssignment";
import { IndiscriminateStoreAssignment } from "./type/IndiscriminateStoreAssignment";
import { PickupAssignment } from "./type/PickupAssignment";
import { PriorityStoreAssignment } from "./type/PriorityStoreAssignment";
import { RandomizedControllerUpgradeAssignment } from "./type/RandomizedControllerUpgradeAssignment";
import { StorageWithdrawAssignment } from "./type/StorageWithdrawAssignment";
import { StoreAssignment } from "./type/StoreAssignment";
import { WithdrawAssignment } from "./type/WithdrawAssignment";

export interface IActionAssignmentManager {
    assignAction(creep: Creep) : void
}

export class ActionAssignment implements IActionAssignmentManager{
    private readonly assignments: IActionAssignment[];

    constructor(assignments: IActionAssignment[]) {
        this.assignments = assignments;
    }

    assignAction(creep: Creep): void {
        creep.memory.target = undefined;
        creep.memory.action = undefined;

        for(const assignment of this.assignments) {
            if(assignment.shouldAssign(creep) && assignment.assign(creep)) return;
        }

        creep.say("nothing to do.");
    }
}

export class BasicWorkerAssignment extends ActionAssignment {
    constructor() {
        super([
            new PickupAssignment(),
            new ContainerWithdrawAssignment(),
            new StorageWithdrawAssignment(),
            new HarvestAssignment(),
            new RandomizedControllerUpgradeAssignment(),
            new PriorityStoreAssignment(),
            new BuildAssignment(),
            new IndiscriminateStoreAssignment(),
            new ControllerUpgradeAssignment()
        ]);
    }
}

export class HarvesterAssignment extends ActionAssignment {
    constructor() {
        super([
            new HarvestAssignment(),

        ]);
    }
}
