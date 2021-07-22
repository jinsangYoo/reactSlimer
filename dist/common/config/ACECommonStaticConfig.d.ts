import { AceConfiguration } from '../../acone/aceconfiguration';
import IACEParameterUtil from '../parameter/IACEParameterUtil';
export default class ACECommonStaticConfig {
    private static _staticConfigImpl;
    private static _platform;
    static configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static configure(configuration: AceConfiguration): Promise<object>;
    static isDebug(): boolean;
    static getEnablePrivacyPolicy(): boolean;
    static getKey(): string;
    static getParameterUtil(): IACEParameterUtil | undefined;
}
//# sourceMappingURL=ACECommonStaticConfig.d.ts.map