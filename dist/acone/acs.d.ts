import { ACParams } from './acparam';
import { AceConfiguration } from './aceconfiguration';
export declare class ACS {
    private static instance;
    static getInstance(): ACS;
    static configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object>;
    static configureNonPromise(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): void;
    configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object> | void;
    static send(value: ACParams, callback?: (error?: object, result?: object) => void): Promise<object>;
    static sendNonPromise(value: ACParams, callback?: (error?: object, result?: object) => void): void;
    static SDKVersion(): string;
}
//# sourceMappingURL=acs.d.ts.map