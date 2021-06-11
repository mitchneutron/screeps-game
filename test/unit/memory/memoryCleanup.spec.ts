import { mockGlobal, mockInstanceOf, mockStructure } from "screeps-jest/src/mocking";
import { MemoryCleanup } from "../../../src/memory/MemoryCleanup";

const deadCreep = mockInstanceOf<Creep>({
    memory: {

    }
});

const liveCreep = mockInstanceOf<Creep>({
    memory: {

    }
});

let service: MemoryCleanup;
let liveCreeps: { [creepName: string]: Creep };
let creepMemories: { [creepName: string]: CreepMemory };

describe("Memory Cleanup", () => {
    beforeEach(() => {
        liveCreeps = {liveCreep};
        creepMemories = {liveCreep: liveCreep.memory, deadCreep: deadCreep.memory};
        service = new MemoryCleanup(liveCreeps, creepMemories, {receive: () => {}} );
    });

    it("only cleans up dead creeps", () => {
        service.run();
        expect(creepMemories.deadCreep).toBeUndefined();
        expect(creepMemories.liveCreep).toBeDefined();
    });

});

