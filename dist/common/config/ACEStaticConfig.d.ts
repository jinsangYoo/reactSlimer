import { AceConfiguration } from '../../acone/aceconfiguration';
import IACECommonAPI from '../../acone/parameter/IACECommonAPI';
export default interface ACEStaticConfig {
    _debug: boolean;
    _key: string;
    _commonAPI: IACECommonAPI;
    configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    configure(configuration: AceConfiguration): Promise<object>;
    configure(configuration: AceConfiguration, callback?: ((error?: Error, result?: object) => void) | undefined): Promise<object> | void;
    isDebug(): boolean;
    getEnablePrivacyPolicy(): boolean;
    getKey(): string;
    getCommonAPI(): IACECommonAPI | undefined;
    getControlTower(configuration: AceConfiguration): void;
    getParameterUtil(configuration: AceConfiguration): void;
}
//# sourceMappingURL=ACEStaticConfig.d.ts.map