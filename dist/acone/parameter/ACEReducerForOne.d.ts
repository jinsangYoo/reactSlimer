import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
export default class ACEReducerForOne {
    private static _TAG;
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static buy(pageName: string, callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    static buy(pageName: string): Promise<ACEResponseToCaller>;
    static plWithPage(pageName: string, callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    static plWithPage(pageName: string): Promise<ACEResponseToCaller>;
    static policy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    static policy(): Promise<ACEResponseToCaller>;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map