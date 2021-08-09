import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import { makeSuccessCallbackParams, makeFailCallbackParams } from '../../common/util/MapUtil';
import ACELog from '../../common/logger/ACELog';
import ACEParameterUtilForOne from './ACEParameterUtilForOne';
import TP from '../constant/TP';
import ACECONSTANT from '../../common/constant/ACEConstant';
import { ACEResultCode, ACEConstantCallback } from '../../common/constant/ACEPublicStaticConfig';
import ACEntityForVT from './ACEntityForVT';
import ACEntityForST from './ACEntityForVT';
export default class APIForPL extends Task {
    constructor(params) {
        var _a;
        super(params);
        ACELog.d(APIForPL._TAG, 'in constructor, params:', params);
        this.pageName = (_a = params.payload.pageName) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY;
    }
    doWork(callback) {
        super.doWork(callback);
        ACELog.d(APIForPL._TAG, 'doWork');
        const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
        _parameterUtilForOne.setTP(TP.SITE);
        _parameterUtilForOne.updateUrlToRef(this.pageName);
        _parameterUtilForOne
            .loadVT()
            .then(response => {
            ACELog.d(APIForPL._TAG, 'Done load vt.', response);
            ACELog.d(APIForPL._TAG, 'vt after loadVT()', _parameterUtilForOne.getVT());
            return _parameterUtilForOne.updateSTnVT(this.assignWillUpdateVt());
        })
            .then(response => {
            ACELog.d(APIForPL._TAG, 'Done update st and vt.', response);
            ACELog.d(APIForPL._TAG, 'vt after updateSTnVT()', _parameterUtilForOne.getVT());
            if (callback) {
                const res = {
                    taskHash: `${this._logSource}::0011`,
                    code: ACEResultCode.Success,
                    result: ACEConstantCallback[ACEConstantCallback.Success],
                    message: 'Done update st and vt.',
                    apiName: this.getDescription(),
                };
                callback(undefined, res);
            }
        })
            .catch(err => {
            ACELog.d(APIForPL._TAG, 'Fail load st and vt.', err);
            if (callback) {
                const res = {
                    taskHash: `${this._logSource}::0012`,
                    code: ACEResultCode.FailLoadVT,
                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                    message: 'Fail load vt.',
                    apiName: this.getDescription(),
                };
                callback(err, res);
            }
        });
    }
    didWork(callback) {
        super.didWork(callback);
        ACELog.d(APIForPL._TAG, 'didWork');
        ACENetwork.requestToLog(response => {
            ACELog.d(APIForPL._TAG, 'in requestToPolicy, completed');
            this.completed(response);
            this.doneWork(callback);
        }, err => {
            ACELog.d(APIForPL._TAG, 'in requestToPolicy, failed');
            this.failed(err);
            this.doneWork(callback);
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
    doneWork(callback) {
        super.doneWork(callback);
        ACELog.d(APIForPL._TAG, 'doneWork');
        const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
        _parameterUtilForOne
            .resetSessionAndParameterAfterSendWithParams({
            vt: this.assignWillUpdateVt(),
        })
            .then(result => {
            ACELog.d(APIForPL._TAG, `resetSessionAndParameterAfterSendWithParams::result: ${result}`);
            if (callback) {
                if (this._error) {
                    callback(undefined, makeSuccessCallbackParams(this));
                }
                else {
                    callback(this.getNetworkError(), makeFailCallbackParams(this));
                }
            }
        })
            .catch(err => {
            ACELog.d(APIForPL._TAG, `resetSessionAndParameterAfterSendWithParams::err: ${err}`);
            if (callback) {
                if (this._error) {
                    callback(undefined, makeSuccessCallbackParams(this));
                }
                else {
                    callback(this.getNetworkError(), makeFailCallbackParams(this));
                }
            }
        });
    }
    assignWillUpdateSt() {
        if (!this._willUpdateSt) {
            const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
            this._willUpdateSt = new ACEntityForST();
            this._willUpdateSt.setDeepCopy(_parameterUtilForOne.getST().getMap());
        }
        return this._willUpdateSt;
    }
    assignWillUpdateVt() {
        if (!this._willUpdateVt) {
            const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
            this._willUpdateVt = new ACEntityForVT();
            this._willUpdateVt.setDeepCopy(_parameterUtilForOne.getVT().getMap());
        }
        return this._willUpdateVt;
    }
}
APIForPL._TAG = 'APIForPL';
//# sourceMappingURL=APIForPL.js.map