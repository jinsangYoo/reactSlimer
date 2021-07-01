import { ITaskParams } from '../../common/task/ITaskParams';
export default class ITask {
    protected _logSource: number;
    protected _name: string;
    protected _date: Date;
    protected constructor(params: ITaskParams);
    doWork(): void;
    didWork(): void;
    doneWork(): void;
    protected completed(response: object): void;
    protected failed(err: object): void;
    getDescription(): void;
    getCreateTime(): void;
    getJSON(): void;
}
//# sourceMappingURL=ITask.d.ts.map