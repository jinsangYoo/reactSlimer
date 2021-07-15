import {SDKMode, NetworkMode} from '../constant/SDKMode'

export default class ControlTower {
  private static instance: ControlTower
  private _sdk_mode: SDKMode
  private _network_mode: NetworkMode

  private constructor() {
    this._sdk_mode = SDKMode.development
    this._network_mode = NetworkMode.COMPANY_dev
  }

  public static getInstance(): ControlTower {
    return this.instance || (this.instance = new this())
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
}
