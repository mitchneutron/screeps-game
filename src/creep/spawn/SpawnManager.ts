import { CreepType } from "../../const/CreepType";
import { EnumToArray, InitializeRecord } from "../../utils/EnumUtils";
import { ISpawnStrategy } from "./strategy/AbstractSpawnStrategy";

export class SpawnManager {
    private readonly spawns: StructureSpawn[];
    private readonly strategies: ISpawnStrategy[];

    constructor(spawns: StructureSpawn[], strategies: ISpawnStrategy[]) {
        this.spawns = spawns;
        this.strategies = strategies;
    }

    run(): void {
        for (const spawn of this.spawns)
            this.handleSpawn(spawn);
    }

    private handleSpawn(spawn: StructureSpawn): void {
        if (spawn.memory.isInitialized !== true) SpawnManager.initSpawn(spawn);
        for (const creepMemory of spawn.memory.deadCreeps) {
            spawn.memory.activeCreeps[creepMemory.type]!--;
        }
        spawn.memory.deadCreeps = [];

        for(const strategy of this.strategies) {
            const result = strategy.run(spawn);
            if(result === OK || result === ERR_BUSY) return;
        }
    }

    private static initSpawn(spawn: StructureSpawn) {
        spawn.memory.activeCreeps = InitializeRecord(EnumToArray(CreepType), 0);
        spawn.memory.requiredCreeps = SpawnManager.computeRequiredCreeps(spawn);
        spawn.memory.deadCreeps = [];
        spawn.memory.queue = [];
        spawn.memory.isInitialized = true;
    }

    // todo we will want to have creeps dedicated to other room resources too.
    static computeRequiredCreeps(spawn: StructureSpawn): Record<CreepType, number> {
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
}
