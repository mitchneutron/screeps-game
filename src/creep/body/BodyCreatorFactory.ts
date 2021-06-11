import { CreepType } from "../../const/CreepType";
import { ContainerPlacement } from "../../construction/placement/ContainerPlacement";
import { BasicWorkerCreator } from "./BasicWorkerCreator";
import { CarrierCreator } from "./CarrierCreator";
import { HarvesterCreator } from "./HarvesterCreator";
import { IBodyCreator } from "./IBodyCreator";
import { SettlerCreator } from "./SettlerCreator";

export interface IBodyCreatorFactory {
    create(type : CreepType) : IBodyCreator | undefined;
}

export class BodyCreatorFactory implements IBodyCreatorFactory{

    private static placementMap: Map<CreepType, IBodyCreator> = new Map([
        [CreepType.BasicWorker, new BasicWorkerCreator()],
        [CreepType.Settler, new SettlerCreator()],
        [CreepType.Harvester, new HarvesterCreator()],
        [CreepType.Carrier, new CarrierCreator()],
    ]);

    create(type : CreepType) : IBodyCreator | undefined {
        return BodyCreatorFactory.placementMap.get(type);
    }
}
