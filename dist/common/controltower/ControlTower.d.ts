import { SDKMode, NetworkMode } from '../constant/SDKMode';
export default class ControlTower {
    private static instance;
    private _sdk_mode;
    private _network_mode;
    private constructor();
    static getInstance(): ControlTower;
    getSDKMode(): SDKMode;
    setSDKMode(value: SDKMode): void;
    getNetworkMode(): NetworkMode;
    setNetworkMode(value: NetworkMode): void;
}
//# sourceMappingURL=ControlTower.d.ts.map