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
    doneWork() {
        this._task.doneWork();
    }
    run() {
        this.doWork();
        this.didWork();
        this.doneWork();
    }
}
//# sourceMappingURL=TaskAdapter.js.map