import ACEParameters from '../../common/parameter/ACEParameters'
import ACEntityForST from './ACEntityForST'
import ACEntityForVT from './ACEntityForVT'
import {isEmpty} from '../../common/util/TextUtils'
import ADID from '../../common/constant/ADID'
import ACECONSTANT from '../../common/constant/ACEConstant'
import ACOneConstant from '../constant/ACOneConstant'
import IACBuyMode from '../constant/IACBuyMode'
import ACEMaritalStatus from '../../common/constant/ACEMaritalStatus'
import ACOneConstantSt from '../constant/ACOneConstantSt'
import ACOneConstantVt from '../constant/ACOneConstantVt'
import SESSION from '../../common/constant/Session'

import AsyncStorage from '@react-native-async-storage/async-storage'

export default class ACEParametersForOne extends ACEParameters {
  private static instance: ACEParametersForOne
  private adeld: string
  private adid: string
  private ag: number
  private push: string
  private amt: string

  private ce: string
  private ct: string

  private dm: string

  private gd: string

  private _id: string

  private jn: string

  private kw: string

  private lg: string
  private ll: string

  private md: string
  private mid: string
  private mr: string

  private onum: string

  private payMethod: string
  private pd: string

  private re: number
  private ref: string
  private ri: string

  private skey: string
  private src: string
  private st: ACEntityForST
  private sts: string
  private sv: string

  private tp: string

  private udf1: number
  private udf2: number
  private udf3: number
  private url: string
  private userId: string

  private vk: number
  private vt: ACEntityForVT

  public static getInstance(): ACEParametersForOne {
    return this.instance || (this.instance = new this())
  }

  private constructor() {
    super()
  }

  public getADELD(): string {
    if (isEmpty(this.adeld)) {
      this.adeld = ADID.disable
    }
    return this.adeld
  }

  public setADELD(value: boolean): void {
    this.adeld = value ? ADID.enable : ADID.disable
  }

  public getADID(): string {
    if (isEmpty(this.adid)) {
      this.adid = ADID.defaultADID
    }
    return this.adid
  }

  public setADID(value: string): void {
    if (isEmpty(value)) {
      this.adid = ADID.defaultADID
    } else {
      this.adid = value
    }
  }

  public getAG(): number {
    if (this.ag < 0) {
      this.ag = 0
    }
    return this.ag
  }

  public setAG(value: number): void {
    if (value < 0) {
      value = 0
    }
    this.ag = value
  }

  public getAMT(): string {
    if (isEmpty(this.amt)) {
      this.amt = ACECONSTANT.EMPTY
    }
    return this.amt
  }

  public setAMT(value: string): void {
    if (isEmpty(value)) {
      this.amt = ACECONSTANT.EMPTY
    } else {
      this.amt = value
    }
  }

  public getCE(): string {
    if (isEmpty(this.ce)) {
      this.ce = ACOneConstant.DefaultCE
    }
    return this.ce
  }

  public setCE(value: string): void {
    if (isEmpty(value)) {
      this.ce = ACOneConstant.DefaultCE
    } else {
      this.ce = value
    }
  }

  public getCT(): string {
    if (isEmpty(this.ct)) {
      this.ct = ACECONSTANT.EMPTY
    }
    return this.ct
  }

  public setCT(value: string): void {
    if (isEmpty(value)) {
      this.ct = ACECONSTANT.EMPTY
    } else {
      this.ct = value
    }
  }

  public getDM(): string {
    if (isEmpty(this.dm)) {
      this.dm = ACECONSTANT.EMPTY
    }
    return this.dm
  }

  public setDM(value: string): void {
    if (isEmpty(value)) {
      this.dm = ACECONSTANT.EMPTY
    } else {
      this.dm = value
    }
  }

  public getGD(): string {
    if (isEmpty(this.gd)) {
      this.gd = ACECONSTANT.EMPTY
    }
    return this.gd
  }

  public setGD(value: string): void {
    if (isEmpty(value)) {
      this.gd = ACECONSTANT.EMPTY
    } else {
      this.gd = value
    }
  }

  public getID(): string {
    if (isEmpty(this._id)) {
      this._id = ACECONSTANT.EMPTY
    }
    return this._id
  }

  public setID(value: string): void {
    if (isEmpty(value)) {
      this._id = ACECONSTANT.EMPTY
    } else {
      this._id = value
    }
  }

  public getInstallReferrer(callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    if (!global.Promise) {
      console.log('getInstallReferrer::not support promise.')

      AsyncStorage.getItem(ACECONSTANT.InstallReferrer, (err, result) => {
        console.log(`${ACECONSTANT.InstallReferrer}: ${result}`)
        if (callback) {
          callback(err, {
            getKey: ACECONSTANT.InstallReferrer,
            getValue: result,
          })
        }
      })
    } else {
      console.log('getInstallReferrer::support promise.')

      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(ACECONSTANT.InstallReferrer, (err, result) => {
          console.log(`${ACECONSTANT.InstallReferrer}: ${result}`)
          if (callback) {
            callback(err, {
              getKey: ACECONSTANT.InstallReferrer,
              getValue: result,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              resolve({
                getKey: ACECONSTANT.InstallReferrer,
                getValue: result,
              })
            }
          }
        })
      })
    }
  }

  public setInstallReferrer(
    value: string,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    if (isEmpty(value)) {
      value = ACECONSTANT.EMPTY
    }

    console.log(`${ACECONSTANT.InstallReferrer}: ${value}`)
    if (!global.Promise) {
      console.log('setInstallReferrer::not support promise.')
      AsyncStorage.setItem(ACECONSTANT.InstallReferrer, value, err => {
        if (callback) {
          callback(err, {
            getKey: ACECONSTANT.InstallReferrer,
            getValue: value,
          })
        }
      })
    } else {
      console.log('setInstallReferrer::support promise.')
      return new Promise((resolve, reject) => {
        AsyncStorage.setItem(ACECONSTANT.InstallReferrer, value, err => {
          if (callback) {
            callback(err, {
              getKey: ACECONSTANT.InstallReferrer,
              getValue: value,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              resolve({
                getKey: ACECONSTANT.InstallReferrer,
                getValue: value,
              })
            }
          }
        })
      })
    }
  }

  public getJN(): string {
    if (isEmpty(this.jn)) {
      this.jn = ACECONSTANT.EMPTY
    }
    return this.jn
  }

  public setJN(value: string): void {
    if (isEmpty(value)) {
      this.jn = ACECONSTANT.EMPTY
    } else {
      this.jn = value
    }
  }

  public getKW(): string {
    if (isEmpty(this.kw)) {
      this.kw = ACECONSTANT.EMPTY
    }
    return this.kw
  }

  public setKW(value: string): void {
    if (isEmpty(value)) {
      this.kw = ACECONSTANT.EMPTY
    } else {
      this.kw = value
    }
  }

  public getLG(): string {
    if (isEmpty(this.lg)) {
      this.lg = ACECONSTANT.EMPTY
    }
    return this.lg
  }

  public setLG(value: string): void {
    if (isEmpty(value)) {
      this.lg = ACECONSTANT.EMPTY
    } else {
      this.lg = value
    }
  }

  public getLL(): string {
    if (isEmpty(this.ll)) {
      this.ll = ACECONSTANT.EMPTY
    }
    return this.ll
  }

  public setLL(value: string): void {
    if (isEmpty(value)) {
      this.ll = ACECONSTANT.EMPTY
    } else {
      this.ll = value
    }
  }

  public getMD(): string {
    if (isEmpty(this.md)) {
      this.md = IACBuyMode.Unknown
    }
    return this.md
  }

  public setMD(value: string): void {
    this.md = value
  }

  public getMID(): string {
    if (isEmpty(this.mid)) {
      this.mid = ACECONSTANT.EMPTY
    }
    return this.mid
  }

  public setMID(value: string): void {
    if (isEmpty(value)) {
      this.mid = ACECONSTANT.EMPTY
    } else {
      this.mid = value
    }
  }

  public getMR(): string {
    if (isEmpty(this.mr)) {
      this.mr = ACEMaritalStatus.Unknown
    }
    return this.mr
  }

  public setMR(value: string): void {
    if (isEmpty(value)) {
      this.mr = ACEMaritalStatus.Unknown
    } else {
      this.mr = value
    }
  }

  public getONUM(): string {
    if (isEmpty(this.onum)) {
      this.onum = ACECONSTANT.EMPTY
    }
    return this.onum
  }

  public setONUM(value: string): void {
    if (isEmpty(value)) {
      this.onum = ACECONSTANT.EMPTY
    } else {
      this.onum = value
    }
  }

  public getPayMethod(): string {
    if (isEmpty(this.payMethod)) {
      this.payMethod = ACECONSTANT.EMPTY
    }
    return this.payMethod
  }

  public setPayMethod(value: string): void {
    if (isEmpty(value)) {
      this.payMethod = ACECONSTANT.EMPTY
    } else {
      this.payMethod = value
    }
  }

  public getPD(): string {
    if (isEmpty(this.pd)) {
      this.pd = ACECONSTANT.EMPTY
    }
    return this.pd
  }

  public setPD(value: string): void {
    if (isEmpty(value)) {
      this.pd = ACECONSTANT.EMPTY
    } else {
      this.pd = value
    }
  }

  public getPush(): string {
    if (isEmpty(this.push)) {
      this.push = ACECONSTANT.EMPTY
    }
    return this.push
  }

  public setPush(value: string): void {
    if (isEmpty(value)) {
      this.push = ACECONSTANT.EMPTY
    } else {
      this.push = value
    }
  }

  public getRE(): number {
    if (this.re < 0) {
      this.re = 0
    }
    return this.re
  }

  public setRE(value: number): void {
    if (value < 0) {
      value = 0
    }
    this.re = value
  }

  public getREF(): string {
    if (isEmpty(this.ref)) {
      this.ref = ACECONSTANT.BOOKMARK
    }
    return this.ref
  }

  public setREF(value: string): void {
    if (isEmpty(value)) {
      this.ref = ACECONSTANT.BOOKMARK
    } else {
      this.ref = value
    }
  }

  public getRI(): string {
    if (isEmpty(this.ri)) {
      this.ri = ACOneConstant.DefaultRI
    }
    return this.ri
  }

  public setRI(value: string): void {
    if (isEmpty(value)) {
      this.ri = ACOneConstant.DefaultRI
    } else {
      this.ri = value
    }
  }

  public getSKEY(): string {
    if (isEmpty(this.skey)) {
      this.skey = ACECONSTANT.EMPTY
    }
    return this.skey
  }

  public setSKEY(value: string): void {
    if (isEmpty(value)) {
      this.skey = ACECONSTANT.EMPTY
    } else {
      this.skey = value
    }
  }

  public getSRC(): string {
    if (isEmpty(this.src)) {
      this.src = ACECONSTANT.EMPTY
    }
    return this.src
  }

  public setSRC(value: string): void {
    if (isEmpty(value)) {
      this.src = ACECONSTANT.EMPTY
    } else {
      this.src = value
    }
  }

  public getST(): ACEntityForST {
    if (!this.st) {
      this.st = new ACEntityForST()
    }
    return this.st
  }

  public setST(value: ACEntityForST): void {
    if (!this.st) {
      this.st = new ACEntityForST()
    } else {
      this.st.setST(value)
    }
  }

  public loadST(callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    if (!global.Promise) {
      console.log('loadST::not support promise.')

      AsyncStorage.getItem(ACOneConstantSt.KeyInStorage, (err, result) => {
        console.log(`${ACOneConstantSt.KeyInStorage}: ${result}`)
        if (result) {
          this.setST(JSON.parse(result))
        }

        if (callback) {
          callback(err, {
            getKey: ACOneConstantSt.KeyInStorage,
            getValue: result,
          })
        }
      })
    } else {
      console.log('loadST::support promise.')

      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(ACOneConstantSt.KeyInStorage, (err, result) => {
          console.log(`${ACOneConstantSt.KeyInStorage}: ${result}`)
          if (callback) {
            if (result) {
              this.setST(JSON.parse(result))
            }

            callback(err, {
              getKey: ACOneConstantSt.KeyInStorage,
              getValue: result,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              if (result) {
                this.setST(JSON.parse(result))
              }

              resolve({
                getKey: ACOneConstantSt.KeyInStorage,
                getValue: result,
              })
            }
          }
        })
      })
    }
  }

  public saveST_toInStorage(
    st: ACEntityForST,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    const _json = JSON.stringify(st)
    if (!global.Promise) {
      console.log('saveST_toInStorage::not support promise.')

      AsyncStorage.setItem(ACOneConstantSt.KeyInStorage, _json, err => {
        console.log(`${ACOneConstantSt.KeyInStorage}: ${_json}`)
        if (callback) {
          callback(err, {
            getKey: ACOneConstantSt.KeyInStorage,
            getValue: _json,
          })
        }
      })
    } else {
      console.log('saveST_toInStorage::support promise.')

      return new Promise((resolve, reject) => {
        AsyncStorage.setItem(ACOneConstantSt.KeyInStorage, _json, err => {
          console.log(`${ACOneConstantSt.KeyInStorage}: ${_json}`)
          if (callback) {
            callback(err, {
              getKey: ACOneConstantSt.KeyInStorage,
              getValue: _json,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              resolve({
                getKey: ACOneConstantSt.KeyInStorage,
                getValue: _json,
              })
            }
          }
        })
      })
    }
  }

  public getSTS(): string {
    if (isEmpty(this.sts)) {
      this.sts = ACECONSTANT.ZERO
    }
    return this.sts
  }

  public setSTS(value: string): void {
    if (isEmpty(value)) {
      this.sts = ACECONSTANT.ZERO
    } else {
      this.sts = value
    }
  }

  public getSV(): string {
    if (isEmpty(this.sv)) {
      this.sv = ACECONSTANT.EMPTY
    }
    return this.sv
  }

  public setSV(value: string): void {
    if (isEmpty(value)) {
      this.sv = ACECONSTANT.EMPTY
    } else {
      this.sv = value
    }
  }

  public getTZ(): string {
    if (isEmpty(this.tp)) {
      this.tp = ACECONSTANT.EMPTY
    }
    return this.tp
  }

  public getUDF1(): number {
    if (this.udf1 < 0) {
      this.udf1 = 0
    }
    return this.udf1
  }

  public setUDF1(value: number): void {
    if (value < 0) {
      value = 0
    }
    this.udf1 = value
  }

  public getUDF2(): number {
    if (this.udf2 < 0) {
      this.udf2 = 0
    }
    return this.udf2
  }

  public setUDF2(value: number): void {
    if (value < 0) {
      value = 0
    }
    this.udf2 = value
  }

  public getUDF3(): number {
    if (this.udf3 < 0) {
      this.udf3 = 0
    }
    return this.udf3
  }

  public setUDF3(value: number): void {
    if (value < 0) {
      value = 0
    }
    this.udf3 = value
  }

  public getURL(): string {
    if (isEmpty(this.url)) {
      this.url = ACECONSTANT.BOOKMARK
    }
    return this.url
  }

  public setURL(value: string): void {
    if (isEmpty(value)) {
      this.url = ACECONSTANT.BOOKMARK
    } else {
      this.url = value
    }
  }

  public getUserID(): string {
    if (isEmpty(this.userId)) {
      this.userId = ACECONSTANT.EMPTY
    }
    return this.userId
  }

  public setUserID(value: string): void {
    if (isEmpty(value)) {
      this.userId = ACECONSTANT.EMPTY
    } else {
      this.userId = value
    }
  }

  public getVK(): number {
    if (this.vk < 0) {
      this.vk = SESSION.NEW
    }
    return this.udf3
  }

  public setVK(value: number): void {
    if (value > SESSION.NEW) {
      value = SESSION.NEW
    } else if (value < SESSION.KEEP) {
      value = SESSION.KEEP
    }

    this.vk = value
  }

  public getVT(): ACEntityForVT {
    if (!this.vt) {
      this.vt = new ACEntityForVT()
    }
    return this.vt
  }

  public setVT(value: ACEntityForVT): void {
    if (!this.vt) {
      this.vt = new ACEntityForVT()
    } else {
      this.vt.setVT(value)
    }
  }

  public loadVT(callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    if (!global.Promise) {
      console.log('loadVT::not support promise.')

      AsyncStorage.getItem(ACOneConstantVt.KeyInStorage, (err, result) => {
        console.log(`${ACOneConstantVt.KeyInStorage}: ${result}`)
        if (result) {
          this.setVT(JSON.parse(result))
        }

        if (callback) {
          callback(err, {
            getKey: ACOneConstantVt.KeyInStorage,
            getValue: result,
          })
        }
      })
    } else {
      console.log('loadVT::support promise.')

      return new Promise((resolve, reject) => {
        AsyncStorage.getItem(ACOneConstantVt.KeyInStorage, (err, result) => {
          console.log(`${ACOneConstantVt.KeyInStorage}: ${result}`)
          if (callback) {
            if (result) {
              this.setST(JSON.parse(result))
            }

            callback(err, {
              getKey: ACOneConstantVt.KeyInStorage,
              getValue: result,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              if (result) {
                this.setVT(JSON.parse(result))
              }

              resolve({
                getKey: ACOneConstantVt.KeyInStorage,
                getValue: result,
              })
            }
          }
        })
      })
    }
  }

  public saveVT_toInStorage(
    vt: ACEntityForVT,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    const _json = JSON.stringify(vt)
    if (!global.Promise) {
      console.log('saveVT_toInStorage::not support promise.')

      AsyncStorage.setItem(ACOneConstantVt.KeyInStorage, _json, err => {
        console.log(`${ACOneConstantVt.KeyInStorage}: ${_json}`)
        if (callback) {
          callback(err, {
            getKey: ACOneConstantVt.KeyInStorage,
            getValue: _json,
          })
        }
      })
    } else {
      console.log('saveVT_toInStorage::support promise.')

      return new Promise((resolve, reject) => {
        AsyncStorage.setItem(ACOneConstantVt.KeyInStorage, _json, err => {
          console.log(`${ACOneConstantVt.KeyInStorage}: ${_json}`)
          if (callback) {
            callback(err, {
              getKey: ACOneConstantVt.KeyInStorage,
              getValue: _json,
            })
          } else {
            if (err) {
              reject(err)
            } else {
              resolve({
                getKey: ACOneConstantVt.KeyInStorage,
                getValue: _json,
              })
            }
          }
        })
      })
    }
  }

  protected getParamsToJSONString(): string {
    return JSON.stringify({
      adeld: this.adeld,
    })
  }
}
