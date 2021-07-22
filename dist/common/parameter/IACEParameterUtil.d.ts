import ACENetworkResult from '../http/ACENetworkResult';
export default interface IACEParameterUtil {
    getSuccessResponseForCustomer(logSource: number, resultCode: number, res: ACENetworkResult): object;
    getFailResponseForCustomer(logSource: number, resultCode: number, err: JSON): object;
    loadUniqueKeyForSDK(): void;
    setFirstLogParameters(): void;
    setLogSource(value: number): void;
    getSession(): number;
    setKeepSession(): void;
    setNewSession(): void;
    setterForString(key: string, value: string): void;
    getSdkDetails(json: JSON): void;
}
//# sourceMappingURL=IACEParameterUtil.d.ts.map