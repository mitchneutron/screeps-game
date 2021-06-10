import { CreepType } from "../../const/CreepType";
import { EnumToArray, InitializeRecord } from "../../utils/EnumUtils";
import { BodyCreatorFactory } from "../body/BodyCreatorFactory";

export class SpawnManager {

    run(): void {
        for (const spawnsKey in Game.spawns)
            SpawnManager.handleSpawn(Game.spawns[spawnsKey]);
    }

    static handleSpawn(spawn: StructureSpawn): void {
        if (spawn.memory.isInitialized !== true || spawn.memory.requiredCreeps === undefined || spawn.memory.activeCreeps === undefined) this.initSpawn(spawn);
        for (const creepMemory of spawn.memory.deadCreeps) {
            spawn.memory.queue.push(creepMemory);
            spawn.memory.activeCreeps[creepMemory.type]!--;
        }
        spawn.memory.deadCreeps = [];

        // we want to spawn creeps if they are in the queue or if we don't have enough active creeps.

        // priority should be on our own creeps, and then requested creeps. (Gas mask principle -> Put your own on first)
        for (const type of Object.values(CreepType)) {
            if (typeof type == "string") continue;
            const active = spawn.memory.activeCreeps[type];
            const required = spawn.memory.requiredCreeps[type];
            if (active >= required) {
                console.log("we have enough " + CreepType[type]);
                continue;
            }
            console.log("Attempting spawn of " + CreepType[type]);
            const result = SpawnManager.attemptCreepSpawn(spawn, type);
            if (result === ERR_BUSY) return;
            if (result === OK) {
                this.computeRequiredCreeps(spawn);
                spawn.memory.activeCreeps[type]++;
                return;
            }

        }

        if (spawn.memory.queue.length > 0)
            this.spawnFromQueue(spawn);
    }

    private static attemptCreepSpawn(spawn: StructureSpawn, type: CreepType, memory?: CreepMemory): ScreepsReturnCode {
        const energy = spawn.room.energyAvailable;
        const body = BodyCreatorFactory.create(type)!.createBody(energy);
        memory = memory ?? this.createCreepMemory(type, spawn.id, this.toName(spawn, type));
        return spawn.spawnCreep(body, memory.name, { memory });
    }

    private static toName(spawn: StructureSpawn, type: CreepType): string {
        return CreepType[type] + "_" + spawn.name + "_" + Date.now();
    }

    private static createCreepMemory(type: CreepType, spawnId: Id<StructureSpawn>, name: string): CreepMemory {
        return {
            type,
            spawn: spawnId,
            name,
        };
    }

    private static initSpawn(spawn: StructureSpawn) {
        spawn.memory.activeCreeps = InitializeRecord(EnumToArray(CreepType), 0);
        spawn.memory.requiredCreeps = SpawnManager.computeRequiredCreeps(spawn);
        spawn.memory.deadCreeps = [];
        spawn.memory.queue = [];
        spawn.memory.isInitialized = true;
    }

    // todo we will want to have creeps dedicated to other room resources too.
    private static computeRequiredCreeps(spawn: StructureSpawn): Record<CreepType, number> {
        const harvester = spawn.room.memory.buildingLevel > 2 ? spawn.room.find(FIND_SOURCES).length + spawn.room.find(FIND_MINERALS).length : 0;
        const carrier = Math.ceil(spawn.memory.activeCreeps[CreepType.Harvester] / 3);
        const basicWorker = Math.max(3,7 - harvester);
        return {
            [CreepType.BasicWorker]: basicWorker,
            [CreepType.Carrier]: carrier,
            [CreepType.Harvester]: harvester,
            [CreepType.Settler]: 0,
        };
    }

    private static spawnFromQueue(spawn: StructureSpawn) {
        const creepMemory = spawn.memory.queue[0];
        const spawnResult = this.attemptCreepSpawn(spawn, creepMemory.type, creepMemory);
        if (spawnResult === OK) {
            spawn.memory.deadCreeps.splice(0, 1);
            console.log(spawn.name + ": spawning queued creep.");
        }
        return spawnResult;
    }
}
