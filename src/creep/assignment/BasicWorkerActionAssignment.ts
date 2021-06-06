import { CreepActionConst } from "../../const/CreepActionConst";
import { AbstractActionAssignment, isAvailableStorageStructure } from "./AbstractActionAssignment";

export class BasicWorkerActionAssignment extends AbstractActionAssignment {
    // todo want to collect energy from containers as a priority
    _assignAction(creep: Creep): void {
        creep.memory.target = undefined;
        if (creep.store.getUsedCapacity() === 0) {
            creep.memory.action = CreepActionConst.Harvest;
            const sources = creep.room.find(FIND_SOURCES_ACTIVE);
            if (sources.length === 0) {
                creep.say("I can't find a source with energy :(");
                return;
            }
            creep.say("Harvesting :)");
            creep.memory.target = sources[0].id;
            return;
        }

        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            const site = constructionSites[0];
            creep.memory.action = CreepActionConst.Build;
            creep.memory.target = site.id;
            creep.say("Building " + site.structureType);
            return;
        }

        const storageSites = creep.room.find(FIND_MY_STRUCTURES, {
            filter: isAvailableStorageStructure,
        });
        if (storageSites.length > 0) {
            const site = storageSites[0];
            creep.memory.action = CreepActionConst.Store;
            creep.memory.target = site.id;
            creep.say("storing");
            return;
        }

        const controller = creep.room.controller;
        if (controller) {
            creep.memory.action = CreepActionConst.Upgrade;
            creep.memory.target = controller?.id;
            creep.say("upgrading controller");
            return;
        }

        creep.say("I can't find anything to do.");
    }
}