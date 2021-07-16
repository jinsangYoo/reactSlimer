import { ACS } from '../../acone/acs';
import { AceConfiguration } from '../../acone/aceconfiguration';
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig';
import ACECONSTANT from '../constant/ACEConstant';
import ControlTower from '../controltower/ControlTower';
import { SDKMode, NetworkMode } from '../constant/SDKMode';
export default class ACECommonStaticConfig {
    static configure(configuration, callback) {
        ControlTower.getInstance().setSDKMode(SDKMode.development);
        ControlTower.getInstance().setNetworkMode(NetworkMode.HOME_dev);
        console.log('NHN ACE SDK version: ' + ACS.SDKVersion());
        console.log('AceConfiguration information: ' + JSON.stringify(configuration));
        if (configuration.platform) {
            this._platform = configuration.platform;
        }
        if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
            this._staticConfigImpl = new ACEOneStaticConfig();
        }
        if (callback) {
            if (this._staticConfigImpl) {
                const _commonAPI = this._staticConfigImpl.getCommonAPI();
                this._staticConfigImpl
                    .configure(configuration)
                    .then(res => {
                    console.log(`in cb::then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`);
                    if (_commonAPI) {
                        _commonAPI.requestPolicy().then(resForPolicy => {
                            console.log(`in cb::then _commonAPI.requestPolicy::resForPolicy: ${JSON.stringify(resForPolicy)}`);
                            callback(undefined, res);
                        });
                    }
                })
                    .catch(err => {
                    console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`);
                    callback(err, undefined);
                });
            }
        }
        else {
            return new Promise((resolve, reject) => {
                if (this._staticConfigImpl) {
                    const _commonAPI = this._staticConfigImpl.getCommonAPI();
                    this._staticConfigImpl
                        .configure(configuration)
                        .then(res => {
                        console.log(`then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`);
                        if (_commonAPI) {
                            _commonAPI.requestPolicy().then(resForPolicy => {
                                console.log(`then _commonAPI.requestPolicy::resForPolicy: ${JSON.stringify(resForPolicy)}`);
                                resolve(resForPolicy);
                            });
                        }
                    })
                        .catch(err => {
                        console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`);
                        reject(err);
                    });
                }
            });
        }
    }
    static isDebug() {
        if (this._staticConfigImpl) {
            return this._staticConfigImpl.isDebug();
        }
        return false;
    }
    static getEnablePrivacyPolicy() {
        if (this._staticConfigImpl) {
            return this._staticConfigImpl.getEnablePrivacyPolicy();
        }
        return false;
    }
    static getKey() {
        if (this._staticConfigImpl) {
            return this._staticConfigImpl.getKey();
        }
        return ACECONSTANT.EMPTY;
    }
}
//# sourceMappingURL=ACECommonStaticConfig.js.map