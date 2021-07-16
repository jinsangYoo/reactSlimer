import { ITaskParams } from './ITaskParams';
import ACEofAPIForOne from '../../acone/constant/ACEofAPIForOne';
export default class Task {
    protected _logSource: ACEofAPIForOne;
    protected _date: Date;
    protected constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: object) => void) | undefined): void;
    didWork(): Promise<object>;
    doneWork(): void;
    protected completed(response: object): void;
    protected failed(err: object): void;
    getDescription(): string;
    getCreateTime(): Date;
    getJSON(): void;
}
//# sourceMappingURL=Task.d.ts.map