import IACEParameterUtil from '../../common/parameter/IACEParameterUtil';
import ACEntityForST from './ACEntityForST';
import ACEntityForVT from './ACEntityForVT';
export default class ACEParameterUtilForOne implements IACEParameterUtil {
    private static instance;
    static getInstance(): ACEParameterUtilForOne;
    private constructor();
    loadUniqueKeyForSDK(): void;
    setFirstLogParameters(): void;
    setLogSource(value: number): void;
    getSdkDetails(json: JSON): void;
    initParameters(key: string, callback: ((error?: Error, result?: object) => void) | undefined): void;
    initParameters(key: string): Promise<object>;
    isFirstLog(): boolean;
    resetSessionAndParameterAfterSend(): void;
    resetSessionAndParameterAfterSendWithParams(params?: JSON): void;
    setNewSession(): void;
    getSession(): number;
    setKeepSession(): void;
    saveST_toInStorage(st: ACEntityForST, callback: (error?: Error, result?: object) => void): void;
    saveST_toInStorage(st: ACEntityForST): Promise<object>;
    getSTS(): string;
    setSTS(value: string): void;
    clearSV(): void;
    loadSV(): void;
    makeSV(): string;
    getVT(): ACEntityForVT;
    loadVT(callback: (error?: Error, result?: object) => void): void;
    loadVT(): Promise<object>;
    saveVT_toInStorage(vt: ACEntityForVT, callback: (error?: Error, result?: object) => void): void;
    saveVT_toInStorage(vt: ACEntityForVT): Promise<object>;
}
//# sourceMappingURL=ACEParameterUtilForOne.d.ts.map