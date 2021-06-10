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
    new ConstructionManager(),
    new CreepActionManager(),
    new SpawnManager(),
    new RoomManager(),
    new MemoryCleanup()
]));

export {
    loop,
    unwrappedLoop,
};

