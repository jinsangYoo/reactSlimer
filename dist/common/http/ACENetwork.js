import axios from 'axios';
import { HTTP_METHOD, BASE_URL, HTTP_URL } from '../constant/Network';
import POLICY from '../constant/Policy';
import { NetworkMode, NetworkRequestType } from '../constant/SDKMode';
import ACECommonStaticConfig from '../config/ACECommonStaticConfig';
import { Platform } from 'react-native';
import { ACS } from '../../acone/acs';
import { mapValueStringToObject } from '../util/MapUtil';
import ACELog from '../logger/ACELog';
import ControlTowerSingleton from '../controltower/ControlTowerSingleton';
export class ACENetwork {
    static networkRequestTypeToParams(requestType) {
        const currentNetworkMode = ControlTowerSingleton.getInstance().getNetworkMode();
        ACELog.d(ACENetwork._TAG, `networkRequestTypeToParams requestType: ${NetworkRequestType[requestType]}, currentNetworkMode:${NetworkMode[currentNetworkMode]}`);
        return {
            baseUrl: this.networkRequestTypeToBaseURLs(currentNetworkMode, requestType),
            requestHeaders: this.networkRequestTypeToHeaders(currentNetworkMode, requestType),
            url: this.networkRequestTypeToURLs(currentNetworkMode, requestType),
        };
    }
    static logToBaseURL(networkMode) {
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
                return BASE_URL.COMPANY_LOCAL_LOG;
            case NetworkMode.HOME_dev:
                return BASE_URL.HOME_LOCAL_LOG;
            case NetworkMode.Pro:
                return BASE_URL.PRO_LOG;
        }
    }
    static policyToBaseURL(networkMode) {
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
                return BASE_URL.COMPANY_LOCAL_POLICY;
            case NetworkMode.HOME_dev:
                return BASE_URL.HOME_LOCAL_POLICY;
            case NetworkMode.Pro:
                return BASE_URL.PRO_POLICY;
        }
    }
    static networkRequestTypeToBaseURLs(networkMode, requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToBaseURL(networkMode);
            case NetworkRequestType.POLICY:
                return this.policyToBaseURL(networkMode);
        }
    }
    static logToRequestHeaders(networkMode) {
        const _map = new Map();
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
                return _map;
            case NetworkMode.HOME_dev:
                return _map;
            case NetworkMode.Pro:
                return _map;
        }
    }
    static policyToRequestHeaders(networkMode) {
        var _a;
        const _map = new Map();
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
            case NetworkMode.HOME_dev:
            case NetworkMode.Pro:
                _map.set(POLICY.REQUEST_APPLICATION_ID, (_a = ACS.getPackageNameOrBundleID()) !== null && _a !== void 0 ? _a : 'no packageName');
                _map.set(POLICY.REQUEST_CID, ACECommonStaticConfig.getKey());
                _map.set(POLICY.REQUEST_PLATFORM, Platform.OS);
                _map.set(POLICY.REQUEST_SERVICE_ID, ACECommonStaticConfig.getKey());
                _map.set(POLICY.REQUEST_TIME, Date.now().toString());
                _map.set(POLICY.REQUEST_VERSION, ACS.SDKVersion());
                break;
        }
        return _map;
    }
    static networkRequestTypeToHeaders(networkMode, requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToRequestHeaders(networkMode);
            case NetworkRequestType.POLICY:
                return this.policyToRequestHeaders(networkMode);
        }
    }
    static logToURL(networkMode) {
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
                return HTTP_URL.COMPANY_LOCAL_LOG;
            case NetworkMode.HOME_dev:
                return HTTP_URL.HOME_LOCAL_LOG;
            case NetworkMode.Pro:
                return HTTP_URL.PRO_LOG;
        }
    }
    static policyToURL(networkMode) {
        switch (networkMode) {
            case NetworkMode.COMPANY_dev:
                return HTTP_URL.COMPANY_LOCAL_POLICY;
            case NetworkMode.HOME_dev:
                return HTTP_URL.HOME_LOCAL_POLICY;
            case NetworkMode.Pro:
                return HTTP_URL.PRO_POLICY;
        }
    }
    static networkRequestTypeToURLs(networkMode, requestType) {
        switch (requestType) {
            case NetworkRequestType.LOG:
                return this.logToURL(networkMode);
            case NetworkRequestType.POLICY:
                return this.policyToURL(networkMode);
        }
    }
    static requestToPolicy(completed, failed) {
        ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.POLICY), completed, failed);
    }
    static requestToLog(completed, failed) {
        ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.LOG), completed, failed);
    }
    static request(params, completed, failed, method = HTTP_METHOD.GET) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common['Content-Type'] = 'text/plain';
        axios.defaults.headers.common['User-Agent'] = 'react-native ' + Platform.OS;
        const requestHeaders = mapValueStringToObject(params.requestHeaders);
        ACELog.d(ACENetwork._TAG, 'request requestHeaders:', requestHeaders);
        const requestConfig = {
            url: params.url,
            method: method,
            baseURL: params.baseUrl,
            headers: requestHeaders,
            timeout: 1000,
        };
        axios
            .create()
            .request(requestConfig)
            .then(response => {
            if (completed) {
                completed(response);
            }
        })
            .catch(error => {
            if (failed) {
                failed(error);
            }
        });
    }
}
ACENetwork._TAG = 'Net';
//# sourceMappingURL=ACENetwork.js.map