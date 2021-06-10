import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest/src/mocking";
import { RoomManager } from "../../../src/room/RoomManager";

const spawn1 = mockStructure(STRUCTURE_SPAWN);
const spawn2 = mockStructure(STRUCTURE_SPAWN);

let uninitializedRoom1: Room;
let uninitializedRoom2: Room;

let initializedRoom: Room;
let service: RoomManager;

describe("Room Manager", () => {
    beforeEach(() => {
        uninitializedRoom1 = mockInstanceOf<Room>({
            memory: {
                isInitialized: undefined,
                buildingLevel: undefined,
                priority: undefined
            },
            find: () => [spawn1, spawn2],
            controller: mockStructure(STRUCTURE_CONTROLLER, {my: true}),
        });
        uninitializedRoom2 = mockInstanceOf<Room>({
            memory: {
                isInitialized: false,
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
       service = new RoomManager([uninitializedRoom1, uninitializedRoom2, initializedRoom]);
    });

    it("initialize rooms correctly", () => {
        service.run();
        expect(uninitializedRoom1.memory.isInitialized).toBe(true);
        expect(uninitializedRoom1.memory.priority).toBe(3); // one for each spawn and controller I own
        expect(uninitializedRoom1.memory.buildingLevel).toBe(-1);

        expect(uninitializedRoom2.memory.isInitialized).toBe(true);
    });

    it("initialized rooms stay initialized", () => {
        service.run();
        expect(initializedRoom.memory.isInitialized).toBe(true);
    });
});

