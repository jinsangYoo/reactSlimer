import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default class ACEParameterUtil {
    static getResolution() {
        return `${Dimensions.get('window').width}*${Dimensions.get('window').height}`;
    }
    static getPackageNameOrBundleID() {
        return DeviceInfo.getBundleId();
    }
}
//# sourceMappingURL=ACEParameterUtil.js.map