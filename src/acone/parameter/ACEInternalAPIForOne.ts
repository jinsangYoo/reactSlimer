import {ACParams} from '../acparam'
import IACECommonAPI from '../parameter/IACECommonAPI'
import ACEReducerForOne from './ACEReducerForOne'
import {ACECallbackResultForDebug} from '../../common/constant/ACECallbackResultForDebug'

export default class ACEInternalAPIForOne implements IACECommonAPI {
  public constructor() {}

  requestPolicy(callback: (error?: object, result?: ACECallbackResultForDebug) => void): void
  requestPolicy(): Promise<ACECallbackResultForDebug>
  requestPolicy(
    callback?: (error?: object, result?: ACECallbackResultForDebug) => void,
  ): void | Promise<ACECallbackResultForDebug> {
    return ACEReducerForOne.policy(callback)
  }

  send(value: ACParams, callback: (error?: object, result?: object) => void): void
  send(value: ACParams): Promise<object>
  send(value: ACParams, callback?: (error?: object, result?: object) => void): void | Promise<object> {
    throw new Error('Method not implemented.')
  }
}
