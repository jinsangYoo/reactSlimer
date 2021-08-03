import Task from './Task'
import {ACEResponseToCaller} from '../constant/ACEPublicStaticConfig'
import ACELog from '../logger/ACELog'

export default class TaskAdapter {
  private static _TAG = 'taskAdap'
  private _task: Task
  private _callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined

  public addTask(argTask: Task): void
  public addTask(argTask: Task, callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void
  public addTask(argTask: Task, callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    this._task = argTask
    this._callback = callback
  }

  private doWork(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._task) {
        ACELog.d(TaskAdapter._TAG, 'in doWork')
        this._task.doWork()
        resolve(true)
      } else {
        ACELog.d(TaskAdapter._TAG, 'in doWork, undefined task')
        reject(new Error('undefined task'))
      }
    })
  }

  private didWork(resultDoWork: boolean): void {
    ACELog.d(TaskAdapter._TAG, `in didWork, resultDoWork: ${resultDoWork}`)
    if (resultDoWork) {
      ACELog.d(TaskAdapter._TAG, "in didWork, try didWork task's ")
      this._task.didWork(this._callback)
    }
  }

  public run(): void {
    this.doWork()
      .then(resolve => {
        this.didWork(resolve)
      })
      .catch(err => {
        ACELog.d(TaskAdapter._TAG, 'run err:', err)
      })
  }
}
