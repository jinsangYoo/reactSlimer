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

  public static send(value: ACParams, callback: (error?: object, result?: object) => void): void
  public static send(value: ACParams): Promise<object>
  public static send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object> | void {
    return ACEReducerForOne.plWithPage(value.name, callback)
  }

  public static SDKVersion(): string {
    return '0.0.123'
  }

  public static getPackageNameOrBundleID(): string | undefined {
    return this._packageNameOrBundleID
  }

  public static setPackageNameOrBundleID(packageNameOrBundleID: string): void {
    this._packageNameOrBundleID = packageNameOrBundleID
  }
}
