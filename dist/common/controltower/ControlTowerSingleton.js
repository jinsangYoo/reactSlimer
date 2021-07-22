import { NetworkMode } from '../constant/SDKMode';
import { AceConfiguration } from '../../acone/aceconfiguration';
import ControlTower from './ControlTower';
import ACEControlTowerForOne from '../../acone/controltower.ts/ACEControlTowerForOne';
export default class ControlTowerSingleton {
    constructor(platform = AceConfiguration.PLATFORM.DEFAULT) {
        if (platform) {
            this._platform = platform;
        }
        switch (this._platform) {
            default:
                this._controlTower = new ACEControlTowerForOne();
                break;
        }
    }
    static getInstance(platform) {
        return this.instance || (this.instance = new this(platform));
    }
    getIsCompletePolicy() {
        return this._controlTower.getIsCompletePolicy();
    }
    setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy) {
        this._controlTower.setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy);
    }
    isDisabled() {
        const currentIsCompletePolicy = this.getIsCompletePolicy();
        const currentIsSDKEnabled = this.getIsSDKEnabled();
        console.log(`ACEControlTower.getIsCompletePolicy(): ${currentIsCompletePolicy}, ACEControlTower.getIsSDKEnabled(): ${currentIsSDKEnabled}`);
        if (currentIsCompletePolicy && !currentIsSDKEnabled) {
            console.log('SDK is disabled.');
            return true;
        }
        return false;
    }
    getIsSDKEnabled() {
        return this._controlTower.getIsSDKEnabled();
    }
    getSDKMode() {
        return this._controlTower.getSDKMode();
    }
    setSDKMode(value) {
        this._controlTower.setSDKMode(value);
    }
    getNetworkMode() {
        return this._controlTower.getNetworkMode();
    }
    setNetworkMode(value) {
        this._controlTower.setNetworkMode(value);
    }
    enableForceStop() {
        this._controlTower.enableForceStop();
    }
    setDevSDKMode() {
        this._controlTower.setDevSDKMode();
    }
    setProductionSDKMode() {
        this._controlTower.setProductionSDKMode();
    }
    setHomeDevNetworkMode() {
        this._controlTower.setNetworkMode(NetworkMode.HOME_dev);
    }
    succeedRequestPolicy() {
        this._controlTower.setIsCompletePolicy(true, true);
    }
    failedRequestPolicy() {
        this._controlTower.setIsCompletePolicy(true, false);
    }
    static getDefaultNetworkMode() {
        return ControlTower.getDefaultNetworkMode();
    }
}
//# sourceMappingURL=ControlTowerSingleton.js.map