import {AceConfiguration} from '../../acone/aceconfiguration'
import IACECommonAPI from '../../acone/parameter/IACECommonAPI'
import IACEParameterUtil from '../parameter/IACEParameterUtil'

export default interface ACEStaticConfig {
  _debug: boolean
  _key: string
  // ACEQueueManagerFactory _queueManagerFactory;
  _commonAPI: IACECommonAPI

  configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void
  configure(configuration: AceConfiguration): Promise<object>
  configure(
    configuration: AceConfiguration,
    callback?: ((error?: Error, result?: object) => void) | undefined,
  ): Promise<object> | void
  isDebug(): boolean
  getEnablePrivacyPolicy(): boolean
  getKey(): string

  getParameterUtil(): IACEParameterUtil | undefined
  getCommonAPI(): IACECommonAPI | undefined
}
