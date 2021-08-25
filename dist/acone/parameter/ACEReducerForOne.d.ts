import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
import ACProduct from '../acproduct';
export default class ACEReducerForOne {
    private static _TAG;
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static buy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, orderNumber?: string, payMethodName?: string, products?: ACProduct[]): void;
    static buy(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, orderNumber?: string, payMethodName?: string, products?: ACProduct[]): Promise<ACEResponseToCaller>;
    static cart(type: string, callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, products?: ACProduct[]): void;
    static cart(type: string, callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, products?: ACProduct[]): Promise<ACEResponseToCaller>;
    static plWithPage(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string): void;
    static plWithPage(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string): Promise<ACEResponseToCaller>;
    static policy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    static policy(): Promise<ACEResponseToCaller>;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map