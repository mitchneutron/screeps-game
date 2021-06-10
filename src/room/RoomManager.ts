import { ConstructionManager } from "../construction/ConstructionManager";

export class RoomManager {
    private readonly rooms: Room[];
    private construction: ConstructionManager;

    constructor(rooms: Room[], construction: ConstructionManager) {
        this.rooms = rooms;
        this.construction = construction;
    }

    run() : void {
        for(const room of this.rooms) {
            if(!room.memory.isInitialized) RoomManager.initializeRoomMemory(room);
            RoomManager.assignRoomPriority(room);
            this.construction.run(room);
        }
    }
    private static initializeRoomMemory(room: Room) : void {
        room.memory.buildingLevel = -1;
        room.memory.isInitialized = true;
    }

    private static assignRoomPriority(room: Room) : void {
        room.memory.priority = room.find(FIND_MY_STRUCTURES, {filter: (x) => x.structureType === STRUCTURE_SPAWN}).length;
        if(room.controller !== undefined && room.controller.my) room.memory.priority++;
    }
}
