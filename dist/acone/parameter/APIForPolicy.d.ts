import ITask from '../../common/task/ITask';
import { ITaskParams } from '../../common/task/ITaskParams';
export default class APIForPolicy extends ITask {
    protected _logSource: number;
    protected _name: string;
    protected _date: Date;
    constructor(params: ITaskParams);
    doWork(): void;
    didWork(): void;
    doneWork(): void;
    completed(response: object): void;
    failed(err: object): void;
}
//# sourceMappingURL=APIForPolicy.d.ts.map