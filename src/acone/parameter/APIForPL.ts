import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import ACEResultCode from '../../common/constant/ACEResultCode'
import {ACEInnerCBResultKey} from '../../common/constant/ACEInnerCBResultKey'

export default class APIForPL extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
    console.log('APIForPL::doWork')
  }

  public didWork(callback: ((error?: object, result?: object) => void) | undefined): void
  public didWork(): Promise<object>
  public didWork(callback?: ((error?: object, result?: object) => void) | undefined): Promise<object> | void {
    super.didWork()
    console.log('APIForPL::didWork')

    if (global.Promise) {
      return new Promise((resolve, reject) => {
        ACENetwork.requestToLog(
          response => {
            console.log('APIForPL::in cb::completed!!!')
            this.completed(response)
            this.doneWork()
            if (callback) {
              console.log('try call cb!!')
              callback(undefined, response)
            } else {
              console.log('try call resolve!!')
              resolve(response)
            }
          },
          err => {
            console.log('APIForPL::in cb::failed!!!')
            this.failed(err)
            this.doneWork()
            if (callback) {
              console.log('try call cb!!')
              callback(err, undefined)
            } else {
              console.log('try call reject!!')
              reject(err)
            }
          },
        )
      })
    } else {
      console.log('APIForPL::not support promise.')
      this.failed({
        code: ACEInnerCBResultKey.NotSupportPromise,
        result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotSupportPromise],
      })
      if (callback) {
        console.log('try call cb!!')
        callback(
          {
            code: ACEResultCode.NotSupportPromise,
            result: ACEResultCode[ACEResultCode.NotSupportPromise],
          },
          undefined,
        )
      }
    }
  }

  public completed(response: object) {
    super.completed(response)
    console.log('APIForPL::completed')
  }

  public failed(err: object) {
    super.failed(err)
    console.log('APIForPL::failed')
  }

  public doneWork() {
    super.doneWork()
    console.log('APIForPL::doneWork')
  }
}
