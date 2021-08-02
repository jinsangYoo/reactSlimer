import {ACS} from '../../acone/acs'
import {AceConfiguration, ACEPlatform} from '../../acone/aceconfiguration'
import ACEStaticConfig from './ACEStaticConfig'
import ACEOneStaticConfig from '../../acone/config/ACEOneStaticConfig'
import ACECONSTANT from '../constant/ACEConstant'
import IACEParameterUtil from '../parameter/IACEParameterUtil'
import ControlTowerSingleton from '../controltower/ControlTowerSingleton'
import {ACEResponseToCaller, ACEConstantCallback, ACEResultCode} from '../constant/ACEPublicStaticConfig'
import ACELog from '../logger/ACELog'

export default class ACECommonStaticConfig {
  private static _TAG = 'comInit'
  private static _staticConfigImpl: ACEStaticConfig
  private static _platform: ACEPlatform

  public static configure(
    configuration: AceConfiguration,
    callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  public static configure(configuration: AceConfiguration): Promise<ACEResponseToCaller>
  public static configure(
    configuration: AceConfiguration,
    callback?: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    ControlTowerSingleton.getInstance().setDevSDKMode()
    ControlTowerSingleton.getInstance().setHomeDevNetworkMode()

    ACELog.i(ACECommonStaticConfig._TAG, `NHN DATA SDK version: ${ACS.SDKVersion()}`)

    if (this._staticConfigImpl) {
      ACELog.d(ACECommonStaticConfig._TAG, 'Already init SDK.')

      const response: ACEResponseToCaller = {
        taskHash: '0000',
        code: ACEResultCode.AlreadyInitialized,
        result: ACEConstantCallback[ACEConstantCallback.Failed],
        message: 'Already init SDK.',
        apiName: 'init',
      }
      if (callback) {
        callback(new Error('Already init SDK.'), response)
        return
      } else {
        return new Promise((resolveToOut, rejectToOut) => {
          rejectToOut(response)
        })
      }
    } else {
      ACELog.i(ACECommonStaticConfig._TAG, 'Start init SDK.')
    }

    ACELog.d(ACECommonStaticConfig._TAG, 'AceConfiguration information:', configuration)

    if (configuration.platform) {
      this._platform = configuration.platform
    }
    if (ACECommonStaticConfig._platform === AceConfiguration.PLATFORM.DEFAULT) {
      this._staticConfigImpl = new ACEOneStaticConfig()
    }

    const _commonAPI = this._staticConfigImpl.getCommonAPI()
    if (callback) {
      this._staticConfigImpl
        .configure(configuration)
        .then(res => {
          ACELog.d(ACECommonStaticConfig._TAG, 'SDK init step one result:', res)
          return res
        })
        .then(res => {
          ACELog.d(ACECommonStaticConfig._TAG, 'SDK init step two request policy')
          if (_commonAPI) {
            _commonAPI.requestPolicy((error?: object, innerResult?: ACEResponseToCaller) => {
              if (error) {
                callback(new Error('0001, Can not request policy.'), innerResult)
              } else {
                callback(undefined, innerResult)
              }
            })
          } else {
            const response: ACEResponseToCaller = {
              taskHash: '0001',
              code: ACEResultCode.CanNotRequestToPolicy,
              result: ACEConstantCallback[ACEConstantCallback.Failed],
              message: 'Can not request policy.',
              apiName: 'init',
            }
            callback(new Error('0001, Can not request policy.'), response)
          }
        })
        .catch(err => {
          ACELog.d(ACECommonStaticConfig._TAG, '0001, Can not request policy.', err)
          callback(err, undefined)
        })
    } else {
      return new Promise((resolveToOut, rejectToOut) => {
        this._staticConfigImpl
          .configure(configuration)
          .then(res => {
            ACELog.d(ACECommonStaticConfig._TAG, 'SDK init step one result:', res)
            return res
          })
          .then(res => {
            if (_commonAPI) {
              ACELog.d(ACECommonStaticConfig._TAG, 'SDK init step two request policy')
              _commonAPI.requestPolicy((error?: object, innerResult?: ACEResponseToCaller) => {
                if (error) {
                  if (innerResult) {
                    rejectToOut(innerResult)
                  } else {
                    rejectToOut(new Error('0002, Can not request policy.'))
                  }
                } else {
                  if (innerResult) resolveToOut(innerResult)
                }
              })
            } else {
              const response: ACEResponseToCaller = {
                taskHash: '0002',
                code: ACEResultCode.CanNotRequestToPolicy,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Can not request policy.',
                apiName: 'init',
              }
              rejectToOut(response)
            }
          })
          .catch(err => {
            ACELog.d(ACECommonStaticConfig._TAG, '0002, Can not request policy.', err)
            rejectToOut(err)
          })
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
}
