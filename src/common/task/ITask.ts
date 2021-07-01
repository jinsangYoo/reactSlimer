import {ITaskParams} from '../../common/task/ITaskParams'

export default class ITask {
  protected _logSource: number
  protected _name: string
  protected _date: Date

  protected constructor(params: ITaskParams) {}

  public doWork() {
    console.log('ITask::doWork')
  }

  public didWork() {
    console.log('ITask::didWork')
  }

  public doneWork() {
    console.log('ITask::doneWork')
  }

  protected completed(response: object) {
    console.log('ITask::completed')
  }

  protected failed(err: object) {
    console.log('ITask::failed')
  }

  public getDescription() {}

  public getCreateTime() {}

  public getJSON() {}
}
