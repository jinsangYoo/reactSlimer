import { ACEConstantCallback } from '../constant/ACEPublicStaticConfig';
import ACEResultCode from '../constant/ACEResultCode';
import { isEmpty } from './TextUtils';
import ACECommonStaticConfig from '../config/ACECommonStaticConfig';
export function mapValueObjectToObject(map) {
    return Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}
export function mapValueStringToObject(map) {
    return Array.from(map).reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
    }, {});
}
export function makeSuccessCallback(task, message) {
    var innerMsg = ACEConstantCallback.DefaultMessage;
    if (message && !isEmpty(message)) {
        innerMsg = message;
    }
    const _response = task.getNetworkResult();
    if (_response) {
        return makeSuccessResultMap(task.getLogSource(), ACEResultCode.Success, ACEConstantCallback[ACEConstantCallback.Success], innerMsg, task.getTaskHash(), _response);
    }
    else {
        return makeSuccessResultMap(task.getLogSource(), ACEResultCode.Success, ACEConstantCallback[ACEConstantCallback.Success], innerMsg, task.getTaskHash());
    }
}
function makeSuccessResultMap(logSource, resultCode, result, message, taskHash, res) {
    var _a, _b;
    const _map = new Map();
    _map.set(ACEConstantCallback.LogSource, (_a = logSource.toString()) !== null && _a !== void 0 ? _a : ACEResultCode.Default);
    _map.set(ACEConstantCallback.TaskHash, taskHash);
    _map.set(ACEConstantCallback.Result_Code, (_b = resultCode.toString()) !== null && _b !== void 0 ? _b : ACEResultCode.Default);
    _map.set(ACEConstantCallback.Result, result);
    _map.set(ACEConstantCallback.Message, message);
    if (res) {
        const _implementer = ACECommonStaticConfig.getParameterUtil();
        if (_implementer) {
            _map.set(ACEConstantCallback.Response, _implementer.getSuccessResponseForCustomer(logSource, resultCode, res));
        }
    }
    return _map;
}
export function makeFailCallback(task, message) {
    var innerMsg = ACEConstantCallback.DefaultMessage;
    if (message && !isEmpty(message)) {
        innerMsg = message;
    }
    const _err = task.getNetworkError();
    if (_err) {
        return makeFailResultMap(task.getLogSource(), ACEResultCode.FailAfterRequest, ACEConstantCallback[ACEConstantCallback.Failed], innerMsg, task.getTaskHash(), _err);
    }
    else {
        return makeFailResultMap(task.getLogSource(), ACEResultCode.FailAfterRequest, ACEConstantCallback[ACEConstantCallback.Failed], innerMsg, task.getTaskHash());
    }
}
function makeFailResultMap(logSource, resultCode, result, message, taskHash, err) {
    var _a, _b;
    const _map = new Map();
    _map.set(ACEConstantCallback.LogSource, (_a = logSource.toString()) !== null && _a !== void 0 ? _a : ACEResultCode.Default);
    _map.set(ACEConstantCallback.TaskHash, taskHash);
    _map.set(ACEConstantCallback.Result_Code, (_b = resultCode.toString()) !== null && _b !== void 0 ? _b : ACEResultCode.Default);
    _map.set(ACEConstantCallback.Result, result);
    _map.set(ACEConstantCallback.Message, message);
    if (err) {
        const _implementer = ACECommonStaticConfig.getParameterUtil();
        if (_implementer) {
            _map.set(ACEConstantCallback.Response, _implementer.getFailResponseForCustomer(logSource, resultCode, err));
        }
    }
    return _map;
}
//# sourceMappingURL=MapUtil.js.map