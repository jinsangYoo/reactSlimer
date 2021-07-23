import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
import { AxiosResponse } from 'axios';
import { ACECallbackResultForDebug } from '../../common/constant/ACECallbackResultForDebug';
export default class APIForPL extends Task {
    constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void;
    completed(response: AxiosResponse): void;
    failed(err: any): void;
    doneWork(): void;
}
//# sourceMappingURL=APIForPL.d.ts.map