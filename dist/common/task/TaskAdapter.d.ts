import Task from './Task';
import { ACECallbackResultForDebug } from '../constant/ACECallbackResultForDebug';
export default class TaskAdapter {
    private _task;
    private _callback?;
    addTask(argTask: Task, callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void;
    private doWork;
    private didWork;
    run(): void;
}
//# sourceMappingURL=TaskAdapter.d.ts.map