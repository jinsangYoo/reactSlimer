import { NetworkMode } from '../constant/SDKMode';
import { AceConfiguration } from '../../acone/aceconfiguration';
import ControlTower from './ControlTower';
import ACEControlTowerForOne from '../../acone/controltower.ts/ACEControlTowerForOne';
import ACELog from '../logger/ACELog';
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
        ACELog.d(ControlTowerSingleton._TAG, `getIsCompletePolicy(): ${currentIsCompletePolicy}, getIsSDKEnabled(): ${currentIsSDKEnabled}`);
        if (currentIsCompletePolicy && !currentIsSDKEnabled) {
            ACELog.d(ControlTowerSingleton._TAG, 'SDK is disabled.');
            return true;
        }
        return false;
    }
    getIsSDKEnabled() {
        return this._controlTower.getIsSDKEnabled();
    }
    setSDKDisable() {
        this._controlTower.setSDKDisable();
    }
    isEnableByPolicy() {
        return this._controlTower.isEnableByPolicy();
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
    reset() {
        return this._controlTower.reset();
    }
    static getDefaultNetworkMode() {
        return ControlTower.getDefaultNetworkMode();
    }
    static getIsCompletePolicy() {
        return ControlTowerSingleton.getInstance().getIsCompletePolicy();
    }
    static isEnableByPolicy() {
        return ControlTowerSingleton.getInstance().isEnableByPolicy();
    }
    static reset() {
        return ControlTowerSingleton.getInstance().reset();
    }
}
ControlTowerSingleton._TAG = 'towerSingle';
//# sourceMappingURL=ControlTowerSingleton.js.map