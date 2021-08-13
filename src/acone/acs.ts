import {ACParams} from './acparam'
import {AceConfiguration} from './aceconfiguration'
import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig'
import ACEReducerForOne from './parameter/ACEReducerForOne'
import {ACEResponseToCaller} from '..'
import ControlTowerSingleton from '../common/controltower/ControlTowerSingleton'
import {ACEConstantCallback, ACEResultCode} from '../common/constant/ACEPublicStaticConfig'
import ACEConstantInteger from '../common/constant/ACEConstantInteger'
import ACELog from '../common/logger/ACELog'
import NetworkUtils from '../common/http/NetworkUtills'

export class ACS {
  private static _TAG = 'ACS'
  private static instance: ACS
  private static _packageNameOrBundleID: string | undefined
  private static waitQueue: ACParams[]

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

  public static send(value: ACParams, callback: (error?: object, result?: ACEResponseToCaller) => void): void
  public static send(value: ACParams): Promise<ACEResponseToCaller>
  public static send(
    value: ACParams,
    callback?: (error?: object, result?: ACEResponseToCaller) => void,
  ): Promise<ACEResponseToCaller> | void {
    if (!ControlTowerSingleton.isEnableByPolicy()) {
      ACS.setWaitQueue(value)
      const result: ACEResponseToCaller = {
        taskHash: `${value.type}::0404`,
        code: ACEResultCode.NotFoundPolicyInformation,
        result: ACEConstantCallback[ACEConstantCallback.Failed],
        message: 'Not found policy information.',
        apiName: value.type,
      }

      if (callback) {
        callback(undefined, result)
        return
      } else {
        return new Promise((resolveToOut, rejectToOut) => {
          rejectToOut(result)
        })
      }
    }

    ACELog.i(ACS._TAG, `send::getIsCompletePolicy: ${ControlTowerSingleton.getIsCompletePolicy()}`)
    if (!ControlTowerSingleton.getIsCompletePolicy()) {
      ACS.setWaitQueue(value)
      const result: ACEResponseToCaller = {
        taskHash: `${value.type}::0405`,
        code: ACEResultCode.NotReceivePolicy,
        result: ACEConstantCallback[ACEConstantCallback.Failed],
        message: 'Not receive policy for SDK.',
        apiName: value.type,
      }

      if (callback) {
        callback(undefined, result)
        return
      } else {
        return new Promise((resolveToOut, rejectToOut) => {
          rejectToOut(result)
        })
      }
    }

    ACELog.i(ACS._TAG, `send::isEnableByPolicy: ${ControlTowerSingleton.isEnableByPolicy()}`)
    if (!ControlTowerSingleton.isEnableByPolicy()) {
      ACS.setWaitQueue(value)
      const result: ACEResponseToCaller = {
        taskHash: `${value.type}::0406`,
        code: ACEResultCode.DisabledByPolicy,
        result: ACEConstantCallback[ACEConstantCallback.Failed],
        message: 'Disabled by policy of SDK.',
        apiName: value.type,
      }

      if (callback) {
        callback(undefined, result)
        return
      } else {
        return new Promise((resolveToOut, rejectToOut) => {
          rejectToOut(result)
        })
      }
    }

    return ACS._send(value, callback)
  }

  public static SDKVersion(): string {
    return '0.0.204'
  }

  public static getPackageNameOrBundleID(): string | undefined {
    return this._packageNameOrBundleID
  }

  public static setPackageNameOrBundleID(packageNameOrBundleID: string): void {
    this._packageNameOrBundleID = packageNameOrBundleID
  }

  public static popWaitQueue(): void {
    ACELog.d(ACS._TAG, 'Start pop waitQueue')

    if (ACS.waitQueue && ACS.waitQueue.length > 0) {
      ACELog.d(ACS._TAG, `waitQueue: ${ACS.waitQueue.length}`)
      const boxingPromise = ACS.waitQueue.map(param => {
        return ACS._send(param)
      })

      // const initParam = boxingPromise[0]
      // const remainParamArray = boxingPromise.slice(1)
      // remainParamArray.reduce((acc, cur, index) => {
      //   return acc.then(response => {
      //     ACELog.d(ACS._TAG, `${index}.response:`, response)
      //     return cur
      //   })
      // }, initParam)
      boxingPromise[0]
        .then(response => {
          ACELog.d(ACS._TAG, `${0}.response:`, response)
          return (
            boxingPromise[1] ??
            new Promise<ACEResponseToCaller>((resolveToOut, rejectToOut) => {
              const result: ACEResponseToCaller = {
                taskHash: `1::9999`,
                code: ACEResultCode.NotExistWaitTask,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not exist wait task.',
              }
              rejectToOut(result)
            })
          )
        })
        .then(response => {
          ACELog.d(ACS._TAG, `${1}.response:`, response)
          return (
            boxingPromise[2] ??
            new Promise<ACEResponseToCaller>((resolveToOut, rejectToOut) => {
              const result: ACEResponseToCaller = {
                taskHash: `2::9999`,
                code: ACEResultCode.NotExistWaitTask,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not exist wait task.',
              }
              rejectToOut(result)
            })
          )
        })
        .then(response => {
          ACELog.d(ACS._TAG, `${2}.response:`, response)
          return (
            boxingPromise[3] ??
            new Promise<ACEResponseToCaller>((resolveToOut, rejectToOut) => {
              const result: ACEResponseToCaller = {
                taskHash: `3::9999`,
                code: ACEResultCode.NotExistWaitTask,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not exist wait task.',
              }
              rejectToOut(result)
            })
          )
        })
        .then(response => {
          ACELog.d(ACS._TAG, `${3}.response:`, response)
          return (
            boxingPromise[4] ??
            new Promise<ACEResponseToCaller>((resolveToOut, rejectToOut) => {
              const result: ACEResponseToCaller = {
                taskHash: `4::9999`,
                code: ACEResultCode.NotExistWaitTask,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not exist wait task.',
              }
              rejectToOut(result)
            })
          )
        })
        .then(response => {
          ACELog.d(ACS._TAG, `${4}.response:`, response)
        })
        .catch(err => {
          ACELog.d(ACS._TAG, 'err:', err)
        })
    }
  }

  //#region private methods
  private static _send(
    value: ACParams,
    callback: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): void
  private static _send(value: ACParams): Promise<ACEResponseToCaller>
  private static _send(
    value: ACParams,
    callback?: ((error?: object, result?: ACEResponseToCaller) => void) | undefined,
  ): Promise<ACEResponseToCaller> | void {
    if (callback) {
      const callbackAtSend = (error?: object, innerResult?: ACEResponseToCaller) => {
        if (error) {
          callback(new Error(`0001, Can not use ${value.type} api.`))
        } else {
          callback(undefined, innerResult)
        }
      }

      NetworkUtils.isNetworkAvailable()
        .then(isConnected => {
          ACELog.i(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`)
          if (isConnected) {
            switch (value.type) {
              case ACParams.TYPE.BUY:
                ACEReducerForOne.buy(value.name, callbackAtSend)
                break
              case ACParams.TYPE.EVENT:
                ACEReducerForOne.plWithPage(value.name, callbackAtSend)
                break
            }
          } else {
            const result: ACEResponseToCaller = {
              taskHash: `${value.type}::0407`,
              code: ACEResultCode.NotConnectToTheInternet,
              result: ACEConstantCallback[ACEConstantCallback.Failed],
              message: 'Not connect to the internet.',
              apiName: value.type,
            }

            callback(undefined, result)
          }
        })
        .catch(err => {
          ACELog.i(ACS._TAG, 'isNetworkAvailable::in catch::err', err)
          const result: ACEResponseToCaller = {
            taskHash: `${value.type}::0408`,
            code: ACEResultCode.UnknownConnectStateToTheInternet,
            result: ACEConstantCallback[ACEConstantCallback.Failed],
            message: 'Unknown connect state to the internet.',
            apiName: value.type,
          }

          callback(undefined, result)
        })
    } else {
      return new Promise((resolveToOut, rejectToOut) => {
        NetworkUtils.isNetworkAvailable()
          .then(isConnected => {
            ACELog.i(ACS._TAG, `isNetworkAvailable::in then::isConnected: ${isConnected}`)
            if (isConnected) {
              switch (value.type) {
                case ACParams.TYPE.BUY:
                  ACEReducerForOne.buy(value.name, (error?: object, innerResult?: ACEResponseToCaller) => {
                    if (error) {
                      if (innerResult) {
                        rejectToOut(innerResult)
                      } else {
                        rejectToOut(new Error(`0002, Can not use ${value.type} api.`))
                      }
                    } else {
                      if (innerResult) resolveToOut(innerResult)
                    }
                  })
                  break
                case ACParams.TYPE.EVENT:
                  ACEReducerForOne.plWithPage(value.name, (error?: object, innerResult?: ACEResponseToCaller) => {
                    if (error) {
                      if (innerResult) {
                        rejectToOut(innerResult)
                      } else {
                        rejectToOut(new Error(`0002, Can not use ${value.type} api.`))
                      }
                    } else {
                      if (innerResult) resolveToOut(innerResult)
                    }
                  })
                  break
              }
            } else {
              const result: ACEResponseToCaller = {
                taskHash: `${value.type}::0407`,
                code: ACEResultCode.NotConnectToTheInternet,
                result: ACEConstantCallback[ACEConstantCallback.Failed],
                message: 'Not connect to the internet.',
                apiName: value.type,
              }

              rejectToOut(result)
            }
          })
          .catch(err => {
            ACELog.i(ACS._TAG, 'isNetworkAvailable::in catch::err', err)
            const result: ACEResponseToCaller = {
              taskHash: `${value.type}::0408`,
              code: ACEResultCode.UnknownConnectStateToTheInternet,
              result: ACEConstantCallback[ACEConstantCallback.Failed],
              message: 'Unknown connect state to the internet.',
              apiName: value.type,
            }

            rejectToOut(result)
          })
      })
    }
  }

  private static initWaitQueue(): void {
    if (!ACS.waitQueue) {
      ACS.waitQueue = []
    }
  }

  private static setWaitQueue(value: ACParams): void {
    ACS.initWaitQueue()
    ACELog.i(ACS._TAG, `ACS.waitQueue.length: ${ACS.waitQueue.length}`)
    if (ACS.waitQueue.length < ACEConstantInteger.QUEUE_MAX_WAITING_COUNT) {
      ACELog.i(ACS._TAG, `ACS.waitQueue.push: ${value.type}, >>${value.name}<<`)
      ACS.waitQueue.push(value)
    }
  }
  //#endregion
}
