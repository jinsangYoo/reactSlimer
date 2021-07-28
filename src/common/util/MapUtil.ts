import {ACEConstantCallback} from '../constant/ACEPublicStaticConfig'
import ACEResultCode from '../constant/ACEResultCode'
import {isEmpty} from './TextUtils'
import ACECommonStaticConfig from '../config/ACECommonStaticConfig'
import ACENetworkResult from '../http/ACENetworkResult'
import Task from '../task/Task'

export function printConsoleMap(map: Map<string, string | object>): void {
  for (var i = 0, keys = Object.keys(map), ii = keys.length; i < ii; i++) {
    console.log(keys[i] + '|' + map[keys[i]].list)
  }
}

export function mapValueObjectToObject(map: Map<string, object>) {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}

export function mapValueStringToObject(map: Map<string, string>) {
  return Array.from(map).reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {})
}

export function makeSuccessCallbackParams(task: Task): Map<string, string | object>
export function makeSuccessCallbackParams(task: Task, message: string): Map<string, string | object>
export function makeSuccessCallbackParams(task: Task, message?: string): Map<string, string | object> {
  var innerMsg: string = ACEConstantCallback.DefaultMessage
  if (!isEmpty(message) && message) {
    innerMsg = message
  }

  const _response = task.getNetworkResult()
  if (_response) {
    return makeSuccessResultMap(
      task.getLogSource(),
      ACEResultCode.Success,
      ACEConstantCallback[ACEConstantCallback.Success],
      innerMsg,
      task.getTaskHash(),
      _response,
    )
  } else {
    return makeSuccessResultMap(
      task.getLogSource(),
      ACEResultCode.Success,
      ACEConstantCallback[ACEConstantCallback.Success],
      innerMsg,
      task.getTaskHash(),
    )
  }
}

function makeSuccessResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
): Map<string, string | object>
function makeSuccessResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
  res: ACENetworkResult,
): Map<string, string | object>
function makeSuccessResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
  res?: ACENetworkResult,
): Map<string, string | object> {
  const _map = new Map<string, string | object>()
  _map.set(ACEConstantCallback.LogSource, logSource.toString() ?? ACEResultCode.Default)
  _map.set(ACEConstantCallback.TaskHash, taskHash)
  _map.set(ACEConstantCallback.Result_Code, resultCode.toString() ?? ACEResultCode.Default)
  _map.set(ACEConstantCallback.Result, result)
  _map.set(ACEConstantCallback.Message, message)

  if (res) {
    const _implementer = ACECommonStaticConfig.getParameterUtil()
    if (_implementer) {
      const _successResponseForCustomer = _implementer.getSuccessResponseForCustomer(logSource, resultCode, res)
      console.log('_successResponseForCustomer stringify')
      console.log(JSON.stringify(_successResponseForCustomer, null, 2))
      _map.set(ACEConstantCallback.Response, _successResponseForCustomer)
    }
  }

  console.log('_map printConsoleMap')
  printConsoleMap(_map)

  return _map
}

export function makeFailCallbackParams(task: Task): Map<string, string | object>
export function makeFailCallbackParams(task: Task, message: string): Map<string, string | object>
export function makeFailCallbackParams(task: Task, message?: string): Map<string, string | object> {
  var innerMsg: string = ACEConstantCallback.DefaultMessage
  if (message && !isEmpty(message)) {
    innerMsg = message
  }

  const _err = task.getNetworkError()
  if (_err) {
    return makeFailResultMap(
      task.getLogSource(),
      ACEResultCode.FailAfterRequest,
      ACEConstantCallback[ACEConstantCallback.Failed],
      innerMsg,
      task.getTaskHash(),
      _err,
    )
  } else {
    return makeFailResultMap(
      task.getLogSource(),
      ACEResultCode.FailAfterRequest,
      ACEConstantCallback[ACEConstantCallback.Failed],
      innerMsg,
      task.getTaskHash(),
    )
  }
}

function makeFailResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
): Map<string, string | object>
function makeFailResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
  err: JSON,
): Map<string, string | object>
function makeFailResultMap(
  logSource: number,
  resultCode: number,
  result: string,
  message: string,
  taskHash: string,
  err?: JSON,
): Map<string, string | object> {
  const _map = new Map<string, string | object>()
  _map.set(ACEConstantCallback.LogSource, logSource.toString() ?? ACEResultCode.Default)
  _map.set(ACEConstantCallback.TaskHash, taskHash)
  _map.set(ACEConstantCallback.Result_Code, resultCode.toString() ?? ACEResultCode.Default)
  _map.set(ACEConstantCallback.Result, result)
  _map.set(ACEConstantCallback.Message, message)

  if (err) {
    const _implementer = ACECommonStaticConfig.getParameterUtil()
    if (_implementer) {
      _map.set(ACEConstantCallback.Response, _implementer.getFailResponseForCustomer(logSource, resultCode, err))
    }
  }

  return _map
}
