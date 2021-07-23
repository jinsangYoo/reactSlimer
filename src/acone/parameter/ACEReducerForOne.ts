import {ITaskParams} from '../../common/task/ITaskParams'
import APIForPL from './APIForPL'
import APIForBuy from './APIForBuy'
import TaskAdapter from '../../common/task/TaskAdapter'
import ACEofAPIForOne from '../constant/ACEofAPIForOne'
import APIForPolicy from './APIForPolicy'
import {ACECallbackResultForDebug} from '../../common/constant/ACECallbackResultForDebug'
// import {ACEWorkerEventsForWorkerEmitter} from '../worker/ACEWorkerEventsForWorkerEmitter'

// 이벤트는 컨트롤타워 와 같은 제어에서만 이벤트 사용 나머지는 프라미스와 콜백으로 하자
export default class ACEReducerForOne {
  private static instance: ACEReducerForOne
  // private emitter: ACEWorkerEventsForWorkerEmitter

  public static getInstance(): ACEReducerForOne {
    return this.instance || (this.instance = new this())
  }

  private constructor() {
    //   this.emitter = new ACEWorkerEventsForWorkerEmitter()
    //   this.emitter.on('onStartForAPI', params => {
    //     console.log('ACEReducerForOne::emitter::onStartForAPI')
    //     console.log(JSON.stringify(params))
    //   })
    //   this.emitter.on('started', () => console.log('ACEReducerForOne::emitter::started'))
    //   this.emitter.on('onFinish', (message, logsource) => {
    //     console.log('ACEReducerForOne::emitter::onFinish')
    //     console.log([message, logsource])
    //   })
    //   this.emitter.on('onError', err => {
    //     console.log('ACEReducerForOne::emitter::onError')
    //     console.log(JSON.stringify(err))
    //   })
    // }
    // private static getEmitter(): ACEWorkerEventsForWorkerEmitter {
    //   return ACEReducerForOne.getInstance().emitter
  }

  private static reducer(
    params: ITaskParams,
    callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined,
  ): void
  private static reducer(params: ITaskParams): Promise<ACECallbackResultForDebug>
  private static reducer(
    params: ITaskParams,
    callback?: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined,
  ): Promise<ACECallbackResultForDebug> | void {
    const taskAdapter = new TaskAdapter()
    switch (params.type) {
      case ACEofAPIForOne.Buy:
        taskAdapter.addTask(new APIForBuy(params), callback)
        break
      case ACEofAPIForOne.PlWithPage:
        // ACEReducerForOne.getEmitter().emit('onStartForAPI', params)
        taskAdapter.addTask(new APIForPL(params), callback)
        break
      case ACEofAPIForOne.Policy:
        taskAdapter.addTask(new APIForPolicy(params), callback)
        break
      default:
        console.log('not implementation Task.')
        break
    }

    return taskAdapter.run()
  }

  public static buy(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void
  public static buy(pageName: string): Promise<object>
  public static buy(
    pageName: string,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void {
    console.log('buy: ' + JSON.stringify(pageName))
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Buy,
        payload: {},
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static plWithPage(pageName: string, callback: ((error?: Error, result?: object) => void) | undefined): void
  public static plWithPage(pageName: string): Promise<object>
  public static plWithPage(
    pageName: string,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void {
    console.log('plWithPage: ' + JSON.stringify(pageName))
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.PlWithPage,
        payload: {},
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static policy(callback: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined): void
  public static policy(): Promise<ACECallbackResultForDebug>
  public static policy(
    callback?: ((error?: object, result?: ACECallbackResultForDebug) => void) | undefined,
  ): Promise<ACECallbackResultForDebug> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Policy,
        payload: {},
        error: false,
        debugParams: {},
      },
      callback,
    )
  }
}
