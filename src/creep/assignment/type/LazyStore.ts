import { IndiscriminateStore } from "./IndiscriminateStore";

export class LazyStore extends IndiscriminateStore {
    private readonly range: number;

    constructor(range: number) {
        super();
        this.range = range;
    }

    protected postCacheShouldAssign(creep: Creep): boolean {
        this.cache.sort(x => creep.pos.getRangeTo(x));
        return creep.pos.getRangeTo(this.getFirstInCache()) <= this.range;
    }
}
