import {SDKMode, NetworkMode} from '../constant/SDKMode'
import ACEPolicyParameters from '../policy/ACEPolicyParameters'
import {isEmpty} from '../util/TextUtils'
import POLICY from '../constant/Policy'

export default class ControlTower {
  protected _sdk_mode: SDKMode
  protected _network_mode: NetworkMode
  protected _isCompletePolicy: boolean
  protected _isInstallReferrerDone: boolean
  protected _isSDKForceStop: boolean
  protected _isSDKEnabled: boolean

  private static instance: ControlTower

  public static getInstance(): ControlTower {
    return this.instance || (this.instance = new this())
  }

  public constructor() {
    this._sdk_mode = SDKMode.development
    this._network_mode = NetworkMode.COMPANY_dev
    this._isCompletePolicy = false
    this._isInstallReferrerDone = false
    this._isSDKForceStop = false
    this._isSDKEnabled = false
  }

  public getIsCompletePolicy(): boolean {
    return this._isCompletePolicy
  }

  public setIsCompletePolicy(isCompletePolicy: boolean, isSucceedRequestPolicy: boolean) {
    console.log(
      `setIsCompletePolicy::isCompletePolicy: ${isCompletePolicy}, isSucceedRequestPolicy: ${isSucceedRequestPolicy}`,
    )
  }

  protected isDisabled(): boolean {
    const currentIsCompletePolicy = this.getIsCompletePolicy()
    const currentIsSDKEnabled = this.getIsSDKEnabled()
    console.log(
      `ACEControlTower.getIsCompletePolicy(): ${currentIsCompletePolicy}, ACEControlTower.getIsSDKEnabled(): ${currentIsSDKEnabled}`,
    )

    if (currentIsCompletePolicy && !currentIsSDKEnabled) {
      console.log('SDK is disabled.')
      return true
    }

    return false
  }

  public setSDKDisable(): void {
    console.log('Set SDK disable by policy.')
    this._isSDKEnabled = false
  }

  public isEnableByPolicy(): boolean {
    const result = ACEPolicyParameters.getInstance().getCpAllow()
    if (isEmpty(result)) {
      return false
    } else {
      return result == POLICY.FLAG_SDK_ENABLE
    }
  }

  public getIsSDKEnabled(): boolean {
    if (this._isSDKForceStop) {
      console.log('SDK was force stopped.')
      return false
    }
    this._isSDKEnabled = this.isEnableByPolicy()
    console.log(`isEnabled: ${this._isSDKEnabled}, _isSDKEnabled: ${this._isSDKEnabled}`)

    if (!this._isSDKEnabled) {
      console.log('not found SDK policy information.')
    }

    return false
  }

  public getSDKMode(): SDKMode {
    return this._sdk_mode
  }

  public setSDKMode(value: SDKMode): void {
    this._sdk_mode = value
    switch (value) {
      case SDKMode.production:
        this._network_mode = NetworkMode.Pro
      case SDKMode.development:
        this._network_mode = NetworkMode.COMPANY_dev
    }
  }

  public getNetworkMode(): NetworkMode {
    return this._network_mode
  }

  public setNetworkMode(value: NetworkMode): void {
    this._network_mode = value
  }

  public enableForceStop(): void {}

  public setDevSDKMode(): void {
    this.setSDKMode(SDKMode.development)
  }

  public setProductionSDKMode(): void {
    this.setSDKMode(SDKMode.production)
  }

  //#region static
  public static getDefaultNetworkMode(): NetworkMode {
    return NetworkMode.COMPANY_dev
  }
  //#endregion
}
