import { SDKMode, NetworkMode } from '../constant/SDKMode';
import ACEPolicyParameters from '../policy/ACEPolicyParameters';
import { isEmpty } from '../util/TextUtils';
export default class ControlTower {
    constructor() {
        this._sdk_mode = SDKMode.development;
        this._network_mode = NetworkMode.COMPANY_dev;
        this._isCompletePolicy = false;
        this._isInstallReferrerDone = false;
        this._isSDKForceStop = false;
        this._isSDKEnabled = false;
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    getIsCompletePolicy() {
        return this._isCompletePolicy;
    }
    setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy) {
        console.log(`setIsCompletePolicy::isCompletePolicy: ${isCompletePolicy}, isSucceedRequestPolicy: ${isSucceedRequestPolicy}`);
    }
    isDisabled() {
        const currentIsCompletePolicy = this.getIsCompletePolicy();
        const currentIsSDKEnabled = this.getIsSDKEnabled();
        console.log(`ControlTower.getIsCompletePolicy: ${currentIsCompletePolicy}, ControlTower.getIsSDKEnabled: ${currentIsSDKEnabled}`);
        if (currentIsCompletePolicy && !currentIsSDKEnabled) {
            console.log('SDK is disabled.');
            return true;
        }
        return false;
    }
    setSDKDisable() {
        console.log('Set SDK disable by policy.');
        this._isSDKEnabled = false;
    }
    isEnableByPolicy() {
        const result = ACEPolicyParameters.getInstance().getCpAllow();
        if (isEmpty(result)) {
            return false;
        }
        else {
            return result == "*";
        }
    }
    getIsSDKEnabled() {
        if (this._isSDKForceStop) {
            console.log('SDK was force stopped.');
            return false;
        }
        this._isSDKEnabled = this.isEnableByPolicy();
        console.log(`isEnabled: ${this._isSDKEnabled}, _isSDKEnabled: ${this._isSDKEnabled}`);
        if (!this._isSDKEnabled) {
            console.log('not found SDK policy information.');
        }
        return false;
    }
    getSDKMode() {
        return this._sdk_mode;
    }
    setSDKMode(value) {
        this._sdk_mode = value;
        switch (value) {
            case SDKMode.production:
                this._network_mode = NetworkMode.Pro;
            case SDKMode.development:
                this._network_mode = NetworkMode.COMPANY_dev;
        }
    }
    getNetworkMode() {
        return this._network_mode;
    }
    setNetworkMode(value) {
        this._network_mode = value;
    }
    enableForceStop() { }
    setDevSDKMode() {
        this.setSDKMode(SDKMode.development);
    }
    setProductionSDKMode() {
        this.setSDKMode(SDKMode.production);
    }
    static getDefaultNetworkMode() {
        return NetworkMode.COMPANY_dev;
    }
}
//# sourceMappingURL=ControlTower.js.map