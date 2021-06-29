import {ACParams} from './acparam'
import {AceConfiguration} from './aceconfiguration'
import {ACECommonStaticConfig} from '../common/config/ACECommonStaticConfig'
import {ACEReducerForOne} from './parameter/ACEReducerForOne'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    const keyName = 'user_id'
    AsyncStorage.setItem(keyName, 'jinsang', () => {
      //user_id변수로 hwije123 저장
      console.log('유저 id저장')
    })

    console.log('ACS.send: ' + JSON.stringify(value))

    ACEReducerForOne.plWithPage(value.name)
  }
}
