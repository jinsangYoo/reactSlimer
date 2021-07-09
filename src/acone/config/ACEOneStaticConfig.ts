import {AceConfiguration} from '../../acone/aceconfiguration'
import ACEStaticConfig from '../../common/config/ACEStaticConfig'

export default class ACEOneStaticConfig implements ACEStaticConfig {
  _debug: boolean
  _key: string
  private _enablePrivacyPolicy: boolean

  public constructor() {
    this._enablePrivacyPolicy = false
    this._debug = true
    this._key = 'empty'
  }

  public configure(configuration: AceConfiguration): void {
    this._key = configuration.key
    if (configuration.enablePrivacyPolicy) this._enablePrivacyPolicy = configuration.enablePrivacyPolicy
    if (configuration.debug) this._debug = configuration.debug
  }
  isDebug(): boolean {
    return this._debug
  }
  getEnablePrivacyPolicy(): boolean {
    return this._enablePrivacyPolicy
  }
  getKey(): string {
    return this._key
  }
  getCommonAPI(configuration: AceConfiguration): void {
    throw new Error('Method not implemented.')
  }
  getControlTower(configuration: AceConfiguration): void {
    throw new Error('Method not implemented.')
  }
  getParameterUtil(configuration: AceConfiguration): void {
    throw new Error('Method not implemented.')
  }
}
