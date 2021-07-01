import ITask from '../../common/task/ITask'

export default class TaskAdapter {
  private _task: ITask

  public addTask(argTask: ITask) {
    this._task = argTask
  }

  private doWork() {
    this._task.doWork()
  }

  private didWork() {
    this._task.didWork()
  }

  private doneWork() {
    this._task.doneWork()
  }

  public run() {
    this.doWork()
    this.didWork()
    this.doneWork()
  }
}
