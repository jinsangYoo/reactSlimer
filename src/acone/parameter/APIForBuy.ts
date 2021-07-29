import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'

export default class APIForBuy extends Task {
  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
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

  public doneWork() {
    super.doneWork()
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
  }

  public failed(err: any) {
    super.failed(err)
  }
}
