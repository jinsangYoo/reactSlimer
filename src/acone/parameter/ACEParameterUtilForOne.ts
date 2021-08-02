import ACEParametersForOne from './ACEParametersForOne'
import IACEParameterUtil from '../../common/parameter/IACEParameterUtil'
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACOneConstantInteger from '../../common/constant/ACOneConstantInteger'
import ACOneConstant from '../constant/ACOneConstant'
import {ACS} from '../acs'
import SESSION from '../../common/constant/Session'
import ACOneConstantSt from '../constant/ACOneConstantSt'
import ACOneConstantVt from '../constant/ACOneConstantVt'
import ACEntityForST from './ACEntityForST'
import ACEntityForVT from './ACEntityForVT'
import {ACEResponseToCaller, ACEConstantCallback, ACEResultCode} from '../../common/constant/ACEPublicStaticConfig'
import ACELog from '../../common/logger/ACELog'

export default class ACEParameterUtilForOne implements IACEParameterUtil {
  private static _TAG = 'paramUtilForOne'
  private static instance: ACEParameterUtilForOne

  public static getInstance(): ACEParameterUtilForOne {
    return this.instance || (this.instance = new this())
  }

  private constructor() {}
  loadUniqueKeyForSDK(): void {
    ACEParametersForOne.getInstance().setPcStampWhenNotStored()
  }
  setFirstLogParameters(): void {
    throw new Error('Method not implemented.')
  }
  setLogSource(value: number): void {
    throw new Error('Method not implemented.')
  }
  getSdkDetails(json: JSON): void {
    throw new Error('Method not implemented.')
  }

  public initParameters(
    key: string,
    callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  public initParameters(key: string): Promise<ACEResponseToCaller>
  public initParameters(
    key: string,
    callback?: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    const _parametersForOne = ACEParametersForOne.getInstance()
    _parametersForOne.getCE()
    _parametersForOne.setDM(ACEParameterUtil.getResolution())
    _parametersForOne.setMID(key)
    _parametersForOne.setIsNeedSetNewSession(false)
    _parametersForOne.setPatch(ACECONSTANT.PATCH)
    _parametersForOne.setRE(ACOneConstantInteger.DefaultRE)
    _parametersForOne.setREF(ACECONSTANT.BOOKMARK)
    _parametersForOne.setRI(ACOneConstant.DefaultRI)
    this.loadSV()
    _parametersForOne.getUDF1()
    _parametersForOne.getUDF2()
    _parametersForOne.getUDF3()

    this.setSTS(ACECONSTANT.ZERO)
    _parametersForOne.setADELD(false)
    _parametersForOne.setADID(ACECONSTANT.DEFAULT_ADID)

    this.setNewSession()
    ACS.setPackageNameOrBundleID(ACEParameterUtil.getPackageNameOrBundleID())

    const promiseWorkLoadVT = this.loadVT()
    return new Promise((resolve, reject) => {
      Promise.all([promiseWorkLoadVT])
        .then(res => {
          ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all res:', res)
          this.getVT()
          this.loadUniqueKeyForSDK()

          const response: ACEResponseToCaller = {
            taskHash: '0003',
            code: ACEResultCode.Success,
            result: ACEConstantCallback[ACEConstantCallback.Success],
            message: 'SDK init step one done',
            apiName: 'init',
          }
          if (callback) {
            callback(undefined, response)
          } else {
            resolve(response)
          }
        })
        .catch(err => {
          ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all err:', err)

          const response: ACEResponseToCaller = {
            taskHash: '0004',
            code: ACEResultCode.FailAfterRequest,
            result: ACEConstantCallback[ACEConstantCallback.Failed],
            message: 'SDK init step one fail',
            apiName: 'init',
          }
          if (callback) {
            callback(err, response)
          } else {
            reject(response)
          }
        })
    })
  }

  public isFirstLog(): boolean {
    return this.getSession() == SESSION.NEW
  }

  public resetSessionAndParameterAfterSend(): void {
    this.resetSessionAndParameterAfterSendWithParams(undefined)
  }

  public resetSessionAndParameterAfterSendWithParams(params?: JSON): void {
    if (this.isFirstLog()) {
      this.setKeepSession()
    }

    if (params) {
      const _st: ACEntityForST = params[ACOneConstantSt.KeyWillUpdateSt]
      if (_st) {
        if (!global.Promise) {
          this.saveST_toInStorage(_st, (error?: Error, result?: object) => {
            ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateSt')
            if (error) {
              ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage error:', error)
            }
            if (result) {
              ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage result:', result)
            }
          })
        } else {
          this.saveST_toInStorage(_st).then(result => {
            ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateSt')
            ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage result:', result)
          })
        }
      }

      const _vt: ACEntityForVT = params[ACOneConstantVt.KeyWillUpdateVt]
      if (_vt) {
        if (!global.Promise) {
          this.saveVT_toInStorage(_vt, (error?: Error, result?: object) => {
            ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateVt')
            if (error) {
              ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage error:', error)
            }
            if (result) {
              ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage result:', result)
            }
          })
        } else {
          this.saveVT_toInStorage(_vt).then(result => {
            ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateVt')
            ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage result:', result)
          })
        }
      }
    }
  }

  public setNewSession(): void {
    ACEParametersForOne.getInstance().setVK(SESSION.NEW)
  }

  public getSession(): number {
    return ACEParametersForOne.getInstance().getVK()
  }

  public setKeepSession(): void {
    ACEParametersForOne.getInstance().setVK(SESSION.KEEP)
  }

  public saveST_toInStorage(st: ACEntityForST, callback: (error?: Error, result?: object) => void): void
  public saveST_toInStorage(st: ACEntityForST): Promise<object>
  public saveST_toInStorage(
    st: ACEntityForST,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    return ACEParametersForOne.getInstance().saveST_toInStorage(st, callback)
  }

  public getSTS(): string {
    return ACEParametersForOne.getInstance().getSTS()
  }

  public setSTS(value: string): void {
    return ACEParametersForOne.getInstance().setSTS(value)
  }

  public clearSV(): void {
    ACEParametersForOne.getInstance().setSV(ACECONSTANT.EMPTY)
  }

  public loadSV(): void {
    ACEParametersForOne.getInstance().setSV(this.makeSV())
  }

  public makeSV(): string {
    return `${ACOneConstant.DefaultServiceCode}${ACS.SDKVersion()}${ACOneConstant.DefaultNotCustomSDKForCustomer}`
  }

  // #region VT
  public getVT(): ACEntityForVT {
    return ACEParametersForOne.getInstance().getVT()
  }

  public loadVT(callback: (error?: Error, result?: object) => void): void
  public loadVT(): Promise<object>
  public loadVT(callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    return ACEParametersForOne.getInstance().loadVT(callback)
  }

  public saveVT_toInStorage(vt: ACEntityForVT, callback: (error?: Error, result?: object) => void): void
  public saveVT_toInStorage(vt: ACEntityForVT): Promise<object>
  public saveVT_toInStorage(
    vt: ACEntityForVT,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    return ACEParametersForOne.getInstance().saveVT_toInStorage(vt, callback)
  }
  // #endregion

  public setterForString(key: string, value: string): void {}
}
