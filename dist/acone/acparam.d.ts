import ACProduct from './acproduct';
declare type ParamType = 'addcart' | 'buy' | 'delcart' | 'event';
export declare type IACParams = {
    init: (type: ParamType, value?: string) => ACParams;
    TYPE: {
        ADDCART: ParamType;
        BUY: ParamType;
        DELCART: ParamType;
        EVENT: ParamType;
    };
};
export declare type ACParams = {
    type: ParamType;
    name?: string;
    payMethodName?: string;
    orderNumber?: string;
    products?: ACProduct[];
};
export declare const ACParams: IACParams;
export {};
//# sourceMappingURL=acparam.d.ts.map