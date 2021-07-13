import { AceConfiguration } from '../../acone/aceconfiguration';
import ACEStaticConfig from '../../common/config/ACEStaticConfig';
export default class ACEOneStaticConfig implements ACEStaticConfig {
    _debug: boolean;
    _key: string;
    private _enablePrivacyPolicy;
    constructor();
    configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    configure(configuration: AceConfiguration): Promise<object>;
    isDebug(): boolean;
    getEnablePrivacyPolicy(): boolean;
    getKey(): string;
    getCommonAPI(configuration: AceConfiguration): void;
    getControlTower(configuration: AceConfiguration): void;
    getParameterUtil(configuration: AceConfiguration): void;
}
//# sourceMappingURL=ACEOneStaticConfig.d.ts.map