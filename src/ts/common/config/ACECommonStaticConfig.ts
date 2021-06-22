import {AceConfiguration} from '../../aceconfiguration'
// import {ACEStaticConfig} from './ACEStaticConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class ACECommonStaticConfig {
  // private static _staticConfigImpl: ACEStaticConfig

  public static configure(
    value: AceConfiguration,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> {
    console.log('ACECommonStaticConfig.configure: AceConfiguration: ' + JSON.stringify(value))

    return new Promise((resolve, reject) => {
      const keyName = 'user_id'
      AsyncStorage.getItem(keyName, (err, result) => {
        //user_id에 담긴 아이디 불러오기
        console.log(result) // result에 담김 //불러온거 출력
        if (callback) {
          callback(err, {
            getKey: keyName,
            getValue: result,
          })
        } else {
          if (err) {
            if (global.Promise) {
              reject(err)
            } else {
              console.error("Callback function isn't define")
            }
          } else {
            if (global.Promise) {
              resolve({
                getKey: keyName,
                getValue: result,
              })
            } else {
              console.error("Callback function isn't define")
            }
          }
        }
      })
    })
  }
}
