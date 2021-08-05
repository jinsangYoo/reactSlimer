import { ACParams } from './acparam';
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig';
import ACEReducerForOne from './parameter/ACEReducerForOne';
export class ACS {
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static configure(value, callback) {
        return ACS.getInstance().configure(value, callback);
    }
    configure(value, callback) {
        return ACECommonStaticConfig.configure(value, callback);
    }
    static send(value, callback) {
        const callbackAtSend = (error, innerResult) => {
            if (callback) {
                if (error) {
                    callback(new Error(`0001, Can not use ${value.type} api.`));
                }
                else {
                    callback(undefined, innerResult);
                }
            }
        };
        switch (value.type) {
            case ACParams.TYPE.BUY:
                if (callback) {
                    ACEReducerForOne.buy(value.name, callbackAtSend);
                }
                else {
                    return new Promise((resolveToOut, rejectToOut) => {
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
                    });
                }
                break;
            case ACParams.TYPE.EVENT:
                if (callback) {
                    ACEReducerForOne.plWithPage(value.name, callbackAtSend);
                }
                else {
                    return new Promise((resolveToOut, rejectToOut) => {
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
                    });
                }
                break;
        }
    }
    static SDKVersion() {
        return '0.0.169';
    }
    static getPackageNameOrBundleID() {
        return this._packageNameOrBundleID;
    }
    static setPackageNameOrBundleID(packageNameOrBundleID) {
        this._packageNameOrBundleID = packageNameOrBundleID;
    }
}
//# sourceMappingURL=acs.js.map