import { HttpURLConnection } from '../constant/Network';
import ACEPolicyParameters from './ACEPolicyParameters';
import { isEmpty } from '../util/TextUtils';
import ControlTowerSingleton from '../controltower/ControlTowerSingleton';
import ACEConstantInteger from '../constant/ACEConstantInteger';
export default class ACEPolicyParameterUtil {
    constructor() {
        ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND =
            ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND_DEFAULT;
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    savePolicy(result) {
        if (result.getCode() != HttpURLConnection.HTTP_OK) {
            console.log(`http response code not ok: ${result.getCode()}`);
            return;
        }
        console.log('Receive policy.');
        console.log(`ACEPolicyParameterUtil::savePolicy::_response: ${JSON.stringify(result)}`);
        const _policyParameters = ACEPolicyParameters.getInstance();
        const responseHeaders = result.getHeaders();
        if (responseHeaders.has("Cp-Allow".toLowerCase())) {
            _policyParameters.setCpAllow(responseHeaders.get("Cp-Allow".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Cid".toLowerCase())) {
            _policyParameters.setCpCid(responseHeaders.get("Cp-Cid".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Debug".toLowerCase())) {
            _policyParameters.setCpDebug(responseHeaders.get("Cp-Debug".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Domain".toLowerCase())) {
            _policyParameters.setCpDomain(responseHeaders.get("Cp-Domain".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Private".toLowerCase())) {
            _policyParameters.setCpPrivate(responseHeaders.get("Cp-Private".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Source-Ip".toLowerCase())) {
            _policyParameters.setCpSourceIP(responseHeaders.get("Cp-Source-Ip".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Force-Stop".toLowerCase())) {
            const _value = responseHeaders.get("Cp-Source-Ip".toLowerCase());
            if (!isEmpty(_value) && _value === "1") {
                ControlTowerSingleton.getInstance().enableForceStop();
            }
        }
        if (responseHeaders.has("Cp-Crash-Domain".toLowerCase())) {
            _policyParameters.setCpCrashDomain(responseHeaders.get("Cp-Crash-Domain".toLowerCase()));
        }
        if (responseHeaders.has("Cp-Repeat-Interval".toLowerCase())) {
            var interval = ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND;
            const _value = responseHeaders.get("Cp-Repeat-Interval".toLowerCase());
            if (_value && !isEmpty(_value)) {
                interval = parseInt(_value);
                if (interval < ACEConstantInteger.TWO_MINUTES) {
                    interval = ACEConstantInteger.TWO_MINUTES;
                }
                ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND = interval;
            }
        }
        if (responseHeaders.has("Cp-LNC-Id".toLowerCase())) {
            _policyParameters.setToastAppKey(responseHeaders.get("Cp-LNC-Id".toLowerCase()));
        }
    }
}
ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND_DEFAULT = 6 * 60 * 60;
//# sourceMappingURL=ACEPolicyParameterUtil.js.map