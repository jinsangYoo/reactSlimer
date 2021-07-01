export default class ITask {
    constructor(params) { }
    doWork() {
        console.log('ITask::doWork');
    }
    didWork() {
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
//# sourceMappingURL=ITask.js.map