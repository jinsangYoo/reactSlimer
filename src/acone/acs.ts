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
    return ACS.getInstance().configure(value, callback)
  }

  configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object> {
    return ACECommonStaticConfig.configure(value, callback)
  }

  public static send(value: ACParams): void {
    console.log('APP version: ' + DeviceInfo.getReadableVersion())
    console.log('SDK version: ' + ACS.SDKVersion())
    const keyName = 'user_id'
    AsyncStorage.setItem(keyName, 'jinsang', () => {
      //user_id변수로 hwije123 저장
      console.log('유저 id저장')
    })

    console.log('ACS.send: ' + JSON.stringify(value))

    ACEReducerForOne.plWithPage(value.name)
  }

  public static SDKVersion(): string {
    return '0.0.52'
  }
}
