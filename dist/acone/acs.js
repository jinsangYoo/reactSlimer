import { ACParams } from './acparam';
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig';
import ACEReducerForOne from './parameter/ACEReducerForOne';
import ControlTowerSingleton from '../common/controltower/ControlTowerSingleton';
import { ACEConstantCallback, ACEResultCode } from '../common/constant/ACEPublicStaticConfig';
import ACEConstantInteger from '../common/constant/ACEConstantInteger';
import ACELog from '../common/logger/ACELog';
import NetworkUtils from '../common/http/NetworkUtills';
import { EventsForWorkerEmitter } from '../common/worker/EventsForWorkerEmitter';
import { decode, getQueryForKey, isEmpty } from '../common/util/TextUtils';
import ACECONSTANT from '../common/constant/ACEConstant';
export class ACS {
    constructor() {
        this.emitter = new EventsForWorkerEmitter();
        this.emitter.on('popWaitQueue', () => {
            this.popWaitQueue();
        });
        this.emitter.on('popBufferQueue', () => {
            this.popBufferQueue();
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
                    this.popWaitQueueEmit();
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
                    this.popWaitQueueEmit();
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
        ACELog.d(ACS._TAG, `send::getIsCompletePolicy: ${ControlTowerSingleton.getIsCompletePolicy()}`);
        if (!ControlTowerSingleton.getIsCompletePolicy()) {
            ACS.setWaitQueue(value);
            const result = {
                taskHash: `${value.type}::0405`,
                code: ACEResultCode.NotReceivePolicy,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not receive policy for SDK. It will send after init.',
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
        ACELog.d(ACS._TAG, `send::isEnableByPolicy: ${ControlTowerSingleton.isEnableByPolicy()}`);
        if (!ControlTowerSingleton.isEnableByPolicy()) {
            ACS.setWaitQueue(value);
            const result = {
                taskHash: `${value.type}::0406`,
                code: ACEResultCode.DisabledByPolicy,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Disabled by policy of SDK. It will send after init.',
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
        if (ACS.isLock()) {
            ACS.setBufferQueue(value);
            const result = {
                taskHash: `${value.type}::0409`,
                code: ACEResultCode.TooBusyWillSendAfterDone,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Too busy. It will send after done.',
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
        return '0.0.257';
    }
    static getPackageNameOrBundleID() {
        return this._packageNameOrBundleID;
    }
    static setPackageNameOrBundleID(packageNameOrBundleID) {
        this._packageNameOrBundleID = packageNameOrBundleID;
    }
    static getDetail() {
        var _a, _b;
        return {
            sdkVersion: ACS.SDKVersion(),
            packageNameOrBundleID: ACS.getPackageNameOrBundleID(),
            internal: {
                waitQueue: Array.from((_a = ACS.waitQueue) !== null && _a !== void 0 ? _a : []),
                bufferQueue: Array.from((_b = ACS.bufferQueue) !== null && _b !== void 0 ? _b : []),
            },
        };
    }
    popWaitQueueEmit() {
        this.emitter.emit('popWaitQueue');
    }
    popWaitQueue() {
        ACELog.d(ACS._TAG, 'pop waitQueue');
        if (ACS.waitQueue && ACS.waitQueue.length > 0) {
            ACELog.d(ACS._TAG, `waitQueue: ${ACS.waitQueue.length}`);
            const callback = (error, innerResult) => {
                if (error) {
                    ACELog.d(ACS._TAG, 'error of waitQueue', error);
                }
                else if (innerResult) {
                    ACELog.d(ACS._TAG, 'result of waitQueue', innerResult);
                    this.popWaitQueueEmit();
                }
            };
            const param = ACS.waitQueue.shift();
            if (param)
                ACS._send(param, callback);
        }
    }
    popBufferQueueEmit() {
        this.emitter.emit('popBufferQueue');
    }
    popBufferQueue() {
        ACELog.d(ACS._TAG, 'pop bufferQueue');
        if (ACS.bufferQueue && ACS.bufferQueue.length > 0) {
            ACELog.d(ACS._TAG, `bufferQueue: ${ACS.bufferQueue.length}`);
            const callback = (error, innerResult) => {
                if (error) {
                    ACELog.d(ACS._TAG, 'error of bufferQueue', error);
                }
                else if (innerResult) {
                    ACELog.d(ACS._TAG, 'result of bufferQueue', innerResult);
                }
            };
            const param = ACS.bufferQueue.shift();
            if (param)
                ACS._send(param, callback);
        }
    }
    static _send(value, callback) {
        ACS.toggleLock();
        ACELog.i(ACS._TAG, 'ACParams is ', value);
        if (callback) {
            const callbackForCB = (error, innerResult) => {
                if (error) {
                    callback(new Error(`0001, Can not use ${value.type} api.`));
                }
                else {
                    callback(undefined, innerResult);
                }
                ACS.toggleLock();
                ACS.getInstance().popBufferQueueEmit();
            };
            NetworkUtils.isNetworkAvailable()
                .then(isConnected => {
                var _a;
                ACELog.d(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`);
                if (isConnected) {
                    switch (value.type) {
                        case ACParams.TYPE.APPEAR_PRODUCT:
                            ACEReducerForOne.appearProduct(callbackForCB, value.name, value.productName, value.productCategoryName, value.productPrice);
                            break;
                        case ACParams.TYPE.BUY:
                            ACEReducerForOne.buy(callbackForCB, value.name, value.orderNumber, value.payMethodName, value.products);
                            break;
                        case ACParams.TYPE.ADDCART:
                        case ACParams.TYPE.DELCART:
                            ACEReducerForOne.cart(value.type, callbackForCB, value.products);
                            break;
                        case ACParams.TYPE.EVENT:
                            ACEReducerForOne.plWithPage(callbackForCB, value.name);
                            break;
                        case ACParams.TYPE.JOIN:
                            ACEReducerForOne.join(callbackForCB, value.name, value.userId);
                            break;
                        case ACParams.TYPE.LEAVE:
                            ACEReducerForOne.leave(callbackForCB, value.name, value.userId);
                            break;
                        case ACParams.TYPE.LINK:
                            ACEReducerForOne.link(callbackForCB, value.name, value.linkName);
                            break;
                        case ACParams.TYPE.LOGIN:
                            ACEReducerForOne.login(callbackForCB, value.name, value.userAge, value.userGender, value.userId, value.userMaritalStatus);
                            break;
                        case ACParams.TYPE.PUSH:
                            ACEReducerForOne.push(callbackForCB, value.data, value.push);
                            break;
                        case ACParams.TYPE.REFERRER:
                            const _keyword = getQueryForKey(decode((_a = value.keyword) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY), ACECONSTANT.ReferrerKeyName);
                            if (isEmpty(_keyword)) {
                                const result = {
                                    taskHash: `${value.type}::0410`,
                                    code: ACEResultCode.InvalidACParamValues,
                                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                                    message: 'Invalid value in ACParam object.',
                                    apiName: value.type,
                                };
                                ACS.toggleLock();
                                ACS.getInstance().popBufferQueueEmit();
                                callback(undefined, result);
                                return;
                            }
                            ACEReducerForOne.referrer(callbackForCB, value.keyword);
                            break;
                        case ACParams.TYPE.SEARCH:
                            ACEReducerForOne.search(callbackForCB, value.name, value.keyword);
                            break;
                        case ACParams.TYPE.TEL:
                            ACEReducerForOne.tel(callbackForCB, value.name, value.tel);
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
                    ACS.toggleLock();
                    ACS.getInstance().popBufferQueueEmit();
                    callback(undefined, result);
                }
            })
                .catch(err => {
                ACELog.e(ACS._TAG, 'isNetworkAvailable::in catch::err', err);
                const result = {
                    taskHash: `${value.type}::0408`,
                    code: ACEResultCode.UnknownConnectStateToTheInternet,
                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                    message: 'Unknown connect state to the internet.',
                    apiName: value.type,
                };
                ACS.toggleLock();
                ACS.getInstance().popBufferQueueEmit();
                callback(undefined, result);
            });
        }
        else {
            return new Promise((resolveToOut, rejectToOut) => {
                const callbackForPromise = (error, innerResult) => {
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
                    ACS.toggleLock();
                    ACS.getInstance().popBufferQueueEmit();
                };
                NetworkUtils.isNetworkAvailable()
                    .then(isConnected => {
                    var _a;
                    ACELog.d(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`);
                    if (isConnected) {
                        switch (value.type) {
                            case ACParams.TYPE.APPEAR_PRODUCT:
                                ACEReducerForOne.appearProduct(callbackForPromise, value.name, value.productName, value.productCategoryName, value.productPrice);
                                break;
                            case ACParams.TYPE.BUY:
                                ACEReducerForOne.buy(callbackForPromise, value.name, value.orderNumber, value.payMethodName, value.products);
                                break;
                            case ACParams.TYPE.ADDCART:
                            case ACParams.TYPE.DELCART:
                                ACEReducerForOne.cart(value.type, callbackForPromise, value.products);
                                break;
                            case ACParams.TYPE.EVENT:
                                ACEReducerForOne.plWithPage(callbackForPromise, value.name);
                                break;
                            case ACParams.TYPE.JOIN:
                                ACEReducerForOne.join(callbackForPromise, value.name, value.userId);
                                break;
                            case ACParams.TYPE.LEAVE:
                                ACEReducerForOne.leave(callbackForPromise, value.name, value.userId);
                                break;
                            case ACParams.TYPE.LINK:
                                ACEReducerForOne.link(callbackForPromise, value.name, value.linkName);
                                break;
                            case ACParams.TYPE.LOGIN:
                                ACEReducerForOne.login(callbackForPromise, value.name, value.userAge, value.userGender, value.userId, value.userMaritalStatus);
                                break;
                            case ACParams.TYPE.PUSH:
                                ACEReducerForOne.push(callbackForPromise, value.data, value.push);
                                break;
                            case ACParams.TYPE.REFERRER:
                                const _keyword = getQueryForKey(decode((_a = value.keyword) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY), ACECONSTANT.ReferrerKeyName);
                                if (isEmpty(_keyword)) {
                                    const result = {
                                        taskHash: `${value.type}::0410`,
                                        code: ACEResultCode.InvalidACParamValues,
                                        result: ACEConstantCallback[ACEConstantCallback.Failed],
                                        message: 'Invalid value in ACParam object.',
                                        apiName: value.type,
                                    };
                                    ACS.toggleLock();
                                    ACS.getInstance().popBufferQueueEmit();
                                    rejectToOut(result);
                                    return;
                                }
                                ACEReducerForOne.referrer(callbackForPromise, value.keyword);
                                break;
                            case ACParams.TYPE.SEARCH:
                                ACEReducerForOne.search(callbackForPromise, value.name, value.keyword);
                                break;
                            case ACParams.TYPE.TEL:
                                ACEReducerForOne.tel(callbackForPromise, value.name, value.tel);
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
                        ACS.toggleLock();
                        ACS.getInstance().popBufferQueueEmit();
                    }
                })
                    .catch(err => {
                    ACELog.e(ACS._TAG, 'isNetworkAvailable::in catch::err', err);
                    const result = {
                        taskHash: `${value.type}::0408`,
                        code: ACEResultCode.UnknownConnectStateToTheInternet,
                        result: ACEConstantCallback[ACEConstantCallback.Failed],
                        message: 'Unknown connect state to the internet.',
                        apiName: value.type,
                    };
                    ACS.toggleLock();
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
    static initBufferQueue() {
        if (!ACS.bufferQueue) {
            ACS.bufferQueue = [];
        }
    }
    static setBufferQueue(value) {
        ACS.initBufferQueue();
        ACELog.i(ACS._TAG, `ACS.bufferQueue.length: ${ACS.bufferQueue.length}`);
        if (ACS.bufferQueue.length < ACEConstantInteger.QUEUE_MAX_BUFFER_COUNT) {
            ACELog.i(ACS._TAG, `ACS.bufferQueue.push: ${value.type}, >>${value.name}<<`);
            ACS.bufferQueue.push(value);
        }
    }
    static toggleLock() {
        this.lock = !this.lock;
    }
    static isLock() {
        return this.lock;
    }
    static setAdvertisingIdentifier(advertisingIdentifier) {
        ACECommonStaticConfig.setAdvertisingIdentifier(advertisingIdentifier);
    }
}
ACS._TAG = 'ACS';
ACS.lock = false;
//# sourceMappingURL=acs.js.map