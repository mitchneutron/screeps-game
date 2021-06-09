import { IBuildingPlacement } from "./IBuildingPlacement";

export class ContainerPlacement implements IBuildingPlacement{
    findLocation(room: Room): RoomPosition | undefined {
        const sources : Source[] = room.find(FIND_SOURCES);
        const existingContainerPositions = room.find(FIND_STRUCTURES, {filter: (x : Structure ) => x.structureType === STRUCTURE_CONTAINER }).map((x) => x.pos);
        let position: RoomPosition | undefined;
        for(const source of sources) {
            if(existingContainerPositions.length > 0){
                const result = PathFinder.search(source.pos, existingContainerPositions, {maxCost: 3});
                if(!result.incomplete) {
                    // console.log("found container at source");
                    continue;
                }
            }
            const locationToPlace = PathFinder.search(source.pos, {pos: source.pos, range: 2}, {flee: true});
            if(locationToPlace.incomplete){
                console.log("no place to put the building");
                continue;
            }
            position = locationToPlace.path[1];
            break;
        }
        return position;
    }

}
