import APIForPL from './APIForPL'
import {ITaskParams} from '../../common/task/ITaskParams'
import {AxiosResponse} from 'axios'
import {ACEResponseToCaller} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACEParameterUtilForOne from './ACEParameterUtilForOne'

export default class APIForAppearProduct extends APIForPL {
  private static _TAG = 'APIForAppearProduct'

  private productName: string
  private productCategoryName: string
  private productPrice: string
  public constructor(params: ITaskParams) {
    ACELog.d(APIForAppearProduct._TAG, 'in constructor')
    super(params)
    this.productName = params.payload.productName ?? ACECONSTANT.EMPTY
    this.productCategoryName = params.payload.productCategoryName ?? ACECONSTANT.EMPTY
    this.productPrice = params.payload.productPrice ?? ACECONSTANT.EMPTY
  }

  public doWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doWork((error?: object, innerResult?: ACEResponseToCaller) => {
      ACELog.d(APIForAppearProduct._TAG, 'in doWork::in cb')
      if (error && callback) {
        callback(error, innerResult)
      } else if (callback) {
        const _parameterUtilForOne = ACEParameterUtilForOne.getInstance()
        _parameterUtilForOne.setProductName(this.productName)
        _parameterUtilForOne.setProductCategoryName(this.productCategoryName)
        _parameterUtilForOne.setProductPrice(this.productPrice)
        callback(undefined, innerResult)
      }
    })
  }

  public didWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined): void {
    super.didWork(callback)
    ACELog.d(APIForAppearProduct._TAG, 'didWork')
  }

  public completed(response: AxiosResponse) {
    super.completed(response)
    ACELog.d(APIForAppearProduct._TAG, 'completed')
  }

  public failed(err: any) {
    super.failed(err)
    ACELog.d(APIForAppearProduct._TAG, 'failed')
  }

  public doneWork(callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined) {
    super.doneWork(callback)
    ACELog.d(APIForAppearProduct._TAG, 'doneWork')
    const _parameterUtilForOne = ACEParameterUtilForOne.getInstance()
    //#region AppearProduct
    _parameterUtilForOne.clearProductName()
    _parameterUtilForOne.clearProductCategoryName()
    _parameterUtilForOne.clearProductPrice()
    //#endregion
  }
}
