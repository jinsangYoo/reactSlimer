import SafeEmitter from '../../common/event/SafeEmitter'
import IEventForWorker from '../../common/event/IEventForWorker'

export class ACEWorkerEventsForWorkerEmitter extends SafeEmitter<IEventForWorker> {}
