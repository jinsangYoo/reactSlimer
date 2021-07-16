import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
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
        console.log('ITask::completed');
    }
    failed(err) {
        console.log('ITask::failed');
    }
    getDescription() {
        return ACEofAPIForOne[this._logSource];
    }
    getCreateTime() {
        return this._date;
    }
    getJSON() { }
}
//# sourceMappingURL=Task.js.map