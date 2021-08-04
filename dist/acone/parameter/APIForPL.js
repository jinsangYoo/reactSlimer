import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import { makeSuccessCallbackParams, makeFailCallbackParams } from '../../common/util/MapUtil';
import ACELog from '../../common/logger/ACELog';
import ACEParameterUtilForOne from './ACEParameterUtilForOne';
import TP from '../constant/TP';
import ACECONSTANT from '../../common/constant/ACEConstant';
export default class APIForPL extends Task {
    constructor(params) {
        var _a;
        super(params);
        ACELog.d(APIForPL._TAG, 'in constructor, params:', params);
        this.pageName = (_a = params.payload.pageName) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY;
    }
    doWork() {
        super.doWork();
        ACELog.d(APIForPL._TAG, 'doWork');
        const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
        _parameterUtilForOne.setTP(TP.SITE);
        _parameterUtilForOne.updateUrlToRef(this.pageName);
    }
    didWork(callback) {
        super.didWork(callback);
        ACELog.d(APIForPL._TAG, 'didWork');
        ACENetwork.requestToLog(response => {
            ACELog.d(APIForPL._TAG, 'in requestToPolicy, completed');
            this.completed(response);
            this.doneWork();
            if (callback) {
                callback(undefined, makeSuccessCallbackParams(this));
            }
        }, err => {
            ACELog.d(APIForPL._TAG, 'in requestToPolicy, failed');
            this.failed(err);
            this.doneWork();
            if (callback) {
                callback(err, makeFailCallbackParams(this));
            }
        });
    }
    completed(response) {
        super.completed(response);
        ACELog.d(APIForPL._TAG, 'completed');
    }
    failed(err) {
        super.failed(err);
        ACELog.d(APIForPL._TAG, 'failed');
    }
    doneWork() {
        super.doneWork();
        ACELog.d(APIForPL._TAG, 'doneWork');
    }
}
APIForPL._TAG = 'APIForPL';
//# sourceMappingURL=APIForPL.js.map