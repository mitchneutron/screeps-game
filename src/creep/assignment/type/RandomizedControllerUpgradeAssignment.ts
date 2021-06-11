import { ControllerUpgradeAssignment } from "./ControllerUpgradeAssignment";

export class RandomizedControllerUpgradeAssignment extends ControllerUpgradeAssignment {
    shouldAssign(creep: Creep): boolean {
        return Math.floor(Math.random() * 5) === 0 && super.shouldAssign(creep);
    }
}
