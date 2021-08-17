import { ACParams } from './acparam';
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig';
import ACEReducerForOne from './parameter/ACEReducerForOne';
import ControlTowerSingleton from '../common/controltower/ControlTowerSingleton';
import { ACEConstantCallback, ACEResultCode } from '../common/constant/ACEPublicStaticConfig';
import ACEConstantInteger from '../common/constant/ACEConstantInteger';
import ACELog from '../common/logger/ACELog';
import NetworkUtils from '../common/http/NetworkUtills';
import { EventsForWorkerEmitter } from '../common/worker/EventsForWorkerEmitter';
export class ACS {
    constructor() {
        this.emitter = new EventsForWorkerEmitter();
        this.emitter.on('popWaitQueue', () => {
            this.popWaitQueue();
        });
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static configure(value, callback) {
        return ACS.getInstance().configure(value, callback);
    }
    configure(value, callback) {
        if (callback) {
            const callbackAtInit = (error, innerResult) => {
                if (error) {
                    callback(new Error(`0000, Can not init SDK.`));
                }
                else {
                    callback(undefined, innerResult);
                    this.emitter.emit('popWaitQueue');
                }
            };
            ACECommonStaticConfig.configure(value, callbackAtInit);
        }
        else {
            return new Promise((resolveToOut, rejectToOut) => {
                ACECommonStaticConfig.configure(value)
                    .then(res => {
                    resolveToOut(res);
                })
                    .then(res => {
                    ACELog.d(ACS._TAG, `0000::configure::then2: ${JSON.stringify(res, null, 2)}`);
                    this.emitter.emit('popWaitQueue');
                })
                    .catch(err => {
                    ACELog.d(ACS._TAG, `0000::configure::catch2: ${JSON.stringify(err, null, 2)}`);
                    rejectToOut(err);
                });
            });
        }
    }
    static send(value, callback) {
        if (!ControlTowerSingleton.isEnableByPolicy()) {
            ACS.setWaitQueue(value);
            const result = {
                taskHash: `${value.type}::0404`,
                code: ACEResultCode.NotFoundPolicyInformation,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not found policy information.',
                apiName: value.type,
            };
            if (callback) {
                callback(undefined, result);
                return;
            }
            else {
                return new Promise((resolveToOut, rejectToOut) => {
                    rejectToOut(result);
                });
            }
        }
        ACELog.i(ACS._TAG, `send::getIsCompletePolicy: ${ControlTowerSingleton.getIsCompletePolicy()}`);
        if (!ControlTowerSingleton.getIsCompletePolicy()) {
            ACS.setWaitQueue(value);
            const result = {
                taskHash: `${value.type}::0405`,
                code: ACEResultCode.NotReceivePolicy,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not receive policy for SDK.',
                apiName: value.type,
            };
            if (callback) {
                callback(undefined, result);
                return;
            }
            else {
                return new Promise((resolveToOut, rejectToOut) => {
                    rejectToOut(result);
                });
            }
        }
        ACELog.i(ACS._TAG, `send::isEnableByPolicy: ${ControlTowerSingleton.isEnableByPolicy()}`);
        if (!ControlTowerSingleton.isEnableByPolicy()) {
            ACS.setWaitQueue(value);
            const result = {
                taskHash: `${value.type}::0406`,
                code: ACEResultCode.DisabledByPolicy,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Disabled by policy of SDK.',
                apiName: value.type,
            };
            if (callback) {
                callback(undefined, result);
                return;
            }
            else {
                return new Promise((resolveToOut, rejectToOut) => {
                    rejectToOut(result);
                });
            }
        }
        return ACS._send(value, callback);
    }
    static SDKVersion() {
        return '0.0.208';
    }
    static getPackageNameOrBundleID() {
        return this._packageNameOrBundleID;
    }
    static setPackageNameOrBundleID(packageNameOrBundleID) {
        this._packageNameOrBundleID = packageNameOrBundleID;
    }
    popWaitQueue() {
        ACELog.d(ACS._TAG, 'try pop waitQueue');
        if (ACS.waitQueue && ACS.waitQueue.length > 0) {
            ACELog.d(ACS._TAG, `waitQueue: ${ACS.waitQueue.length}`);
            const callback = (error, innerResult) => {
                if (error) {
                    ACELog.d(ACS._TAG, 'error of waitQueue', error);
                }
                else if (innerResult) {
                    ACELog.d(ACS._TAG, 'result of waitQueue', innerResult);
                    this.emitter.emit('popWaitQueue');
                }
            };
            const param = ACS.waitQueue.shift();
            if (param)
                ACS._send(param, callback);
        }
    }
    static _send(value, callback) {
        if (callback) {
            const callbackAtSend = (error, innerResult) => {
                if (error) {
                    callback(new Error(`0001, Can not use ${value.type} api.`));
                }
                else {
                    callback(undefined, innerResult);
                }
            };
            NetworkUtils.isNetworkAvailable()
                .then(isConnected => {
                ACELog.i(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`);
                if (isConnected) {
                    switch (value.type) {
                        case ACParams.TYPE.BUY:
                            ACEReducerForOne.buy(value.name, callbackAtSend);
                            break;
                        case ACParams.TYPE.EVENT:
                            ACEReducerForOne.plWithPage(value.name, callbackAtSend);
                            break;
                    }
                }
                else {
                    const result = {
                        taskHash: `${value.type}::0407`,
                        code: ACEResultCode.NotConnectToTheInternet,
                        result: ACEConstantCallback[ACEConstantCallback.Failed],
                        message: 'Not connect to the internet.',
                        apiName: value.type,
                    };
                    callback(undefined, result);
                }
            })
                .catch(err => {
                ACELog.i(ACS._TAG, 'isNetworkAvailable::in catch::err', err);
                const result = {
                    taskHash: `${value.type}::0408`,
                    code: ACEResultCode.UnknownConnectStateToTheInternet,
                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                    message: 'Unknown connect state to the internet.',
                    apiName: value.type,
                };
                callback(undefined, result);
            });
        }
        else {
            return new Promise((resolveToOut, rejectToOut) => {
                NetworkUtils.isNetworkAvailable()
                    .then(isConnected => {
                    ACELog.i(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`);
                    if (isConnected) {
                        switch (value.type) {
                            case ACParams.TYPE.BUY:
                                ACEReducerForOne.buy(value.name, (error, innerResult) => {
                                    if (error) {
                                        if (innerResult) {
                                            rejectToOut(innerResult);
                                        }
                                        else {
                                            rejectToOut(new Error(`0002, Can not use ${value.type} api.`));
                                        }
                                    }
                                    else {
                                        if (innerResult)
                                            resolveToOut(innerResult);
                                    }
                                });
                                break;
                            case ACParams.TYPE.EVENT:
                                ACEReducerForOne.plWithPage(value.name, (error, innerResult) => {
                                    if (error) {
                                        if (innerResult) {
                                            rejectToOut(innerResult);
                                        }
                                        else {
                                            rejectToOut(new Error(`0002, Can not use ${value.type} api.`));
                                        }
                                    }
                                    else {
                                        if (innerResult)
                                            resolveToOut(innerResult);
                                    }
                                });
                                break;
                        }
                    }
                    else {
                        const result = {
                            taskHash: `${value.type}::0407`,
                            code: ACEResultCode.NotConnectToTheInternet,
                            result: ACEConstantCallback[ACEConstantCallback.Failed],
                            message: 'Not connect to the internet.',
                            apiName: value.type,
                        };
                        rejectToOut(result);
                    }
                })
                    .catch(err => {
                    ACELog.i(ACS._TAG, 'isNetworkAvailable::in catch::err', err);
                    const result = {
                        taskHash: `${value.type}::0408`,
                        code: ACEResultCode.UnknownConnectStateToTheInternet,
                        result: ACEConstantCallback[ACEConstantCallback.Failed],
                        message: 'Unknown connect state to the internet.',
                        apiName: value.type,
                    };
                    rejectToOut(result);
                });
            });
        }
    }
    static initWaitQueue() {
        if (!ACS.waitQueue) {
            ACS.waitQueue = [];
        }
    }
    static setWaitQueue(value) {
        ACS.initWaitQueue();
        ACELog.i(ACS._TAG, `ACS.waitQueue.length: ${ACS.waitQueue.length}`);
        if (ACS.waitQueue.length < ACEConstantInteger.QUEUE_MAX_WAITING_COUNT) {
            ACELog.i(ACS._TAG, `ACS.waitQueue.push: ${value.type}, >>${value.name}<<`);
            ACS.waitQueue.push(value);
        }
    }
}
ACS._TAG = 'ACS';
//# sourceMappingURL=acs.js.map