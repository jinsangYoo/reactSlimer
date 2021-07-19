import axios from 'axios';
import { HTTP_METHOD, BASE_URL, HTTP_URL } from '../constant/Network';
import ControlTower from '../controltower/ControlTower';
import { NetworkMode, NetworkRequestType } from '../constant/SDKMode';
import ACECommonStaticConfig from '../config/ACECommonStaticConfig';
import { Platform } from 'react-native';
import { ACS } from '../../acone/acs';
import { mapValueStringToObject } from '../util/MapUtil';
export class ACENetwork {
    static networkRequestTypeToParams(requestType) {
        return {
            baseUrl: this.networkRequestTypeToBaseURLs(requestType),
            requestHeaders: this.networkRequestTypeToHeaders(requestType),
            url: this.networkRequestTypeToURLs(requestType),
        };
    }
    static logToBaseURL() {
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
                return BASE_URL.COMPANY_LOCAL_LOG;
            case NetworkMode.HOME_dev:
                return BASE_URL.HOME_LOCAL_LOG;
            case NetworkMode.Pro:
                return BASE_URL.PRO_LOG;
        }
    }
    static policyToBaseURL() {
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
                return BASE_URL.COMPANY_LOCAL_POLICY;
            case NetworkMode.HOME_dev:
                return BASE_URL.HOME_LOCAL_POLICY;
            case NetworkMode.Pro:
                return BASE_URL.PRO_POLICY;
        }
    }
    static networkRequestTypeToBaseURLs(requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToBaseURL();
            case NetworkRequestType.POLICY:
                return this.policyToBaseURL();
        }
    }
    static logToRequestHeaders() {
        const _map = new Map();
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
                return _map;
            case NetworkMode.HOME_dev:
                return _map;
            case NetworkMode.Pro:
                return _map;
        }
    }
    static policyToRequestHeaders() {
        var _a;
        const _map = new Map();
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
            case NetworkMode.HOME_dev:
            case NetworkMode.Pro:
                _map.set("CP-Application-Id", (_a = ACS.getPackageNameOrBundleID()) !== null && _a !== void 0 ? _a : 'no packageName');
                _map.set("CP-Request-Cid", ACECommonStaticConfig.getKey());
                _map.set("CP-Request-Platform", Platform.OS);
                _map.set("CP-Request-Id", ACECommonStaticConfig.getKey());
                _map.set("CP-Request-Time", new Date().valueOf().toString());
                _map.set("CP-Request-Version", ACS.SDKVersion());
                break;
        }
        return _map;
    }
    static networkRequestTypeToHeaders(requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToRequestHeaders();
            case NetworkRequestType.POLICY:
                return this.policyToRequestHeaders();
        }
    }
    static logToURL() {
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
                return HTTP_URL.COMPANY_LOCAL_LOG;
            case NetworkMode.HOME_dev:
                return HTTP_URL.HOME_LOCAL_LOG;
            case NetworkMode.Pro:
                return HTTP_URL.PRO_LOG;
        }
    }
    static policyToURL() {
        switch (ControlTower.getInstance().getNetworkMode()) {
            case NetworkMode.COMPANY_dev:
                return HTTP_URL.COMPANY_LOCAL_POLICY;
            case NetworkMode.HOME_dev:
                return HTTP_URL.HOME_LOCAL_POLICY;
            case NetworkMode.Pro:
                return HTTP_URL.PRO_POLICY;
        }
    }
    static networkRequestTypeToURLs(requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToURL();
            case NetworkRequestType.POLICY:
                return this.policyToURL();
        }
    }
    static requestToPolicy(completed, failed) {
        return ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.POLICY), completed, failed);
    }
    static requestToLog(completed, failed) {
        return ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.LOG), completed, failed);
    }
    static request(params, completed, failed, method = HTTP_METHOD.GET) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Content-Type'] = 'text/plain';
        const requestHeaders = mapValueStringToObject(params.requestHeaders);
        console.log('params.requestHeaders: ' + JSON.stringify(requestHeaders));
        const requestConfig = {
            url: params.url,
            method: method,
            baseURL: params.baseUrl,
            headers: requestHeaders,
            timeout: 1000,
        };
        return new Promise((resolve, reject) => {
            axios
                .create()
                .request(requestConfig)
                .then(response => {
                if (completed) {
                    completed(response);
                }
                else {
                    resolve(response);
                }
            })
                .catch(error => {
                if (failed) {
                    failed(error);
                }
                else {
                    reject(error);
                }
            });
        });
    }
}
//# sourceMappingURL=ACENetwork.js.map