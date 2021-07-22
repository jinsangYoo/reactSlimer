import { AceConfiguration } from '../../acone/aceconfiguration';
import ACEStaticConfig from '../../common/config/ACEStaticConfig';
import IACECommonAPI from '../parameter/IACECommonAPI';
import IACEParameterUtil from '../../common/parameter/IACEParameterUtil';
export default class ACEOneStaticConfig implements ACEStaticConfig {
    _debug: boolean;
    _key: string;
    _commonAPI: IACECommonAPI;
    private _enablePrivacyPolicy;
    constructor();
    configure(configuration: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    configure(configuration: AceConfiguration): Promise<object>;
    isDebug(): boolean;
    getEnablePrivacyPolicy(): boolean;
    getKey(): string;
    getCommonAPI(): IACECommonAPI | undefined;
    getParameterUtil(): IACEParameterUtil | undefined;
}
//# sourceMappingURL=ACEOneStaticConfig.d.ts.map