import { ACParams } from './acparam';
import { AceConfiguration } from './aceconfiguration';
export declare class ACS {
    private static instance;
    static getInstance(): ACS;
    static configure(value: AceConfiguration, callback: (error?: Error, result?: object) => void): void;
    static configure(value: AceConfiguration): Promise<object>;
    configure(value: AceConfiguration, callback: ((error?: Error, result?: object) => void) | undefined): void;
    configure(value: AceConfiguration): void;
    static send(value: ACParams, callback: (error?: object, result?: object) => void): void;
    static send(value: ACParams): Promise<object>;
    static SDKVersion(): string;
}
//# sourceMappingURL=acs.d.ts.map