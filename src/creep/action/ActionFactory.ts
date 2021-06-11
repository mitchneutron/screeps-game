import { CreepActionConst } from "../../const/CreepActionConst";
import { ICreepAction } from "./ICreepAction";
import { Build } from "./type/Build";
import { Drop } from "./type/Drop";
import { Harvest } from "./type/Harvest";
import { PickUp } from "./type/PickUp";
import { Store } from "./type/Store";
import { Upgrade } from "./type/Upgrade";
import { Withdraw } from "./type/Withdraw";

export interface IActionFactory {
    create(type: CreepActionConst) : ICreepAction;
}

export class ActionFactory {
    private static bodyMap: Map<CreepActionConst, ICreepAction> = new Map([
        [CreepActionConst.Build, new Build() as ICreepAction],
        [CreepActionConst.Harvest, new Harvest()],
        [CreepActionConst.Store, new Store()],
        [CreepActionConst.Upgrade, new Upgrade()],
        [CreepActionConst.Withdraw, new Withdraw()],
        [CreepActionConst.PickUp, new PickUp()],
        [CreepActionConst.Drop, new Drop()]
    ]);

    create(type: CreepActionConst) : ICreepAction {
        return ActionFactory.bodyMap.get(type)!;
    }
}
