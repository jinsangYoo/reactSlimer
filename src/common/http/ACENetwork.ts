import axios, {AxiosRequestConfig} from 'axios'
import {HTTP_METHOD, BASE_URL, HTTP_URL, NETWORK_MAP_KEY, ACENetworkParams} from '../constant/Network'
import POLICY from '../constant/Policy'
import ControlTower from '../controltower/ControlTower'
import {NetworkMode, NetworkRequestType} from '../constant/SDKMode'
import {mapToObject} from '../util/MapUtil'
import ACECommonStaticConfig from '../config/ACECommonStaticConfig'
import {Platform} from 'react-native'
import {ACS} from '../../acone/acs'

export class ACENetwork {
  private static networkRequestTypeToParams(requestType: NetworkRequestType): ACENetworkParams {
    return {
      baseUrl: this.networkRequestTypeToBaseURLs(requestType),
      requestHeaders: this.networkRequestTypeToHeaders(requestType),
      url: this.networkRequestTypeToURLs(requestType),
    }
  }

  //#region base url
  private static logToBaseURL(): string {
    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
        return BASE_URL.COMPANY_LOCAL_LOG
      case NetworkMode.HOME_dev:
        return BASE_URL.HOME_LOCAL_LOG
      case NetworkMode.Pro:
        return BASE_URL.PRO_LOG
    }
  }

  private static policyToBaseURL(): string {
    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
        return BASE_URL.COMPANY_LOCAL_POLICY
      case NetworkMode.HOME_dev:
        return BASE_URL.HOME_LOCAL_POLICY
      case NetworkMode.Pro:
        return BASE_URL.PRO_POLICY
    }
  }

  private static networkRequestTypeToBaseURLs(requestType: NetworkRequestType): string {
    switch (requestType) {
      case NetworkRequestType.LOG:
        return this.logToBaseURL()
      case NetworkRequestType.POLICY:
        return this.policyToBaseURL()
    }
  }
  //#endregion

  //#region request headers
  private static logToRequestHeaders(): Map<string, string> {
    const _map = new Map<string, string>()
    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
        return _map
      case NetworkMode.HOME_dev:
        return _map
      case NetworkMode.Pro:
        return _map
    }
  }

  private static policyToRequestHeaders(): Map<string, string> {
    const _map = new Map<string, string>()

    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
      case NetworkMode.HOME_dev:
      case NetworkMode.Pro:
        _map.set(POLICY.REQUEST_APPLICATION_ID, ACS.getPackageNameOrBundleID() ?? 'no packageName')

        _map.set(POLICY.REQUEST_CID, ACECommonStaticConfig.getKey())
        _map.set(POLICY.REQUEST_PLATFORM, Platform.OS)
        _map.set(POLICY.REQUEST_SERVICE_ID, ACECommonStaticConfig.getKey())
        _map.set(POLICY.REQUEST_TIME, new Date().valueOf().toString())
        _map.set(POLICY.REQUEST_VERSION, ACS.SDKVersion())
        break
    }

    return _map
  }

  private static networkRequestTypeToHeaders(requestType: NetworkRequestType): object {
    const _map = new Map<string, object>()
    switch (requestType) {
      case NetworkRequestType.LOG:
        _map.set(NETWORK_MAP_KEY.REQUEST_HEADERS, this.logToRequestHeaders())
        break
      case NetworkRequestType.POLICY:
        _map.set(NETWORK_MAP_KEY.REQUEST_HEADERS, this.policyToRequestHeaders())
        break
    }

    return mapToObject(_map)
  }
  //#endregion

  //#region url
  private static logToURL(): string {
    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
        return HTTP_URL.COMPANY_LOCAL_LOG
      case NetworkMode.HOME_dev:
        return HTTP_URL.HOME_LOCAL_LOG
      case NetworkMode.Pro:
        return HTTP_URL.PRO_LOG
    }
  }

  private static policyToURL(): string {
    switch (ControlTower.getInstance().getNetworkMode()) {
      case NetworkMode.COMPANY_dev:
        return HTTP_URL.COMPANY_LOCAL_POLICY
      case NetworkMode.HOME_dev:
        return HTTP_URL.HOME_LOCAL_POLICY
      case NetworkMode.Pro:
        return HTTP_URL.PRO_POLICY
    }
  }

  private static networkRequestTypeToURLs(requestType: NetworkRequestType): string {
    switch (requestType) {
      case NetworkRequestType.LOG:
        return this.logToURL()
      case NetworkRequestType.POLICY:
        return this.policyToURL()
    }
  }
  //#endregion

  //#region request
  public static requestToPolicy(
    completed?: (response: object) => void,
    failed?: (err: object) => void,
  ): Promise<object> {
    return ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.POLICY), completed, failed)
  }

  public static requestToLog(completed?: (response: object) => void, failed?: (err: object) => void): Promise<object> {
    return ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.LOG), completed, failed)
  }

  private static request(
    params: ACENetworkParams,
    completed?: (response: object) => void,
    failed?: (err: object) => void,
    method: HTTP_METHOD = HTTP_METHOD.GET,
  ): Promise<object> {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

    // let policyConfig: AxiosRequestConfig = {
    //   url: "policy",
    //   method: "get",
    //   baseURL: "https://policy.acecounter.com",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     "Access-Control-Allow-Headers":
    //       "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    //     "Content-Type": "application/json",
    //     crossdomain: true,

    //     "CP-Request-Version": "00.00.01",
    //     "CP-Request-Cid": "1543932249276699286",
    //     "CP-Request-Time": "1543933205978",
    //     "CP-Request-Platform": "ts",
    //     "CP-Request-ID": "AK2A79936",
    //   },
    //   timeout: 1000,
    // };

    // const headers =

    const localConfig: AxiosRequestConfig = {
      url: params.url,
      method: method,
      baseURL: params.baseUrl,
      headers: {
        ...params.requestHeaders,
        'Content-Type': 'text/plain',
      },
      timeout: 1000,
    }

    // let collectorConfig: AxiosRequestConfig = {
    //   url: "mac",
    //   method: "get",
    //   baseURL: "https://gmb.acecounter.com",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    //   params: {
    //     tp: "site",
    //     re: 0,
    //     adeld: 1,
    //     st: "1620722629634435895%7C1620722629634435895%7C0%7C0",
    //     dm: "375*812",
    //     url: "com.acecounter.aceappplus/LoginAceCounterViewController",
    //     logsource: 100,
    //     ri: 1,
    //     sv: "ACA02.02.030",
    //     sts: "1620722629634435895",
    //     ag: 0,
    //     vt:
    //       "1620722508087038827%7C4%7C1619540480760523362%7C1%7C1619540480427865497",
    //     ce: 1,
    //     patch: "rev01",
    //     adid: "00000000-0000-0000-0000-000000000000",
    //     lg: "en",
    //     tz: 20,
    //     ref: "bookmark",
    //     mid: "AK3A79964",
    //     vk: 1,
    //     udf1: 0,
    //     udf2: 0,
    //     udf3: 0,
    //   },
    //   timeout: 1000,
    // };

    return new Promise((resolve, reject) => {
      axios
        .create()
        .request(localConfig)
        // .request(collectorConfig)
        .then(response => {
          console.log('ACENetwork::success')
          if (completed) {
            completed(response)
          } else {
            resolve(response)
          }
        })
        .catch(error => {
          if (failed) {
            failed(error)
          } else {
            reject(error)
          }
        })
    })
  }
  //#endregion
}
