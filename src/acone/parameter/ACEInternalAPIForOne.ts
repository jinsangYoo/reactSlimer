import {ACParams} from '../acparam'
import IACECommonAPI from '../parameter/IACECommonAPI'
import ACEReducerForOne from './ACEReducerForOne'

export default class ACEInternalAPIForOne implements IACECommonAPI {
  public constructor() {}

  requestPolicy(callback: (error?: object, result?: object) => void): void
  requestPolicy(): Promise<object>
  requestPolicy(callback?: (error?: object, result?: object) => void): void | Promise<object>
  requestPolicy(callback?: any): void | Promise<object> {
    return ACEReducerForOne.policy(callback)
  }

  send(value: ACParams, callback: (error?: object, result?: object) => void): void
  send(value: ACParams): Promise<object>
  send(value: ACParams, callback?: (error?: object, result?: object) => void): void | Promise<object>
  send(value: any, callback?: any): void | Promise<object> {
    throw new Error('Method not implemented.')
  }
}
