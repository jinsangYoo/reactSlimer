import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {makeSuccessCallbackParams, makeFailCallbackParams} from '../../common/util/MapUtil'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'

export default class APIForPL extends Task {
  private static _TAG = 'APIForPL'
  public constructor(params: ITaskParams) {
    super(params)
    ACELog.d(APIForPL._TAG, 'in constructor, params:', params)
  }

  public doWork() {
    super.doWork()
    ACELog.d(APIForPL._TAG, 'doWork')
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)
    ACELog.d(APIForPL._TAG, 'didWork')

    ACENetwork.requestToLog(
      response => {
        ACELog.d(APIForPL._TAG, 'in requestToPolicy, completed')
        this.completed(response)
        this.doneWork()
        if (callback) {
          callback(undefined, makeSuccessCallbackParams(this))
        }
      },
      err => {
        ACELog.d(APIForPL._TAG, 'in requestToPolicy, failed')
        this.failed(err)
        this.doneWork()
        if (callback) {
          callback(err, makeFailCallbackParams(this))
        }
      },
    )
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
    ACELog.d(APIForPL._TAG, 'completed')
  }

  public failed(err: any) {
    super.failed(err)
    ACELog.d(APIForPL._TAG, 'failed')
  }

  public doneWork() {
    super.doneWork()
    ACELog.d(APIForPL._TAG, 'doneWork')
  }
}
