import { CreepType } from "../../const/CreepType";
import { BasicWorkerActionAssignment } from "./BasicWorkerActionAssignment";
import { IActionAssignment } from "./IActionAssignment";

export class AssignmentFactory {
    private static assignmentMap: Map<CreepType, IActionAssignment> = new Map([
        [CreepType.BasicWorker, new BasicWorkerActionAssignment() as IActionAssignment],
        [CreepType.AdvancedWorker, new BasicWorkerActionAssignment() as IActionAssignment],
    ]);

    static create(type: CreepType): IActionAssignment {
        return AssignmentFactory.assignmentMap.get(type)!;
    }
}