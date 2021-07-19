import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
import { AxiosResponse } from 'axios';
export default class APIForPL extends Task {
    constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: object) => void) | undefined): void;
    didWork(): Promise<object>;
    completed(response: AxiosResponse): void;
    failed(err: object): void;
    doneWork(): void;
}
//# sourceMappingURL=APIForPL.d.ts.map