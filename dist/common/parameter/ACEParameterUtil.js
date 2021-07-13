import { Dimensions } from 'react-native';
export default class ACEParameterUtil {
    static getResolution() {
        return `${Dimensions.get('window').width}*${Dimensions.get('window').height}`;
    }
}
//# sourceMappingURL=ACEParameterUtil.js.map