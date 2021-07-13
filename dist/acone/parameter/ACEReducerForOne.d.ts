export declare class ACEReducerForOne {
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static buy(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static buy(pageName: string): Promise<object>;
    static plWithPage(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static plWithPage(pageName: string): Promise<object>;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map