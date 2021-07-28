import Task from '../task/Task';
export declare function printConsoleMap(map: Map<string, string | object>): void;
export declare function mapValueObjectToObject(map: Map<string, object>): {};
export declare function mapValueStringToObject(map: Map<string, string>): {};
export declare function makeSuccessCallbackParams(task: Task): Map<string, string | object>;
export declare function makeSuccessCallbackParams(task: Task, message: string): Map<string, string | object>;
export declare function makeFailCallbackParams(task: Task): Map<string, string | object>;
export declare function makeFailCallbackParams(task: Task, message: string): Map<string, string | object>;
//# sourceMappingURL=MapUtil.d.ts.map