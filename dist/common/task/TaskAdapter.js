import ACELog from '../logger/ACELog';
export default class TaskAdapter {
    addTask(argTask, callback) {
        this._task = argTask;
        this._callback = callback;
    }
    doWork() {
        return new Promise((resolve, reject) => {
            if (this._task) {
                ACELog.d(TaskAdapter._TAG, 'in doWork');
                this._task.doWork((error, result) => {
                    if (result) {
                        ACELog.d(TaskAdapter._TAG, 'in doWork::in cb', result);
                    }
                    if (error) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            }
            else {
                ACELog.d(TaskAdapter._TAG, 'in doWork, undefined task');
                reject(new Error('undefined task'));
            }
        });
    }
    didWork(resultDoWork) {
        ACELog.d(TaskAdapter._TAG, `in didWork, resultDoWork: ${resultDoWork}`);
        if (resultDoWork) {
            this._task.didWork(this._callback);
        }
        else {
            throw new Error(`Fail doWork at ${this._task.getDescription()}.`);
        }
    }
    run() {
        this.doWork()
            .then(resolve => {
            this.didWork(resolve);
        })
            .catch(err => {
            ACELog.d(TaskAdapter._TAG, 'run err:', err);
        });
    }
}
TaskAdapter._TAG = 'taskAdap';
//# sourceMappingURL=TaskAdapter.js.map