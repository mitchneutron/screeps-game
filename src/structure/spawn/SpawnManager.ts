import { CreepType } from "../../const/CreepType";

export class SpawnManager {
    private static bodyMap: Map<CreepType, BodyPartConstant[]> = new Map([
        [CreepType.BasicWorker, [WORK, CARRY, MOVE]],
    ]);

    static run(spawn: StructureSpawn): void {
        if (spawn.memory.isInitialized !== true) this.initSpawn(spawn);
        if (spawn.memory.deadCreepsToSpawn.length > 0 && this.spawnDeadCreep(spawn) === OK) return;

        if (spawn.memory.basicWorkersRequired > 0) {
            const creepName = "BasicWorker_" + spawn.name + "_" + spawn.memory.basicWorkersRequired;
            if (
                spawn.spawnCreep([WORK, CARRY, MOVE], creepName, {
                    memory: this.createCreepMemory(CreepType.BasicWorker, spawn.id, creepName),
                }) === OK
            ) {
                spawn.memory.basicWorkersRequired--;
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
        const sources = spawn.room.find(FIND_SOURCES);
        spawn.memory.basicWorkersRequired = 3;
        spawn.memory.advancedWorkersRequired = sources.length * 2;
        spawn.memory.deadCreepsToSpawn = [];
        spawn.memory.isInitialized = true;
    }

    private static spawnDeadCreep(spawn: StructureSpawn) {
        const creepMemory = spawn.memory.deadCreepsToSpawn[0];
        const body: BodyPartConstant[] = this.bodyMap.get(creepMemory.type)!;
        const spawnResult = spawn.spawnCreep(body, creepMemory.name, {
            memory: creepMemory,
        });
        if (spawnResult === OK) {
            spawn.memory.deadCreepsToSpawn.splice(0, 1);
            console.log(spawn.name + ": spawning dead creep.");
        }
        return spawnResult;
    }
}
