import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil';
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
        super.didWork(callback);
        ACENetwork.requestToPolicy(response => {
            console.log('APIForPolicy::in cb::completed!!!');
            this.completed(response);
            this.doneWork();
            if (callback) {
                const callbackUnit = {
                    title: 'normal request policy.',
                    location: 'APIForPolicy::ACENetwork.requestToPolicy::completed',
                    result: true,
                    payload: makeSuccessCallback(this),
                };
                callback(undefined, {
                    prevResult: true,
                    history: [callbackUnit],
                });
            }
        }, err => {
            console.log('APIForPolicy::in cb::failed!!!');
            this.failed(err);
            this.doneWork();
            if (callback) {
                const callbackUnit = {
                    title: 'fail request policy.',
                    location: 'APIForPolicy::ACENetwork.requestToPolicy::failed',
                    result: false,
                    payload: makeFailCallback(this),
                };
                callback(err, {
                    prevResult: false,
                    history: [callbackUnit],
                });
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