

export class BuildingsForLevel {
    static get(n:number) : StructureConstant[] | undefined {
        return this.levelMap.get(n);
    }

    // todo this can go on the global object.
    private static levelMap: Map<number, StructureConstant[]> = new Map([
        [0, BuildingsForLevel.levelZero()],
        [1, BuildingsForLevel.levelOne()],
        [2, BuildingsForLevel.levelTwo()],
        [3, BuildingsForLevel.levelThree()],
        [4, BuildingsForLevel.levelFour()],
        [5, BuildingsForLevel.levelFive()],
        [6, BuildingsForLevel.levelSix()],
        [7, BuildingsForLevel.levelSeven()],
        [8, BuildingsForLevel.levelEight()],
    ]);

    private static levelZero(): StructureConstant[] {
        return Array(5).fill(STRUCTURE_CONTAINER) as StructureConstant[];
    }

    private static levelOne(): StructureConstant[] {
        return [STRUCTURE_SPAWN];
    }

    private static levelTwo(): StructureConstant[] {
        return Array(5).fill(STRUCTURE_EXTENSION) as StructureConstant[];
    }

    private static levelThree(): StructureConstant[] {
        const arr = Array(5).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_TOWER);
        return arr;
    }

    private static levelFour(): StructureConstant[] {
        const arr = Array(10).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_STORAGE);
        return arr;
    }

    private static levelFive(): StructureConstant[] {
        const arr = Array(10).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_TOWER);
        arr.push(STRUCTURE_LINK);
        arr.push(STRUCTURE_LINK);
        return arr;
    }

    private static levelSix(): StructureConstant[] {
        const arr = Array(10).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_LINK);
        arr.push(STRUCTURE_EXTRACTOR);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_TERMINAL);
        return arr;
    }

    private static levelSeven(): StructureConstant[] {
        const arr = Array(10).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_SPAWN);
        arr.push(STRUCTURE_TOWER);
        arr.push(STRUCTURE_LINK);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_FACTORY);
        return arr;
    }

    private static levelEight(): StructureConstant[] {
        const arr = Array(10).fill(STRUCTURE_CONTAINER) as StructureConstant[];
        arr.push(STRUCTURE_TOWER);
        arr.push(STRUCTURE_TOWER);
        arr.push(STRUCTURE_TOWER);
        arr.push(STRUCTURE_LINK);
        arr.push(STRUCTURE_LINK);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_LAB);
        arr.push(STRUCTURE_OBSERVER);
        arr.push(STRUCTURE_POWER_SPAWN);
        arr.push(STRUCTURE_NUKER);
        return arr;
    }
}

