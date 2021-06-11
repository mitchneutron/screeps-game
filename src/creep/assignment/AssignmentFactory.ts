import { ActionAssignment } from "./ActionAssignment";
import { CreepType } from "../../const/CreepType";
import { IActionAssignmentManager } from "./IActionAssignmentManager";

export interface IAssignmentManagerFactory {
    create(type: CreepType): ActionAssignment | undefined
}

export class AssignmentFactory implements IAssignmentManagerFactory {
    private static assignmentMap: Map<CreepType, ActionAssignment> = new Map([
        [CreepType.BasicWorker, new ActionAssignment([])],
        [CreepType.Harvester, new ActionAssignment([])],
        [CreepType.Carrier, new ActionAssignment([])],
    ]);

    create(type: CreepType): ActionAssignment | undefined {
        return AssignmentFactory.assignmentMap.get(type);
    }
}
