import { StoreAssignment } from "./StoreAssignment";

export class PriorityStoreAssignment extends StoreAssignment {
    constructor() {
        super(PriorityStoreAssignment.isAvailablePriorityStorage);
    }

    static isAvailablePriorityStorage = (structure: Structure): boolean => {
        return (
            (structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_SPAWN) &&
            (structure as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
    };
}
