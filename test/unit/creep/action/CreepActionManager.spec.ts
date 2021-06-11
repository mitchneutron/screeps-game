import { mockInstanceOf } from "screeps-jest/src/mocking";
import { CreepActionConst } from "../../../../src/const/CreepActionConst";
import { CreepType } from "../../../../src/const/CreepType";
import { IActionFactory } from "../../../../src/creep/action/ActionFactory";
import { ICreepAction } from "../../../../src/creep/action/ICreepAction";
import { IAssignmentManagerFactory } from "../../../../src/creep/assignment/AssignmentFactory";
import { IActionAssignmentManager } from "../../../../src/creep/assignment/IActionAssignmentManager";
import { CreepActionManager } from "../../../../src/creep/action/CreepActionManager";

let creeps: Creep[];
let service: CreepActionManager;
const assignment = mockInstanceOf<IAssignmentManagerFactory>({
    create(type: CreepType): IActionAssignmentManager {
        return {
            assignAction(creep: Creep) {
                creep.memory.action = CreepActionConst.PickUp;
                creep.memory.target = "someTarget" as Id<undefined>;
            },
        };
    },
});

let positiveAction: ICreepAction;
let actionFactory: IActionFactory;

describe("CreepActionManager", () => {
    beforeEach(() => {
        positiveAction = mockInstanceOf<ICreepAction>({
            performAction(creep: Creep): boolean {
                return true;
            }});

        actionFactory =  mockInstanceOf<IActionFactory>({
            create(type: CreepActionConst): ICreepAction {
                return positiveAction;
            },
        });

        const noActionCreep = mockInstanceOf<Creep>({
            memory: {
                action: undefined,
                target: "target" as Id<undefined>,
                type: CreepType.Carrier,
            },
        });
        const noTargetCreep = mockInstanceOf<Creep>({
            memory: {
                action: CreepActionConst.PickUp,
                target: undefined,
                type: CreepType.Carrier,
            },
        });
        const assignedCreep = mockInstanceOf<Creep>({
            memory: {
                action: CreepActionConst.PickUp,
                target: "target" as Id<undefined>,
                type: CreepType.Carrier,
            },
        });
        creeps = [noActionCreep, noTargetCreep, assignedCreep];
        service = new CreepActionManager(creeps, assignment, actionFactory);
    });

    it("should assign new actions to creeps without assignment or target", () => {
        service.run();
        creeps.forEach(x => {
            expect(x.memory.action).toBeDefined();
            expect(x.memory.target).toBeDefined();
        });
    });

    it("should perform the creep actions", () => {
        service.run();
        creeps.forEach(x => {
            expect(positiveAction.performAction).toHaveBeenCalledWith(x);
        });
    });

    it("should clear actions when they fail", () => {
        actionFactory = mockInstanceOf<IActionFactory>({
            create(type: CreepActionConst): ICreepAction {
                return {
                    performAction(creep) : boolean {
                        return false;
                    }
                };
            }
        });
        service = new CreepActionManager(creeps, assignment, actionFactory);
        service.run();
        creeps.forEach(x => {
            expect(x.memory.target).toBeUndefined();
            expect(x.memory.action).toBeUndefined();
        });

    });
});
