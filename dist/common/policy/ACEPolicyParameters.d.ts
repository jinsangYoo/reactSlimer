export default class ACEPolicyParameters {
    private cpAllow;
    private cpApp;
    private cpCid;
    private cpDebug;
    private cpDomain;
    private cpPrivate;
    private cpSourceIP;
    private toastAppKey;
    private cpCrashDomain;
    private static instance;
    static getInstance(): ACEPolicyParameters;
    private constructor();
    getCpAllow(): string;
    setCpAllow(value: string | undefined): void;
    getCpApp(): number;
    setCpApp(value: number | undefined): void;
    getCpCid(): string;
    setCpCid(value: string | undefined): void;
    getCpDebug(): string;
    setCpDebug(value: string | undefined): void;
    getCpDomain(): string;
    setCpDomain(value: string | undefined): void;
    getCpPrivate(): string;
    setCpPrivate(value: string | undefined): void;
    getCpSourceIP(): string;
    setCpSourceIP(value: string | undefined): void;
    getCpCrashDomain(): string;
    setCpCrashDomain(value: string | undefined): void;
    getToastAppKey(): string;
    setToastAppKey(value: string | undefined): void;
}
//# sourceMappingURL=ACEPolicyParameters.d.ts.map