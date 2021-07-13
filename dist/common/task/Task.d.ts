import { ITaskParams } from './ITaskParams';
export default class Task {
    protected _logSource: number;
    protected _name: string;
    protected _date: Date;
    protected constructor(params: ITaskParams);
    doWork(): void;
    didWork(callback: ((error?: object, result?: object) => void) | undefined): void;
    didWork(): Promise<object>;
    doneWork(): void;
    protected completed(response: object): void;
    protected failed(err: object): void;
    getDescription(): void;
    getCreateTime(): void;
    getJSON(): void;
}
//# sourceMappingURL=Task.d.ts.map