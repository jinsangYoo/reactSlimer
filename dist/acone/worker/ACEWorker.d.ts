import { ACEWorkerEventsForWorkerEmitter } from '../worker/ACEWorkerEventsForWorkerEmitter';
export default class ACEWorker {
    private commandEmitter;
    private eventEmitter;
    private static instance;
    static getInstance(): ACEWorker;
    private constructor();
    static getWorkerEmitter(): ACEWorkerEventsForWorkerEmitter;
    static plWithPage(pageName: string): void;
}
//# sourceMappingURL=ACEWorker.d.ts.map