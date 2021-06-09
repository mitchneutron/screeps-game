import { CreepType } from "../../const/CreepType";
import { ContainerPlacement } from "../../construction/placement/ContainerPlacement";
import { BasicWorkerCreator } from "./BasicWorkerCreator";
import { CarrierCreator } from "./CarrierCreator";
import { HarvesterCreator } from "./HarvesterCreator";
import { IBodyCreator } from "./IBodyCreator";
import { SettlerCreator } from "./SettlerCreator";

export class BodyCreatorFactory {
    private static placementMap: Map<CreepType, IBodyCreator> = new Map([
        [CreepType.BasicWorker, new BasicWorkerCreator()],
        [CreepType.Settler, new SettlerCreator()],
        [CreepType.Harvester, new HarvesterCreator()],
        [CreepType.Carrier, new CarrierCreator()],
    ]);
    static create(type : CreepType) : IBodyCreator | undefined {
        return this.placementMap.get(type);
    }
}