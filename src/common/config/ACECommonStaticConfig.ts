import {ACS} from '../../acone/acs'
import {AceConfiguration, ACEPlatform} from '../../acone/aceconfiguration'
import ACEStaticConfig from './ACEStaticConfig'
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig'
import ACECONSTANT from '../constant/ACEConstant'
import ControlTower from '../controltower/ControlTower'
import {SDKMode, NetworkMode} from '../constant/SDKMode'
import IACEParameterUtil from '../parameter/IACEParameterUtil'

export default class ACECommonStaticConfig {
  private static _staticConfigImpl: ACEStaticConfig
  private static _platform: ACEPlatform

  public static configure(
    configuration: AceConfiguration,
    callback: ((error?: Error, result?: object) => void) | undefined,
  ): void
  public static configure(configuration: AceConfiguration): Promise<object>
  public static configure(
    configuration: AceConfiguration,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void {
    console.log('NHN ACE SDK version: ' + ACS.SDKVersion())
    console.log('AceConfiguration information: ' + JSON.stringify(configuration))

    if (configuration.platform) {
      this._platform = configuration.platform
    }
    if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
      this._staticConfigImpl = new ACEOneStaticConfig()
    }

    ControlTower.setDevSDKMode()
    ControlTower.setHomeDevNetworkMode()

    if (callback) {
      if (this._staticConfigImpl) {
        const _commonAPI = this._staticConfigImpl.getCommonAPI()
        this._staticConfigImpl
          .configure(configuration)
          .then(res => {
            console.log(`in cb::then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`)
            if (_commonAPI) {
              _commonAPI.requestPolicy().then(resForPolicy => {
                console.log(`in cb::then _commonAPI.requestPolicy::resForPolicy: ${JSON.stringify(resForPolicy)}`)
                callback(undefined, res)
              })
            }
          })
          .catch(err => {
            console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`)
            callback(err, undefined)
          })
      }
    } else {
      return new Promise((resolve, reject) => {
        if (this._staticConfigImpl) {
          const _commonAPI = this._staticConfigImpl.getCommonAPI()
          this._staticConfigImpl
            .configure(configuration)
            .then(res => {
              console.log(`then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`)
              if (_commonAPI) {
                _commonAPI.requestPolicy().then(resForPolicy => {
                  console.log(`then _commonAPI.requestPolicy::resForPolicy: ${JSON.stringify(resForPolicy)}`)
                  resolve(resForPolicy)
                })
              }
            })
            .catch(err => {
              console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`)
              reject(err)
            })
        }
      })
    }
  }

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

  public static getParameterUtil(): IACEParameterUtil | undefined {
    if (this._staticConfigImpl) {
      return this._staticConfigImpl.getParameterUtil()
    }

    return undefined
  }

  public static getControlTower(): ControlTower | undefined {
    if (this._staticConfigImpl) {
      return this._staticConfigImpl.getControlTower()
    }

    return undefined
  }
}
