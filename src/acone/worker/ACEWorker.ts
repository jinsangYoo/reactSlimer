import {ACEWorkerEventsForCallerEmitter} from '../worker/ACEWorkerEventsForCallerEmitter'
import {ACEWorkerEventsForWorkerEmitter} from '../worker/ACEWorkerEventsForWorkerEmitter'
import {ITask} from '../../common/webworker/ITask'

export default class ACEWorker {
  private commandEmitter: ACEWorkerEventsForCallerEmitter
  private eventEmitter: ACEWorkerEventsForWorkerEmitter

  private static instance: ACEWorker

  public static getInstance(): ACEWorker {
    return this.instance || (this.instance = new this())
  }

  private constructor() {
    this.commandEmitter = new ACEWorkerEventsForCallerEmitter()
    global.onmessage = command => this.eventEmitter.emit(command.data.type, ...command.data.data)
    this.commandEmitter.on('onStartForAPI', (task?: ITask) => {
      console.log('ACEWorker::commandEmitter::onStartForAPI')
      console.log(JSON.stringify(task))
      ACEWorker.plWithPage(task?.action.name ?? 'none')
    })
    this.commandEmitter.on('onFinish', (message, logsource) => {
      console.log('ACEWorker::commandEmitter::onFinish')
      console.log([message, logsource])
    })
    this.commandEmitter.on('onError', err => {
      console.log('ACEWorker::commandEmitter::onError')
      console.log(JSON.stringify(err))
    })

    this.eventEmitter = new ACEWorkerEventsForWorkerEmitter()
    this.eventEmitter.on('onStartForAPI', task => {
      console.log('ACEWorker::eventEmitter::onStartForAPI')
      console.log(JSON.stringify(task))
    })
    this.eventEmitter.on('started', () => console.log('ACEWorker::eventEmitter::started'))
    this.eventEmitter.on('onFinish', (message, logsource) => {
      console.log('ACEWorker::eventEmitter::onFinish')
      console.log(JSON.stringify([message, logsource]))
      postMessage({type: 'onFinish', message, logsource})
    })
    this.eventEmitter.on('onError', err => {
      console.log('ACEWorker::eventEmitter::onError')
      console.log(JSON.stringify(err))
    })
  }

  public static getWorkerEmitter(): ACEWorkerEventsForWorkerEmitter {
    return ACEWorker.getInstance().eventEmitter
  }

  public static plWithPage(pageName: string): void {
    console.log('ACEWorker::plWithPage: ' + JSON.stringify(pageName))
    ACEWorker.getWorkerEmitter().emit('onFinish', 'done', 200)
  }
}
