import ACProduct from './acproduct';
import { ACEGender, ACEMaritalStatus } from '../common/constant/ACEPublicStaticConfig';
declare type ParamType = 'addcart' | 'appearProduct' | 'buy' | 'delcart' | 'event' | 'join' | 'leave' | 'link' | 'login' | 'tel';
export declare type IACParams = {
    init: (type: ParamType, value?: string) => ACParams;
    TYPE: {
        ADDCART: ParamType;
        APPEAR_PRODUCT: ParamType;
        BUY: ParamType;
        DELCART: ParamType;
        EVENT: ParamType;
        JOIN: ParamType;
        LEAVE: ParamType;
        LINK: ParamType;
        LOGIN: ParamType;
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
    userAge?: number;
    userGender?: ACEGender;
    userId?: string;
    userMaritalStatus?: ACEMaritalStatus;
    products?: ACProduct[];
};
export declare const ACParams: IACParams;
export {};
//# sourceMappingURL=acparam.d.ts.map