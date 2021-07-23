import { HttpURLConnection } from '../constant/Network';
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
        console.log('done save policy.');
    }
}
//# sourceMappingURL=ACEPolicyParameterUtil.js.map