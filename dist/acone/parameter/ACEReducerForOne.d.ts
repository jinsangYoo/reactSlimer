import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
import ACProduct from '../acproduct';
import { ACEGender, ACEMaritalStatus } from '../../common/constant/ACEPublicStaticConfig';
export default class ACEReducerForOne {
    private static _TAG;
    private static instance;
    static getInstance(): ACEReducerForOne;
    private constructor();
    private static reducer;
    static appearProduct(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, productName?: string, productCategoryName?: string, productPrice?: string): void;
    static appearProduct(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, productName?: string, productCategoryName?: string, productPrice?: string): Promise<ACEResponseToCaller>;
    static buy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, orderNumber?: string, payMethodName?: string, products?: ACProduct[]): void;
    static buy(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, orderNumber?: string, payMethodName?: string, products?: ACProduct[]): Promise<ACEResponseToCaller>;
    static cart(type: string, callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, products?: ACProduct[]): void;
    static cart(type: string, callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, products?: ACProduct[]): Promise<ACEResponseToCaller>;
    static join(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userId?: string): void;
    static join(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userId?: string): Promise<ACEResponseToCaller>;
    static leave(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userId?: string): void;
    static leave(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userId?: string): Promise<ACEResponseToCaller>;
    static link(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, linkName?: string): void;
    static link(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, linkName?: string): Promise<ACEResponseToCaller>;
    static login(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userAge?: number, userGender?: ACEGender, userId?: string, userMaritalStatus?: ACEMaritalStatus): void;
    static login(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, userAge?: number, userGender?: ACEGender, userId?: string, userMaritalStatus?: ACEMaritalStatus): Promise<ACEResponseToCaller>;
    static plWithPage(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string): void;
    static plWithPage(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string): Promise<ACEResponseToCaller>;
    static policy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    static policy(): Promise<ACEResponseToCaller>;
    static search(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, keyword?: string): void;
    static search(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, keyword?: string): Promise<ACEResponseToCaller>;
    static tel(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, tel?: string): void;
    static tel(callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined, pageName?: string, tel?: string): Promise<ACEResponseToCaller>;
}
//# sourceMappingURL=ACEReducerForOne.d.ts.map