import { IActionAssignment } from "./type/IActionAssignment";

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

