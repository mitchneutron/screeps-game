import { ActionAssignment } from "./ActionAssignment";
import { Drop } from "./type/Drop";
import { Harvest } from "./type/Harvest";
import { LazyStore } from "./type/LazyStore";

export class HarvesterAssignment extends ActionAssignment {
    constructor(range: number) {
        super([
            new Harvest(),
            new LazyStore(range),
            new Drop(),
        ]);
    }
}
