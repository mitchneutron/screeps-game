import { CreepActionConst } from "./const/CreepActionConst";
import { CreepType } from "./const/CreepType";

export {};
/*
  Example types, expand on these or remove them and add your own.
  Note: Values, properties defined here do no fully *exist* by this type definiton alone.
        You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)
  Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
  Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
*/
// Memory extension samples

declare global {
    interface Memory {
        uuid: number;
        log: any;
        storages: {[id: string]: StorageMemory}
    }

    interface StorageMemory {
        storage?: Id<StructureStorage>
    }

    interface StructureStorage {
        memory: StorageMemory
    }

    interface CreepMemory {
        name: string;
        spawn: Id<StructureSpawn>;
        type: CreepType;
        target?: Id<any>;
        action?: CreepActionConst;
    }

    interface SpawnMemory {
        isInitialized?: boolean;
        deadCreepsToSpawn: CreepMemory[];
        basicWorkersRequired: number;
        advancedWorkersRequired: number;
    }

    interface RoomMemory {
        priority: number;
        buildingLevel: number;
        isInitialized?: boolean;
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {
            log: any;
        }
    }
}
