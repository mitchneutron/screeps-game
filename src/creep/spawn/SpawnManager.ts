import { CreepType } from "../../const/CreepType";

export class SpawnManager {
    private static bodyMap: Map<CreepType, BodyPartConstant[]> = new Map([
        [CreepType.BasicWorker, [WORK, CARRY, MOVE]],
    ]);

    static run(): void {
        for (const spawnsKey in Game.spawns)
            this.handleSpawn(Game.spawns[spawnsKey]);
    }

    static handleSpawn(spawn: StructureSpawn) : void {
        if (spawn.memory.isInitialized !== true) this.initSpawn(spawn);
        for(const creepMemory of spawn.memory.deadCreeps){
            spawn.memory.queue.push(creepMemory);
            let current = spawn.memory.activeCreeps.get(creepMemory.type)!;
            current--;
            spawn.memory.activeCreeps.set(creepMemory.type, current);
        }
        spawn.memory.deadCreeps = [];

        // we want to spawn creeps if they are in the queue or if we don't have enough active creeps.
        if (spawn.memory.activeWorkers < spawn.memory.maxWorkers) {
            const creepName = "Worker_" + spawn.name + "_" + Date.now();
            if (
                spawn.spawnCreep([WORK, CARRY, MOVE], creepName, {
                    memory: this.createCreepMemory(CreepType.BasicWorker, spawn.id, creepName),
                }) === OK
            ) {
                spawn.memory.activeWorkers++;
            }
        }
    }

    private static createCreepMemory(type: CreepType, spawnId: Id<StructureSpawn>, name: string): CreepMemory {
        return {
            type,
            spawn: spawnId,
            name,
        };
    }

    private static initSpawn(spawn: StructureSpawn) {
        spawn.memory.activeCreeps = new Map<CreepType, number>();
        for(const type of Object.values(CreepType)) {
            spawn.memory.activeCreeps.set(type, 0);
        }
        spawn.memory.deadCreeps = [];
        spawn.memory.queue = [];
        spawn.memory.isInitialized = true;
    }

    private static popDeadCreep(spawn: StructureSpawn) {
        const creepMemory = spawn.memory.deadCreeps[0];
        const body: BodyPartConstant[] = this.bodyMap.get(creepMemory.type)!;
        const spawnResult = spawn.spawnCreep(body, creepMemory.name, {
            memory: creepMemory,
        });
        if (spawnResult === OK) {
            spawn.memory.deadCreeps.splice(0, 1);
            console.log(spawn.name + ": spawning dead creep.");
        }
        return spawnResult;
    }
}