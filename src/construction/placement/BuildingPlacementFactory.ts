import { IBuildingPlacement } from "./IBuildingPlacement";
import {ContainerPlacement} from "./ContainerPlacement";

export class BuildingPlacementFactory {
    private static placementMap: Map<StructureConstant, IBuildingPlacement> = new Map([
        [STRUCTURE_CONTAINER, new ContainerPlacement()],
    ]);
    static create(type: StructureConstant) : IBuildingPlacement | undefined {
        return this.placementMap.get(type);
    }
}