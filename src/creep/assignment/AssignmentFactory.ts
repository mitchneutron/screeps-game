import { CreepType } from "../../const/CreepType";
import { BasicWorkerActionAssignment } from "./BasicWorkerActionAssignment";
import { IActionAssignment } from "./IActionAssignment";

export interface IAssignmentFactory {
    create(type: CreepType) :IActionAssignment
}

export class AssignmentFactory implements IAssignmentFactory{
    private static assignmentMap: Map<CreepType, IActionAssignment> = new Map([
        [CreepType.BasicWorker, new BasicWorkerActionAssignment() as IActionAssignment],
        [CreepType.Harvester, new BasicWorkerActionAssignment() as IActionAssignment],
        [CreepType.Carrier, new BasicWorkerActionAssignment() as IActionAssignment],
    ]);

    create(type: CreepType): IActionAssignment {
        return AssignmentFactory.assignmentMap.get(type)!;
    }
}
