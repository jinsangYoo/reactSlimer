import {ITaskParams} from './ITaskParams'

export default class Task {
  protected _logSource: number
  protected _name: string
  protected _date: Date

  protected constructor(params: ITaskParams) {}

  public doWork() {
    console.log('ITask::doWork')
  }

  public didWork(callback: ((error?: object, result?: object) => void) | undefined): void
  public didWork(): Promise<object>
  public didWork(callback?: ((error?: object, result?: object) => void) | undefined): Promise<object> | void {
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
