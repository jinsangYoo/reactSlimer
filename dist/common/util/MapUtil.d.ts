import Task from '../task/Task';
export declare function mapValueObjectToObject(map: Map<string, object>): {};
export declare function mapValueStringToObject(map: Map<string, string>): {};
export declare function makeSuccessCallback(task: Task): Map<string, string | object>;
export declare function makeSuccessCallback(task: Task, message: string): Map<string, string | object>;
export declare function makeFailCallback(task: Task): Map<string, string | object>;
export declare function makeFailCallback(task: Task, message: string): Map<string, string | object>;
//# sourceMappingURL=MapUtil.d.ts.map