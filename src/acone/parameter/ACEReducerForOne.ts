import {ACENetwork} from '../../common/http/ACENetwork'
import {ITask} from '../../common/webworker/ITask'
import {ACEWorkerEventsForCallerEmitter} from '../worker/ACEWorkerEventsForCallerEmitter'
import {ACEWorkerEventsForWorkerEmitter} from '../worker/ACEWorkerEventsForWorkerEmitter'

export class ACEReducerForOne {
  private static instance: ACEReducerForOne
  private commandEmitter: ACEWorkerEventsForCallerEmitter
  private eventEmitter: ACEWorkerEventsForWorkerEmitter
  private worker: Worker

  private constructor() {
    this.commandEmitter = new ACEWorkerEventsForCallerEmitter()
    this.eventEmitter = new ACEWorkerEventsForWorkerEmitter()

    this.worker = new Worker('../worker/ACEWorker')
    this.worker.onmessage = event => this.eventEmitter.emit(event.data.type, ...event.data.data)
    this.worker.onerror = event => this.eventEmitter.emit('onError', {...event})

    this.eventEmitter.on('started', () => console.log('ACEReducerForOne::eventEmitter::started'))
    this.eventEmitter.on('onFinish', (message, logsource) => {
      console.log('ACEReducerForOne::eventEmitter::onFinish')
      console.log([message, logsource])
    })
    this.eventEmitter.on('onError', err => {
      console.log('ACEReducerForOne::eventEmitter::onError')
      console.log(JSON.stringify(err))
    })

    this.commandEmitter.on('onStartForAPI', (task?: ITask) => {
      console.log('ACEReducerForOne::commandEmitter::onStartForAPI')
      console.log(JSON.stringify(task))
      ACEReducerForOne.getWorker().postMessage({type: 'onStartForAPI', task})
    })
    this.commandEmitter.on('onFinish', (message, logsource) => {
      console.log('ACEReducerForOne::commandEmitter::onFinish')
      console.log([message, logsource])
    })
    this.commandEmitter.on('onError', err => {
      console.log('ACEReducerForOne::commandEmitter::onError')
      console.log(JSON.stringify(err))
    })
  }

  public static getInstance(): ACEReducerForOne {
    return this.instance || (this.instance = new this())
  }

  private static getCallerEmitter(): ACEWorkerEventsForCallerEmitter {
    return ACEReducerForOne.getInstance().commandEmitter
  }

  private static getWorker(): Worker {
    return ACEReducerForOne.getInstance().worker
  }

  private static mainthreadToWorkerAction(task: ITask) {
    switch (task.action.type) {
      case 'plWithPage':
        ACEReducerForOne.getCallerEmitter().emit('onStartForAPI', task)
        break
      default:
        console.log('not implementation Task.')
        break
    }
  }

  public static plWithPage(pageName: string): void {
    console.log('plWithPage: ' + JSON.stringify(pageName))
    ACEReducerForOne.mainthreadToWorkerAction({
      action: {
        type: 'plWithPage',
        name: 'plWithPage',
        logsource: 100,
      },
    })
  }

  public static buy(pageName: string): void {
    console.log('buy: ' + JSON.stringify(pageName))

    ACENetwork.request()
  }
}
