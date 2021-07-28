import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import ACEPolicyParameterUtil from '../../common/policy/ACEPolicyParameterUtil'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import {makeSuccessCallbackParams, makeFailCallbackParams} from '../../common/util/MapUtil'
import {ACECallbackUnit} from '../../common/constant/ACECallbackUnit'
import {ACECallbackResultForDebug} from '../../common/constant/ACECallbackResultForDebug'

export default class APIForPolicy extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
  }

  public didWork(callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void {
    super.didWork(callback)

    ACENetwork.requestToPolicy(
      response => {
        console.log('APIForPolicy::in requestToPolicy.completed')
        this.completed(response)
        this.doneWork()
        console.log('this stringfy')
        console.log(JSON.stringify(this, null, 2))
        if (callback) {
          const callbackUnit: ACECallbackUnit = {
            title: 'normal request policy.',
            location: 'APIForPolicy::requestToPolicy.completed',
            result: true,
            payload: makeSuccessCallbackParams(this),
          }

          const resultObject = {
            prevResult: true,
            history: [callbackUnit],
          }
          console.log('resultObject stringfy')
          console.log(JSON.stringify(resultObject, null, 2))
          callback(undefined, {
            prevResult: true,
            history: [callbackUnit],
          })
        }
      },
      err => {
        console.log('APIForPolicy::in requestToPolicy.failed')
        this.failed(err)
        this.doneWork()
        if (callback) {
          const callbackUnit: ACECallbackUnit = {
            title: 'fail request policy.',
            location: 'APIForPolicy::requestToPolicy.failed',
            result: false,
            payload: makeFailCallbackParams(this),
          }
          callback(err, {
            prevResult: false,
            history: [callbackUnit],
          })
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
