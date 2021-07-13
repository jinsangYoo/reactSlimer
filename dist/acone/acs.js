import ACECommonStaticConfig from '../common/config/ACECommonStaticConfig';
import { ACEReducerForOne } from './parameter/ACEReducerForOne';
import DeviceInfo from 'react-native-device-info';
export class ACS {
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static configure(value, callback) {
        return ACS.getInstance().configure(value, callback);
    }
    configure(value, callback) {
        return ACECommonStaticConfig.configure(value, callback);
    }
    static send(value, callback) {
        console.log('APP version: ' + DeviceInfo.getReadableVersion());
        console.log('ACS.send: ' + JSON.stringify(value));
        return ACEReducerForOne.plWithPage(value.name, callback);
    }
    static SDKVersion() {
        return '0.0.59';
    }
}
//# sourceMappingURL=acs.js.map