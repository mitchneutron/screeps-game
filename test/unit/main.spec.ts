import { mockGlobal, mockInstanceOf } from "screeps-jest/src/mocking";
import { unwrappedLoop } from "../../src/main";

class Service {
    run = (): void => {
        // pass
    };
}
describe("main loop", () => {
    mockGlobal<Memory>('Memory', { creeps: {}, sources: undefined, globalSpawnQueue: undefined });

    it("instantiates the source memory", () => {
        unwrappedLoop([]);
        expect(Memory.sources !== undefined);
        expect(Memory.globalSpawnQueue !== undefined);
    });

    it("runs all services passed in", () => {
        const service = mockInstanceOf<Service>({run(){
            // pass;
            }});
        const services = [service, service, service];
        unwrappedLoop(services);
        expect(service.run).toBeCalledTimes(services.length);
    });
});

