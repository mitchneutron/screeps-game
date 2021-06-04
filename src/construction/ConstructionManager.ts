export class ConstructionManager {
    static run() : void {
        // ask for what buildings we need to make
        const requestedByRoom : Map<Room, BuildableStructureConstant[]> =  this.createConstructionSitesForControllerLeveling();

        requestedByRoom.forEach((value , key) => {
            // todo -> Decide where the building goes
        });

        const requestedByRoomAndPosition : [RoomPosition, BuildableStructureConstant][] = this.getRequestedBuildingsByPosition();
    }

    private static createConstructionSitesForControllerLeveling() : Map<Room, BuildableStructureConstant[]> {
        const toReturn = new Map<Room, BuildableStructureConstant[]>();
        for(const name in Game.rooms) {
            const room = Game.rooms[name];
            if(room.memory.priority === 0) continue;
            if(room.controller === undefined || room.memory.buildingLevel === room.controller.level) continue;
            room.memory.buildingLevel++;
        }
        return toReturn;
    }

    private static getRequestedBuildingsByPosition() {
        return [];
    }
}