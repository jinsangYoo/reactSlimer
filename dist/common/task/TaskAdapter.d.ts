import Task from './Task';
export default class TaskAdapter {
    private _task;
    private _callback?;
    addTask(argTask: Task, callback?: (error?: object, result?: object) => void): void;
    private doWork;
    private didWork;
    run(): Promise<object> | void;
}
//# sourceMappingURL=TaskAdapter.d.ts.map