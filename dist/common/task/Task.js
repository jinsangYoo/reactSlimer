import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import ACENetworkResult from '../http/ACENetworkResult';
export default class Task {
    constructor(params) {
        this._logSource = params.type;
        this._date = Date.now();
    }
    doWork() {
        console.log(`ITask::doWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    didWork(callback) {
        console.log(`ITask::didWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    doneWork() {
        console.log(`ITask::doneWork: ${ACEofAPIForOne[this._logSource]}`);
    }
    completed(response) {
        console.log(`ITask::completed: ${ACEofAPIForOne[this._logSource]}`);
        this._response = new ACENetworkResult(response);
    }
    failed(err) {
        console.log(`ITask::failed: ${ACEofAPIForOne[this._logSource]}`);
        console.log(JSON.stringify(err));
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