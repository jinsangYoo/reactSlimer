import ITask from '../../common/task/ITask'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'

export default class APIForBuy extends ITask {
  protected _logSource: number
  protected _name: string
  protected _date: Date

  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
  }

  public didWork() {
    super.didWork()

    ACENetwork.request(
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

  public completed(response: object) {
    super.completed(response)
  }

  public failed(err: object) {
    super.failed(err)
  }
}