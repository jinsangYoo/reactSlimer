import {Dimensions} from 'react-native'
import DeviceInfo from 'react-native-device-info'

export default class ACEParameterUtil {
  public static getResolution(): string {
    return `${Dimensions.get('window').width}*${Dimensions.get('window').height}`
  }

  public static getPackageNameOrBundleID(): string {
    return DeviceInfo.getBundleId()
  }
}
