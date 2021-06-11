import { ActionAssignment} from "./ActionAssignment";
import { CreepType } from "../../const/CreepType";
import { BasicWorkerAssignment } from "./BasicWorkerAssignment";
import { CarrierAssignment } from "./CarrierAssignment";
import { HarvesterAssignment } from "./HarvesterAssignment";

export interface IAssignmentManagerFactory {
    create(type: CreepType): ActionAssignment | undefined
}

export class AssignmentFactory implements IAssignmentManagerFactory {
    private readonly assignmentMap: Map<CreepType, ActionAssignment>;
    private readonly harvesterRange: number;

    constructor(harvesterRange: number) {
        this.harvesterRange = harvesterRange;
        this.assignmentMap = new Map([
            [CreepType.BasicWorker, new BasicWorkerAssignment()],
            [CreepType.Harvester, new HarvesterAssignment(this.harvesterRange)],
            [CreepType.Carrier, new CarrierAssignment()],
        ]);
    }

    create(type: CreepType): ActionAssignment | undefined {
        return this.assignmentMap.get(type);
    }
}
