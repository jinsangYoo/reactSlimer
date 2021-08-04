import {ACParams} from './acparam'
import {AceConfiguration} from './aceconfiguration'
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig'
import ACEReducerForOne from './parameter/ACEReducerForOne'
import {ACEResponseToCaller} from '..'

export class ACS {
  private static instance: ACS
  private static _packageNameOrBundleID: string | undefined

  public static getInstance(): ACS {
    return this.instance || (this.instance = new this())
  }

  public static configure(
    value: AceConfiguration,
    callback: (error?: Error, result?: ACEResponseToCaller) => void,
  ): void
  public static configure(value: AceConfiguration): Promise<ACEResponseToCaller>
  public static configure(
    value: AceConfiguration,
    callback?: (error?: Error, result?: ACEResponseToCaller) => void,
  ): Promise<ACEResponseToCaller> | void {
    return ACS.getInstance().configure(value, callback)
  }

  configure(
    value: AceConfiguration,
    callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  configure(value: AceConfiguration): Promise<ACEResponseToCaller>
  configure(
    value: AceConfiguration,
    callback?: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    return ACECommonStaticConfig.configure(value, callback)
  }

  public static send(value: ACParams, callback: (error?: object, result?: ACEResponseToCaller) => void): void
  public static send(value: ACParams): Promise<ACEResponseToCaller>
  public static send(
    value: ACParams,
    callback?: (error?: object, result?: ACEResponseToCaller) => void,
  ): Promise<ACEResponseToCaller> | void {
    const callbackAtSend = (error?: object, innerResult?: ACEResponseToCaller) => {
      if (callback) {
        if (error) {
          callback(new Error(`0001, Can not use ${value.type} api.`))
        } else {
          callback(undefined, innerResult)
        }
      }
    }

    switch (value.type) {
      case ACParams.TYPE.BUY:
        if (callback) {
          ACEReducerForOne.buy(value.name, callbackAtSend)
        } else {
          return new Promise((resolveToOut, rejectToOut) => {
            ACEReducerForOne.buy(value.name, (error?: object, innerResult?: ACEResponseToCaller) => {
              if (error) {
                if (innerResult) {
                  rejectToOut(innerResult)
                } else {
                  rejectToOut(new Error(`0002, Can not use ${value.type} api.`))
                }
              } else {
                if (innerResult) resolveToOut(innerResult)
              }
            })
          })
        }
        break
      case ACParams.TYPE.EVENT:
        if (callback) {
          ACEReducerForOne.plWithPage(value.name, callbackAtSend)
        } else {
          return new Promise((resolveToOut, rejectToOut) => {
            ACEReducerForOne.plWithPage(value.name, (error?: object, innerResult?: ACEResponseToCaller) => {
              if (error) {
                if (innerResult) {
                  rejectToOut(innerResult)
                } else {
                  rejectToOut(new Error(`0002, Can not use ${value.type} api.`))
                }
              } else {
                if (innerResult) resolveToOut(innerResult)
              }
            })
          })
        }
        break
    }
  }

  public static SDKVersion(): string {
    return '0.0.156'
  }

  public static getPackageNameOrBundleID(): string | undefined {
    return this._packageNameOrBundleID
  }

  public static setPackageNameOrBundleID(packageNameOrBundleID: string): void {
    this._packageNameOrBundleID = packageNameOrBundleID
  }
}
