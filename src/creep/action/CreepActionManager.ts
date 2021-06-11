import { ActionFactory, IActionFactory } from "./ActionFactory";
import { AssignmentFactory, IAssignmentManagerFactory } from "../assignment/AssignmentFactory";

export class CreepActionManager {
    private readonly creeps: Creep[];
    private readonly assignmentFactory: IAssignmentManagerFactory;
    private readonly actionFactory: IActionFactory;

    constructor(creeps: Creep[], assignmentFactory: IAssignmentManagerFactory, actionFactory: IActionFactory) {
        this.creeps = creeps;
        this.assignmentFactory = assignmentFactory;
        this.actionFactory = actionFactory;
    }

    run(): void {
        for (const creep of this.creeps) {
                if (creep.memory.action == null || creep.memory.target == null)
                this.assignmentFactory.create(creep.memory.type)!.assignAction(creep);
            // TODO maybe I want to vary what actions actually do when the type is different? This would be an ActionFactoryFactory based on type.
            const result = this.actionFactory.create(creep.memory.action!).performAction(creep);
            if (!result) {
                creep.memory.action = undefined;
                creep.memory.target = undefined;
            }
        }
    }

}


