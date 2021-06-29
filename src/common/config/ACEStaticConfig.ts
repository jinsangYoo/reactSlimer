import {AceConfiguration} from '../../acone/aceconfiguration'
// import {ACEStaticConfig} from './ACEStaticConfig'

export class ACEStaticConfig {
  // private static _staticConfigImpl: ACEStaticConfig

  public static configure(value: AceConfiguration): void {
    console.log('ACECommonStaticConfig.configure: AceConfiguration: ' + JSON.stringify(value))
  }
}
