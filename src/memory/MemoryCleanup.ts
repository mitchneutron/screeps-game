export class MemoryCleanup implements Runnable {
    private readonly creepMemories: {[name: string]: CreepMemory};
    private readonly liveCreeps: { [creepName: string]: Creep };
    private creepReceiver: DeadCreepReceiver;

    constructor(liveCreeps: { [creepName: string]: Creep }, creepMemory: {[name: string]: CreepMemory}, creepMemoryReceiver : DeadCreepReceiver) {
        this.liveCreeps = liveCreeps;
        this.creepMemories = creepMemory;
        this.creepReceiver = creepMemoryReceiver;
    }

    run(): void {
        this.cleanupCreepMemory();
    }

    cleanupCreepMemory(): void {
        for (const name in this.creepMemories) {
            if (!this.liveCreeps[name]) {
                this.creepReceiver.receive(this.creepMemories[name]);
                console.log("Removing creep from memory: " + this.creepMemories[name]);
                delete this.creepMemories[name];
            }
        }
    }

}
