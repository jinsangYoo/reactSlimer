export default class Task {
    constructor(params) { }
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
    getDescription() { }
    getCreateTime() { }
    getJSON() { }
}
//# sourceMappingURL=Task.js.map