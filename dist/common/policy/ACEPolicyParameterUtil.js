import { HttpURLConnection } from '../constant/Network';
import POLICY from '../constant/Policy';
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
        const _policyParameters = ACEPolicyParameters.getInstance();
        const responseHeaders = result.getHeaders();
        if (responseHeaders[POLICY.RESPONSE_SDK_ENABLE.toLowerCase()]) {
            _policyParameters.setCpAllow(responseHeaders[POLICY.RESPONSE_SDK_ENABLE.toLowerCase()]);
            if (!ControlTowerSingleton.getInstance().isEnableByPolicy()) {
                console.log('disabled by policy.');
                ControlTowerSingleton.getInstance().setSDKDisable();
            }
        }
        if (responseHeaders[POLICY.RESPONSE_CID.toLowerCase()]) {
            _policyParameters.setCpCid(responseHeaders[POLICY.RESPONSE_CID.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_DEBUG.toLowerCase()]) {
            _policyParameters.setCpDebug(responseHeaders[POLICY.RESPONSE_DEBUG.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_DOMAIN.toLowerCase()]) {
            _policyParameters.setCpDomain(responseHeaders[POLICY.RESPONSE_DOMAIN.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_PRIVATE.toLowerCase()]) {
            _policyParameters.setCpPrivate(responseHeaders[POLICY.RESPONSE_PRIVATE.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_SOURCE_IP.toLowerCase()]) {
            _policyParameters.setCpSourceIP(responseHeaders[POLICY.RESPONSE_SOURCE_IP.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_FORCE_STOP.toLowerCase()]) {
            const _value = responseHeaders[POLICY.RESPONSE_SOURCE_IP.toLowerCase()];
            if (!isEmpty(_value) && _value === POLICY.FLAG_SDK_FORCE_STOP) {
                console.log('force stop enabled.');
                ControlTowerSingleton.getInstance().enableForceStop();
            }
        }
        if (responseHeaders[POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase()]) {
            _policyParameters.setCpCrashDomain(responseHeaders[POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase()]);
        }
        if (responseHeaders[POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase()]) {
            var interval = ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND;
            const _value = responseHeaders[POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase()];
            if (_value && !isEmpty(_value)) {
                interval = parseInt(_value);
                if (interval < ACEConstantInteger.TWO_MINUTES) {
                    interval = ACEConstantInteger.TWO_MINUTES;
                }
                ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND = interval;
            }
        }
        if (responseHeaders[POLICY.RESPONSE_TOAST_APPKEY.toLowerCase()]) {
            _policyParameters.setToastAppKey(responseHeaders[POLICY.RESPONSE_TOAST_APPKEY.toLowerCase()]);
        }
        console.log(_policyParameters.toJSON());
        console.log('done save policy.');
    }
}
ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND_DEFAULT = 6 * 60 * 60;
//# sourceMappingURL=ACEPolicyParameterUtil.js.map