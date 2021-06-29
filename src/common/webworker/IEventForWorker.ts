import {ITask} from '../../common/webworker/ITask'

export default interface IEventForWorker {
  onStartForAPI: (task?: ITask) => void
  started: () => void
  onFinish: (message: string, logsource?: number) => void
  onError: (err: ErrorEvent) => void
}
