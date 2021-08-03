import ACEParameters from '../../common/parameter/ACEParameters';
import ACEntityForST from './ACEntityForST';
import ACEntityForVT from './ACEntityForVT';
import { isEmpty } from '../../common/util/TextUtils';
import ADID from '../../common/constant/ADID';
import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstant from '../constant/ACOneConstant';
import IACBuyMode from '../constant/IACBuyMode';
import { ACEMaritalStatus } from '../../common/constant/ACEPublicStaticConfig';
import ACOneConstantSt from '../constant/ACOneConstantSt';
import ACOneConstantVt from '../constant/ACOneConstantVt';
import SESSION from '../../common/constant/Session';
import { ACEInnerCBResultKey } from '../../common/constant/ACEInnerCBResultKey';
import ACELog from '../../common/logger/ACELog';
import ACOneConstantInteger from '../constant/ACOneConstantInteger';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class ACEParametersForOne extends ACEParameters {
    constructor() {
        super();
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    getADELD() {
        if (isEmpty(this.adeld)) {
            this.adeld = ADID.disable;
        }
        return this.adeld;
    }
    setADELD(value) {
        this.adeld = value ? ADID.enable : ADID.disable;
    }
    getADID() {
        if (isEmpty(this.adid)) {
            this.adid = ADID.defaultADID;
        }
        return this.adid;
    }
    setADID(value) {
        if (isEmpty(value)) {
            this.adid = ADID.defaultADID;
        }
        else {
            this.adid = value;
        }
    }
    getAG() {
        if (this.ag < 0) {
            this.ag = 0;
        }
        return this.ag;
    }
    setAG(value) {
        if (value < 0) {
            value = 0;
        }
        this.ag = value;
    }
    getAMT() {
        if (isEmpty(this.amt)) {
            this.amt = ACECONSTANT.EMPTY;
        }
        return this.amt;
    }
    setAMT(value) {
        if (isEmpty(value)) {
            this.amt = ACECONSTANT.EMPTY;
        }
        else {
            this.amt = value;
        }
    }
    getCE() {
        if (isEmpty(this.ce)) {
            this.ce = ACOneConstant.DefaultCE;
        }
        return this.ce;
    }
    setCE(value) {
        if (isEmpty(value)) {
            this.ce = ACOneConstant.DefaultCE;
        }
        else {
            this.ce = value;
        }
    }
    getCT() {
        if (isEmpty(this.ct)) {
            this.ct = ACECONSTANT.EMPTY;
        }
        return this.ct;
    }
    setCT(value) {
        if (isEmpty(value)) {
            this.ct = ACECONSTANT.EMPTY;
        }
        else {
            this.ct = value;
        }
    }
    getDM() {
        if (isEmpty(this.dm)) {
            this.dm = ACECONSTANT.EMPTY;
        }
        return this.dm;
    }
    setDM(value) {
        if (isEmpty(value)) {
            this.dm = ACECONSTANT.EMPTY;
        }
        else {
            this.dm = value;
        }
    }
    getGD() {
        if (isEmpty(this.gd)) {
            this.gd = ACECONSTANT.EMPTY;
        }
        return this.gd;
    }
    setGD(value) {
        if (isEmpty(value)) {
            this.gd = ACECONSTANT.EMPTY;
        }
        else {
            this.gd = value;
        }
    }
    getID() {
        if (isEmpty(this._id)) {
            this._id = ACECONSTANT.EMPTY;
        }
        return this._id;
    }
    setID(value) {
        if (isEmpty(value)) {
            this._id = ACECONSTANT.EMPTY;
        }
        else {
            this._id = value;
        }
    }
    getInstallReferrer(callback) {
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'getInstallReferrer not support promise.');
            AsyncStorage.getItem(ACECONSTANT.InstallReferrer, (err, result) => {
                ACELog.d(ACEParametersForOne._TAG, `${ACECONSTANT.InstallReferrer}: ${result}`);
                if (callback) {
                    callback(err, {
                        getKey: ACECONSTANT.InstallReferrer,
                        getValue: result,
                    });
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'getInstallReferrer support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem(ACECONSTANT.InstallReferrer, (err, result) => {
                    ACELog.d(ACEParametersForOne._TAG, `${ACECONSTANT.InstallReferrer}: ${result}`);
                    if (callback) {
                        callback(err, {
                            getKey: ACECONSTANT.InstallReferrer,
                            getValue: result,
                        });
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                getKey: ACECONSTANT.InstallReferrer,
                                getValue: result,
                            });
                        }
                    }
                });
            });
        }
    }
    setInstallReferrer(value, callback) {
        if (isEmpty(value)) {
            value = ACECONSTANT.EMPTY;
        }
        ACELog.d(ACEParametersForOne._TAG, `${ACECONSTANT.InstallReferrer}: ${value}`);
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'setInstallReferrer not support promise.');
            AsyncStorage.setItem(ACECONSTANT.InstallReferrer, value, err => {
                if (callback) {
                    callback(err, {
                        getKey: ACECONSTANT.InstallReferrer,
                        getValue: value,
                    });
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'setInstallReferrer support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.setItem(ACECONSTANT.InstallReferrer, value, err => {
                    if (callback) {
                        callback(err, {
                            getKey: ACECONSTANT.InstallReferrer,
                            getValue: value,
                        });
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                getKey: ACECONSTANT.InstallReferrer,
                                getValue: value,
                            });
                        }
                    }
                });
            });
        }
    }
    getJN() {
        if (isEmpty(this.jn)) {
            this.jn = ACECONSTANT.EMPTY;
        }
        return this.jn;
    }
    setJN(value) {
        if (isEmpty(value)) {
            this.jn = ACECONSTANT.EMPTY;
        }
        else {
            this.jn = value;
        }
    }
    getKW() {
        if (isEmpty(this.kw)) {
            this.kw = ACECONSTANT.EMPTY;
        }
        return this.kw;
    }
    setKW(value) {
        if (isEmpty(value)) {
            this.kw = ACECONSTANT.EMPTY;
        }
        else {
            this.kw = value;
        }
    }
    getLG() {
        if (isEmpty(this.lg)) {
            this.lg = ACECONSTANT.EMPTY;
        }
        return this.lg;
    }
    setLG(value) {
        if (isEmpty(value)) {
            this.lg = ACECONSTANT.EMPTY;
        }
        else {
            this.lg = value;
        }
    }
    getLL() {
        if (isEmpty(this.ll)) {
            this.ll = ACECONSTANT.EMPTY;
        }
        return this.ll;
    }
    setLL(value) {
        if (isEmpty(value)) {
            this.ll = ACECONSTANT.EMPTY;
        }
        else {
            this.ll = value;
        }
    }
    getMD() {
        if (isEmpty(this.md)) {
            this.md = IACBuyMode.Unknown;
        }
        return this.md;
    }
    setMD(value) {
        this.md = value;
    }
    getMID() {
        if (isEmpty(this.mid)) {
            this.mid = ACECONSTANT.EMPTY;
        }
        return this.mid;
    }
    setMID(value) {
        if (isEmpty(value)) {
            this.mid = ACECONSTANT.EMPTY;
        }
        else {
            this.mid = value;
        }
    }
    getMR() {
        if (isEmpty(this.mr)) {
            this.mr = ACEMaritalStatus.Unknown;
        }
        return this.mr;
    }
    setMR(value) {
        if (isEmpty(value)) {
            this.mr = ACEMaritalStatus.Unknown;
        }
        else {
            this.mr = value;
        }
    }
    getONUM() {
        if (isEmpty(this.onum)) {
            this.onum = ACECONSTANT.EMPTY;
        }
        return this.onum;
    }
    setONUM(value) {
        if (isEmpty(value)) {
            this.onum = ACECONSTANT.EMPTY;
        }
        else {
            this.onum = value;
        }
    }
    getPayMethod() {
        if (isEmpty(this.payMethod)) {
            this.payMethod = ACECONSTANT.EMPTY;
        }
        return this.payMethod;
    }
    setPayMethod(value) {
        if (isEmpty(value)) {
            this.payMethod = ACECONSTANT.EMPTY;
        }
        else {
            this.payMethod = value;
        }
    }
    getPD() {
        if (isEmpty(this.pd)) {
            this.pd = ACECONSTANT.EMPTY;
        }
        return this.pd;
    }
    setPD(value) {
        if (isEmpty(value)) {
            this.pd = ACECONSTANT.EMPTY;
        }
        else {
            this.pd = value;
        }
    }
    getPush() {
        if (isEmpty(this.push)) {
            this.push = ACECONSTANT.EMPTY;
        }
        return this.push;
    }
    setPush(value) {
        if (isEmpty(value)) {
            this.push = ACECONSTANT.EMPTY;
        }
        else {
            this.push = value;
        }
    }
    getRE() {
        if (this.re < 0) {
            this.re = 0;
        }
        return this.re;
    }
    setRE(value) {
        if (value < 0) {
            value = 0;
        }
        this.re = value;
    }
    getREF() {
        if (isEmpty(this.ref)) {
            this.ref = ACECONSTANT.BOOKMARK;
        }
        return this.ref;
    }
    setREF(value) {
        if (isEmpty(value)) {
            this.ref = ACECONSTANT.BOOKMARK;
        }
        else {
            this.ref = value;
        }
    }
    getRI() {
        if (isEmpty(this.ri)) {
            this.ri = ACOneConstant.DefaultRI;
        }
        return this.ri;
    }
    setRI(value) {
        if (isEmpty(value)) {
            this.ri = ACOneConstant.DefaultRI;
        }
        else {
            this.ri = value;
        }
    }
    getSKEY() {
        if (isEmpty(this.skey)) {
            this.skey = ACECONSTANT.EMPTY;
        }
        return this.skey;
    }
    setSKEY(value) {
        if (isEmpty(value)) {
            this.skey = ACECONSTANT.EMPTY;
        }
        else {
            this.skey = value;
        }
    }
    getSRC() {
        if (isEmpty(this.src)) {
            this.src = ACECONSTANT.EMPTY;
        }
        return this.src;
    }
    setSRC(value) {
        if (isEmpty(value)) {
            this.src = ACECONSTANT.EMPTY;
        }
        else {
            this.src = value;
        }
    }
    getST() {
        if (!this.st) {
            this.st = new ACEntityForST();
        }
        return this.st;
    }
    setST(value) {
        if (!this.st) {
            this.st = new ACEntityForST();
        }
        else {
            this.st.setST(value);
        }
    }
    loadST(callback) {
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'loadST not support promise.');
            AsyncStorage.getItem(ACOneConstantSt.KeyInStorage, (err, result) => {
                ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${result}`);
                if (result) {
                    this.setST(JSON.parse(result));
                }
                if (callback) {
                    callback(err, {
                        getKey: ACOneConstantSt.KeyInStorage,
                        getValue: result,
                    });
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'loadST support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem(ACOneConstantSt.KeyInStorage, (err, result) => {
                    ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${result}`);
                    if (callback) {
                        if (result) {
                            this.setST(JSON.parse(result));
                        }
                        callback(err, {
                            getKey: ACOneConstantSt.KeyInStorage,
                            getValue: result,
                        });
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (result) {
                                this.setST(JSON.parse(result));
                            }
                            resolve({
                                getKey: ACOneConstantSt.KeyInStorage,
                                getValue: result,
                            });
                        }
                    }
                });
            });
        }
    }
    saveST_toInStorage(st, callback) {
        const _json = JSON.stringify(st);
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'saveST_toInStorage not support promise.');
            AsyncStorage.setItem(ACOneConstantSt.KeyInStorage, _json, err => {
                ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${_json}`);
                if (callback) {
                    callback(err, {
                        getKey: ACOneConstantSt.KeyInStorage,
                        getValue: _json,
                    });
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'saveST_toInStorage support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.setItem(ACOneConstantSt.KeyInStorage, _json, err => {
                    ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${_json}`);
                    if (callback) {
                        callback(err, {
                            getKey: ACOneConstantSt.KeyInStorage,
                            getValue: _json,
                        });
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                getKey: ACOneConstantSt.KeyInStorage,
                                getValue: _json,
                            });
                        }
                    }
                });
            });
        }
    }
    getSTS() {
        if (isEmpty(this.sts)) {
            this.sts = ACECONSTANT.ZERO;
        }
        return this.sts;
    }
    setSTS(value) {
        if (isEmpty(value)) {
            this.sts = ACECONSTANT.ZERO;
        }
        else {
            this.sts = value;
        }
    }
    getSV() {
        if (isEmpty(this.sv)) {
            this.sv = ACECONSTANT.EMPTY;
        }
        return this.sv;
    }
    setSV(value) {
        if (isEmpty(value)) {
            this.sv = ACECONSTANT.EMPTY;
        }
        else {
            this.sv = value;
        }
    }
    getTP() {
        if (isEmpty(this.tp)) {
            this.tp = ACECONSTANT.EMPTY;
        }
        return this.tp;
    }
    setTP(value) {
        if (isEmpty(value)) {
            this.tp = ACECONSTANT.EMPTY;
        }
        else {
            this.tp = value;
        }
    }
    getTZ() {
        var _timezoneOffset = new Date().getTimezoneOffset() / 60 + ACOneConstantInteger.TimezoneArrayIndexAtAceServer;
        if (_timezoneOffset > 24)
            _timezoneOffset -= 24;
        return _timezoneOffset.toString();
    }
    getUDF1() {
        if (this.udf1 < 0) {
            this.udf1 = 0;
        }
        return this.udf1;
    }
    setUDF1(value) {
        if (value < 0) {
            value = 0;
        }
        this.udf1 = value;
    }
    getUDF2() {
        if (this.udf2 < 0) {
            this.udf2 = 0;
        }
        return this.udf2;
    }
    setUDF2(value) {
        if (value < 0) {
            value = 0;
        }
        this.udf2 = value;
    }
    getUDF3() {
        if (this.udf3 < 0) {
            this.udf3 = 0;
        }
        return this.udf3;
    }
    setUDF3(value) {
        if (value < 0) {
            value = 0;
        }
        this.udf3 = value;
    }
    getURL() {
        if (isEmpty(this.url)) {
            this.url = ACECONSTANT.BOOKMARK;
        }
        return this.url;
    }
    setURL(value) {
        if (isEmpty(value)) {
            this.url = ACECONSTANT.BOOKMARK;
        }
        else {
            this.url = value;
        }
    }
    getUserID() {
        if (isEmpty(this.userId)) {
            this.userId = ACECONSTANT.EMPTY;
        }
        return this.userId;
    }
    setUserID(value) {
        if (isEmpty(value)) {
            this.userId = ACECONSTANT.EMPTY;
        }
        else {
            this.userId = value;
        }
    }
    getVK() {
        if (this.vk < 0) {
            this.vk = SESSION.NEW;
        }
        return this.udf3;
    }
    setVK(value) {
        if (value > SESSION.NEW) {
            value = SESSION.NEW;
        }
        else if (value < SESSION.KEEP) {
            value = SESSION.KEEP;
        }
        this.vk = value;
    }
    getVT() {
        if (!this.vt) {
            this.vt = new ACEntityForVT();
        }
        return this.vt;
    }
    setVT(value) {
        if (!this.vt) {
            this.vt = new ACEntityForVT();
        }
        else {
            this.vt.setDeepCopy(value.getMap());
        }
    }
    setPcStampWhenNotStored() {
        if (this.vt) {
            this.vt.setPcStampWhenNotStored();
        }
    }
    loadVT(callback) {
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'loadVT not support promise.');
            AsyncStorage.getItem(ACOneConstantVt.KeyInStorage, (err, result) => {
                if (callback) {
                    if (err) {
                        callback(err, {
                            code: ACEInnerCBResultKey.FailGetVT,
                            result: ACEInnerCBResultKey[ACEInnerCBResultKey.FailGetVT],
                        });
                    }
                    else {
                        if (result) {
                            this.setST(JSON.parse(result));
                            callback(err, {
                                code: ACEInnerCBResultKey.Success,
                                result: ACEInnerCBResultKey[ACEInnerCBResultKey.Success],
                            });
                        }
                        else {
                            callback(err, {
                                code: ACEInnerCBResultKey.NotExistKey,
                                result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotExistKey],
                            });
                        }
                    }
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'loadVT support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.getItem(ACOneConstantVt.KeyInStorage, (err, result) => {
                    if (callback) {
                        if (err) {
                            callback(err, {
                                code: ACEInnerCBResultKey.FailGetVT,
                                result: ACEInnerCBResultKey[ACEInnerCBResultKey.FailGetVT],
                            });
                        }
                        else {
                            if (result) {
                                this.setST(JSON.parse(result));
                                callback(err, {
                                    code: ACEInnerCBResultKey.Success,
                                    result: ACEInnerCBResultKey[ACEInnerCBResultKey.Success],
                                });
                            }
                            else {
                                callback(err, {
                                    code: ACEInnerCBResultKey.NotExistKey,
                                    result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotExistKey],
                                });
                            }
                        }
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            if (result) {
                                this.setVT(JSON.parse(result));
                                resolve({
                                    code: ACEInnerCBResultKey.Success,
                                    result: ACEInnerCBResultKey[ACEInnerCBResultKey.Success],
                                });
                            }
                            else {
                                resolve({
                                    code: ACEInnerCBResultKey.NotExistKey,
                                    result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotExistKey],
                                });
                            }
                        }
                    }
                });
            });
        }
    }
    saveVT_toInStorage(vt, callback) {
        const _json = JSON.stringify(vt);
        if (!global.Promise) {
            ACELog.d(ACEParametersForOne._TAG, 'saveVT_toInStorage not support promise.');
            AsyncStorage.setItem(ACOneConstantVt.KeyInStorage, _json, err => {
                ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${_json}`);
                if (callback) {
                    callback(err, {
                        getKey: ACOneConstantVt.KeyInStorage,
                        getValue: _json,
                    });
                }
            });
        }
        else {
            ACELog.d(ACEParametersForOne._TAG, 'saveVT_toInStorage support promise.');
            return new Promise((resolve, reject) => {
                AsyncStorage.setItem(ACOneConstantVt.KeyInStorage, _json, err => {
                    ACELog.d(ACEParametersForOne._TAG, `${ACOneConstantSt.KeyInStorage}: ${_json}`);
                    if (callback) {
                        callback(err, {
                            getKey: ACOneConstantVt.KeyInStorage,
                            getValue: _json,
                        });
                    }
                    else {
                        if (err) {
                            reject(err);
                        }
                        else {
                            resolve({
                                getKey: ACOneConstantVt.KeyInStorage,
                                getValue: _json,
                            });
                        }
                    }
                });
            });
        }
    }
    getParamsToJSONString() {
        return JSON.stringify({
            adeld: this.adeld,
        });
    }
}
ACEParametersForOne._TAG = 'paramForOne';
//# sourceMappingURL=ACEParametersForOne.js.map