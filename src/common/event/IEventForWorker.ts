import {ITaskParams} from '../task/ITaskParams'

export default interface IEventForWorker {
  onStartForAPI: (params?: ITaskParams) => void
  started: () => void
  onFinish: (message: string, logsource?: number) => void
  onError: (err: string) => void
}
