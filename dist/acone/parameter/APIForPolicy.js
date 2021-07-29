import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil';
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton';
import { makeSuccessCallbackParams, makeFailCallbackParams } from '../../common/util/MapUtil';
export default class APIForPolicy extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
    }
    didWork(callback) {
        super.didWork(callback);
        ACENetwork.requestToPolicy(response => {
            console.log('APIForPolicy::in requestToPolicy.completed');
            this.completed(response);
            this.doneWork();
            if (callback) {
                callback(undefined, makeSuccessCallbackParams(this));
            }
        }, err => {
            console.log('APIForPolicy::in requestToPolicy.failed');
            this.failed(err);
            this.doneWork();
            if (callback) {
                callback(err, makeFailCallbackParams(this));
            }
        });
    }
    doneWork() {
        super.doneWork();
    }
    completed(response) {
        super.completed(response);
        console.log('APIForPolicy::completed::before savePolicy');
        ACEPolicyParameterUtil.getInstance().savePolicy(this._response);
        console.log('APIForPolicy::completed::after savePolicy');
        ControlTowerSingleton.getInstance().succeedRequestPolicy();
    }
    failed(err) {
        super.failed(err);
        ControlTowerSingleton.getInstance().failedRequestPolicy();
    }
}
//# sourceMappingURL=APIForPolicy.js.map