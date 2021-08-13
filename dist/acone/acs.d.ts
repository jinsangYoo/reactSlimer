import { ACParams } from './acparam';
import { AceConfiguration } from './aceconfiguration';
import { ACEResponseToCaller } from '..';
export declare class ACS {
    private static _TAG;
    private static instance;
    private static _packageNameOrBundleID;
    private static waitQueue;
    static getInstance(): ACS;
    static configure(value: AceConfiguration, callback: (error?: Error, result?: ACEResponseToCaller) => void): void;
    static configure(value: AceConfiguration): Promise<ACEResponseToCaller>;
    configure(value: AceConfiguration, callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined): void;
    configure(value: AceConfiguration): Promise<ACEResponseToCaller>;
    static send(value: ACParams, callback: (error?: object, result?: ACEResponseToCaller) => void): void;
    static send(value: ACParams): Promise<ACEResponseToCaller>;
    static SDKVersion(): string;
    static getPackageNameOrBundleID(): string | undefined;
    static setPackageNameOrBundleID(packageNameOrBundleID: string): void;
    static popWaitQueue(): void;
    private static _send;
    private static initWaitQueue;
    private static setWaitQueue;
}
//# sourceMappingURL=acs.d.ts.map