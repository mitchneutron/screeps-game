import "types.ts";

export interface ICreepAction {
    performAction(creep: Creep) : boolean
}