import { ACECallbackResultForDebug } from '../../common/constant/ACECallbackResultForDebug';
export default class ACEReducerForOne {
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static buy(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static buy(pageName: string): Promise<object>;
    static plWithPage(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static plWithPage(pageName: string): Promise<object>;
    static policy(callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void;
    static policy(): Promise<ACECallbackResultForDebug>;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map