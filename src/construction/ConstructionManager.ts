export class ConstructionManager {
    static run() : void {
        // ask for what buildings we need to make
        const requestedByRoom : Map<Room, BuildableStructureConstant[]> =  this.createBuildingsForRoomNeeds();

        requestedByRoom.forEach((value , key) => {
            // todo -> Decide where the building goes
        });

        const requestedByRoomAndPosition : [RoomPosition, BuildableStructureConstant][] = this.getRequestedBuildingsByPosition();
    }

    private static createBuildingsForRoomNeeds() : Map<Room, BuildableStructureConstant[]> {
        // TODO
        return new Map<Room, BuildableStructureConstant[]>();
    }

    private static getRequestedBuildingsByPosition() {
        return [];
    }
}