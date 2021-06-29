import {ITask} from '../../common/webworker/ITask'

export default interface IEventForCaller {
  onStartForAPI: (task?: ITask) => void
  onFinish: (message: string, logsource?: number) => void
  onError: (err: ErrorEvent) => void
}
