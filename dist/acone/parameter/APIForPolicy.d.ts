import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
export default class APIForPolicy extends Task {
    protected _logSource: number;
    protected _name: string;
    protected _date: Date;
    constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback?: (error?: object, result?: object) => void): void;
    doneWork(): void;
    completed(response: object): void;
    failed(err: object): void;
}
//# sourceMappingURL=APIForPolicy.d.ts.map