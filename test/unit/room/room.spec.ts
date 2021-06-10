import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest/src/mocking";
import { RoomManager } from "../../../src/room/RoomManager";

const spawn1 = mockStructure(STRUCTURE_SPAWN);
const spawn2 = mockStructure(STRUCTURE_SPAWN);

let uninitializedRoom: Room;

let initializedRoom: Room;

describe("Room Manager", () => {
    beforeEach(() => {
       uninitializedRoom = mockInstanceOf<Room>({
            memory: {
                isInitialized: undefined,
                buildingLevel: undefined,
                priority: undefined
            },
            find: () => [spawn1, spawn2],
            controller: mockStructure(STRUCTURE_CONTROLLER, {my: true}),
        });
       initializedRoom = mockInstanceOf<Room>({
           memory: {
               isInitialized: true
           }
       });
        mockGlobal<Memory>('Memory', { creeps: {}, sources: undefined });
        mockGlobal<Game>('Game', {
            rooms: { uninitializedRoom, initializedRoom }
        });
    });

    const manager = new RoomManager();
    it("initialize rooms correctly", () => {
        manager.run();
        expect(uninitializedRoom.memory.isInitialized).toBe(true);
        expect(uninitializedRoom.memory.priority).toBe(3); // one for each spawn and controller I own
        expect(uninitializedRoom.memory.buildingLevel).toBe(-1);
    });

    it("initialized rooms done get reinitialized", () => {
        manager.run();
        expect(initializedRoom.memory.isInitialized).toBe(true);
    });
});

