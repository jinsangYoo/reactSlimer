import Task from './Task'

export default class TaskAdapter {
  private _task: Task
  private _callback?: (error?: object, result?: object) => void

  public addTask(argTask: Task, callback?: (error?: object, result?: object) => void) {
    this._task = argTask
    this._callback = callback
  }

  private doWork() {
    this._task.doWork()
  }

  private didWork(): Promise<object> | void {
    return this._task.didWork(this._callback)
  }

  public run(): Promise<object> | void {
    this.doWork()
    return this.didWork()
  }
}
