import { ACParams } from './acparam';
import { AceConfiguration } from './aceconfiguration';
export declare class ACS {
    private static instance;
    static getInstance(): ACS;
    static configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object>;
    configure(value: AceConfiguration, callback?: (error?: Error, result?: object) => void): Promise<object>;
    static send(value: ACParams): void;
}
//# sourceMappingURL=acs.d.ts.map