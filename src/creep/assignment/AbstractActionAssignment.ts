import { IActionAssignment } from "./IActionAssignment";

export abstract class AbstractActionAssignment implements IActionAssignment{
    assignAction(creep: Creep): void {
        return this._assignAction(creep);
    }

    abstract _assignAction(creep: Creep) : void
}

export function isAvailableStorageStructure(structure: Structure): boolean {
    return (
        (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER ||
            structure.structureType === STRUCTURE_STORAGE) &&
        (structure as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
    );
}