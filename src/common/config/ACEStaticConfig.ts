import {AceConfiguration} from '../../acone/aceconfiguration'

export default interface ACEStaticConfig {
  _debug: boolean
  _key: string
  // ACEControlTower _controlTower;
  // ACEQueueManagerFactory _queueManagerFactory;
  // IACEParameterUtil _parameterUtil;
  // IACECommonAPI _commonAPI;

  configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void
  configure(configuration: AceConfiguration): Promise<object>
  configure(
    configuration: AceConfiguration,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void
  isDebug(): boolean
  getEnablePrivacyPolicy(): boolean
  getKey(): string

  getCommonAPI(configuration: AceConfiguration): void
  getControlTower(configuration: AceConfiguration): void
  getParameterUtil(configuration: AceConfiguration): void
}
