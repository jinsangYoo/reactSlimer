import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {HTTP_METHOD, BASE_URL, HTTP_URL, ACENetworkParams} from '../constant/Network'
import POLICY from '../constant/Policy'
import {NetworkMode, NetworkRequestType} from '../constant/SDKMode'
import ACECommonStaticConfig from '../config/ACECommonStaticConfig'
import {Platform} from 'react-native'
import {ACS} from '../../acone/acs'
import {mapValueStringToObject} from '../util/MapUtil'

import ControlTowerSingleton from '../controltower/ControlTowerSingleton'

export class ACENetwork {
  private static networkRequestTypeToParams(requestType: NetworkRequestType): ACENetworkParams {
    const currentNetworkMode = ControlTowerSingleton.getInstance().getNetworkMode()
    console.log(
      `ACENetwork.networkRequestTypeToParams::requestType: ${NetworkRequestType[requestType]}, currentNetworkMode:${NetworkMode[currentNetworkMode]}`,
    )
    return {
      baseUrl: this.networkRequestTypeToBaseURLs(currentNetworkMode, requestType),
      requestHeaders: this.networkRequestTypeToHeaders(currentNetworkMode, requestType),
      url: this.networkRequestTypeToURLs(currentNetworkMode, requestType),
    }
  }

  //#region base url
  private static logToBaseURL(networkMode: NetworkMode): string {
    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
        return BASE_URL.COMPANY_LOCAL_LOG
      case NetworkMode.HOME_dev:
        return BASE_URL.HOME_LOCAL_LOG
      case NetworkMode.Pro:
        return BASE_URL.PRO_LOG
    }
  }

  private static policyToBaseURL(networkMode: NetworkMode): string {
    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
        return BASE_URL.COMPANY_LOCAL_POLICY
      case NetworkMode.HOME_dev:
        return BASE_URL.HOME_LOCAL_POLICY
      case NetworkMode.Pro:
        return BASE_URL.PRO_POLICY
    }
  }

  private static networkRequestTypeToBaseURLs(networkMode: NetworkMode, requestType: NetworkRequestType): string {
    switch (requestType) {
      case NetworkRequestType.LOG:
        return this.logToBaseURL(networkMode)
      case NetworkRequestType.POLICY:
        return this.policyToBaseURL(networkMode)
    }
  }
  //#endregion

  //#region request headers
  private static logToRequestHeaders(networkMode: NetworkMode): Map<string, string> {
    const _map = new Map<string, string>()
    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
        return _map
      case NetworkMode.HOME_dev:
        return _map
      case NetworkMode.Pro:
        return _map
    }
  }

  private static policyToRequestHeaders(networkMode: NetworkMode): Map<string, string> {
    const _map = new Map<string, string>()

    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
      case NetworkMode.HOME_dev:
      case NetworkMode.Pro:
        _map.set(POLICY.REQUEST_APPLICATION_ID, ACS.getPackageNameOrBundleID() ?? 'no packageName')

        _map.set(POLICY.REQUEST_CID, ACECommonStaticConfig.getKey())
        _map.set(POLICY.REQUEST_PLATFORM, Platform.OS)
        _map.set(POLICY.REQUEST_SERVICE_ID, ACECommonStaticConfig.getKey())
        _map.set(POLICY.REQUEST_TIME, Date.now().toString())
        _map.set(POLICY.REQUEST_VERSION, ACS.SDKVersion())
        break
    }

    return _map
  }

  private static networkRequestTypeToHeaders(
    networkMode: NetworkMode,
    requestType: NetworkRequestType,
  ): Map<string, string> {
    switch (requestType) {
      case NetworkRequestType.LOG:
        return this.logToRequestHeaders(networkMode)
      case NetworkRequestType.POLICY:
        return this.policyToRequestHeaders(networkMode)
    }
  }
  //#endregion

  //#region url
  private static logToURL(networkMode: NetworkMode): string {
    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
        return HTTP_URL.COMPANY_LOCAL_LOG
      case NetworkMode.HOME_dev:
        return HTTP_URL.HOME_LOCAL_LOG
      case NetworkMode.Pro:
        return HTTP_URL.PRO_LOG
    }
  }

  private static policyToURL(networkMode: NetworkMode): string {
    switch (networkMode) {
      case NetworkMode.COMPANY_dev:
        return HTTP_URL.COMPANY_LOCAL_POLICY
      case NetworkMode.HOME_dev:
        return HTTP_URL.HOME_LOCAL_POLICY
      case NetworkMode.Pro:
        return HTTP_URL.PRO_POLICY
    }
  }

  private static networkRequestTypeToURLs(networkMode: NetworkMode, requestType: NetworkRequestType): string {
    switch (requestType) {
      case NetworkRequestType.LOG:
        return this.logToURL(networkMode)
      case NetworkRequestType.POLICY:
        return this.policyToURL(networkMode)
    }
  }
  //#endregion

  //#region request
  public static requestToPolicy(completed?: (response: AxiosResponse) => void, failed?: (err: object) => void): void {
    ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.POLICY), completed, failed)
  }

  public static requestToLog(completed?: (response: AxiosResponse) => void, failed?: (err: object) => void): void {
    ACENetwork.request(ACENetwork.networkRequestTypeToParams(NetworkRequestType.LOG), completed, failed)
  }

  private static request(
    params: ACENetworkParams,
    completed?: (response: AxiosResponse) => void,
    failed?: (err: object) => void,
    method: HTTP_METHOD = HTTP_METHOD.GET,
  ): void {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
    axios.defaults.headers.common['Content-Type'] = 'text/plain'

    const requestHeaders = mapValueStringToObject(params.requestHeaders)
    console.log(`ACENetwork.request::requestHeaders:${JSON.stringify(requestHeaders)}`)
    const requestConfig: AxiosRequestConfig = {
      url: params.url,
      method: method,
      baseURL: params.baseUrl,
      headers: requestHeaders,
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

    axios
      .create()
      .request(requestConfig)
      .then(response => {
        if (completed) {
          completed(response)
        }
      })
      .catch(error => {
        if (failed) {
          failed(error)
        }
      })
  }
  //#endregion
}
