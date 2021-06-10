import { ActionFactory } from "./action/ActionFactory";
import { AssignmentFactory } from "./assignment/AssignmentFactory";

export class CreepActionManager {
    private creeps: Creep[];

    constructor(creeps: Creep[]) {
        this.creeps = creeps;
    }

    run(): void {
        for (const creep of this.creeps) {
            if (creep.memory.action == null || creep.memory.target == null)
                AssignmentFactory.create(creep.memory.type).assignAction(creep);
            // TODO maybe I want to vary what actions actually do when the type is different? This would be an ActionFactoryFactory based on type.
            const result = ActionFactory.create(creep.memory.action!).performAction(creep);
            if (!result) creep.memory.action = undefined;
        }
    }

}


