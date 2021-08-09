import Task from '../../common/task/Task';
import { ITaskParams } from '../../common/task/ITaskParams';
import { AxiosResponse } from 'axios';
import { ACEResponseToCaller } from '../../common/constant/ACEPublicStaticConfig';
import ACEntityForVT from './ACEntityForVT';
import ACEntityForST from './ACEntityForVT';
export default class APIForPL extends Task {
    private static _TAG;
    private _willUpdateVt?;
    private _willUpdateSt?;
    private pageName;
    constructor(params: ITaskParams);
    doWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    completed(response: AxiosResponse): void;
    failed(err: any): void;
    doneWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    protected assignWillUpdateSt(): ACEntityForST;
    protected assignWillUpdateVt(): ACEntityForVT;
}
//# sourceMappingURL=APIForPL.d.ts.map