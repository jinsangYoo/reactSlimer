import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
import { AxiosResponse } from 'axios';
import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
export default class APIForBuy extends Task {
    constructor(params: ITaskParams);
    doWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    doneWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    completed(response: AxiosResponse): void;
    failed(err: any): void;
}
//# sourceMappingURL=APIForBuy.d.ts.map