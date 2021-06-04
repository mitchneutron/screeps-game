import { IBuildingPlacement } from "./IBuildingPlacement";

export class ContainerPlacement implements IBuildingPlacement{
    placeBuilding(room: Room): boolean {
        const sources : Source[] = room.find(FIND_SOURCES);
        const existingContainerPositions = room.find(FIND_STRUCTURES, {filter: (x : Structure ) => x.structureType === STRUCTURE_CONTAINER }).map((x) => x.pos);

        for(const source of sources) {
            const result = PathFinder.search(source.pos, existingContainerPositions, {maxCost: 3});
            if(!result.incomplete) continue;
            const locationToPlace = PathFinder.search(source.pos, {pos: source.pos, range: 2}, {flee: true});
            if(locationToPlace.incomplete) continue;
            room.createConstructionSite(locationToPlace.path[1], STRUCTURE_CONTAINER);
        }

        
        return true;
    }

}
