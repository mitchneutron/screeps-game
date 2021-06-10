import { CreepActionConst } from "../../const/CreepActionConst";
import {
    AbstractActionAssignment,
    isAvailablePriorityStorage,
    isAvailableStorageStructure,
} from "./AbstractActionAssignment";

export class BasicWorkerActionAssignment extends AbstractActionAssignment {
    // gather things from containers and off the ground
    private static assignPickup(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.PickUp;
        const resources = creep.room.find(FIND_DROPPED_RESOURCES);
        if (resources.length > 0) {
            creep.memory.target = resources[0].id;
            return true;
        }
        return false;
    }

    private static assignWithdraw(creep: Creep): boolean {
        const containers = creep.room.find(FIND_STRUCTURES, {filter: x => x.structureType === STRUCTURE_CONTAINER});
        if (containers.length > 0) {
            creep.memory.target = containers[0].id;
            return true;
        }
        const storage = creep.room.find(FIND_MY_STRUCTURES).find(x => x.structureType === STRUCTURE_STORAGE);
        if (storage != null) {
            creep.memory.target = storage.id;
            return true;
        }
        return false;
    }

    private static assignStore(creep: Creep, id: Id<unknown>) {
        creep.memory.action = CreepActionConst.Store;
        creep.memory.target = id;
        creep.say("storing");
    }

    private static assignBuild(creep: Creep, site: ConstructionSite) {
        creep.memory.action = CreepActionConst.Build;
        creep.memory.target = site.id;
        creep.say("Building " + site.structureType);
    }

    private static assignControllerUpgrade(creep: Creep) {
        const controller = creep.room.controller;
        creep.memory.action = CreepActionConst.Upgrade;
        creep.memory.target = controller?.id;
        creep.say("upgrading controller");
    }

    private static assignHarvest(creep: Creep): boolean {
        creep.memory.action = CreepActionConst.Harvest;
        const sources = creep.room.find(FIND_SOURCES_ACTIVE);
        if (sources.length === 0) {
            return false;
        }
        // just pick a random one to spread it out
        creep.memory.target = sources[Math.floor(Math.random() * sources.length)].id;
        return true;
    }

    _assignAction(creep: Creep): void {
        creep.memory.target = undefined;
        creep.memory.action = undefined;

        if (creep.room.controller !== undefined) {
            const r = Math.floor(Math.random() * 5);
            if (r === 0) {
                BasicWorkerActionAssignment.assignControllerUpgrade(creep);
                return;
            }
        }

        if (creep.store.getUsedCapacity() === 0) {
            if (BasicWorkerActionAssignment.assignPickup(creep)) return;
            if (BasicWorkerActionAssignment.assignWithdraw(creep)) return;
            if (BasicWorkerActionAssignment.assignHarvest(creep)) return;
            creep.say("I can't find a source with energy :(");
            return;
        }

        const priorityStorage = creep.room.find(FIND_MY_STRUCTURES, {
            filter: isAvailablePriorityStorage,
        });
        if (priorityStorage.length > 0) {
            const site = priorityStorage[0];
            BasicWorkerActionAssignment.assignStore(creep, site.id);
            return;
        }


        const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
        if (constructionSites.length > 0) {
            const site = constructionSites[0];
            BasicWorkerActionAssignment.assignBuild(creep, site);
            return;
        }

        const storageSites = creep.room.find(FIND_MY_STRUCTURES, {
            filter: isAvailableStorageStructure,
        });
        if (storageSites.length > 0) {
            const site = storageSites[0];
            BasicWorkerActionAssignment.assignStore(creep, site.id);
            return;
        }

        if (creep.room.controller !== undefined) {
            BasicWorkerActionAssignment.assignControllerUpgrade(creep);
            return;
        }

        creep.say("nothing to do.");
    }
}
