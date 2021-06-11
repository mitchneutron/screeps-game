import { IActionAssignment } from "./IActionAssignment";

export abstract class CachedActionAssignment<T> implements IActionAssignment {
    private cache: T[] = [];

    assign(creep: Creep): boolean {
        if (this.cache.length === 0 && !this.shouldAssign(creep)) return false;
        this.assign(creep);
        this.cache = [];
        return true;
    }

    shouldAssign(creep: Creep): boolean {
        return this._shouldAssign(creep) && this.performCache(creep).length !== 0;
    }

    protected abstract _assign(creep: Creep): void;

    protected abstract _shouldAssign(creep: Creep): boolean;

    protected abstract getNewData(creep: Creep): T[];

    protected getFirstInCache() : T {
        return this.cache[0];
    }

    private performCache(creep: Creep) {
        return this.cache = this.getNewData(creep);
    }


}
