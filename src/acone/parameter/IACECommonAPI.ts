import {ACParams} from '../acparam'

export default interface IACECommonAPI {
  requestPolicy(callback: (error?: object, result?: object) => void): void
  requestPolicy(): Promise<object>
  requestPolicy(callback?: (error?: object, result?: object) => void): Promise<object> | void

  send(value: ACParams, callback: (error?: object, result?: object) => void): void
  send(value: ACParams): Promise<object>
  send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object> | void
}
