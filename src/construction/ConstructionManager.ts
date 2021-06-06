import {BuildingPlacementFactory} from "./placement/BuildingPlacementFactory";
import {BuildingsForLevel} from "./level/BuildingsForLevel";

export class ConstructionManager {
    static run() : void {
        // ask for what buildings we need to make
        this.createConstructionSitesForControllerLeveling();
        const requestedByRoomAndPosition : [RoomPosition, BuildableStructureConstant][] = this.getRequestedBuildingsByPosition();
    }

    private static createConstructionSitesForControllerLeveling() : void{
        for(const name in Game.rooms) {
            const room = Game.rooms[name];
            if(room.memory.priority === 0) continue;
            if(room.controller === undefined || room.memory.buildingLevel === room.controller.level) continue;
            room.memory.buildingLevel++;
            const buildings = BuildingsForLevel.get(room.memory.buildingLevel)!;
            for(const structure of buildings) {
                const location = BuildingPlacementFactory.create(structure)?.findLocation(room);
                if(location === undefined){
                    console.log('Failed to place building '.concat(structure).concat(' in room ').concat(room.name));
                } else {
                    if(room.createConstructionSite(location, structure) !== OK){
                        console.log("Found location but failed to place building ".concat(structure));
                    }
                }
            }
        }
    }

    private static getRequestedBuildingsByPosition() {
        return [];
    }
}