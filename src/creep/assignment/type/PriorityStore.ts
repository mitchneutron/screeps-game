import { Store } from "./Store";

export class PriorityStore extends Store {
    constructor() {
        super(PriorityStore.isAvailablePriorityStorage);
    }

    static isAvailablePriorityStorage = (structure: Structure): boolean => {
        return (
            (structure.structureType === STRUCTURE_EXTENSION ||
                structure.structureType === STRUCTURE_SPAWN) &&
            (structure as StructureStorage).store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
    };
}
