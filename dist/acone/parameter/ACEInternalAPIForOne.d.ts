import { ACParams } from '../acparam';
import IACECommonAPI from '../parameter/IACECommonAPI';
import { ACECallbackResultForDebug } from '../../common/constant/ACECallbackResultForDebug';
export default class ACEInternalAPIForOne implements IACECommonAPI {
    constructor();
    requestPolicy(callback: (error?: object, result?: ACECallbackResultForDebug) => void): void;
    requestPolicy(): Promise<ACECallbackResultForDebug>;
    send(value: ACParams, callback: (error?: object, result?: object) => void): void;
    send(value: ACParams): Promise<object>;
}
//# sourceMappingURL=ACEInternalAPIForOne.d.ts.map