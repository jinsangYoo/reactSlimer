import ACEParametersForOne from './ACEParametersForOne'
import IACEParameterUtil from '../../common/parameter/IACEParameterUtil'
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil'
import ACECommonStaticConfig from '../../common/config/ACECommonStaticConfig'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACOneConstantInteger from '../../common/constant/ACOneConstantInteger'
import ACOneConstant from '../constant/ACOneConstant'
import {ACS} from '../acs'
import SESSION from '../../common/constant/Session'
import ACOneConstantSt from '../constant/ACOneConstantSt'
import ACOneConstantVt from '../constant/ACOneConstantVt'
import ACEntityForST from './ACEntityForST'
import ACEntityForVT from './ACEntityForVT'

export default class ACEParameterUtilForOne implements IACEParameterUtil {
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

  public initParameters(callback: ((error?: Error, result?: object) => void) | undefined): void
  public initParameters(): Promise<object>
  public initParameters(callback?: ((error?: Error, result?: object) => void) | undefined): Promise<object> | void {
    const _parametersForOne = ACEParametersForOne.getInstance()
    _parametersForOne.getCE()
    _parametersForOne.setDM(ACEParameterUtil.getResolution())
    _parametersForOne.setMID(ACECommonStaticConfig.getKey())
    _parametersForOne.setIsNeedSetNewSession(false)
    _parametersForOne.setPatch(ACECONSTANT.PATCH)
    _parametersForOne.setRE(ACOneConstantInteger.DefaultRE)
    _parametersForOne.setREF(ACECONSTANT.BOOKMARK)
    _parametersForOne.setRI(ACOneConstant.DefaultRI)
    this.loadSV()
    _parametersForOne.getUDF1()
    _parametersForOne.getUDF2()
    _parametersForOne.getUDF3()

    this.setNewSession()
    this.loadVT()

    this.setSTS(ACECONSTANT.ZERO)
    _parametersForOne.setADELD(false)
    _parametersForOne.setADID(ACECONSTANT.DEFAULT_ADID)

    if (!global.Promise) {
      if (callback) {
        callback(undefined, {
          result: 'done',
        })
      }
    } else {
      return new Promise((resolve, reject) => {
        if (callback) {
          callback(undefined, {
            result: 'done',
          })
        } else {
          resolve({
            result: 'done',
          })
        }
      })
    }
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
            console.log('save willUpdateSt')
            if (error) {
              console.log(`error: ${JSON.stringify(error)}`)
            }
            if (result) {
              console.log(`result: ${JSON.stringify(error)}`)
            }
          })
        } else {
          this.saveST_toInStorage(_st).then(result => {
            console.log('save willUpdateSt')
            console.log(`result: ${JSON.stringify(result)}`)
          })
        }
      }

      const _vt: ACEntityForVT = params[ACOneConstantVt.KeyWillUpdateVt]
      if (_vt) {
        if (!global.Promise) {
          this.saveVT_toInStorage(_vt, (error?: Error, result?: object) => {
            console.log('save willUpdateVt')
            if (error) {
              console.log(`error: ${JSON.stringify(error)}`)
            }
            if (result) {
              console.log(`result: ${JSON.stringify(error)}`)
            }
          })
        } else {
          this.saveVT_toInStorage(_vt).then(result => {
            console.log('save willUpdateVt')
            console.log(`result: ${JSON.stringify(result)}`)
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
}