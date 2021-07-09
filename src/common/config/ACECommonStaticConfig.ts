import {ACS} from '../../acone/acs'
import {AceConfiguration, ACEPlatform} from '../../acone/aceconfiguration'
import ACEStaticConfig from './ACEStaticConfig'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig'
import ACECONSTANT from '../constant/ACEConstant'

export default class ACECommonStaticConfig {
  private static _staticConfigImpl: ACEStaticConfig
  private static _platform: ACEPlatform

  public static configure(
    configuration: AceConfiguration,
    callback?: (error?: Error, result?: object) => void,
  ): Promise<object> | void {
    console.log('NHN ACE SDK version: ' + ACS.SDKVersion())
    console.log('AceConfiguration information: ' + JSON.stringify(configuration))

    if (configuration.platform) {
      this._platform = configuration.platform
    }
    if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
      this._staticConfigImpl = new ACEOneStaticConfig()
    }

    const keyName = 'user_id'
    if (!global.Promise) {
      console.log('ACECommonStaticConfig::not support promise.')

      AsyncStorage.getItem(keyName, (err, result) => {
        console.log('AsyncStorage.getItem: ' + result)
        if (callback) {
          console.log('try call cb!!')
          callback(err, {
            getKey: keyName,
            getValue: result,
          })
        }
      })
    } else {
      console.log('ACECommonStaticConfig::support promise.')

      return new Promise((resolve, reject) => {
        const keyName = 'user_id'
        AsyncStorage.getItem(keyName, (err, result) => {
          console.log('AsyncStorage.getItem: ' + result)
          if (callback) {
            console.log('try call cb!!')
            callback(err, {
              getKey: keyName,
              getValue: result,
            })
          } else {
            if (err) {
              console.log('try call reject!!')
              reject(err)
            } else {
              console.log('try call resolve!!')
              resolve({
                getKey: keyName,
                getValue: result,
              })
            }
          }
        })
      })
    }
  }

  // private static setPlatform(value: AceConfiguration) {}
  public static isDebug(): boolean {
    if (this._staticConfigImpl) {
      return this._staticConfigImpl.isDebug()
    }

    return false
  }

  public static getEnablePrivacyPolicy(): boolean {
    if (this._staticConfigImpl) {
      return this._staticConfigImpl.getEnablePrivacyPolicy()
    }

    return false
  }

  public static getKey(): string {
    if (this._staticConfigImpl) {
      return this._staticConfigImpl.getKey()
    }

    return ACECONSTANT.EMPTY
  }
}
