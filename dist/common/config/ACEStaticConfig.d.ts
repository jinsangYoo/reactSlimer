import { AceConfiguration } from '../../acone/aceconfiguration';
import IACECommonAPI from '../../acone/parameter/IACECommonAPI';
import IACEParameterUtil from '../parameter/IACEParameterUtil';
import { ACECallbackResultForDebug } from '../constant/ACECallbackResultForDebug';
export default interface ACEStaticConfig {
    _debug: boolean;
    _key: string;
    _commonAPI: IACECommonAPI;
    configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    configure(configuration: AceConfiguration): Promise<ACECallbackResultForDebug>;
    configure(configuration: AceConfiguration, callback?: ((error?: Error, result?: object) => void) | undefined): Promise<ACECallbackResultForDebug> | void;
    isDebug(): boolean;
    getEnablePrivacyPolicy(): boolean;
    getKey(): string;
    getParameterUtil(): IACEParameterUtil | undefined;
    getCommonAPI(): IACECommonAPI | undefined;
}
//# sourceMappingURL=ACEStaticConfig.d.ts.map