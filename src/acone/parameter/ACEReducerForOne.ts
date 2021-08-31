import {ITaskParams} from '../../common/task/ITaskParams'
import APIForPL from './APIForPL'
import APIForBuy from './APIForBuy'
import APIForCart from './APIForCart'
import APIForAppearProduct from './APIForAppearProduct'
import APIForLinkTel from './APIForLinkTel'
import APIForLogin from './APIForLogin'
import APIForJoinLeave from './APIForJoinLeave'
import APIForPolicy from './APIForPolicy'
import TaskAdapter from '../../common/task/TaskAdapter'
import ACEofAPIForOne from '../constant/ACEofAPIForOne'
import {ACEConstantCallback, ACEResultCode, ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton'
import ACProduct from '../acproduct'
import {ACParams} from '../acparam'
import {ACEGender, ACEMaritalStatus} from '../../common/constant/ACEPublicStaticConfig'

export default class ACEReducerForOne {
  private static _TAG = 'reducerForOne'
  private static instance: ACEReducerForOne

  public static getInstance(): ACEReducerForOne {
    return this.instance || (this.instance = new this())
  }

  private constructor() {}

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
      case ACEofAPIForOne.AppearProduct:
        taskAdapter.addTask(new APIForAppearProduct(params), callback)
        break
      case ACEofAPIForOne.Buy:
        taskAdapter.addTask(new APIForBuy(params), callback)
        break
      case ACEofAPIForOne.AddInCart:
      case ACEofAPIForOne.DeleteInCart:
        taskAdapter.addTask(new APIForCart(params), callback)
        break
      case ACEofAPIForOne.Join:
      case ACEofAPIForOne.Leave:
        taskAdapter.addTask(new APIForJoinLeave(params), callback)
        break
      case ACEofAPIForOne.Login:
        taskAdapter.addTask(new APIForLogin(params), callback)
        break
      case ACEofAPIForOne.PlWithPage:
        taskAdapter.addTask(new APIForPL(params), callback)
        break
      case ACEofAPIForOne.Policy:
        taskAdapter.addTask(new APIForPolicy(params), callback)
        break
      case ACEofAPIForOne.TrackLinkEvent:
      case ACEofAPIForOne.TrackTelEvent:
        taskAdapter.addTask(new APIForLinkTel(params), callback)
        break
      default:
        ACELog.d(ACEReducerForOne._TAG, 'not implementation Task.')
        break
    }

    return taskAdapter.run()
  }

  public static appearProduct(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    productName?: string,
    productCategoryName?: string,
    productPrice?: string,
  ): void
  public static appearProduct(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    productName?: string,
    productCategoryName?: string,
    productPrice?: string,
  ): Promise<ACEResponseToCaller>
  public static appearProduct(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    productName?: string,
    productCategoryName?: string,
    productPrice?: string,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.AppearProduct,
        payload: {
          pageName: pageName,
          productName: productName,
          productCategoryName: productCategoryName,
          productPrice: productPrice,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static buy(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    orderNumber?: string,
    payMethodName?: string,
    products?: ACProduct[],
  ): void
  public static buy(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    orderNumber?: string,
    payMethodName?: string,
    products?: ACProduct[],
  ): Promise<ACEResponseToCaller>
  public static buy(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
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

  public static cart(
    type: string,
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    products?: ACProduct[],
  ): void
  public static cart(
    type: string,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    products?: ACProduct[],
  ): Promise<ACEResponseToCaller>
  public static cart(
    type: string,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    products?: ACProduct[],
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: type == ACParams.TYPE.ADDCART ? ACEofAPIForOne.AddInCart : ACEofAPIForOne.DeleteInCart,
        payload: {
          products: products,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static join(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): void
  public static join(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): Promise<ACEResponseToCaller>
  public static join(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Join,
        payload: {
          pageName: pageName,
          userId: userId,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static leave(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): void
  public static leave(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): Promise<ACEResponseToCaller>
  public static leave(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userId?: string,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Leave,
        payload: {
          pageName: pageName,
          userId: userId,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static link(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    linkName?: string,
  ): void
  public static link(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    linkName?: string,
  ): Promise<ACEResponseToCaller>
  public static link(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    linkName?: string,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.TrackLinkEvent,
        payload: {
          pageName: pageName,
          linkName: linkName,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static login(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userAge?: number,
    userGender?: ACEGender,
    userId?: string,
    userMaritalStatus?: ACEMaritalStatus,
  ): void
  public static login(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userAge?: number,
    userGender?: ACEGender,
    userId?: string,
    userMaritalStatus?: ACEMaritalStatus,
  ): Promise<ACEResponseToCaller>
  public static login(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    userAge?: number,
    userGender?: ACEGender,
    userId?: string,
    userMaritalStatus?: ACEMaritalStatus,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.Login,
        payload: {
          pageName: pageName,
          userAge: userAge,
          userGender: userGender,
          userId: userId,
          userMaritalStatus: userMaritalStatus,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }

  public static plWithPage(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
  ): void
  public static plWithPage(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
  ): Promise<ACEResponseToCaller>
  public static plWithPage(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
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

  public static tel(
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    tel?: string,
  ): void
  public static tel(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    tel?: string,
  ): Promise<ACEResponseToCaller>
  public static tel(
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
    pageName?: string,
    tel?: string,
  ): Promise<ACEResponseToCaller> | void {
    return ACEReducerForOne.reducer(
      {
        type: ACEofAPIForOne.TrackTelEvent,
        payload: {
          pageName: pageName,
          tel: tel,
        },
        error: false,
        debugParams: {},
      },
      callback,
    )
  }
}
