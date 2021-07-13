import { AceConfiguration } from '../../acone/aceconfiguration';
export default class ACECommonStaticConfig {
    private static _staticConfigImpl;
    private static _platform;
    static configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    static configure(configuration: AceConfiguration): Promise<object>;
    static isDebug(): boolean;
    static getEnablePrivacyPolicy(): boolean;
    static getKey(): string;
}
//# sourceMappingURL=ACECommonStaticConfig.d.ts.map