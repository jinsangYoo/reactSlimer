import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import {makeSuccessCallbackParams, makeFailCallbackParams} from '../../common/util/MapUtil'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'

export default class APIForPolicy extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)

    ACENetwork.requestToPolicy(
      response => {
        console.log('APIForPolicy::in requestToPolicy.completed')
        this.completed(response)
        this.doneWork()
        if (callback) {
          callback(undefined, makeSuccessCallbackParams(this))
        }
      },
      err => {
        console.log('APIForPolicy::in requestToPolicy.failed')
        this.failed(err)
        this.doneWork()
        if (callback) {
          callback(err, makeFailCallbackParams(this))
        }
      },
    )
  }

  public doneWork() {
    super.doneWork()
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
    console.log('APIForPolicy::completed::before savePolicy')
    ACEPolicyParameterUtil.getInstance().savePolicy(this._response)
    console.log('APIForPolicy::completed::after savePolicy')
    ControlTowerSingleton.getInstance().succeedRequestPolicy()
  }

  public failed(err: any) {
    super.failed(err)
    ControlTowerSingleton.getInstance().failedRequestPolicy()
  }
}
