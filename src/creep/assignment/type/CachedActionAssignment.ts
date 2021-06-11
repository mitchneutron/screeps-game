import { IActionAssignment } from "./IActionAssignment";

export abstract class CachedActionAssignment<T> implements IActionAssignment {
    protected cache: T[] = [];

    assign(creep: Creep): boolean {
        if (this.cache.length === 0 && !this.shouldAssign(creep)) return false;
        this.assign(creep);
        this.cache = [];
        return true;
    }

    shouldAssign(creep: Creep): boolean {
        return this.preCacheShouldAssign(creep) && this.performCache(creep).length !== 0 && this.postCacheShouldAssign(creep);
    }

    protected abstract _assign(creep: Creep): void;

    protected abstract preCacheShouldAssign(creep: Creep): boolean;

    protected abstract getNewData(creep: Creep): T[];

    protected getFirstInCache(): T {
        return this.cache[0];
    }

    private performCache(creep: Creep) {
        return this.cache = this.getNewData(creep);
    }

    protected abstract postCacheShouldAssign(creep: Creep): boolean;
}
