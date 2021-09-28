import { ACParams } from './acparam';
import { AceConfiguration } from './aceconfiguration';
import { ACEResponseToCaller } from '..';
import { DetailOfSDK } from '../common/constant/ACEPublicStaticConfig';
export declare class ACS {
    private static _TAG;
    private static instance;
    private static _packageNameOrBundleID;
    private static waitQueue;
    private static bufferQueue;
    private emitter;
    private static lock;
    static getInstance(): ACS;
    constructor();
    static configure(value: AceConfiguration, callback: (error?: Error, result?: ACEResponseToCaller) => void): void;
    static configure(value: AceConfiguration): Promise<ACEResponseToCaller>;
    configure(value: AceConfiguration, callback: ((error?: Error, result?: ACEResponseToCaller) => void) | undefined): void;
    configure(value: AceConfiguration): Promise<ACEResponseToCaller>;
    static send(value: ACParams, callback: (error?: object, result?: ACEResponseToCaller) => void): void;
    static send(value: ACParams): Promise<ACEResponseToCaller>;
    static SDKVersion(): string;
    static getPackageNameOrBundleID(): string | undefined;
    static setPackageNameOrBundleID(packageNameOrBundleID: string): void;
    static getDetail(): DetailOfSDK;
    private popWaitQueueEmit;
    private popWaitQueue;
    private popBufferQueueEmit;
    private popBufferQueue;
    private static _send;
    private static initWaitQueue;
    private static setWaitQueue;
    private static initBufferQueue;
    private static setBufferQueue;
    private static toggleLock;
    private static isLock;
    static setAdvertisingIdentifier(advertisingIdentifier: string): void;
}
//# sourceMappingURL=acs.d.ts.map