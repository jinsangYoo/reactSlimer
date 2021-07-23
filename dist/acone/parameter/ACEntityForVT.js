import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantVt from '../constant/ACOneConstantVt';
import { getRandom6CharForSTVT } from '../../common/util/RandomUtil';
export default class ACEntityForVT {
    constructor() {
        this._map = new Map();
        this._map.set(ACOneConstantVt.KeyVTS, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, ACECONSTANT.ZERO6);
        this._map.set(ACOneConstantVt.KeyVisitCount, ACECONSTANT.ZERO);
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, ACECONSTANT.ZERO6);
        this._map.set(ACOneConstantVt.KeyBuyCount, ACECONSTANT.ZERO);
        this._map.set(ACOneConstantVt.KeyPcStamp, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, ACECONSTANT.ZERO6);
    }
    getMap() {
        return this._map;
    }
    setDeepCopy(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this._map) {
            this._map = new Map();
        }
        const _vts = (_a = value.get(ACOneConstantVt.KeyVTS)) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyVTS, _vts);
        const _vtsRandom = (_b = value.get(ACOneConstantVt.KeyRandom6ForVTS)) !== null && _b !== void 0 ? _b : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, _vtsRandom);
        const _visitCount = (_c = value.get(ACOneConstantVt.KeyVisitCount)) !== null && _c !== void 0 ? _c : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyVisitCount, _visitCount);
        const _buyTimeTS = (_d = value.get(ACOneConstantVt.KeyBuyTimeTS)) !== null && _d !== void 0 ? _d : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, _buyTimeTS);
        const _buyTimeTSRandom = (_e = value.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS)) !== null && _e !== void 0 ? _e : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, _buyTimeTSRandom);
        const _buyCount = (_f = value.get(ACOneConstantVt.KeyBuyCount)) !== null && _f !== void 0 ? _f : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyBuyCount, _buyCount);
        const _pcStamp = (_g = value.get(ACOneConstantVt.KeyPcStamp)) !== null && _g !== void 0 ? _g : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyPcStamp, _pcStamp);
        const _pcStampRandom = (_h = value.get(ACOneConstantVt.KeyRandom6ForPcStamp)) !== null && _h !== void 0 ? _h : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, _pcStampRandom);
    }
    getAssembleParams() {
        const _vts = this.getVTSGoldMaster();
        const _visitCount = this.getVisitCount();
        const _buyTimeTS = this.getBuyTimeTSGoldMaster();
        const _buyCount = this.getBuyCount();
        const _pcStamp = this.getPcStampGoldMaster();
        return `${_vts}|${_visitCount}|${_buyTimeTS}|${_buyCount}|${_pcStamp}`;
    }
    getVTSGoldMaster() {
        var _a, _b;
        const _vts = (_a = this.getVTS()) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
        const _random = (_b = this.getRandom6ForVTS()) !== null && _b !== void 0 ? _b : ACECONSTANT.ZERO6;
        return `${_vts}${_random}`;
    }
    getBuyTimeTSGoldMaster() {
        var _a, _b;
        const _buyTimeTS = (_a = this.getBuyTimeTS()) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
        const _random = (_b = this.getRandom6ForBuyTimeTS()) !== null && _b !== void 0 ? _b : ACECONSTANT.ZERO6;
        return `${_buyTimeTS}${_random}`;
    }
    getPcStampGoldMaster() {
        var _a, _b;
        const _pcStamp = (_a = this.getPcStamp()) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
        const _random = (_b = this.getRandom6ForPcStamp()) !== null && _b !== void 0 ? _b : ACECONSTANT.ZERO6;
        return `${_pcStamp}${_random}`;
    }
    getVTS() {
        return this._map.get(ACOneConstantVt.KeyVTS);
    }
    setVTS(value) {
        this._map.set(ACOneConstantVt.KeyVTS, value.valueOf().toString());
    }
    getRandom6ForVTS() {
        return this._map.get(ACOneConstantVt.KeyRandom6ForVTS);
    }
    setRandom6ForVTS(value) {
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, value);
    }
    getVisitCount() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyVisitCount)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO;
    }
    setVisitCount(value) {
        this._map.set(ACOneConstantVt.KeyVisitCount, value.toString());
    }
    getBuyTimeTS() {
        return this._map.get(ACOneConstantVt.KeyBuyTimeTS);
    }
    setBuyTimeTS(value) {
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, value.valueOf().toString());
    }
    getRandom6ForBuyTimeTS() {
        return this._map.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS);
    }
    setRandom6ForBuyTimeTS(value) {
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, value);
    }
    getBuyCount() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyBuyCount)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO;
    }
    setBuyCount(value) {
        this._map.set(ACOneConstantVt.KeyBuyCount, value.toString());
    }
    getPcStamp() {
        return this._map.get(ACOneConstantVt.KeyPcStamp);
    }
    setPcStamp(value) {
        this._map.set(ACOneConstantVt.KeyPcStamp, value.toString());
    }
    getRandom6ForPcStamp() {
        return this._map.get(ACOneConstantVt.KeyRandom6ForPcStamp);
    }
    setRandom6ForPcStamp(value) {
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, value);
    }
    setPcStampWhenNotStored() {
        const _pcStamp = this.getPcStamp();
        if (!_pcStamp || _pcStamp == ACOneConstantVt.DefaultTS) {
            this.setPcStamp(Date.now());
            this.setRandom6ForPcStamp(getRandom6CharForSTVT());
            console.log(`maked pcStamp: ${this.getPcStampGoldMaster()}`);
        }
        else {
            console.log(`existed pcStamp: ${this.getPcStampGoldMaster()}`);
        }
    }
}
//# sourceMappingURL=ACEntityForVT.js.map