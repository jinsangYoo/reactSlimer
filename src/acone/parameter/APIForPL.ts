import ITask from '../../common/task/ITask'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'

export default class APIForPL extends ITask {
  protected _logSource: number
  protected _name: string
  protected _date: Date

  public constructor(params: ITaskParams) {
    super(params)
  }

  public doWork() {
    super.doWork()
    console.log('APIForPL::doWork')
  }

  public didWork() {
    super.didWork()
    console.log('APIForPL::didWork')

    ACENetwork.request(
      response => {
        console.log('APIForPL::in cb::completed')
        this.completed(response)
      },
      err => {
        console.log('APIForPL::in cb::failed')
        this.failed(err)
      },
    )
  }

  public doneWork() {
    super.doneWork()
    console.log('APIForPL::doneWork')
  }

  public completed(response: object) {
    super.completed(response)
    console.log('APIForPL::completed')
  }

  public failed(err: object) {
    super.failed(err)
    console.log('APIForPL::failed')
  }
}
