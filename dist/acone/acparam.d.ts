import ACProduct from './acproduct';
declare type ParamType = 'addcart' | 'appearProduct' | 'buy' | 'delcart' | 'event' | 'link' | 'tel';
export declare type IACParams = {
    init: (type: ParamType, value?: string) => ACParams;
    TYPE: {
        ADDCART: ParamType;
        APPEAR_PRODUCT: ParamType;
        BUY: ParamType;
        DELCART: ParamType;
        EVENT: ParamType;
        LINK: ParamType;
        TEL: ParamType;
    };
};
export declare type ACParams = {
    type: ParamType;
    name?: string;
    linkName?: string;
    orderNumber?: string;
    payMethodName?: string;
    productCategoryName?: string;
    productName?: string;
    productPrice?: string;
    tel?: string;
    products?: ACProduct[];
};
export declare const ACParams: IACParams;
export {};
//# sourceMappingURL=acparam.d.ts.map