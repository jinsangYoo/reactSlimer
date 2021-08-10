import ACEParametersForOne from './ACEParametersForOne'
import IACEParameterUtil from '../../common/parameter/IACEParameterUtil'
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACOneConstantInteger from '../constant/ACOneConstantInteger'
import ACOneConstant from '../constant/ACOneConstant'
import {ACS} from '../acs'
import SESSION from '../../common/constant/Session'
import ACEntityForST from './ACEntityForST'
import ACEntityForVT from './ACEntityForVT'
import {ACEResponseToCaller, ACEConstantCallback, ACEResultCode} from '../../common/constant/ACEPublicStaticConfig'
import {isEmpty, onlyLetteringAtStartIndex, stringToNumber} from '../../common/util/TextUtils'
import ACELog from '../../common/logger/ACELog'
import {getRandom6CharForSTVT} from '../../common/util/NumberUtil'
import ParameterAfterSend from '../constant/ParameterAfterSend'

export default class ACEParameterUtilForOne implements IACEParameterUtil {
  private static _TAG = 'paramUtilForOne'
  private static instance: ACEParameterUtilForOne
  private _enablePrivacyPolicy: boolean

  public static getInstance(): ACEParameterUtilForOne {
    return this.instance || (this.instance = new this())
  }

  private constructor() {
    this._enablePrivacyPolicy = false
  }
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
    enablePrivacyPolicy: boolean,
    callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  public initParameters(key: string, enablePrivacyPolicy: boolean): Promise<ACEResponseToCaller>
  public initParameters(
    key: string,
    enablePrivacyPolicy: boolean,
    callback?: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    this._enablePrivacyPolicy = enablePrivacyPolicy
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

    ACELog.d(ACEParameterUtilForOne._TAG, `tz: ${_parametersForOne.getTZ()}`)

    this.setNewSession()
    ACS.setPackageNameOrBundleID(ACEParameterUtil.getPackageNameOrBundleID())

    const promiseWorkLoadVT = this.loadVT()
    return new Promise((resolve, reject) => {
      Promise.all([promiseWorkLoadVT])
        .then(res => {
          ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all res:', res)

          this.getVT()
          this.loadUniqueKeyForSDK()
          ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all vt:', this.getVT())

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

  public setID(value: string): void {
    if (!isEmpty(value) && this._enablePrivacyPolicy) {
      value = ACOneConstant.EnabledPrivacyPolicyUserID
    }

    return ACEParametersForOne.getInstance().setSTS(value)
  }

  public isFirstLog(): boolean {
    return this.getSession() == SESSION.NEW
  }

  public resetSessionAndParameterAfterSend(): void {
    this.resetSessionAndParameterAfterSendWithParams(undefined)
  }

  public resetSessionAndParameterAfterSendWithParams(params?: ParameterAfterSend): Promise<boolean> {
    if (this.isFirstLog()) {
      this.setKeepSession()
    }

    if (params) {
      const _st = params.st
      const _vt = params.vt
      if (_st) {
        if (_vt) {
          return new Promise((resolve, reject) => {
            this.saveST_toInStorage(_st)
              .then(result => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate St')
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::saveST_toInStorage result:', result)
                return this.saveVT_toInStorage(_vt)
              })
              .then(result => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate Vt')
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::saveVT_toInStorage result:', result)
                resolve(true)
              })
              .catch(err => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate S/Vt.')
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err)
                reject(false)
              })
          })
        } else {
          return new Promise((resolve, reject) => {
            this.saveST_toInStorage(_st)
              .then(result => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate St')
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::saveST_toInStorage result:', result)
                resolve(true)
              })
              .catch(err => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate only St.')
                ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err)
                reject(false)
              })
          })
        }
      }

      if (_vt) {
        return new Promise((resolve, reject) => {
          this.saveVT_toInStorage(_vt)
            .then(result => {
              ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate Vt')
              ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::saveVT_toInStorage result:', result)
              resolve(true)
            })
            .catch(err => {
              ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate only Vt.')
              ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err)
              reject(false)
            })
        })
      }
    }

    return new Promise((resolve, reject) => {
      ACELog.d(ACEParameterUtilForOne._TAG, 'not save S/Vt.')
      resolve(true)
    })
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

  //#region Update ST & VT
  public updateSTnVT(willUpdateVt: ACEntityForVT): Promise<object> {
    const _now = new Date()
    const _randomString = getRandom6CharForSTVT()
    if (this.isFirstLog()) {
      this.setStartTS(_now, _randomString)
      this.setSTS(this.getStartTSGoldMaster())

      if (this.getVT().isEmptyAtVTS()) {
        ACELog.d(ACEParameterUtilForOne._TAG, 'update vts')
        this.setVTSButNotStorage(_now, _randomString)
      } else {
        ACELog.d(ACEParameterUtilForOne._TAG, `vts is >>${this.getVT().getVTS()}<<`)
      }
      this.setVTSAtObject(willUpdateVt, _now, _randomString)

      const visitCount = this.getVisitCount()
      ACELog.d(ACEParameterUtilForOne._TAG, `visitCount is >>${visitCount}<<`)
      if (visitCount == 0) {
        ACELog.d(ACEParameterUtilForOne._TAG, 'visitCount is 0')
        this.setVisitCountAtObject(willUpdateVt, 2)
      } else {
        this.setVisitCountAtObject(willUpdateVt, visitCount + 1)
      }

      if (this.getVT().isEmptyAtBuyTimeTS()) {
        this.setBuyTimeTSButNotStorage(_now, _randomString)
        this.setBuyTimeTSAtObject(willUpdateVt, _now, _randomString)
        this.setBuyCountAtObject(willUpdateVt, 1)
      }
    } else {
      ACELog.d(ACEParameterUtilForOne._TAG, `not firstLog: ${this.getSession()}, ${SESSION[this.getSession()]}`)
    }
    this.setGetTS(_now, _randomString)
    return this.saveVT_toInStorage(this.getVT())
  }
  //#endregion

  //#region ST
  public getST(): ACEntityForST {
    return ACEParametersForOne.getInstance().getST()
  }

  public setGetTS(value: Date, random6Value: string): void {
    const _parametersForOne = ACEParametersForOne.getInstance()
    _parametersForOne.getST().setGetTS(value)
    _parametersForOne.getST().setRandom6ForGetTS(random6Value)
  }

  public saveST_toInStorage(st: ACEntityForST, callback: (error?: Error, result?: object) => void): void
  public saveST_toInStorage(st: ACEntityForST): Promise<object>
  public saveST_toInStorage(
    st: ACEntityForST,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    return ACEParametersForOne.getInstance().saveST_toInStorage(st, callback)
  }

  public setStartTS(value: Date, random6Value: string): void {
    const _parametersForOne = ACEParametersForOne.getInstance()
    _parametersForOne.getST().setStartTS(value)
    _parametersForOne.getST().setRandom6ForStartTS(random6Value)
  }

  public getStartTSGoldMaster(): string {
    const _parametersForOne = ACEParametersForOne.getInstance()
    return _parametersForOne.getST().getStartTSGoldMaster()
  }

  public getSTS(): string {
    return ACEParametersForOne.getInstance().getSTS()
  }

  public setSTS(value: string): void {
    return ACEParametersForOne.getInstance().setSTS(value)
  }
  //#endregion

  public clearSV(): void {
    ACEParametersForOne.getInstance().setSV(ACECONSTANT.EMPTY)
  }

  public loadSV(): void {
    ACEParametersForOne.getInstance().setSV(this.makeSV())
  }

  public makeSV(): string {
    return `${ACOneConstant.DefaultServiceCode}${ACS.SDKVersion()}${ACOneConstant.DefaultNotCustomSDKForCustomer}`
  }

  public setTP(value: string): void {
    ACEParametersForOne.getInstance().setTP(value)
  }

  public setURL(value: string): void {
    value = onlyLetteringAtStartIndex(value)
    const _parametersForOne = ACEParametersForOne.getInstance()
    ACELog.d(ACEParameterUtilForOne._TAG, `>>${ACS.getPackageNameOrBundleID()}/${value}<<`)
    _parametersForOne.setURL(`${ACS.getPackageNameOrBundleID()}/${value}`)
  }

  public updateUrlToRef(value: string): void {
    const _parametersForOne = ACEParametersForOne.getInstance()
    _parametersForOne.setREF(_parametersForOne.getURL())
    this.setURL(value)
  }

  // #region VT
  public setBuyCountAtObject(willUpdateVt: ACEntityForVT, value: number): void {
    willUpdateVt.setBuyCount(value)
  }

  public getBuyTimeTS(): string {
    return ACEParametersForOne.getInstance().getVT().getBuyTimeTS()
  }

  public setBuyTimeTSButNotStorage(value: Date, random: string): void {
    this.getVT().setBuyTimeTS(value)
    this.getVT().setRandom6ForBuyTimeTS(random)
  }

  public setBuyTimeTSAtObject(willUpdateVt: ACEntityForVT, value: Date, random: string): void {
    willUpdateVt.setBuyTimeTS(value)
    willUpdateVt.setRandom6ForBuyTimeTS(random)
  }

  public getVisitCount(): number {
    return stringToNumber(this.getVT().getVisitCount(), 10)
  }

  public setVisitCountAtObject(willUpdateVt: ACEntityForVT, value: number): void {
    willUpdateVt.setVisitCount(value)
  }

  public getVT(): ACEntityForVT {
    return ACEParametersForOne.getInstance().getVT()
  }

  public loadVT(callback: (error?: Error, result?: object) => void): void
  public loadVT(): Promise<object>
  public loadVT(callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    return ACEParametersForOne.getInstance().loadVT(callback)
  }

  public setVTSButNotStorage(value: Date, random: string): void {
    this.getVT().setVTS(value)
    this.getVT().setRandom6ForVTS(random)
  }

  public setVTSAtObject(willUpdateVt: ACEntityForVT, value: Date, random: string): void {
    willUpdateVt.setVTS(value)
    willUpdateVt.setRandom6ForVTS(random)
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

  public setUserID(value: string): void {
    if (!isEmpty(value) && this._enablePrivacyPolicy) {
      value = ACOneConstant.EnabledPrivacyPolicyUserID
    }

    return ACEParametersForOne.getInstance().setSTS(value)
  }

  public setterForString(key: string, value: string): void {}

  public getParamsToObjectForLogSend(): object {
    return ACEParametersForOne.getInstance().getParamsToObjectForLogSend()
  }
}
