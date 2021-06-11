import { ControllerUpgrade } from "./ControllerUpgrade";

export class RandomizedControllerUpgrade extends ControllerUpgrade {
    shouldAssign(creep: Creep): boolean {
        return Math.floor(Math.random() * 5) === 0 && super.shouldAssign(creep);
    }
}
