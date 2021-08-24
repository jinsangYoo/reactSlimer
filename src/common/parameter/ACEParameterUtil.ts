import {Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'

export default class ACEParameterUtil {
  public static getResolution(): string {
    return `${Math.floor(Dimensions.get('window').width)}*${Math.floor(Dimensions.get('window').height)}`
  }

  public static getPackageNameOrBundleID(): string {
    return DeviceInfo.getBundleId()
  }

  public static getModel(): string {
    return DeviceInfo.getModel()
  }

  public static getSystemName(): string {
    return DeviceInfo.getSystemName()
  }

  public static getSystemVersion(): string {
    return DeviceInfo.getSystemVersion()
  }

  public static getUserAgentForSDK(): string {
    return `${ACEParameterUtil.getSystemName()} ${ACEParameterUtil.getSystemVersion()} ${ACEParameterUtil.getModel()} on react-native`
  }
}
