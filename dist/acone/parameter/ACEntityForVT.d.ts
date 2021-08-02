export default class ACEntityForVT {
    private static _TAG;
    private _map;
    constructor();
    getMap(): Map<string, string>;
    setDeepCopy(value: Map<string, string>): void;
    getAssembleParams(): string;
    getVTSGoldMaster(): string;
    getBuyTimeTSGoldMaster(): string;
    getPcStampGoldMaster(): string;
    getVTS(): string | undefined;
    setVTS(value: Date): void;
    getRandom6ForVTS(): string | undefined;
    setRandom6ForVTS(value: string): void;
    getVisitCount(): string;
    setVisitCount(value: number): void;
    getBuyTimeTS(): string | undefined;
    setBuyTimeTS(value: Date): void;
    getRandom6ForBuyTimeTS(): string | undefined;
    setRandom6ForBuyTimeTS(value: string): void;
    getBuyCount(): string;
    setBuyCount(value: number): void;
    getPcStamp(): string | undefined;
    setPcStamp(value: number): void;
    getRandom6ForPcStamp(): string | undefined;
    setRandom6ForPcStamp(value: string): void;
    setPcStampWhenNotStored(): void;
}
//# sourceMappingURL=ACEntityForVT.d.ts.map