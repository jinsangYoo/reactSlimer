import Task from '../../common/task/Task'
import {ITaskParams} from '../../common/task/ITaskParams'
import {ACENetwork} from '../../common/http/ACENetwork'
import {AxiosResponse} from 'axios'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import {ACEResultCode, ACEConstantCallback} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'
import ACProduct from '../acproduct'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACEParameterUtilForOne from './ACEParameterUtilForOne'
import TP from '../constant/TP'
import ACEntityForVT from './ACEntityForVT'
import ACEntityForST from './ACEntityForVT'
import IACBuyMode from '../constant/IACBuyMode'

export default class APIForBuy extends Task {
  private static _TAG = 'APIForBuy'
  private _willUpdateVt?: ACEntityForVT
  private _willUpdateSt?: ACEntityForST

  private pageName: string
  private orderNumber: string
  private paymentMethod: string
  private products: ACProduct[]
  public constructor(params: ITaskParams) {
    ACELog.d(APIForBuy._TAG, 'in constructor, params:', params)
    super(params)
    this.pageName = params.payload.pageName ?? ACECONSTANT.EMPTY
    this.orderNumber = params.payload.orderNumber ?? ACECONSTANT.EMPTY
    this.paymentMethod = params.payload.paymentMethod ?? ACECONSTANT.EMPTY
    this.products = Array.from(params.payload.products ?? [])
  }

  public doWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doWork(callback)
    ACELog.d(APIForBuy._TAG, 'doWork')

    const _parameterUtilForOne = ACEParameterUtilForOne.getInstance()
    _parameterUtilForOne.setBuyMode(IACBuyMode.Order)
    _parameterUtilForOne.setOrderNumber(this.orderNumber)
    _parameterUtilForOne.setPaymentMethod(this.paymentMethod)

    _parameterUtilForOne.setTP(TP.SITE)
    _parameterUtilForOne.updateUrlToRef(this.pageName)
    _parameterUtilForOne
      .loadVT()
      .then(response => {
        ACELog.d(APIForBuy._TAG, 'Done load vt.', response)
        ACELog.d(APIForBuy._TAG, 'vt after loadVT()', _parameterUtilForOne.getVT())
        return _parameterUtilForOne.updateSTnVT(this.assignWillUpdateVt())
      })
      .then(response => {
        ACELog.d(APIForBuy._TAG, 'Done update st and vt.', response)
        ACELog.d(APIForBuy._TAG, 'vt after updateSTnVT()', _parameterUtilForOne.getVT())
        if (callback) {
          const res: ACEResponseToCaller = {
            taskHash: `${this._logSource}::0011`,
            code: ACEResultCode.Success,
            result: ACEConstantCallback[ACEConstantCallback.Success],
            message: 'Done update st and vt.',
            apiName: this.getDescription(),
          }
          callback(undefined, res)
        }
      })
      .catch(err => {
        ACELog.d(APIForBuy._TAG, 'Fail load st and vt.', err)
        if (callback) {
          const res: ACEResponseToCaller = {
            taskHash: `${this._logSource}::0012`,
            code: ACEResultCode.FailLoadVT,
            result: ACEConstantCallback[ACEConstantCallback.Failed],
            message: 'Fail load vt.',
            apiName: this.getDescription(),
          }
          callback(err, res)
        }
      })

    if (callback) {
      const res: ACEResponseToCaller = {
        taskHash: `${this._logSource}::0011`,
        code: ACEResultCode.Success,
        result: ACEConstantCallback[ACEConstantCallback.Success],
        message: 'Done doWork to buy.',
        apiName: this.getDescription(),
      }
      callback(undefined, res)
    }
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)

    ACENetwork.requestToLog(
      response => {
        this.completed(response)
      },
      err => {
        this.failed(err)
      },
    )
  }

  public doneWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doneWork(callback)
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
  }

  public failed(err: any) {
    super.failed(err)
  }

  protected assignWillUpdateSt(): ACEntityForST {
    if (!this._willUpdateSt) {
      const _parameterUtilForOne = ACEParameterUtilForOne.getInstance()
      this._willUpdateSt = new ACEntityForST()
      this._willUpdateSt.setDeepCopy(_parameterUtilForOne.getST().getMap())
    }

    return this._willUpdateSt
  }

  protected assignWillUpdateVt(): ACEntityForVT {
    if (!this._willUpdateVt) {
      const _parameterUtilForOne = ACEParameterUtilForOne.getInstance()
      this._willUpdateVt = new ACEntityForVT()
      this._willUpdateVt.setDeepCopy(_parameterUtilForOne.getVT().getMap())
    }

    return this._willUpdateVt
  }
}
