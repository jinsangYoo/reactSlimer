import { ITaskParams } from './ITaskParams';
import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
import { AxiosResponse } from 'axios';
import ACENetworkResult from '../http/ACENetworkResult';
export default class Task {
    protected _logSource: ACEofAPIForOne;
    protected _date: Date;
    protected _response: ACENetworkResult;
    protected constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: object) => void) | undefined): void;
    didWork(): Promise<object>;
    doneWork(): void;
    protected completed(response: AxiosResponse): void;
    protected failed(err: object): void;
    getDescription(): string;
    getCreateTime(): Date;
    getJSON(): void;
}
//# sourceMappingURL=Task.d.ts.map