export default class TaskAdapter {
    addTask(argTask, callback) {
        this._task = argTask;
        this._callback = callback;
    }
    doWork() {
        return new Promise((resolve, reject) => {
            if (this._task) {
                console.log('TaskAdapter::in doWork');
                this._task.doWork();
                resolve(true);
            }
            else {
                console.log('TaskAdapter::in doWork::undefined task');
                reject(new Error('undefined task'));
            }
        });
    }
    didWork(resultDoWork) {
        console.log(`TaskAdapter::in didWork::resultDoWork: ${resultDoWork}`);
        if (resultDoWork) {
            console.log(`TaskAdapter::in didWork::try didWork`);
            this._task.didWork(this._callback);
        }
    }
    run() {
        this.doWork()
            .then(resolve => {
            this.didWork(resolve);
        })
            .catch(err => {
            console.log(`TaskAdapter::run::err:${JSON.stringify(err)}`);
        });
    }
}
//# sourceMappingURL=TaskAdapter.js.map