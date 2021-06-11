import { CreepType } from "../../../const/CreepType";
import { IBodyCreatorFactory } from "../../body/BodyCreatorFactory";

export interface ISpawnStrategy {
    run(spawn: StructureSpawn) : ScreepsReturnCode;
}

export abstract class AbstractSpawnStrategy implements ISpawnStrategy {
    private bodyCreatorFactory: IBodyCreatorFactory;
        constructor(bodyCreatorFactory: IBodyCreatorFactory) {
        this.bodyCreatorFactory = bodyCreatorFactory;
    }

    abstract run(spawn: StructureSpawn): ScreepsReturnCode;

    protected attemptCreepSpawn(spawn: StructureSpawn, type: CreepType, memory?: CreepMemory): ScreepsReturnCode {
        const energy = spawn.room.energyAvailable;
        const body = this.bodyCreatorFactory.create(type)!.createBody(energy);
        memory = memory ?? AbstractSpawnStrategy.createCreepMemory(type, spawn.id, AbstractSpawnStrategy.toName(spawn, type));
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

}

