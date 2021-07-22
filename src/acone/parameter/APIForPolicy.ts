import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil'
import ACEResultCode from '../../common/constant/ACEResultCode'
import {ACEInnerCBResultKey} from '../../common/constant/ACEInnerCBResultKey'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import {makeSuccessCallback, makeFailCallback} from '../../common/util/MapUtil'

export default class APIForPolicy extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
  }

  public didWork(callback: ((error?: object, result?: object) => void) | undefined): void
  public didWork(): Promise<object>
  public didWork(callback?: ((error?: object, result?: object) => void) | undefined): Promise<object> | void {
    super.didWork()

    if (global.Promise) {
      return new Promise((resolve, reject) => {
        ACENetwork.requestToPolicy(
          response => {
            console.log('APIForPolicy::in cb::completed!!!')
            this.completed(response)
            this.doneWork()
            if (callback) {
              callback(undefined, makeSuccessCallback(this))
            } else {
              resolve(makeSuccessCallback(this))
            }
          },
          err => {
            console.log('APIForPolicy::in cb::failed!!!')
            this.failed(err)
            this.doneWork()
            if (callback) {
              callback(makeFailCallback(this))
            } else {
              reject(makeFailCallback(this))
            }
          },
        )
      })
    } else {
      console.log('APIForPolicy::not support promise.')
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

  public doneWork() {
    super.doneWork()
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
    ACEPolicyParameterUtil.getInstance().savePolicy(this._response)
    ControlTowerSingleton.getInstance().succeedRequestPolicy()
  }

  public failed(err: any) {
    super.failed(err)
    ControlTowerSingleton.getInstance().failedRequestPolicy()
  }
}
