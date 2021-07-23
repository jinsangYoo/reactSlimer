import { ACParams } from '../acparam';
import { ACECallbackResultForDebug } from '../../common/constant/ACECallbackResultForDebug';
export default interface IACECommonAPI {
    requestPolicy(callback: (error?: object, result?: ACECallbackResultForDebug) => void): void;
    requestPolicy(): Promise<ACECallbackResultForDebug>;
    requestPolicy(callback?: (error?: object, result?: ACECallbackResultForDebug) => void): Promise<ACECallbackResultForDebug> | void;
    send(value: ACParams, callback: (error?: object, result?: object) => void): void;
    send(value: ACParams): Promise<object>;
    send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object> | void;
}
//# sourceMappingURL=IACECommonAPI.d.ts.map