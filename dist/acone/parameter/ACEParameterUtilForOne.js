import ACEParametersForOne from './ACEParametersForOne';
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil';
import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantInteger from '../constant/ACOneConstantInteger';
import ACOneConstant from '../constant/ACOneConstant';
import { ACS } from '../acs';
import SESSION from '../../common/constant/Session';
import { ACEConstantCallback, ACEResultCode, ACEGender, ACEMaritalStatus, } from '../../common/constant/ACEPublicStaticConfig';
import { isEmpty, onlyLetteringAtStartIndex, stringToNumber } from '../../common/util/TextUtils';
import ACELog from '../../common/logger/ACELog';
import { getRandom6CharForSTVT } from '../../common/util/NumberUtil';
import IACBuyMode from '../constant/IACBuyMode';
import JN from '../constant/JN';
import ACEofAPIForOne from '../constant/ACEofAPIForOne';
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
    setAdvertisingIdentifier(advertisingIdentifier) {
        ACEParametersForOne.getInstance().setADID(advertisingIdentifier);
    }
    isDuplicateInstallReferrer(value) {
        return new Promise((resolve, reject) => {
            ACEParametersForOne.getInstance()
                .getInstallReferrer()
                .then(result => {
                ACELog.d(ACEParameterUtilForOne._TAG, `result: ${JSON.stringify(result)}, new referrer: ${value}`);
                if (!isEmpty(result.getValue)) {
                    ACELog.d(ACEParameterUtilForOne._TAG, 'Already stored referrer,');
                    if (result.getValue == value) {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'Same referrer');
                    }
                    else {
                        resolve(true);
                        return;
                    }
                }
                reject(false);
            })
                .catch(err => {
                ACELog.d(ACEParameterUtilForOne._TAG, `err: ${JSON.stringify(err)}`);
                reject(false);
            });
        });
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
        _parametersForOne.setADID(ACEParameterUtil.getUniqueId());
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
    getBuyMode() {
        return ACEParametersForOne.getInstance().getMD();
    }
    setBuyMode(value) {
        ACEParametersForOne.getInstance().setMD(value);
    }
    clearBuyMode() {
        ACEParametersForOne.getInstance().setMD(IACBuyMode.Unknown);
    }
    setKeyword(value) {
        ACEParametersForOne.getInstance().setSKEY(value);
    }
    clearKeyword() {
        this.setKeyword(ACECONSTANT.EMPTY);
    }
    getKW() {
        return ACEParametersForOne.getInstance().getKW();
    }
    setKW(value) {
        ACEParametersForOne.getInstance().setKW(value);
    }
    clearKW() {
        ACEParametersForOne.getInstance().setKW(ACECONSTANT.EMPTY);
    }
    setJN(value) {
        var _jn = JN.Unknown;
        switch (value) {
            case ACEofAPIForOne.Join:
                _jn = JN.Join;
                break;
            case ACEofAPIForOne.Leave:
                _jn = JN.Withdraw;
                break;
        }
        ACEParametersForOne.getInstance().setJN(_jn);
    }
    clearJn() {
        this.setJN(-1);
    }
    getOrderNumber() {
        return ACEParametersForOne.getInstance().getONUM();
    }
    setOrderNumber(value) {
        ACEParametersForOne.getInstance().setONUM(value);
    }
    clearOrderNumber() {
        ACEParametersForOne.getInstance().setONUM(ACECONSTANT.EMPTY);
    }
    getPaymentMethod() {
        return ACEParametersForOne.getInstance().getPayMethod();
    }
    setPaymentMethod(value) {
        ACEParametersForOne.getInstance().setPayMethod(value);
    }
    clearPayMethod() {
        ACEParametersForOne.getInstance().setPayMethod(ACECONSTANT.EMPTY);
    }
    setProduct(value) {
        ACEParametersForOne.getInstance().setLL(value);
    }
    clearProduct() {
        ACEParametersForOne.getInstance().setLL(ACECONSTANT.EMPTY);
    }
    clearProductName() {
        ACEParametersForOne.getInstance().setPD(ACECONSTANT.EMPTY);
    }
    setProductName(value) {
        ACEParametersForOne.getInstance().setPD(value);
    }
    clearProductCategoryName() {
        ACEParametersForOne.getInstance().setCT(ACECONSTANT.EMPTY);
    }
    setProductCategoryName(value) {
        ACEParametersForOne.getInstance().setCT(value);
    }
    clearProductPrice() {
        ACEParametersForOne.getInstance().setAMT(ACECONSTANT.EMPTY);
    }
    setProductPrice(value) {
        ACEParametersForOne.getInstance().setAMT(value);
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
            const _st = params.st;
            const _vt = params.vt;
            if (_st) {
                if (_vt) {
                    return new Promise((resolve, reject) => {
                        this.saveST_toInStorage(_st)
                            .then(result => {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate St');
                            ACELog.d(ACEParameterUtilForOne._TAG, `resetSession::result: ${result.getKey}`, JSON.parse(result.getValue));
                            return this.saveVT_toInStorage(_vt);
                        })
                            .then(result => {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate Vt');
                            ACELog.d(ACEParameterUtilForOne._TAG, `resetSession::result: ${result.getKey}`, JSON.parse(result.getValue));
                            resolve(true);
                        })
                            .catch(err => {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate S/Vt.');
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err);
                            reject(false);
                        });
                    });
                }
                else {
                    return new Promise((resolve, reject) => {
                        this.saveST_toInStorage(_st)
                            .then(result => {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate St');
                            ACELog.d(ACEParameterUtilForOne._TAG, `resetSession::result: ${result.getKey}`, JSON.parse(result.getValue));
                            resolve(true);
                        })
                            .catch(err => {
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate only St.');
                            ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err);
                            reject(false);
                        });
                    });
                }
            }
            if (_vt) {
                return new Promise((resolve, reject) => {
                    this.saveVT_toInStorage(_vt)
                        .then(result => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::save willUpdate Vt');
                        ACELog.d(ACEParameterUtilForOne._TAG, `resetSession::result: ${result.getKey}`, JSON.parse(result.getValue));
                        resolve(true);
                    })
                        .catch(err => {
                        ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::fail willUpdate only Vt.');
                        ACELog.d(ACEParameterUtilForOne._TAG, 'resetSession::err', err);
                        reject(false);
                    });
                });
            }
        }
        return new Promise((resolve, reject) => {
            ACELog.d(ACEParameterUtilForOne._TAG, 'not save S/Vt.');
            resolve(true);
        });
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
    clearSRC() {
        ACEParametersForOne.getInstance().setSRC(ACECONSTANT.EMPTY);
    }
    getSRC() {
        return ACEParametersForOne.getInstance().getSRC();
    }
    setSRC(value) {
        ACEParametersForOne.getInstance().setSRC(value);
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
                this.setBuyTimeTSButNotStorage(_now.valueOf().toString(), _randomString);
                this.setBuyTimeTSAtObject(willUpdateVt, _now.valueOf().toString(), _randomString);
                this.setBuyCountAtObject(willUpdateVt, 1);
            }
        }
        else {
            ACELog.d(ACEParameterUtilForOne._TAG, `not firstLog: ${this.getSession()}, ${SESSION[this.getSession()]}`);
        }
        this.setGetTS(_now, _randomString);
        return this.saveVT_toInStorage(this.getVT());
    }
    getST() {
        return ACEParametersForOne.getInstance().getST();
    }
    setGetTS(value, random6Value) {
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.getST().setGetTS(value);
        _parametersForOne.getST().setRandom6ForGetTS(random6Value);
    }
    makeInsenginetTS() {
        this.setInsenginetTS(new Date(), getRandom6CharForSTVT());
    }
    setInsenginetTS(value, random6Value) {
        const _parametersForOne = ACEParametersForOne.getInstance();
        _parametersForOne.getST().setInsenginetTS(value);
        _parametersForOne.getST().setRandom6ForInsenginetTS(random6Value);
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
    clearREF() {
        ACEParametersForOne.getInstance().clearREF();
    }
    setRefWithBundleID(value) {
        if (isEmpty(value)) {
            value = ACECONSTANT.EMPTY;
        }
        ACELog.d(ACEParameterUtilForOne._TAG, `value: >>${value}<<`);
        value = onlyLetteringAtStartIndex(value);
        ACELog.d(ACEParameterUtilForOne._TAG, `>>${ACS.getPackageNameOrBundleID()}/${value}<<`);
        ACEParametersForOne.getInstance().setREF(`${ACS.getPackageNameOrBundleID()}/${value}`);
    }
    setRefForTel(value) {
        if (isEmpty(value)) {
            value = ACECONSTANT.EMPTY;
        }
        ACELog.d(ACEParameterUtilForOne._TAG, `value: >>${value}<<`);
        value = onlyLetteringAtStartIndex(value);
        ACELog.d(ACEParameterUtilForOne._TAG, `>>tel:${value}<<`);
        ACEParametersForOne.getInstance().setREF(`tel:${value}`);
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
    getUserAge() {
        return ACEParametersForOne.getInstance().getAG();
    }
    setUserAge(value) {
        ACEParametersForOne.getInstance().setAG(value);
    }
    clearUserAge() {
        this.setUserAge(0);
    }
    getUserGender() {
        return ACEGender[ACEParametersForOne.getInstance().getGD()];
    }
    setUserGender(value) {
        ACEParametersForOne.getInstance().setGD(value);
    }
    clearUserGender() {
        this.setUserGender(ACEGender.Unknown);
    }
    getLoginUserID() {
        return ACEParametersForOne.getInstance().getID();
    }
    setLoginUserID(value) {
        if (!isEmpty(value) && this._enablePrivacyPolicy) {
            value = ACOneConstant.EnabledPrivacyPolicyUserID;
        }
        ACEParametersForOne.getInstance().setID(value);
    }
    clearLoginUserID() {
        ACEParametersForOne.getInstance().setID(ACECONSTANT.EMPTY);
    }
    getJoinOrLeaveUserID() {
        return ACEParametersForOne.getInstance().getUserID();
    }
    setJoinOrLeaveUserID(value) {
        if (!isEmpty(value) && this._enablePrivacyPolicy) {
            value = ACOneConstant.EnabledPrivacyPolicyUserID;
        }
        ACEParametersForOne.getInstance().setUserID(value);
    }
    clearJoinOrLeaveUserID() {
        ACEParametersForOne.getInstance().setUserID(ACECONSTANT.EMPTY);
    }
    getUserMaritalStatus() {
        return ACEMaritalStatus[ACEParametersForOne.getInstance().getMR()];
    }
    setUserMaritalStatus(value) {
        ACEParametersForOne.getInstance().setMR(value);
    }
    clearUserMaritalStatus() {
        this.setUserMaritalStatus(ACEMaritalStatus.Unknown);
    }
    setterForString(key, value) { }
    getParamsToObjectForLogSend() {
        return ACEParametersForOne.getInstance().getParamsToObjectForLogSend();
    }
}
ACEParameterUtilForOne._TAG = 'paramUtilForOne';
//# sourceMappingURL=ACEParameterUtilForOne.js.map