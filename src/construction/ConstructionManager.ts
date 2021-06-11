import { RoomManager } from "../room/RoomManager";
import {BuildingPlacementFactory} from "./placement/BuildingPlacementFactory";
import {BuildingsForLevel} from "./level/BuildingsForLevel";

export interface IConstructionManager {
    run: (room: Room) => void;
}

export class ConstructionManager implements IConstructionManager{
    run(room: Room) : void {
        // if the room is low priority, has no controller, or we have built to the current level, then pass on construction.
        if(room.memory.priority === 0 || room.controller === undefined || room.memory.buildingLevel === room.controller.level) return;
        ConstructionManager.advanceRoomBuildingLevel(room);
    }

    private static advanceRoomBuildingLevel(room: Room) : void{
        room.memory.buildingLevel++;
        if(room.memory.buildingLevel === 0) return;
        const buildings = BuildingsForLevel.get(room.memory.buildingLevel)!;
        if(room.memory.buildingLevel === 2) buildings.concat(BuildingsForLevel.get(0)!); // we don't build level 0 buildings until we hit level 2. (don't need the containers until then)
        for(const structure of buildings) {
            const location = BuildingPlacementFactory.create(structure)?.findLocation(room);
            if(location === undefined){
                console.log('Failed to place building '.concat(structure).concat(' in room ').concat(room.name));
            } else {
                if(room.createConstructionSite(location, structure) !== OK){
                    // console.log("Found location but failed to place building ".concat(structure));
                }
            }
        }
    }

}
