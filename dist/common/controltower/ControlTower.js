import { SDKMode, NetworkMode } from '../constant/SDKMode';
import ACEPolicyParameters from '../policy/ACEPolicyParameters';
import { isEmpty } from '../util/TextUtils';
import POLICY from '../constant/Policy';
import ACELog from '../logger/ACELog';
export default class ControlTower {
    constructor() {
        this._sdk_mode = SDKMode.development;
        this._network_mode = NetworkMode.COMPANY_dev;
        this._isCompletePolicy = false;
        this._isInstallReferrerDone = false;
        this._isSDKForceStop = false;
        this._isSDKEnabled = false;
        ACELog.setProductionMode();
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    getIsCompletePolicy() {
        return this._isCompletePolicy;
    }
    setIsCompletePolicy(isCompletePolicy, isSucceedRequestPolicy) {
        ACELog.d(ControlTower._pTAG, `setIsCompletePolicy, isCompletePolicy: ${isCompletePolicy}, isSucceedRequestPolicy: ${isSucceedRequestPolicy}`);
    }
    isDisabled() {
        const alreadyIsCompletePolicy = this.getIsCompletePolicy();
        const isSDKEnabled = this.getIsSDKEnabled();
        ACELog.d(ControlTower._pTAG, `isDisabled, alreadyIsCompletePolicy: ${alreadyIsCompletePolicy}, isSDKEnabled: ${isSDKEnabled}`);
        if (alreadyIsCompletePolicy && !isSDKEnabled) {
            ACELog.d(ControlTower._pTAG, 'SDK is disabled.');
            return true;
        }
        return false;
    }
    setSDKDisable() {
        ACELog.d(ControlTower._pTAG, 'Set SDK disable by policy.');
        this._isSDKEnabled = false;
    }
    isEnableByPolicy() {
        const result = ACEPolicyParameters.getInstance().getCpAllow();
        if (isEmpty(result)) {
            return false;
        }
        else {
            return result == POLICY.FLAG_SDK_ENABLE;
        }
    }
    getIsSDKEnabled() {
        if (this._isSDKForceStop) {
            ACELog.d(ControlTower._pTAG, 'SDK was force stopped.');
            return false;
        }
        this._isSDKEnabled = this.isEnableByPolicy();
        ACELog.d(ControlTower._pTAG, `isEnable of policy: ${this._isSDKEnabled}`);
        if (!this._isSDKEnabled) {
            ACELog.d(ControlTower._pTAG, 'not found SDK policy information.');
        }
        return this._isSDKEnabled;
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
        ACELog.setDevMode();
    }
    setProductionSDKMode() {
        this.setSDKMode(SDKMode.production);
        ACELog.setProductionMode();
    }
    static getDefaultNetworkMode() {
        return NetworkMode.COMPANY_dev;
    }
}
ControlTower._pTAG = 'pTower';
//# sourceMappingURL=ControlTower.js.map