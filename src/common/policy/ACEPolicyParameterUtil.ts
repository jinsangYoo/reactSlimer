import ACENetworkResult from '../http/ACENetworkResult'
import POLICY from '../constant/Policy'
import {HttpURLConnection} from '../constant/Network'
import ACEPolicyParameters from './ACEPolicyParameters'
import ACECommonStaticConfig from '../config/ACECommonStaticConfig'
import {isEmpty} from '../util/TextUtils'
import ControlTower from '../controltower/ControlTower'

export default class ACEPolicyParameterUtil {
  private static instance: ACEPolicyParameterUtil

  public static getInstance(): ACEPolicyParameterUtil {
    return this.instance || (this.instance = new this())
  }

  private constructor() {}

  public savePolicy(result: ACENetworkResult): void {
    if (result.getCode() != HttpURLConnection.HTTP_OK) {
      console.log(`http response code not ok: ${result.getCode()}`)
      return
    }

    console.log('Receive policy.')
    console.log(`ACEPolicyParameterUtil::savePolicy::_response: ${JSON.stringify(result)}`)

    const _policyParameters = ACEPolicyParameters.getInstance()
    const responseHeaders = result.getHeaders()
    if (responseHeaders.has(POLICY.RESPONSE_SDK_ENABLE.toLowerCase())) {
      _policyParameters.setCpAllow(responseHeaders.get(POLICY.RESPONSE_SDK_ENABLE.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_CID.toLowerCase())) {
      _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_CID.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_DEBUG.toLowerCase())) {
      _policyParameters.setCpDebug(responseHeaders.get(POLICY.RESPONSE_DEBUG.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_DOMAIN.toLowerCase())) {
      _policyParameters.setCpDomain(responseHeaders.get(POLICY.RESPONSE_DOMAIN.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_PRIVATE.toLowerCase())) {
      _policyParameters.setCpPrivate(responseHeaders.get(POLICY.RESPONSE_PRIVATE.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_SOURCE_IP.toLowerCase())) {
      _policyParameters.setCpSourceIP(responseHeaders.get(POLICY.RESPONSE_SOURCE_IP.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_FORCE_STOP.toLowerCase())) {
      const _value = responseHeaders.get(POLICY.RESPONSE_SOURCE_IP.toLowerCase())
      if (!isEmpty(_value) && _value === POLICY.FLAG_SDK_FORCE_STOP) {
        ControlTower.enableForceStop()
      }
    }

    if (responseHeaders.has(POLICY.RESPONSE_FORCE_DELETE_FAILEDFILE.toLowerCase())) {
      _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_FORCE_DELETE_FAILEDFILE.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase())) {
      _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase())) {
      _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase()))
    }

    if (responseHeaders.has(POLICY.RESPONSE_TOAST_APPKEY.toLowerCase())) {
      _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_TOAST_APPKEY.toLowerCase()))
    }
  }
}
