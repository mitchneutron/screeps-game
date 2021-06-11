import { BodyCreatorFactory } from "../../body/BodyCreatorFactory";
import { AbstractSpawnStrategy } from "./AbstractSpawnStrategy";

export class QueueStrategy extends AbstractSpawnStrategy {
    private readonly queue: CreepMemory[];

    constructor(bodyCreatorFactory: BodyCreatorFactory, queue: CreepMemory[]) {
        super(bodyCreatorFactory);
        this.queue = queue;
    }

    run(spawn: StructureSpawn): ScreepsReturnCode {
        if(spawn.memory.queue.length === 0) return ERR_NOT_ENOUGH_ENERGY; // todo what error to return?
        const creepMemory = this.queue[0];
        const spawnResult = this.attemptCreepSpawn(spawn, creepMemory.type, creepMemory);
        if (spawnResult === OK) {
            spawn.memory.deadCreeps.splice(0, 1);
            console.log(spawn.name + ": spawning queued creep.");
        }
        return spawnResult;
    }
}
