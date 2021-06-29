export declare class ACEReducerForOne {
    private static instance;
    private commandEmitter;
    private eventEmitter;
    private worker;
    private constructor();
    static getInstance(): ACEReducerForOne;
    private static getCallerEmitter;
    private static getWorker;
    private static mainthreadToWorkerAction;
    static plWithPage(pageName: string): void;
    static buy(pageName: string): void;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map