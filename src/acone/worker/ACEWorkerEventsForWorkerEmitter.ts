import SafeEmitter from '../../common/webworker/SafeEmitter'
import IEventForWorker from '../../common/webworker/IEventForWorker'

export class ACEWorkerEventsForWorkerEmitter extends SafeEmitter<IEventForWorker> {}
