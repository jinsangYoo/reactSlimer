declare type ParamType = 'none' | 'event' | 'buy';
export declare type IACParams = {
    init: (type: ParamType, value: string) => ACParams;
    TYPE: {
        DEFAULT: ParamType;
        EVENT: ParamType;
        BUY: ParamType;
    };
};
export declare type ACParams = {
    type: ParamType;
    name: string;
};
export declare const ACParams: IACParams;
export {};
//# sourceMappingURL=acparam.d.ts.map