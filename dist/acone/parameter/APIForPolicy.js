import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil';
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton';
import { makeSuccessCallbackParams, makeFailCallbackParams } from '../../common/util/MapUtil';
import ACELog from '../../common/logger/ACELog';
import { ACEResultCode, ACEConstantCallback } from '../../common/constant/ACEPublicStaticConfig';
export default class APIForPolicy extends Task {
    constructor(params) {
        super(params);
    }
    doWork(callback) {
        super.doWork(callback);
        if (callback) {
            const res = {
                taskHash: `${this._logSource}::0011`,
                code: ACEResultCode.Success,
                result: ACEConstantCallback[ACEConstantCallback.Success],
                message: 'Done doWork to policy.',
                apiName: this.getDescription(),
            };
            callback(undefined, res);
        }
    }
    didWork(callback) {
        super.didWork(callback);
        ACENetwork.requestToPolicy(response => {
            ACELog.d(APIForPolicy._TAG, 'in requestToPolicy, completed');
            this.completed(response);
            this.doneWork(callback);
        }, err => {
            ACELog.d(APIForPolicy._TAG, 'in requestToPolicy, failed');
            this.failed(err);
            this.doneWork(callback);
        });
    }
    doneWork(callback) {
        super.doneWork(callback);
        if (callback) {
            if (this._error) {
                callback(this.getNetworkError(), makeFailCallbackParams(this));
            }
            else {
                callback(undefined, makeSuccessCallbackParams(this));
            }
        }
    }
    completed(response) {
        super.completed(response);
        ACELog.d(APIForPolicy._TAG, 'completed, before savePolicy');
        ACEPolicyParameterUtil.getInstance().savePolicy(this._response);
        ACELog.d(APIForPolicy._TAG, 'completed, after savePolicy');
        ControlTowerSingleton.getInstance().succeedRequestPolicy();
    }
    failed(err) {
        super.failed(err);
        ControlTowerSingleton.getInstance().failedRequestPolicy();
    }
}
APIForPolicy._TAG = 'APIForPolicy';
//# sourceMappingURL=APIForPolicy.js.map