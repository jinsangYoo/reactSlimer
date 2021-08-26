import IACEParameterUtil from '../../common/parameter/IACEParameterUtil';
import ACEntityForST from './ACEntityForST';
import ACEntityForVT from './ACEntityForVT';
import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
import ParameterAfterSend from '../constant/ParameterAfterSend';
import { ResultAfterSaveInStorage } from './ResultAfterSaveInStorage';
export default class ACEParameterUtilForOne implements IACEParameterUtil {
    private static _TAG;
    private static instance;
    private _enablePrivacyPolicy;
    static getInstance(): ACEParameterUtilForOne;
    private constructor();
    loadUniqueKeyForSDK(): void;
    setFirstLogParameters(): void;
    setLogSource(value: number): void;
    getSdkDetails(json: JSON): void;
    initParameters(key: string, enablePrivacyPolicy: boolean, callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined): void;
    initParameters(key: string, enablePrivacyPolicy: boolean): Promise<ACEResponseToCaller>;
    getBuyMode(): string;
    setBuyMode(value: string): void;
    clearBuyMode(): void;
    setID(value: string): void;
    getOrderNumber(): string;
    setOrderNumber(value: string): void;
    clearOrderNumber(): void;
    getPaymentMethod(): string;
    setPaymentMethod(value: string): void;
    clearPayMethod(): void;
    setProduct(value: string): void;
    clearProduct(): void;
    clearProductName(): void;
    setProductName(value: string): void;
    clearProductCategoryName(): void;
    setProductCategoryName(value: string): void;
    clearProductPrice(): void;
    setProductPrice(value: string): void;
    isFirstLog(): boolean;
    resetSessionAndParameterAfterSend(): void;
    resetSessionAndParameterAfterSendWithParams(params?: ParameterAfterSend): Promise<boolean>;
    setNewSession(): void;
    getSession(): number;
    setKeepSession(): void;
    updateSTnVT(willUpdateVt: ACEntityForVT): Promise<object>;
    getST(): ACEntityForST;
    setGetTS(value: Date, random6Value: string): void;
    saveST_toInStorage(st: ACEntityForST, callback: (error?: Error, result?: ResultAfterSaveInStorage) => void): void;
    saveST_toInStorage(st: ACEntityForST): Promise<ResultAfterSaveInStorage>;
    setStartTS(value: Date, random6Value: string): void;
    getStartTSGoldMaster(): string;
    getSTS(): string;
    setSTS(value: string): void;
    clearSV(): void;
    loadSV(): void;
    makeSV(): string;
    setTP(value: string): void;
    setURL(value: string): void;
    updateUrlToRef(value: string): void;
    clearREF(): void;
    setRefWithBundleID(value: string): void;
    setRefForTel(value: string): void;
    setBuyCountAtObject(willUpdateVt: ACEntityForVT, value: number): void;
    getBuyTimeTS(): string;
    setBuyTimeTSButNotStorage(value: string, random: string): void;
    setBuyTimeTSAtObject(willUpdateVt: ACEntityForVT, value: string, random: string): void;
    getVisitCount(): number;
    setVisitCountAtObject(willUpdateVt: ACEntityForVT, value: number): void;
    getVT(): ACEntityForVT;
    loadVT(callback: (error?: Error, result?: object) => void): void;
    loadVT(): Promise<object>;
    setVTSButNotStorage(value: Date, random: string): void;
    setVTSAtObject(willUpdateVt: ACEntityForVT, value: Date, random: string): void;
    saveVT_toInStorage(vt: ACEntityForVT, callback: (error?: Error, result?: ResultAfterSaveInStorage) => void): void;
    saveVT_toInStorage(vt: ACEntityForVT): Promise<ResultAfterSaveInStorage>;
    setUserID(value: string): void;
    setterForString(key: string, value: string): void;
    getParamsToObjectForLogSend(): object;
}
//# sourceMappingURL=ACEParameterUtilForOne.d.ts.map