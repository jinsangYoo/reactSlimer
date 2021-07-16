import {ACS} from '../../acone/acs'
import {AceConfiguration, ACEPlatform} from '../../acone/aceconfiguration'
import ACEStaticConfig from './ACEStaticConfig'
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig'
import ACECONSTANT from '../constant/ACEConstant'
import ControlTower from '../controltower/ControlTower'
import {SDKMode, NetworkMode} from '../constant/SDKMode'

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
    ControlTower.getInstance().setSDKMode(SDKMode.development)
    ControlTower.getInstance().setNetworkMode(NetworkMode.HOME_dev)

    console.log('NHN ACE SDK version: ' + ACS.SDKVersion())
    console.log('AceConfiguration information: ' + JSON.stringify(configuration))

    if (configuration.platform) {
      this._platform = configuration.platform
    }
    if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
      this._staticConfigImpl = new ACEOneStaticConfig()
    }

    if (callback) {
      if (this._staticConfigImpl) {
        this._staticConfigImpl
          .configure(configuration)
          .then(res => {
            console.log(`then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`)
            callback(undefined, res)
          })
          .catch(err => {
            console.log(`then _staticConfigImpl.configure::err: ${JSON.stringify(err)}`)
            callback(err, undefined)
          })
      }
    } else {
      return new Promise((resolve, reject) => {
        if (this._staticConfigImpl) {
          this._staticConfigImpl
            .configure(configuration)
            .then(res => {
              console.log(`then _staticConfigImpl.configure::res: ${JSON.stringify(res)}`)
              resolve(res)
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
}
