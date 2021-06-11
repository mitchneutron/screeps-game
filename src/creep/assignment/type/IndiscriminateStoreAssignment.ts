import { StoreAssignment } from "./StoreAssignment";

export class IndiscriminateStoreAssignment extends StoreAssignment {

    constructor() {
        super(IndiscriminateStoreAssignment.isAvailableStorageStructure);
    }

    static isAvailableStorageStructure = (structure: Structure): boolean => {
        return (
            (structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_SPAWN ||
                structure.structureType === STRUCTURE_TOWER ||
                structure.structureType === STRUCTURE_STORAGE) &&
            (structure as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
    };
}
