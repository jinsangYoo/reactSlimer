import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import ACENetworkResult from '../http/ACENetworkResult';
import ACELog from '../logger/ACELog';
export default class Task {
    constructor(params) {
        this._logSource = params.type;
        this._date = Date.now();
    }
    doWork() {
        ACELog.d(Task._pTAG, `doWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    didWork(callback) {
        ACELog.d(Task._pTAG, `didWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    doneWork() {
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
}
Task._pTAG = 'pTask';
//# sourceMappingURL=Task.js.map