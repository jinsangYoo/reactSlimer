import { HttpURLConnection } from '../constant/Network';
import POLICY from '../constant/Policy';
import ACEPolicyParameters from './ACEPolicyParameters';
import ControlTowerSingleton from '../controltower/ControlTowerSingleton';
export default class ACEPolicyParameterUtil {
    constructor() {
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
        try {
            if (responseHeaders[POLICY.RESPONSE_SDK_ENABLE.toLowerCase()]) {
                console.log(`in if key: ${POLICY.RESPONSE_SDK_ENABLE.toLowerCase()}, value: ${responseHeaders[POLICY.RESPONSE_SDK_ENABLE.toLowerCase()]}`);
                _policyParameters.setCpAllow(responseHeaders[POLICY.RESPONSE_SDK_ENABLE.toLowerCase()]);
                if (!ControlTowerSingleton.getInstance().isEnableByPolicy()) {
                    ControlTowerSingleton.getInstance().setSDKDisable();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        console.log('done save policy.');
    }
}
//# sourceMappingURL=ACEPolicyParameterUtil.js.map