import {ACParams} from './acparam'
import {AceConfiguration} from './aceconfiguration'
import {ACECommonStaticConfig} from '../common/config/ACECommonStaticConfig'
import {ACEReducerForOne} from './parameter/ACEReducerForOne'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DeviceInfo from 'react-native-device-info'

export class ACS {
  private static instance: ACS

  public static getInstance(): ACS {
    return this.instance || (this.instance = new this())
  }

  public static configure(
    value: AceConfiguration,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> {
    //@ts-expect-error
    return ACS.getInstance().configure(value, callback)
  }

  public static configureNonPromise(
    value: AceConfiguration,
    callback?: (error?: Error, result?: object) => void,
  ): void {
    ACS.getInstance().configure(value, callback)
  }

  configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object> | void {
    return ACECommonStaticConfig.configure(value, callback)
  }

  public static send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object> {
    console.log('APP version: ' + DeviceInfo.getReadableVersion())
    console.log('SDK version: ' + ACS.SDKVersion())
    const keyName = 'user_id'
    AsyncStorage.setItem(keyName, 'jinsang', () => {
      //user_id변수로 hwije123 저장
      console.log('유저 id저장')
    })

    console.log('ACS.send: ' + JSON.stringify(value))

    //@ts-expect-error
    return ACEReducerForOne.plWithPage(value.name, callback)
  }

  public static sendNonPromise(value: ACParams, callback?: (error?: object, result?: object) => void): void {
    console.log('APP version: ' + DeviceInfo.getReadableVersion())
    console.log('SDK version: ' + ACS.SDKVersion())
    const keyName = 'user_id'
    AsyncStorage.setItem(keyName, 'jinsang', () => {
      //user_id변수로 hwije123 저장
      console.log('유저 id저장')
    })

    console.log('ACS.send: ' + JSON.stringify(value))

    ACEReducerForOne.plWithPage(value.name, callback)
  }

  public static SDKVersion(): string {
    return '0.0.56'
  }
}
