import ACEParametersForOne from './ACEParametersForOne';
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil';
import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantInteger from '../constant/ACOneConstantInteger';
import ACOneConstant from '../constant/ACOneConstant';
import { ACS } from '../acs';
import SESSION from '../../common/constant/Session';
import ACOneConstantSt from '../constant/ACOneConstantSt';
import ACOneConstantVt from '../constant/ACOneConstantVt';
import { ACEConstantCallback, ACEResultCode } from '../../common/constant/ACEPublicStaticConfig';
import { isEmpty, onlyLetteringAtStartIndex, stringToNumber } from '../../common/util/TextUtils';
import ACELog from '../../common/logger/ACELog';
import { getRandom6CharForSTVT } from '../../common/util/NumberUtil';
export default class ACEParameterUtilForOne {
    constructor() {
        this._enablePrivacyPolicy = false;
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    loadUniqueKeyForSDK() {
        ACEParametersForOne.getInstance().setPcStampWhenNotStored();
    }
    setFirstLogParameters() {
        throw new Error('Method not implemented.');
    }
    setLogSource(value) {
        throw new Error('Method not implemented.');
    }
    getSdkDetails(json) {
        throw new Error('Method not implemented.');
    }
    initParameters(key, enablePrivacyPolicy, callback) {
        this._enablePrivacyPolicy = enablePrivacyPolicy;
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.getCE();
        _parametersForOne.setDM(ACEParameterUtil.getResolution());
        _parametersForOne.setMID(key);
        _parametersForOne.setIsNeedSetNewSession(false);
        _parametersForOne.setPatch(ACECONSTANT.PATCH);
        _parametersForOne.setRE(ACOneConstantInteger.DefaultRE);
        _parametersForOne.setREF(ACECONSTANT.BOOKMARK);
        _parametersForOne.setRI(ACOneConstant.DefaultRI);
        this.loadSV();
        _parametersForOne.getUDF1();
        _parametersForOne.getUDF2();
        _parametersForOne.getUDF3();
        this.setSTS(ACECONSTANT.ZERO);
        _parametersForOne.setADELD(false);
        _parametersForOne.setADID(ACECONSTANT.DEFAULT_ADID);
        ACELog.d(ACEParameterUtilForOne._TAG, `tz: ${_parametersForOne.getTZ()}`);
        this.setNewSession();
        ACS.setPackageNameOrBundleID(ACEParameterUtil.getPackageNameOrBundleID());
        const promiseWorkLoadVT = this.loadVT();
        return new Promise((resolve, reject) => {
            Promise.all([promiseWorkLoadVT])
                .then(res => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all res:', res);
                this.getVT();
                this.loadUniqueKeyForSDK();
                ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all vt:', this.getVT());
                const response = {
                    taskHash: '0003',
                    code: ACEResultCode.Success,
                    result: ACEConstantCallback[ACEConstantCallback.Success],
                    message: 'SDK init step one done',
                    apiName: 'init',
                };
                if (callback) {
                    callback(undefined, response);
                }
                else {
                    resolve(response);
                }
            })
                .catch(err => {
                ACELog.d(ACEParameterUtilForOne._TAG, 'Promise.all err:', err);
                const response = {
                    taskHash: '0004',
                    code: ACEResultCode.FailAfterRequest,
                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                    message: 'SDK init step one fail',
                    apiName: 'init',
                };
                if (callback) {
                    callback(err, response);
                }
                else {
                    reject(response);
                }
            });
        });
    }
    setID(value) {
        if (!isEmpty(value) && this._enablePrivacyPolicy) {
            value = ACOneConstant.EnabledPrivacyPolicyUserID;
        }
        return ACEParametersForOne.getInstance().setSTS(value);
    }
    isFirstLog() {
        return this.getSession() == SESSION.NEW;
    }
    resetSessionAndParameterAfterSend() {
        this.resetSessionAndParameterAfterSendWithParams(undefined);
    }
    resetSessionAndParameterAfterSendWithParams(params) {
        if (this.isFirstLog()) {
            this.setKeepSession();
        }
        if (params) {
            const _st = params[ACOneConstantSt.KeyWillUpdateSt];
            if (_st) {
                if (!global.Promise) {
                    this.saveST_toInStorage(_st, (error, result) => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateSt');
                        if (error) {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage error:', error);
                        }
                        if (result) {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage result:', result);
                        }
                    });
                }
                else {
                    this.saveST_toInStorage(_st).then(result => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateSt');
                        ACELog.d(ACEParameterUtilForOne._TAG, 'saveST_toInStorage result:', result);
                    });
                }
            }
            const _vt = params[ACOneConstantVt.KeyWillUpdateVt];
            if (_vt) {
                if (!global.Promise) {
                    this.saveVT_toInStorage(_vt, (error, result) => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateVt');
                        if (error) {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage error:', error);
                        }
                        if (result) {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage result:', result);
                        }
                    });
                }
                else {
                    this.saveVT_toInStorage(_vt).then(result => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'save willUpdateVt');
                        ACELog.d(ACEParameterUtilForOne._TAG, 'saveVT_toInStorage result:', result);
                    });
                }
            }
        }
    }
    setNewSession() {
        ACEParametersForOne.getInstance().setVK(SESSION.NEW);
    }
    getSession() {
        return ACEParametersForOne.getInstance().getVK();
    }
    setKeepSession() {
        ACEParametersForOne.getInstance().setVK(SESSION.KEEP);
    }
    updateSTnVT(willUpdateVt) {
        const _now = new Date();
        const _randomString = getRandom6CharForSTVT();
        if (this.isFirstLog()) {
            this.setStartTS(_now, _randomString);
            this.setSTS(this.getStartTSGoldMaster());
            if (this.getVT().isEmptyAtVTS()) {
                ACELog.d(ACEParameterUtilForOne._TAG, 'update vts');
                this.setVTSButNotStorage(_now, _randomString);
            }
            else {
                ACELog.d(ACEParameterUtilForOne._TAG, `vts is >>${this.getVT().getVTS()}<<`);
            }
            this.setVTSAtObject(willUpdateVt, _now, _randomString);
            const visitCount = this.getVisitCount();
            ACELog.d(ACEParameterUtilForOne._TAG, `visitCount is >>${visitCount}<<`);
            if (visitCount == 0) {
                ACELog.d(ACEParameterUtilForOne._TAG, 'visitCount is 0');
                this.setVisitCountAtObject(willUpdateVt, 2);
            }
            else {
                this.setVisitCountAtObject(willUpdateVt, visitCount + 1);
            }
            if (this.getVT().isEmptyAtBuyTimeTS()) {
                this.setBuyTimeTSButNotStorage(_now, _randomString);
                this.setBuyTimeTSAtObject(willUpdateVt, _now, _randomString);
                this.setBuyCountAtObject(willUpdateVt, 1);
            }
        }
        else {
            ACELog.d(ACEParameterUtilForOne._TAG, `not firstLog: ${this.getSession()}, ${SESSION[this.getSession()]}`);
        }
        this.setGetTS(_now, _randomString);
        return this.saveVT_toInStorage(this.getVT());
    }
    setGetTS(value, random6Value) {
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.getST().setGetTS(value);
        _parametersForOne.getST().setRandom6ForGetTS(random6Value);
    }
    saveST_toInStorage(st, callback) {
        return ACEParametersForOne.getInstance().saveST_toInStorage(st, callback);
    }
    setStartTS(value, random6Value) {
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.getST().setStartTS(value);
        _parametersForOne.getST().setRandom6ForStartTS(random6Value);
    }
    getStartTSGoldMaster() {
        const _parametersForOne = ACEParametersForOne.getInstance();
        return _parametersForOne.getST().getStartTSGoldMaster();
    }
    getSTS() {
        return ACEParametersForOne.getInstance().getSTS();
    }
    setSTS(value) {
        return ACEParametersForOne.getInstance().setSTS(value);
    }
    clearSV() {
        ACEParametersForOne.getInstance().setSV(ACECONSTANT.EMPTY);
    }
    loadSV() {
        ACEParametersForOne.getInstance().setSV(this.makeSV());
    }
    makeSV() {
        return `${ACOneConstant.DefaultServiceCode}${ACS.SDKVersion()}${ACOneConstant.DefaultNotCustomSDKForCustomer}`;
    }
    setTP(value) {
        ACEParametersForOne.getInstance().setTP(value);
    }
    setURL(value) {
        value = onlyLetteringAtStartIndex(value);
        const _parametersForOne = ACEParametersForOne.getInstance();
        ACELog.d(ACEParameterUtilForOne._TAG, `>>${ACS.getPackageNameOrBundleID()}/${value}<<`);
        _parametersForOne.setURL(`${ACS.getPackageNameOrBundleID()}/${value}`);
    }
    updateUrlToRef(value) {
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.setREF(_parametersForOne.getURL());
        this.setURL(value);
    }
    setBuyCountAtObject(willUpdateVt, value) {
        willUpdateVt.setBuyCount(value);
    }
    getBuyTimeTS() {
        return ACEParametersForOne.getInstance().getVT().getBuyTimeTS();
    }
    setBuyTimeTSButNotStorage(value, random) {
        this.getVT().setBuyTimeTS(value);
        this.getVT().setRandom6ForBuyTimeTS(random);
    }
    setBuyTimeTSAtObject(willUpdateVt, value, random) {
        willUpdateVt.setBuyTimeTS(value);
        willUpdateVt.setRandom6ForBuyTimeTS(random);
    }
    getVisitCount() {
        return stringToNumber(this.getVT().getVisitCount(), 10);
    }
    setVisitCountAtObject(willUpdateVt, value) {
        willUpdateVt.setVisitCount(value);
    }
    getVT() {
        return ACEParametersForOne.getInstance().getVT();
    }
    loadVT(callback) {
        return ACEParametersForOne.getInstance().loadVT(callback);
    }
    setVTSButNotStorage(value, random) {
        this.getVT().setVTS(value);
        this.getVT().setRandom6ForVTS(random);
    }
    setVTSAtObject(willUpdateVt, value, random) {
        willUpdateVt.setVTS(value);
        willUpdateVt.setRandom6ForVTS(random);
    }
    saveVT_toInStorage(vt, callback) {
        return ACEParametersForOne.getInstance().saveVT_toInStorage(vt, callback);
    }
    setUserID(value) {
        if (!isEmpty(value) && this._enablePrivacyPolicy) {
            value = ACOneConstant.EnabledPrivacyPolicyUserID;
        }
        return ACEParametersForOne.getInstance().setSTS(value);
    }
    setterForString(key, value) { }
    getParamsToObjectForLogSend() {
        return ACEParametersForOne.getInstance().getParamsToObjectForLogSend();
    }
}
ACEParameterUtilForOne._TAG = 'paramUtilForOne';
//# sourceMappingURL=ACEParameterUtilForOne.js.map