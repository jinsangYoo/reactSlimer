import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantVt from '../constant/ACOneConstantVt';
import { getRandom6CharForSTVT } from '../../common/util/NumberUtil';
import ACELog from '../../common/logger/ACELog';
export default class ACEntityForVT {
    constructor() {
        this._map = new Map();
        this._map.set(ACOneConstantVt.KeyVTS, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, ACECONSTANT.EMPTY);
        this._map.set(ACOneConstantVt.KeyVisitCount, ACECONSTANT.ZERO);
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, ACECONSTANT.EMPTY);
        this._map.set(ACOneConstantVt.KeyBuyCount, ACECONSTANT.ZERO);
        this._map.set(ACOneConstantVt.KeyPcStamp, ACOneConstantVt.DefaultTS);
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, ACECONSTANT.EMPTY);
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
        const _vtsRandom = (_b = value.get(ACOneConstantVt.KeyRandom6ForVTS)) !== null && _b !== void 0 ? _b : ACECONSTANT.EMPTY;
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, _vtsRandom);
        const _visitCount = (_c = value.get(ACOneConstantVt.KeyVisitCount)) !== null && _c !== void 0 ? _c : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyVisitCount, _visitCount);
        const _buyTimeTS = (_d = value.get(ACOneConstantVt.KeyBuyTimeTS)) !== null && _d !== void 0 ? _d : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, _buyTimeTS);
        const _buyTimeTSRandom = (_e = value.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS)) !== null && _e !== void 0 ? _e : ACECONSTANT.EMPTY;
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, _buyTimeTSRandom);
        const _buyCount = (_f = value.get(ACOneConstantVt.KeyBuyCount)) !== null && _f !== void 0 ? _f : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyBuyCount, _buyCount);
        const _pcStamp = (_g = value.get(ACOneConstantVt.KeyPcStamp)) !== null && _g !== void 0 ? _g : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyPcStamp, _pcStamp);
        const _pcStampRandom = (_h = value.get(ACOneConstantVt.KeyRandom6ForPcStamp)) !== null && _h !== void 0 ? _h : ACECONSTANT.EMPTY;
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, _pcStampRandom);
    }
    setDeepCopyForJSON(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this._map) {
            this._map = new Map();
        }
        const _vts = (_a = value[ACOneConstantVt.KeyVTS]) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyVTS, _vts);
        const _vtsRandom = (_b = value[ACOneConstantVt.KeyRandom6ForVTS]) !== null && _b !== void 0 ? _b : ACECONSTANT.EMPTY;
        this._map.set(ACOneConstantVt.KeyRandom6ForVTS, _vtsRandom);
        const _visitCount = (_c = value[ACOneConstantVt.KeyVisitCount]) !== null && _c !== void 0 ? _c : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyVisitCount, _visitCount);
        const _buyTimeTS = (_d = value[ACOneConstantVt.KeyBuyTimeTS]) !== null && _d !== void 0 ? _d : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, _buyTimeTS);
        const _buyTimeTSRandom = (_e = value[ACOneConstantVt.KeyRandom6ForBuyTimeTS]) !== null && _e !== void 0 ? _e : ACECONSTANT.EMPTY;
        this._map.set(ACOneConstantVt.KeyRandom6ForBuyTimeTS, _buyTimeTSRandom);
        const _buyCount = (_f = value[ACOneConstantVt.KeyBuyCount]) !== null && _f !== void 0 ? _f : ACECONSTANT.ZERO;
        this._map.set(ACOneConstantVt.KeyBuyCount, _buyCount);
        const _pcStamp = (_g = value[ACOneConstantVt.KeyPcStamp]) !== null && _g !== void 0 ? _g : ACOneConstantVt.DefaultTS;
        this._map.set(ACOneConstantVt.KeyPcStamp, _pcStamp);
        const _pcStampRandom = (_h = value[ACOneConstantVt.KeyRandom6ForPcStamp]) !== null && _h !== void 0 ? _h : ACECONSTANT.EMPTY;
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
        const _vts = this.getVTS();
        const _random = this.getRandom6ForVTS();
        return `${_vts}${_random}`;
    }
    getBuyTimeTSGoldMaster() {
        const _buyTimeTS = this.getBuyTimeTS();
        const _random = this.getRandom6ForBuyTimeTS();
        return `${_buyTimeTS}${_random}`;
    }
    getPcStampGoldMaster() {
        const _pcStamp = this.getPcStamp();
        const _random = this.getRandom6ForPcStamp();
        return `${_pcStamp}${_random}`;
    }
    isEmptyAtVTS() {
        const _vts = this.getVTS();
        if (_vts == ACOneConstantVt.DefaultTS) {
            return true;
        }
        else {
            return false;
        }
    }
    getVTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyVTS)) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
    }
    setVTS(value) {
        this._map.set(ACOneConstantVt.KeyVTS, value.valueOf().toString());
    }
    getRandom6ForVTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyRandom6ForVTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO;
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
    isEmptyAtBuyTimeTS() {
        const _buyTimeTS = this.getBuyTimeTS();
        if (_buyTimeTS == ACOneConstantVt.DefaultTS) {
            return true;
        }
        else {
            return false;
        }
    }
    getBuyTimeTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyBuyTimeTS)) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
    }
    setBuyTimeTS(value) {
        this._map.set(ACOneConstantVt.KeyBuyTimeTS, value);
    }
    getRandom6ForBuyTimeTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyRandom6ForBuyTimeTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO;
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
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyPcStamp)) !== null && _a !== void 0 ? _a : ACOneConstantVt.DefaultTS;
    }
    setPcStamp(value) {
        this._map.set(ACOneConstantVt.KeyPcStamp, value.toString());
    }
    getRandom6ForPcStamp() {
        var _a;
        return (_a = this._map.get(ACOneConstantVt.KeyRandom6ForPcStamp)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO;
    }
    setRandom6ForPcStamp(value) {
        this._map.set(ACOneConstantVt.KeyRandom6ForPcStamp, value);
    }
    setPcStampWhenNotStored() {
        const _pcStamp = this.getPcStamp();
        if (_pcStamp == ACOneConstantVt.DefaultTS) {
            this.setPcStamp(Date.now());
            this.setRandom6ForPcStamp(getRandom6CharForSTVT());
            ACELog.d(ACEntityForVT._TAG, `maked pcStamp: ${this.getPcStampGoldMaster()}`);
        }
        else {
            ACELog.d(ACEntityForVT._TAG, `existed pcStamp: ${this.getPcStampGoldMaster()}`);
        }
    }
    toJSON() {
        return {
            ac1_buyCount: this.getBuyCount(),
            ac1_buyTimeTS: this.getBuyTimeTS(),
            ac1_random6BuyTimeTS: this.getRandom6ForBuyTimeTS(),
            ac1_visitCount: this.getVisitCount(),
            ac1_vTS: this.getVTS(),
            ac1_random6VTS: this.getRandom6ForVTS(),
            ac1_pcStamp: this.getPcStamp(),
            ac1_random6pcStamp: this.getRandom6ForPcStamp(),
        };
    }
    getObjectForTS() {
        return {
            vts: this.getVTSGoldMaster(),
            visitCount: this.getVisitCount(),
            buyTimeTS: this.getBuyTimeTSGoldMaster(),
            buyCount: this.getBuyCount(),
            pcStamp: this.getPcStampGoldMaster(),
        };
    }
}
ACEntityForVT._TAG = 'vt';
//# sourceMappingURL=ACEntityForVT.js.map