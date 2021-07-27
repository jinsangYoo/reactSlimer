import { isEmpty } from '../../common/util/TextUtils';
import ACECONSTANT from '../constant/ACEConstant';
export default class ACEPolicyParameters {
    constructor() {
        this.setCpAllow(undefined);
        this.setCpApp(0);
        this.setCpCid(undefined);
        this.setCpDebug(undefined);
        this.setCpDomain(undefined);
        this.setCpPrivate(undefined);
        this.setCpSourceIP(undefined);
        this.setToastAppKey(undefined);
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    getCpAllow() {
        return this.cpAllow;
    }
    setCpAllow(value) {
        if (isEmpty(value)) {
            this.cpAllow = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpAllow = value;
        }
    }
    getCpApp() {
        return this.cpApp;
    }
    setCpApp(value) {
        if (!value || value < 0) {
            value = 0;
        }
        this.cpApp = value;
    }
    getCpCid() {
        return this.cpCid;
    }
    setCpCid(value) {
        if (!value || isEmpty(value)) {
            this.cpCid = ACECONSTANT.EMPTY;
        }
        else {
            this.cpCid = value;
        }
    }
    getCpDebug() {
        return this.cpDebug;
    }
    setCpDebug(value) {
        if (!value || isEmpty(value)) {
            this.cpDebug = ACECONSTANT.EMPTY;
        }
        else {
            this.cpDebug = value;
        }
    }
    getCpDomain() {
        return this.cpDomain;
    }
    setCpDomain(value) {
        if (!value || isEmpty(value)) {
            this.cpDomain = ACECONSTANT.EMPTY;
        }
        else {
            this.cpDomain = value;
        }
    }
    getCpPrivate() {
        return this.cpPrivate;
    }
    setCpPrivate(value) {
        if (!value || isEmpty(value)) {
            this.cpPrivate = ACECONSTANT.EMPTY;
        }
        else {
            this.cpPrivate = value;
        }
    }
    getCpSourceIP() {
        return this.cpSourceIP;
    }
    setCpSourceIP(value) {
        if (!value || isEmpty(value)) {
            this.cpSourceIP = ACECONSTANT.EMPTY;
        }
        else {
            this.cpSourceIP = value;
        }
    }
    getCpCrashDomain() {
        return this.cpCrashDomain;
    }
    setCpCrashDomain(value) {
        if (!value || isEmpty(value)) {
            this.cpCrashDomain = ACECONSTANT.EMPTY;
        }
        else {
            this.cpCrashDomain = value;
        }
    }
    getToastAppKey() {
        return this.toastAppKey;
    }
    setToastAppKey(value) {
        if (!value || isEmpty(value)) {
            this.toastAppKey = ACECONSTANT.EMPTY;
        }
        else {
            this.toastAppKey = value;
        }
    }
}
//# sourceMappingURL=ACEPolicyParameters.js.map