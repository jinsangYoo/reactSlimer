import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
export default class APIForPolicy extends Task {
    constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: object) => void) | undefined): void;
    didWork(): Promise<object>;
    doneWork(): void;
    completed(response: object): void;
    failed(err: object): void;
}
//# sourceMappingURL=APIForPolicy.d.ts.map