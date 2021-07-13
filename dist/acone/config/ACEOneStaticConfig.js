import ACEParameterUtilForOne from '../parameter/ACEParameterUtilForOne';
export default class ACEOneStaticConfig {
    constructor() {
        this._enablePrivacyPolicy = false;
        this._debug = true;
        this._key = 'empty';
    }
    configure(configuration, callback) {
        this._key = configuration.key;
        if (configuration.enablePrivacyPolicy)
            this._enablePrivacyPolicy = configuration.enablePrivacyPolicy;
        if (configuration.debug)
            this._debug = configuration.debug;
        return ACEParameterUtilForOne.getInstance().initParameters(this._key, callback);
    }
    isDebug() {
        return this._debug;
    }
    getEnablePrivacyPolicy() {
        return this._enablePrivacyPolicy;
    }
    getKey() {
        return this._key;
    }
    getCommonAPI(configuration) {
        throw new Error('Method not implemented.');
    }
    getControlTower(configuration) {
        throw new Error('Method not implemented.');
    }
    getParameterUtil(configuration) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=ACEOneStaticConfig.js.map