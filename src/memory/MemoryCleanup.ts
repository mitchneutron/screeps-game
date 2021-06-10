export class MemoryCleanup implements Runnable {
    run(): void {
        handleCleanup();
    }

}

function handleCleanup() {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            const creepMemory = Memory.creeps[name];
            if (creepMemory.spawn) {
                Game.getObjectById(creepMemory.spawn)?.memory.deadCreeps.push(creepMemory);
            }
            console.log("Removing creep from memory: " + Memory.creeps[name]);
            delete Memory.creeps[name];
        }
    }
}
