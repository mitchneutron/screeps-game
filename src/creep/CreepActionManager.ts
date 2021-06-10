import { ActionFactory } from "./action/ActionFactory";
import { AssignmentFactory } from "./assignment/AssignmentFactory";

export class CreepActionManager {
    run(): void {
        for (const name in Game.creeps) {
            const creep = Game.creeps[name];
            if (creep.memory.action == null || creep.memory.target == null)
                AssignmentFactory.create(creep.memory.type).assignAction(creep);
            // TODO maybe I want to vary what actions actually do when the type is different? This would be an ActionFactoryFactory based on type.
            const result = ActionFactory.create(creep.memory.action!).performAction(creep);
            if (!result) creep.memory.action = undefined;
        }
    }

}


