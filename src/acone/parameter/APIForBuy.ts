import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import {ACEResultCode, ACEConstantCallback} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'

export default class APIForBuy extends Task {
  private static _TAG = 'APIForBuy'
  public constructor(params: ITaskParams) {
    ACELog.d(APIForBuy._TAG, 'in constructor, params:', params)
    super(params)
  }

  public doWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doWork(callback)
    if (callback) {
      const res: ACEResponseToCaller = {
        taskHash: `${this._logSource}::0011`,
        code: ACEResultCode.Success,
        result: ACEConstantCallback[ACEConstantCallback.Success],
        message: 'Done doWork to buy.',
        apiName: this.getDescription(),
      }
      callback(undefined, res)
    }
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)

    ACENetwork.requestToLog(
      response => {
        this.completed(response)
      },
      err => {
        this.failed(err)
      },
    )
  }

  public doneWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doneWork(callback)
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
  }

  public failed(err: any) {
    super.failed(err)
  }
}
