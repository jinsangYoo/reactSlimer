export default class TaskAdapter {
    addTask(argTask) {
        this._task = argTask;
    }
    doWork() {
        this._task.doWork();
    }
    didWork() {
        this._task.didWork();
    }
    run() {
        this.doWork();
        this.didWork();
    }
}
//# sourceMappingURL=TaskAdapter.js.map