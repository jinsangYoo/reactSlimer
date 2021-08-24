import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default class ACEParameterUtil {
    static getResolution() {
        return `${Math.floor(Dimensions.get('window').width)}*${Math.floor(Dimensions.get('window').height)}`;
    }
    static getPackageNameOrBundleID() {
        return DeviceInfo.getBundleId();
    }
    static getModel() {
        return DeviceInfo.getModel();
    }
    static getSystemName() {
        return DeviceInfo.getSystemName();
    }
    static getSystemVersion() {
        return DeviceInfo.getSystemVersion();
    }
    static getUserAgentForSDK() {
        return `${ACEParameterUtil.getSystemName()} ${ACEParameterUtil.getSystemVersion()} ${ACEParameterUtil.getModel()} on react-native`;
    }
}
//# sourceMappingURL=ACEParameterUtil.js.map