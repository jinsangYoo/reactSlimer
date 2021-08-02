import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import {makeSuccessCallbackParams, makeFailCallbackParams} from '../../common/util/MapUtil'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'

export default class APIForPolicy extends Task {
  private static _TAG = 'APIForPolicy'
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
        ACELog.d(APIForPolicy._TAG, 'in requestToPolicy, completed')
        this.completed(response)
        this.doneWork()
        if (callback) {
          callback(undefined, makeSuccessCallbackParams(this))
        }
      },
      err => {
        ACELog.d(APIForPolicy._TAG, 'in requestToPolicy, failed')
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
    ACELog.d(APIForPolicy._TAG, 'completed, before savePolicy')
    ACEPolicyParameterUtil.getInstance().savePolicy(this._response)
    ACELog.d(APIForPolicy._TAG, 'completed, after savePolicy')
    ControlTowerSingleton.getInstance().succeedRequestPolicy()
  }

  public failed(err: any) {
    super.failed(err)
    ControlTowerSingleton.getInstance().failedRequestPolicy()
  }
}
