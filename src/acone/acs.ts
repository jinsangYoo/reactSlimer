import {ACParams} from './acparam'
import {AceConfiguration} from './aceconfiguration'
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig'
import ACEReducerForOne from './parameter/ACEReducerForOne'
import DeviceInfo from 'react-native-device-info'

export class ACS {
  private static instance: ACS

  public static getInstance(): ACS {
    return this.instance || (this.instance = new this())
  }

  public static configure(value: AceConfiguration, callback: (error?: Error, result?: object) => void): void
  public static configure(value: AceConfiguration): Promise<object>
  public static configure(
    value: AceConfiguration,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    return ACS.getInstance().configure(value, callback)
  }

  configure(value: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void
  configure(value: AceConfiguration): void
  configure(
    value: AceConfiguration,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void {
    return ACECommonStaticConfig.configure(value, callback)
  }

  public static send(value: ACParams, callback: (error?: object, result?: object) => void): void
  public static send(value: ACParams): Promise<object>
  public static send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object> | void {
    console.log('APP version: ' + DeviceInfo.getReadableVersion())
    console.log('ACS.send: ' + JSON.stringify(value))

    return ACEReducerForOne.plWithPage(value.name, callback)
  }

  public static SDKVersion(): string {
    return '0.0.59'
  }
}
