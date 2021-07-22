import ACEParameterUtilForOne from '../parameter/ACEParameterUtilForOne';
import ACEInternalAPIForOne from '../parameter/ACEInternalAPIForOne';
export default class ACEOneStaticConfig {
    constructor() {
        this._enablePrivacyPolicy = false;
        this._debug = true;
        this._key = 'empty';
        this._commonAPI = new ACEInternalAPIForOne();
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
    getCommonAPI() {
        if (this._commonAPI) {
            return this._commonAPI;
        }
        return undefined;
    }
    getParameterUtil() {
        return ACEParameterUtilForOne.getInstance();
    }
}
//# sourceMappingURL=ACEOneStaticConfig.js.map