import { ConstructionManager } from "./construction/ConstructionManager";
import { CreepActionManager } from "./creep/CreepActionManager";
import { SpawnManager } from "./creep/spawn/SpawnManager";
import { MemoryCleanup } from "./memory/MemoryCleanup";
import { RoomManager } from "./room/RoomManager";
import "./types";
import { ErrorMapper } from "./utils/ErrorMapper";

function unwrappedLoop(services: Runnable[]): void {
    if (Memory.sources == null)
        Memory.sources = {};

    services.forEach(service => service.run());
}

const loop = ErrorMapper.wrapLoop(() => unwrappedLoop([
    new CreepActionManager(Object.values(Game.creeps)),
    new SpawnManager(Object.values(Game.spawns)),
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

