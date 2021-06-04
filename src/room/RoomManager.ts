export class RoomManager {
    static run() : void {
        for(const name in Game.rooms) {
            const room = Game.rooms[name];
            if(room.memory.isInitialized === undefined || room.memory.isInitialized === false) this.initializeRoomMemory(room);
        }
    }
    private static initializeRoomMemory(room: Room) : void {
        room.memory.buildingLevel = -1;
        this.assignRoomPriority(room);
    }

    private static assignRoomPriority(room: Room) : void {
        room.memory.priority = room.find(FIND_MY_STRUCTURES, {filter: (x) => x.structureType === STRUCTURE_SPAWN}).length;
        if(room.controller !==undefined && room.controller.my) room.memory.priority++;
    }
}