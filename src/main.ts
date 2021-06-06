import { ConstructionManager } from "./construction/ConstructionManager";
import { CreepActionManager } from "./creep/CreepActionManager";
import { ErrorMapper } from "./utils/ErrorMapper";
import { RoomManager } from "./room/RoomManager";
import { SpawnManager } from "./creep/spawn/SpawnManager";


// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
    // console.log(`Current game tick is ${Game.time}`);

    // if(Memory.storages == null)
    //     Memory.storages = {};
    // StructureStorage.prototype.memory =

    RoomManager.run();
    SpawnManager.run();
    ConstructionManager.run();
    CreepActionManager.run();

    // Automatically delete memory of missing creeps
    handleCleanup();
});

function handleCleanup() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            const creepMemory = Memory.creeps[name];
            if(creepMemory.spawn){
                Game.getObjectById(creepMemory.spawn)?.memory.deadCreeps.push(creepMemory);
            }
            console.log("Removing creep from memory: " + Memory.creeps[name]);
            delete Memory.creeps[name];
        }
    }
}
