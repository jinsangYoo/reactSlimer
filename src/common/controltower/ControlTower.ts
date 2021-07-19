import {SDKMode, NetworkMode} from '../constant/SDKMode'
import ACECommonStaticConfig from '../config/ACECommonStaticConfig'

export default class ControlTower {
  protected _sdk_mode: SDKMode
  protected _network_mode: NetworkMode

  public constructor() {
    this._sdk_mode = SDKMode.development
    this._network_mode = NetworkMode.COMPANY_dev
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

  //#region static
  public static setDevSDKMode(): void {
    const _controlTower = ACECommonStaticConfig.getControlTower()
    if (_controlTower) {
      _controlTower.setSDKMode(SDKMode.development)
    }
  }

  public static setProductionSDKMode(): void {
    const _controlTower = ACECommonStaticConfig.getControlTower()
    if (_controlTower) {
      _controlTower.setSDKMode(SDKMode.production)
    }
  }

  public static getDefaultNetworkMode(): NetworkMode {
    return NetworkMode.COMPANY_dev
  }

  public static getNetworkMode(): NetworkMode {
    const _controlTower = ACECommonStaticConfig.getControlTower()
    if (_controlTower) {
      return _controlTower.getNetworkMode()
    } else {
      return ControlTower.getDefaultNetworkMode()
    }
  }

  public static setHomeDevNetworkMode(): void {
    const _controlTower = ACECommonStaticConfig.getControlTower()
    if (_controlTower) {
      _controlTower.setNetworkMode(NetworkMode.HOME_dev)
    }
  }

  public static enableForceStop(): void {
    const _controlTower = ACECommonStaticConfig.getControlTower()
    if (_controlTower) {
      _controlTower.enableForceStop()
    }
  }
  //#endregion
}
