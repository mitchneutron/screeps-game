import { ConstructionManager } from "./construction/ConstructionManager";
import { ActionFactory } from "./creep/action/ActionFactory";
import { AssignmentFactory } from "./creep/assignment/AssignmentFactory";
import { BodyCreatorFactory } from "./creep/body/BodyCreatorFactory";
import { CreepActionManager } from "./creep/action/CreepActionManager";
import { SpawnManager } from "./creep/spawn/SpawnManager";
import { QueueStrategy } from "./creep/spawn/strategy/QueueStrategy";
import { RequiredCreepStrategy } from "./creep/spawn/strategy/RequiredCreepStrategy";
import { MemoryCleanup } from "./memory/MemoryCleanup";
import { RoomManager } from "./room/RoomManager";
import "./types";
import { ErrorMapper } from "./utils/ErrorMapper";

function unwrappedLoop(services: Runnable[]): void {
    if (Memory.sources == null)
        Memory.sources = {};
    if (Memory.queue == null)
        Memory.queue = [];

    services.forEach(service => service.run());
}

const bodyCreatorFactory = new BodyCreatorFactory();

const loop = ErrorMapper.wrapLoop(() => unwrappedLoop([
    new CreepActionManager(Object.values(Game.creeps), new AssignmentFactory(), new ActionFactory()),
    new SpawnManager(Object.values(Game.spawns), [new RequiredCreepStrategy(bodyCreatorFactory), new QueueStrategy(bodyCreatorFactory, Memory.queue)]),
    new RoomManager(Object.values(Game.rooms), new ConstructionManager()),
    new MemoryCleanup(Game.creeps, Memory.creeps, {
        receive(memory: CreepMemory) {
            if (memory.spawn) {
                Game.getObjectById(memory.spawn)?.memory.deadCreeps.push(memory);
            }
        },
    }),
]));

export {
    loop,
    unwrappedLoop,
};

