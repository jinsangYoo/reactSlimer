import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantSt from '../constant/ACOneConstantSt';
export default class ACEntityForST {
    constructor() {
        this._map = new Map();
        this._map.set(ACOneConstantSt.KeyGetTS, ACOneConstantSt.DefaultTS);
        this._map.set(ACOneConstantSt.KeyRandom6ForGetTS, ACECONSTANT.ZERO6);
        this._map.set(ACOneConstantSt.KeyInsenginetTS, ACOneConstantSt.DefaultTS);
        this._map.set(ACOneConstantSt.KeyRandom6ForInsenginetTS, ACECONSTANT.ZERO6);
        this._map.set(ACOneConstantSt.KeyRTS, ACOneConstantSt.DefaultTS);
        this._map.set(ACOneConstantSt.KeyRandom6ForRTS, ACECONSTANT.EMPTY);
        this._map.set(ACOneConstantSt.KeyStartTS, ACOneConstantSt.DefaultTS);
        this._map.set(ACOneConstantSt.KeyRandom6ForStartTS, ACECONSTANT.ZERO6);
    }
    getMap() {
        return this._map;
    }
    setDeepCopy(value) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this._map) {
            this._map = new Map();
        }
        const _getTS = (_a = value.get(ACOneConstantSt.KeyGetTS)) !== null && _a !== void 0 ? _a : ACOneConstantSt.DefaultTS;
        this._map.set(ACOneConstantSt.KeyGetTS, _getTS);
        const _getTSRandom = (_b = value.get(ACOneConstantSt.KeyRandom6ForGetTS)) !== null && _b !== void 0 ? _b : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantSt.KeyRandom6ForGetTS, _getTSRandom);
        const _insenginetTS = (_c = value.get(ACOneConstantSt.KeyInsenginetTS)) !== null && _c !== void 0 ? _c : ACOneConstantSt.DefaultTS;
        this._map.set(ACOneConstantSt.KeyInsenginetTS, _insenginetTS);
        const _insenginetTSRandom = (_d = value.get(ACOneConstantSt.KeyRandom6ForInsenginetTS)) !== null && _d !== void 0 ? _d : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantSt.KeyRandom6ForInsenginetTS, _insenginetTSRandom);
        const _rTS = (_e = value.get(ACOneConstantSt.KeyRTS)) !== null && _e !== void 0 ? _e : ACOneConstantSt.DefaultTS;
        this._map.set(ACOneConstantSt.KeyRTS, _rTS);
        const _rTSRandom = (_f = value.get(ACOneConstantSt.KeyRandom6ForRTS)) !== null && _f !== void 0 ? _f : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantSt.KeyRandom6ForRTS, _rTSRandom);
        const _startTS = (_g = value.get(ACOneConstantSt.KeyStartTS)) !== null && _g !== void 0 ? _g : ACOneConstantSt.DefaultTS;
        this._map.set(ACOneConstantSt.KeyStartTS, _startTS);
        const _startTSRandom = (_h = value.get(ACOneConstantSt.KeyRandom6ForStartTS)) !== null && _h !== void 0 ? _h : ACECONSTANT.ZERO6;
        this._map.set(ACOneConstantSt.KeyRandom6ForStartTS, _startTSRandom);
    }
    getAssembleParams() {
        const _getTS = this.getGetTSGoldMaster();
        const _insenginetTS = this.getInsenginetTSGoldMaster();
        const _rTS = this.getRTSGoldMaster();
        const _startTS = this.getStartTSGoldMaster();
        return `${_startTS}|${_getTS}|${_rTS}|${_insenginetTS}`;
    }
    getGetTSGoldMaster() {
        const _getTS = this.getGetTS();
        const _random = this.getRandom6ForGetTS();
        return `${_getTS}${_random}`;
    }
    getInsenginetTSGoldMaster() {
        const _insenginetTS = this.getInsenginetTS();
        const _random = this.getRandom6ForInsenginetTS();
        return `${_insenginetTS}${_random}`;
    }
    getRTSGoldMaster() {
        const _rTS = this.getRTS();
        const _random = this.getRandom6ForRTS();
        return `${_rTS}${_random}`;
    }
    getStartTSGoldMaster() {
        const _startTS = this.getStartTS();
        const _random = this.getRandom6ForStartTS();
        return `${_startTS}${_random}`;
    }
    getGetTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyGetTS)) !== null && _a !== void 0 ? _a : ACOneConstantSt.DefaultTS;
    }
    setGetTS(value) {
        this._map.set(ACOneConstantSt.KeyGetTS, value.valueOf().toString());
    }
    getRandom6ForGetTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyRandom6ForGetTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO6;
    }
    setRandom6ForGetTS(value) {
        this._map.set(ACOneConstantSt.KeyRandom6ForGetTS, value);
    }
    getInsenginetTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyInsenginetTS)) !== null && _a !== void 0 ? _a : ACOneConstantSt.DefaultTS;
    }
    setInsenginetTS(value) {
        this._map.set(ACOneConstantSt.KeyInsenginetTS, value.valueOf().toString());
    }
    getRandom6ForInsenginetTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyRandom6ForInsenginetTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO6;
    }
    setRandom6ForInsenginetTS(value) {
        this._map.set(ACOneConstantSt.KeyRandom6ForInsenginetTS, value);
    }
    getRTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyRTS)) !== null && _a !== void 0 ? _a : ACOneConstantSt.DefaultTS;
    }
    setRTS(value) {
        this._map.set(ACOneConstantSt.KeyRTS, value.valueOf().toString());
    }
    getRandom6ForRTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyRandom6ForRTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY;
    }
    setRandom6ForRTS(value) {
        this._map.set(ACOneConstantSt.KeyRandom6ForRTS, value);
    }
    getStartTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyStartTS)) !== null && _a !== void 0 ? _a : ACOneConstantSt.DefaultTS;
    }
    setStartTS(value) {
        this._map.set(ACOneConstantSt.KeyStartTS, value.valueOf().toString());
    }
    getRandom6ForStartTS() {
        var _a;
        return (_a = this._map.get(ACOneConstantSt.KeyRandom6ForStartTS)) !== null && _a !== void 0 ? _a : ACECONSTANT.ZERO6;
    }
    setRandom6ForStartTS(value) {
        this._map.set(ACOneConstantSt.KeyRandom6ForStartTS, value);
    }
    toJSON() {
        return {
            ac1_getTS: this.getGetTS(),
            ac1_random6GetTS: this.getRandom6ForGetTS(),
            ac1_insenginetTS: this.getInsenginetTS(),
            ac1_random6InsenginetTS: this.getRandom6ForInsenginetTS(),
            ac1_rTS: this.getRTS(),
            ac1_random6RTS: this.getRandom6ForRTS(),
            ac1_startTS: this.getStartTS(),
            ac1_random6StartTS: this.getRandom6ForStartTS(),
        };
    }
}
//# sourceMappingURL=ACEntityForST.js.map