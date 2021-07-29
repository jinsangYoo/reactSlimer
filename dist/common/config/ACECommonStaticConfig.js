import { ACS } from '../../acone/acs';
import { AceConfiguration } from '../../acone/aceconfiguration';
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig';
import ACECONSTANT from '../constant/ACEConstant';
import ControlTowerSingleton from '../controltower/ControlTowerSingleton';
import { ACEConstantCallback, ACEResultCode } from '../constant/ACEPublicStaticConfig';
export default class ACECommonStaticConfig {
    static configure(configuration, callback) {
        console.log('NHN ACE SDK version: ' + ACS.SDKVersion());
        if (this._staticConfigImpl) {
            console.log(`Already init SDK.`);
            const response = {
                taskHash: '0000',
                code: ACEResultCode.AlreadyInitialized,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Already init SDK.',
                apiName: 'init',
            };
            if (callback) {
                callback(new Error('Already init SDK.'), response);
            }
            else {
                return new Promise((resolveToOut, rejectToOut) => {
                    rejectToOut(response);
                });
            }
        }
        else {
            console.log(`Start init SDK.`);
        }
        console.log('AceConfiguration information: ' + JSON.stringify(configuration));
        if (configuration.platform) {
            this._platform = configuration.platform;
        }
        if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
            this._staticConfigImpl = new ACEOneStaticConfig();
        }
        ControlTowerSingleton.getInstance().setDevSDKMode();
        ControlTowerSingleton.getInstance().setHomeDevNetworkMode();
        if (callback) {
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
        else {
            return new Promise((resolveToOut, rejectToOut) => {
                this._staticConfigImpl
                    .configure(configuration)
                    .then(res => {
                    console.log(`SDK init step one result: ${JSON.stringify(res)}`);
                    return res;
                })
                    .then(res => {
                    const _commonAPI = this._staticConfigImpl.getCommonAPI();
                    if (_commonAPI) {
                        console.log('SDK init step two request policy');
                        _commonAPI.requestPolicy((error, innerResult) => {
                            if (error) {
                                rejectToOut(error);
                            }
                            else {
                                if (innerResult)
                                    resolveToOut(innerResult);
                            }
                        });
                    }
                    else {
                        const response = {
                            taskHash: '0001',
                            code: ACEResultCode.CanNotRequestToPolicy,
                            result: ACEConstantCallback[ACEConstantCallback.Failed],
                            message: 'Can not request policy.',
                            apiName: 'init',
                        };
                        rejectToOut(response);
                    }
                })
                    .catch(err => {
                    console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`);
                    rejectToOut(err);
                });
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
    static getParameterUtil() {
        if (this._staticConfigImpl) {
            return this._staticConfigImpl.getParameterUtil();
        }
        return undefined;
    }
}
//# sourceMappingURL=ACECommonStaticConfig.js.map