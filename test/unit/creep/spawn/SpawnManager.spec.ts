import { mockInstanceOf } from "screeps-jest/src/mocking";
import { CreepType } from "../../../../src/const/CreepType";
import { SpawnManager } from "../../../../src/creep/spawn/SpawnManager";
import { ISpawnStrategy } from "../../../../src/creep/spawn/strategy/AbstractSpawnStrategy";
import { EnumToArray, InitializeRecord } from "../../../../src/utils/EnumUtils";

let uninitializedSpawnUndefined: StructureSpawn;
let uninitializedSpawnFalse: StructureSpawn;
let initializedSpawn: StructureSpawn;

let spawns: StructureSpawn[];

const strategyOkResult = mockInstanceOf<ISpawnStrategy>({
    run: (val: StructureSpawn): ScreepsReturnCode => {
        return OK;
    },
});

const strategyFailResult = mockInstanceOf<ISpawnStrategy>({
    run(spawn: StructureSpawn): ScreepsReturnCode {
        return ERR_NOT_ENOUGH_ENERGY;
    }
});

describe("Spawn Manager", () => {
    beforeEach(() => {
        uninitializedSpawnUndefined = mockInstanceOf<StructureSpawn>({
            memory: {
                isInitialized: undefined,
                activeCreeps: undefined,
                requiredCreeps: undefined,
                queue: undefined,
                deadCreeps: undefined,
            },
            room: {
                find: () => {
                    return [];
                },
                memory: {
                    buildingLevel: 3,
                },
            },
        });
        uninitializedSpawnFalse = mockInstanceOf<StructureSpawn>({
            memory: {
                isInitialized: false,
                activeCreeps: undefined,
                requiredCreeps: undefined,
                queue: undefined,
                deadCreeps: undefined,
            },
            room: {
                find: () => {
                    return [];
                },
                memory: {
                    buildingLevel: 3,
                },
            },
        });
        initializedSpawn = mockInstanceOf<StructureSpawn>({
            memory: {
                isInitialized: true,
                activeCreeps: InitializeRecord(EnumToArray(CreepType), 0),
                requiredCreeps: InitializeRecord(EnumToArray(CreepType), 0),
                queue: [],
                deadCreeps: [mockInstanceOf<CreepMemory>({ type: CreepType.Carrier }),
                    mockInstanceOf<CreepMemory>({ type: CreepType.Settler }),
                    mockInstanceOf<CreepMemory>({ type: CreepType.Settler }),
                    mockInstanceOf<CreepMemory>({ type: CreepType.Harvester })],
            },
            room: {
                find: () => {
                    return [];
                },
                memory: {
                    buildingLevel: 3,
                },
            },
        });
        spawns = [uninitializedSpawnFalse, uninitializedSpawnUndefined];

    });

    it("Should initialize spawns memory", () => {
        const service = new SpawnManager(spawns, []);
        service.run();
        spawns.forEach(x => {
            expect(x.memory.isInitialized).toBeTruthy();
            expect(x.memory.activeCreeps).toBeDefined();
            expect(x.memory.requiredCreeps).toBeDefined();
            expect(x.memory.deadCreeps).toBeDefined();
            expect(x.memory.queue).toBeDefined();
        });
    });

    it("processes all dead creeps", () => {
        const service = new SpawnManager([initializedSpawn], []);
        service.run();
        expect(initializedSpawn.memory.activeCreeps[CreepType.Harvester]).toBe(-1);
        expect(initializedSpawn.memory.activeCreeps[CreepType.Settler]).toBe(-2);
        expect(initializedSpawn.memory.activeCreeps[CreepType.Carrier]).toBe(-1);
        expect(initializedSpawn.memory.deadCreeps.length).toBe(0);
    });

    it("runs strategies until one hits a success", () => {
        const strategies = [strategyFailResult, strategyFailResult, strategyOkResult, strategyFailResult];
        const service = new SpawnManager([initializedSpawn], strategies);
        service.run();
        expect(strategyFailResult.run).toBeCalledTimes(2);
        expect(strategyOkResult.run).toBeCalledTimes(1);
    });
});
