import { AbstractAction } from "./AbstractAction";

// TODO need to be able to drop resources of different types.
export class Drop extends AbstractAction<undefined> {
    protected _performAction(creep: Creep): boolean {
        creep.drop(RESOURCE_ENERGY);
        return false; // we are done dropping things.
    }

    cancelOnEmpty(): boolean {
        return true;
    }

    cancelOnFull(): boolean {
        return false;
    }

}
