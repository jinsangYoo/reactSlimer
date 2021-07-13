import Task from './Task';
export default class TaskAdapter {
    private _task;
    private _callback?;
    addTask(argTask: Task, callback: ((error?: object, result?: object) => void) | undefined): void;
    private doWork;
    private didWork;
    run(): void;
    run(): Promise<object>;
}
//# sourceMappingURL=TaskAdapter.d.ts.map