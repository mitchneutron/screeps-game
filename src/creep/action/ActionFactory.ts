import { ActionBuild } from "./ActionBuild";
import { ActionHarvest } from "./ActionHarvest";
import { ActionStore } from "./ActionStore";
import { ActionUpgrade } from "./ActionUpgrade";
import { CreepActionConst } from "../../const/CreepActionConst";
import { ICreepAction } from "./ICreepAction";

export class ActionFactory {
    private static bodyMap: Map<CreepActionConst, ICreepAction> = new Map([
        [CreepActionConst.Build, new ActionBuild() as ICreepAction],
        [CreepActionConst.Harvest, new ActionHarvest()],
        [CreepActionConst.Store, new ActionStore()],
        [CreepActionConst.Upgrade, new ActionUpgrade()],
    ]);

    static create(type: CreepActionConst) : ICreepAction {
        return ActionFactory.bodyMap.get(type)!;
    }
}
