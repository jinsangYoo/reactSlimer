import Task from './Task'

export default class TaskAdapter {
  private _task: Task
  private _callback?: ((error?: object, result?: object) => void) | undefined

  public addTask(argTask: Task, callback: ((error?: object, result?: object) => void) | undefined): void
  public addTask(argTask: Task, callback?: ((error?: object, result?: object) => void) | undefined): void {
    this._task = argTask
    this._callback = callback
  }

  private doWork() {
    this._task.doWork()
  }

  private didWork(): void
  private didWork(): Promise<object>
  private didWork(): Promise<object> | void {
    return this._task.didWork(this._callback)
  }

  public run(): void
  public run(): Promise<object>
  public run(): Promise<object> | void {
    this.doWork()
    return this.didWork()
  }
}
