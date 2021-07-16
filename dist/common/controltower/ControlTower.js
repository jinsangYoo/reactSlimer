import { SDKMode, NetworkMode } from '../constant/SDKMode';
export default class ControlTower {
    constructor() {
        this._sdk_mode = SDKMode.development;
        this._network_mode = NetworkMode.COMPANY_dev;
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
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
}
//# sourceMappingURL=ControlTower.js.map