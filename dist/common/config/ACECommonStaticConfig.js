import { ACS } from '../../acone/acs';
import { AceConfiguration } from '../../acone/aceconfiguration';
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig';
import ACECONSTANT from '../constant/ACEConstant';
import ControlTowerSingleton from '../controltower/ControlTowerSingleton';
import { ACEConstantCallback, ACEResultCode } from '../constant/ACEPublicStaticConfig';
import ACELog from '../logger/ACELog';
export default class ACECommonStaticConfig {
    static configure(configuration, callback) {
        ControlTowerSingleton.getInstance().setDevSDKMode();
        ControlTowerSingleton.getInstance().setHomeDevNetworkMode();
        ACELog.i(ACECommonStaticConfig._TAG, `NHN DATA SDK version: ${ACS.SDKVersion()}`);
        if (this._staticConfigImpl) {
            ACELog.d(ACECommonStaticConfig._TAG, 'Already init SDK.');
            const response = {
                taskHash: '0000',
                code: ACEResultCode.AlreadyInitialized,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Already init SDK.',
                apiName: 'init',
            };
            if (callback) {
                callback(new Error('Already init SDK.'), response);
                return;
            }
            else {
                return new Promise((resolveToOut, rejectToOut) => {
                    rejectToOut(response);
                });
            }
        }
        else {
            ACELog.i(ACECommonStaticConfig._TAG, 'Start init SDK.');
        }
        console.log('AceConfiguration information: ' + JSON.stringify(configuration));
        if (configuration.platform) {
            this._platform = configuration.platform;
        }
        if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
            this._staticConfigImpl = new ACEOneStaticConfig();
        }
        const _commonAPI = this._staticConfigImpl.getCommonAPI();
        if (callback) {
            this._staticConfigImpl
                .configure(configuration)
                .then(res => {
                console.log(`SDK init step one result: ${JSON.stringify(res)}`);
                return res;
            })
                .then(res => {
                console.log('SDK init step two request policy');
                if (_commonAPI) {
                    _commonAPI.requestPolicy((error, innerResult) => {
                        if (error) {
                            callback(new Error('0001, Can not request policy.'), innerResult);
                        }
                        else {
                            callback(undefined, innerResult);
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
                    callback(new Error('0001, Can not request policy.'), response);
                }
            })
                .catch(err => {
                console.log(`0001, Can not request policy. ${JSON.stringify(err)}`);
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
                    if (_commonAPI) {
                        console.log('SDK init step two request policy');
                        _commonAPI.requestPolicy((error, innerResult) => {
                            if (error) {
                                if (innerResult) {
                                    rejectToOut(innerResult);
                                }
                                else {
                                    rejectToOut(new Error('0002, Can not request policy.'));
                                }
                            }
                            else {
                                if (innerResult)
                                    resolveToOut(innerResult);
                            }
                        });
                    }
                    else {
                        const response = {
                            taskHash: '0002',
                            code: ACEResultCode.CanNotRequestToPolicy,
                            result: ACEConstantCallback[ACEConstantCallback.Failed],
                            message: 'Can not request policy.',
                            apiName: 'init',
                        };
                        rejectToOut(response);
                    }
                })
                    .catch(err => {
                    console.log(`0002, Can not request policy. ${JSON.stringify(err)}`);
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
ACECommonStaticConfig._TAG = 'init';
//# sourceMappingURL=ACECommonStaticConfig.js.map