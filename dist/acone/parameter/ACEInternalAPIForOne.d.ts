import { ACParams } from '../acparam';
import IACECommonAPI from '../parameter/IACECommonAPI';
export default class ACEInternalAPIForOne implements IACECommonAPI {
    constructor();
    requestPolicy(callback: (error?: object, result?: object) => void): void;
    requestPolicy(): Promise<object>;
    requestPolicy(callback?: (error?: object, result?: object) => void): void | Promise<object>;
    send(value: ACParams, callback: (error?: object, result?: object) => void): void;
    send(value: ACParams): Promise<object>;
    send(value: ACParams, callback?: (error?: object, result?: object) => void): void | Promise<object>;
}
//# sourceMappingURL=ACEInternalAPIForOne.d.ts.map