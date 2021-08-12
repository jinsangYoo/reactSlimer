import { SDKMode, NetworkMode } from '../constant/SDKMode';
import { ACEPlatform } from '../../acone/aceconfiguration';
export default class ControlTowerSingleton {
    private static _TAG;
    private _platform;
    private _controlTower;
    private static instance;
    static getInstance(): ControlTowerSingleton;
    constructor(platform?: ACEPlatform);
    getIsCompletePolicy(): boolean;
    setIsCompletePolicy(isCompletePolicy: boolean, isSucceedRequestPolicy: boolean): void;
    protected isDisabled(): boolean;
    protected getIsSDKEnabled(): boolean;
    setSDKDisable(): void;
    isEnableByPolicy(): boolean;
    getSDKMode(): SDKMode;
    setSDKMode(value: SDKMode): void;
    getNetworkMode(): NetworkMode;
    setNetworkMode(value: NetworkMode): void;
    enableForceStop(): void;
    setDevSDKMode(): void;
    setProductionSDKMode(): void;
    setHomeDevNetworkMode(): void;
    succeedRequestPolicy(): void;
    failedRequestPolicy(): void;
    reset(): void;
    static getDefaultNetworkMode(): NetworkMode;
    static getIsCompletePolicy(): boolean;
    static isEnableByPolicy(): boolean;
    static reset(): void;
}
//# sourceMappingURL=ControlTowerSingleton.d.ts.map