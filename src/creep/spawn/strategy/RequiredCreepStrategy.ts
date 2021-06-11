import { CreepType } from "../../../const/CreepType";
import { EnumToArray } from "../../../utils/EnumUtils";
import { SpawnManager } from "../SpawnManager";
import { AbstractSpawnStrategy } from "./AbstractSpawnStrategy";

export class RequiredCreepStrategy extends AbstractSpawnStrategy{
    run(spawn: StructureSpawn): ScreepsReturnCode {
        for (const type of EnumToArray(CreepType) as CreepType[]) {
            const active = spawn.memory.activeCreeps[type];
            const required = spawn.memory.requiredCreeps[type];
            if (active >= required) {
                console.log("we have enough " + CreepType[type]);
                continue;
            }
            console.log("Attempting spawn of " + CreepType[type]);
            const result = this.attemptCreepSpawn(spawn, type);
            if (result === ERR_BUSY) return result;
            if (result === OK) {
                SpawnManager.computeRequiredCreeps(spawn);
                spawn.memory.activeCreeps[type]++;
                return result;
            }
        }

        return ERR_NOT_ENOUGH_ENERGY;
    }

}
