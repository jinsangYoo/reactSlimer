import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil';
import ACEResultCode from '../../common/constant/ACEResultCode';
import { ACEInnerCBResultKey } from '../../common/constant/ACEInnerCBResultKey';
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton';
import { makeSuccessCallback, makeFailCallback } from '../../common/util/MapUtil';
export default class APIForPolicy extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
    }
    didWork(callback) {
        super.didWork();
        if (global.Promise) {
            return new Promise((resolve, reject) => {
                ACENetwork.requestToPolicy(response => {
                    console.log('APIForPolicy::in cb::completed!!!');
                    this.completed(response);
                    this.doneWork();
                    if (callback) {
                        callback(undefined, makeSuccessCallback(this));
                    }
                    else {
                        resolve(makeSuccessCallback(this));
                    }
                }, err => {
                    console.log('APIForPolicy::in cb::failed!!!');
                    this.failed(err);
                    this.doneWork();
                    if (callback) {
                        callback(makeFailCallback(this));
                    }
                    else {
                        reject(makeFailCallback(this));
                    }
                });
            });
        }
        else {
            console.log('APIForPolicy::not support promise.');
            this.failed({
                code: ACEInnerCBResultKey.NotSupportPromise,
                result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotSupportPromise],
            });
            if (callback) {
                console.log('try call cb!!');
                callback({
                    code: ACEResultCode.NotSupportPromise,
                    result: ACEResultCode[ACEResultCode.NotSupportPromise],
                }, undefined);
            }
        }
    }
    doneWork() {
        super.doneWork();
    }
    completed(response) {
        super.completed(response);
        ACEPolicyParameterUtil.getInstance().savePolicy(this._response);
        ControlTowerSingleton.getInstance().succeedRequestPolicy();
    }
    failed(err) {
        super.failed(err);
        ControlTowerSingleton.getInstance().failedRequestPolicy();
    }
}
//# sourceMappingURL=APIForPolicy.js.map