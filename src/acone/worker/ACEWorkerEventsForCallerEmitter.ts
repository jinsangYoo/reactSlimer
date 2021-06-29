import SafeEmitter from '../../common/webworker/SafeEmitter'
import IEventForCaller from '../../common/webworker/IEventForCaller'

export class ACEWorkerEventsForCallerEmitter extends SafeEmitter<IEventForCaller> {}
