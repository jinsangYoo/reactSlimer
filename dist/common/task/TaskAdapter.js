export default class TaskAdapter {
    addTask(argTask, callback) {
        this._task = argTask;
        this._callback = callback;
    }
    doWork() {
        this._task.doWork();
    }
    didWork() {
        return this._task.didWork(this._callback);
    }
    run() {
        this.doWork();
        return this.didWork();
    }
}
//# sourceMappingURL=TaskAdapter.js.map