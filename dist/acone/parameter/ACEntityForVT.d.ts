export default class ACEntityForVT {
    private static _TAG;
    private _map;
    constructor();
    getMap(): Map<string, string>;
    setDeepCopy(value: Map<string, string>): void;
    setDeepCopyForJSON(value: JSON): void;
    getAssembleParams(): string;
    getVTSGoldMaster(): string;
    getBuyTimeTSGoldMaster(): string;
    getPcStampGoldMaster(): string;
    isEmptyAtVTS(): boolean;
    getVTS(): string;
    setVTS(value: Date): void;
    getRandom6ForVTS(): string;
    setRandom6ForVTS(value: string): void;
    getVisitCount(): string;
    setVisitCount(value: number): void;
    isEmptyAtBuyTimeTS(): boolean;
    getBuyTimeTS(): string;
    setBuyTimeTS(value: Date): void;
    getRandom6ForBuyTimeTS(): string;
    setRandom6ForBuyTimeTS(value: string): void;
    getBuyCount(): string;
    setBuyCount(value: number): void;
    getPcStamp(): string;
    setPcStamp(value: number): void;
    getRandom6ForPcStamp(): string;
    setRandom6ForPcStamp(value: string): void;
    setPcStampWhenNotStored(): void;
    toJSON(): object;
}
//# sourceMappingURL=ACEntityForVT.d.ts.map