import ACProduct from './acproduct';
declare type ParamType = 'none' | 'event' | 'buy';
export declare type IACParams = {
    init: (type: ParamType, value: string) => ACParams;
    TYPE: {
        EVENT: ParamType;
        BUY: ParamType;
    };
};
export declare type ACParams = {
    type: ParamType;
    name: string;
    payMethodName?: string;
    orderNumber?: string;
    products?: ACProduct[];
};
export declare const ACParams: IACParams;
export {};
//# sourceMappingURL=acparam.d.ts.map