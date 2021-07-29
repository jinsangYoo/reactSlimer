import { ITaskParams } from './ITaskParams';
import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import { AxiosResponse } from 'axios';
import ACENetworkResult from '../http/ACENetworkResult';
import { ACEResponseToCaller } from '../constant/ACEPublicStaticConfig';
export default class Task {
    protected _logSource: ACEofAPIForOne;
    protected _date: number;
    protected _response: ACENetworkResult;
    protected _error: JSON;
    protected constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void;
    doneWork(): void;
    protected completed(response: AxiosResponse): void;
    protected failed(err: any): void;
    getLogSource(): number;
    getDescription(): string;
    getCreateTime(): number;
    getTaskHash(): string;
    getNetworkResult(): ACENetworkResult | undefined;
    getNetworkError(): JSON | undefined;
}
//# sourceMappingURL=Task.d.ts.map