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
        if (value === undefined || value < 0) {
            value = 0;
        }
        this.cpApp = value;
    }
    getCpCid() {
        return this.cpCid;
    }
    setCpCid(value) {
        if (isEmpty(value)) {
            this.cpCid = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpCid = value;
        }
    }
    getCpDebug() {
        return this.cpDebug;
    }
    setCpDebug(value) {
        if (isEmpty(value)) {
            this.cpDebug = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpDebug = value;
        }
    }
    getCpDomain() {
        return this.cpDomain;
    }
    setCpDomain(value) {
        if (isEmpty(value)) {
            this.cpDomain = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpDomain = value;
        }
    }
    getCpPrivate() {
        return this.cpPrivate;
    }
    setCpPrivate(value) {
        if (isEmpty(value)) {
            this.cpPrivate = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpPrivate = value;
        }
    }
    getCpSourceIP() {
        return this.cpSourceIP;
    }
    setCpSourceIP(value) {
        if (isEmpty(value)) {
            this.cpSourceIP = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpSourceIP = value;
        }
    }
    getCpCrashDomain() {
        return this.cpCrashDomain;
    }
    setCpCrashDomain(value) {
        if (isEmpty(value)) {
            this.cpCrashDomain = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.cpCrashDomain = value;
        }
    }
    getToastAppKey() {
        return this.toastAppKey;
    }
    setToastAppKey(value) {
        if (isEmpty(value)) {
            this.toastAppKey = ACECONSTANT.EMPTY;
        }
        else {
            if (value)
                this.toastAppKey = value;
        }
    }
    toJSON() {
        return JSON.stringify({
            cpAllow: this.cpAllow,
            cpApp: this.cpApp,
            cpCid: this.cpCid,
            cpDebug: this.cpDebug,
            cpDomain: this.cpDomain,
            cpPrivate: this.cpPrivate,
            cpSourceIP: this.cpSourceIP,
            cpCrashDomain: this.cpCrashDomain,
            toastAppKey: this.toastAppKey,
        }, null, 2);
    }
}
//# sourceMappingURL=ACEPolicyParameters.js.map