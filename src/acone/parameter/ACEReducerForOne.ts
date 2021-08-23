import {ITaskParams} from '../../common/task/ITaskParams'
import APIForPL from './APIForPL'
import APIForBuy from './APIForBuy'
import TaskAdapter from '../../common/task/TaskAdapter'
import ACEofAPIForOne from '../constant/ACEofAPIForOne'
import APIForPolicy from './APIForPolicy'
import {ACEConstantCallback, ACEResultCode, ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import ACProduct from '../acproduct'
// import {ACEWorkerEventsForWorkerEmitter} from '../worker/ACEWorkerEventsForWorkerEmitter'

// 이벤트는 컨트롤타워 와 같은 제어에서만 이벤트 사용 나머지는 프라미스와 콜백으로 하자
export default class ACEReducerForOne {
  private static _TAG = 'reducerForOne'
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
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  private static reducer(params: ITaskParams): Promise<ACEResponseToCaller>
  private static reducer(
    params: ITaskParams,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    if (params.type !== ACEofAPIForOne.Policy) {
      if (!ControlTowerSingleton.isEnableByPolicy()) {
        const result: ACEResponseToCaller = {
          taskHash: `${params.type}::0006`,
          code: ACEResultCode.NotFoundPolicyInformation,
          result: ACEConstantCallback[ACEConstantCallback.Failed],
          message: 'Not found policy information.',
          apiName: ACEofAPIForOne[params.type],
        }
        if (callback) {
          callback(new Error('0006, Not found policy information.'), result)
          return
        } else {
          return new Promise((resolveToOut, rejectToOut) => {
            rejectToOut(result)
          })
        }
      }
    }
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
        ACELog.d(ACEReducerForOne._TAG, 'not implementation Task.')
        break
    }

    return taskAdapter.run()
  }

  public static buy(
    pageName: string,
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    orderNumber?: string,
    payMethodName?: string,
    products?: ACProduct[],
  ): void
  public static buy(
    pageName: string,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    orderNumber?: string,
    payMethodName?: string,
    products?: ACProduct[],
  ): Promise<ACEResponseToCaller>
  public static buy(
    pageName: string,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    orderNumber?: string,
    payMethodName?: string,
    products?: ACProduct[],
  ): Promise<ACEResponseToCaller> | void {
    ACELog.d(ACEReducerForOne._TAG, 'buy: ' + JSON.stringify(pageName))
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Buy,
        payload: {
          orderNumber: orderNumber,
          paymentMethod: payMethodName,
          products: products,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static plWithPage(
    pageName: string,
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  public static plWithPage(pageName: string): Promise<ACEResponseToCaller>
  public static plWithPage(
    pageName: string,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    ControlTowerSingleton.getInstance().setDevSDKMode()
    ControlTowerSingleton.getInstance().setHomeDevNetworkMode()

    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.PlWithPage,
        payload: {
          pageName: pageName,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static policy(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void
  public static policy(): Promise<ACEResponseToCaller>
  public static policy(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
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
