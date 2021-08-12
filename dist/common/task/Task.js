import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import ACENetworkResult from '../http/ACENetworkResult';
import ACELog from '../logger/ACELog';
export default class Task {
    constructor(params) {
        this._logSource = params.type;
        this._date = Date.now();
    }
    doWork(callback) {
        ACELog.d(Task._pTAG, `doWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    didWork(callback) {
        ACELog.d(Task._pTAG, `didWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    doneWork(callback) {
        ACELog.d(Task._pTAG, `doneWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    completed(response) {
        ACELog.d(Task._pTAG, `completed: ${ACEofAPIForOne[this._logSource]}`);
        this._response = new ACENetworkResult(response);
    }
    failed(err) {
        ACELog.d(Task._pTAG, `failed: ${ACEofAPIForOne[this._logSource]}`, err);
        this._error = JSON.parse(JSON.stringify(err));
    }
    getLogSource() {
        return this._logSource;
    }
    getDescription() {
        return ACEofAPIForOne[this._logSource];
    }
    getCreateTime() {
        return this._date;
    }
    getTaskHash() {
        return this.getCreateTime().valueOf().toString();
    }
    getNetworkResult() {
        return this._response;
    }
    getNetworkError() {
        return this._error;
    }
    getNetworkResultToResponseToCaller() {
        var _a;
        if (this._response) {
            if (ACELog.isDevMode()) {
                return {
                    config: (_a = this._response) !== null && _a !== void 0 ? _a : {},
                };
            }
            else {
                return {
                    config: {},
                };
            }
        }
        else {
            return {
                config: {},
            };
        }
    }
    getNetworkErrorToResponseToCaller() {
        var _a, _b, _c, _d, _e;
        if (this._error) {
            if (ACELog.isDevMode()) {
                return {
                    message: (_a = this._error['message']) !== null && _a !== void 0 ? _a : '',
                    name: (_b = this._error['name']) !== null && _b !== void 0 ? _b : '',
                    config: (_c = this._error['config']) !== null && _c !== void 0 ? _c : {},
                };
            }
            else {
                return {
                    message: (_d = this._error['message']) !== null && _d !== void 0 ? _d : '',
                    name: (_e = this._error['name']) !== null && _e !== void 0 ? _e : '',
                };
            }
        }
        else {
            return {
                message: '',
                name: '',
            };
        }
    }
}
Task._pTAG = 'pTask';
//# sourceMappingURL=Task.js.map