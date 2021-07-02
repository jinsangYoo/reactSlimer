export declare class ACEReducerForOne {
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static buy(pageName: string, callback?: (error?: object, result?: object) => void): Promise<object> | void;
    static plWithPage(pageName: string, callback?: (error?: object, result?: object) => void): Promise<object> | void;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map