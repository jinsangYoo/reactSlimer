import ACEParametersForOne from './ACEParametersForOne';
import ACEParameterUtil from '../../common/parameter/ACEParameterUtil';
import ACECONSTANT from '../../common/constant/ACEConstant';
import ACOneConstantInteger from '../../common/constant/ACOneConstantInteger';
import ACOneConstant from '../constant/ACOneConstant';
import { ACS } from '../acs';
import SESSION from '../../common/constant/Session';
import ACOneConstantSt from '../constant/ACOneConstantSt';
import ACOneConstantVt from '../constant/ACOneConstantVt';
import { ACEConstantCallback, ACEResultCode } from '../../common/constant/ACEPublicStaticConfig';
export default class ACEParameterUtilForOne {
    constructor() { }
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
    initParameters(key, callback) {
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
        this.setNewSession();
        ACS.setPackageNameOrBundleID(ACEParameterUtil.getPackageNameOrBundleID());
        const promiseWorkLoadVT = this.loadVT();
        return new Promise((resolve, reject) => {
            Promise.all([promiseWorkLoadVT])
                .then(res => {
                console.log(`then Promise.all::res: ${JSON.stringify(res)}`);
                this.getVT();
                this.loadUniqueKeyForSDK();
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
                console.log(`catch Promise.all::err: ${JSON.stringify(err)}`);
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
                        console.log('save willUpdateSt');
                        if (error) {
                            console.log(`error: ${JSON.stringify(error)}`);
                        }
                        if (result) {
                            console.log(`result: ${JSON.stringify(error)}`);
                        }
                    });
                }
                else {
                    this.saveST_toInStorage(_st).then(result => {
                        console.log('save willUpdateSt');
                        console.log(`result: ${JSON.stringify(result)}`);
                    });
                }
            }
            const _vt = params[ACOneConstantVt.KeyWillUpdateVt];
            if (_vt) {
                if (!global.Promise) {
                    this.saveVT_toInStorage(_vt, (error, result) => {
                        console.log('save willUpdateVt');
                        if (error) {
                            console.log(`error: ${JSON.stringify(error)}`);
                        }
                        if (result) {
                            console.log(`result: ${JSON.stringify(error)}`);
                        }
                    });
                }
                else {
                    this.saveVT_toInStorage(_vt).then(result => {
                        console.log('save willUpdateVt');
                        console.log(`result: ${JSON.stringify(result)}`);
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
    saveST_toInStorage(st, callback) {
        return ACEParametersForOne.getInstance().saveST_toInStorage(st, callback);
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
    getVT() {
        return ACEParametersForOne.getInstance().getVT();
    }
    loadVT(callback) {
        return ACEParametersForOne.getInstance().loadVT(callback);
    }
    saveVT_toInStorage(vt, callback) {
        return ACEParametersForOne.getInstance().saveVT_toInStorage(vt, callback);
    }
    setterForString(key, value) { }
}
//# sourceMappingURL=ACEParameterUtilForOne.js.map