import Task from './Task'
import {ACECallbackResultForDebug} from '../constant/ACECallbackResultForDebug'

export default class TaskAdapter {
  private _task: Task
  private _callback?: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined

  public addTask(
    argTask: Task,
    callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined,
  ): void
  public addTask(
    argTask: Task,
    callback?: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined,
  ): void {
    this._task = argTask
    this._callback = callback
  }

  private doWork(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._task) {
        console.log('TaskAdapter::in doWork')
        this._task.doWork()
        resolve(true)
      } else {
        console.log('TaskAdapter::in doWork::undefined task')
        reject(new Error('undefined task'))
      }
    })
  }

  private didWork(resultDoWork: boolean): void {
    console.log(`TaskAdapter::in didWork::resultDoWork: ${resultDoWork}`)
    if (resultDoWork) {
      console.log(`TaskAdapter::in didWork::try didWork`)
      this._task.didWork(this._callback)
    }
  }

  public run(): void {
    this.doWork()
      .then(resolve => {
        this.didWork(resolve)
      })
      .catch(err => {
        console.log(`TaskAdapter::run::err:${JSON.stringify(err)}`)
      })
  }
}
