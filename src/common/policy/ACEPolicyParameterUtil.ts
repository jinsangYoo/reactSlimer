import ACENetworkResult from '../http/ACENetworkResult'
import {HttpURLConnection} from '../constant/Network'
// import POLICY from '../constant/Policy'
// import ACEPolicyParameters from './ACEPolicyParameters'
// import {isEmpty} from '../util/TextUtils'
// import ControlTowerSingleton from '../controltower/ControlTowerSingleton'
// import ACEConstantInteger from '../constant/ACEConstantInteger'

export default class ACEPolicyParameterUtil {
  private static instance: ACEPolicyParameterUtil
  // private static readonly REPEAT_PULLING_INTERVAL_SECOND_DEFAULT = 6 * 60 * 60
  // private static REPEAT_PULLING_INTERVAL_SECOND: number

  public static getInstance(): ACEPolicyParameterUtil {
    return this.instance || (this.instance = new this())
  }

  private constructor() {
    // ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND =
    //   ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND_DEFAULT
  }

  public savePolicy(result: ACENetworkResult): void {
    if (result.getCode() != HttpURLConnection.HTTP_OK) {
      console.log(`http response code not ok: ${result.getCode()}`)
      return
    }

    console.log('Receive policy.')
    console.log(`ACEPolicyParameterUtil::savePolicy::_response: ${JSON.stringify(result)}`)

    // const _policyParameters = ACEPolicyParameters.getInstance()
    // const responseHeaders = result.getHeaders()
    // if (responseHeaders.has(POLICY.RESPONSE_SDK_ENABLE.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_SDK_ENABLE}`)
    //   _policyParameters.setCpAllow(responseHeaders.get(POLICY.RESPONSE_SDK_ENABLE.toLowerCase()))
    //   if (!ControlTowerSingleton.getInstance().isEnableByPolicy()) {
    //     ControlTowerSingleton.getInstance().setSDKDisable()
    //   }
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_CID.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_CID}`)
    //   _policyParameters.setCpCid(responseHeaders.get(POLICY.RESPONSE_CID.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_DEBUG.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_DEBUG}`)
    //   _policyParameters.setCpDebug(responseHeaders.get(POLICY.RESPONSE_DEBUG.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_DOMAIN.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_DOMAIN}`)
    //   _policyParameters.setCpDomain(responseHeaders.get(POLICY.RESPONSE_DOMAIN.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_PRIVATE.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_PRIVATE}`)
    //   _policyParameters.setCpPrivate(responseHeaders.get(POLICY.RESPONSE_PRIVATE.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_SOURCE_IP.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_SOURCE_IP}`)
    //   _policyParameters.setCpSourceIP(responseHeaders.get(POLICY.RESPONSE_SOURCE_IP.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_FORCE_STOP.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_FORCE_STOP}`)
    //   const _value = responseHeaders.get(POLICY.RESPONSE_SOURCE_IP.toLowerCase())
    //   if (!isEmpty(_value) && _value === POLICY.FLAG_SDK_FORCE_STOP) {
    //     ControlTowerSingleton.getInstance().enableForceStop()
    //   }
    // }

    // // if (responseHeaders.has(POLICY.RESPONSE_FORCE_DELETE_FAILEDFILE.toLowerCase())) {
    // //   const _value = responseHeaders.get(POLICY.RESPONSE_FORCE_DELETE_FAILEDFILE.toLowerCase())
    // //   if (!isEmpty(_value) && _value === POLICY.FLAG_FORCE_DELETE_FAILEDFILE) {
    // //   }
    // // }

    // if (responseHeaders.has(POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_DEBUG_LOG_URL}`)
    //   _policyParameters.setCpCrashDomain(responseHeaders.get(POLICY.RESPONSE_DEBUG_LOG_URL.toLowerCase()))
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_POLICY_INTERVAL}`)
    //   var interval = ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND
    //   const _value = responseHeaders.get(POLICY.RESPONSE_POLICY_INTERVAL.toLowerCase())
    //   if (_value && !isEmpty(_value)) {
    //     interval = parseInt(_value)
    //     if (interval < ACEConstantInteger.TWO_MINUTES) {
    //       interval = ACEConstantInteger.TWO_MINUTES
    //     }
    //     ACEPolicyParameterUtil.REPEAT_PULLING_INTERVAL_SECOND = interval
    //   }
    // }

    // if (responseHeaders.has(POLICY.RESPONSE_TOAST_APPKEY.toLowerCase())) {
    //   console.log(`in if ${POLICY.RESPONSE_TOAST_APPKEY}`)
    //   _policyParameters.setToastAppKey(responseHeaders.get(POLICY.RESPONSE_TOAST_APPKEY.toLowerCase()))
    // }

    console.log('done save policy.')
  }
}
