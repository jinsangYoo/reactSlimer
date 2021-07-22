import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import ACENetworkResult from '../http/ACENetworkResult';
export default class Task {
    constructor(params) {
        this._logSource = params.type;
        this._date = new Date();
    }
    doWork() {
        console.log('ITask::doWork');
    }
    didWork(callback) {
        console.log('ITask::didWork');
    }
    doneWork() {
        console.log('ITask::doneWork');
    }
    completed(response) {
        this._response = new ACENetworkResult(response);
    }
    failed(err) {
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
//# sourceMappingURL=Task.js.map