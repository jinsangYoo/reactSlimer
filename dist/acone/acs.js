import { ACECommonStaticConfig } from '../common/config/ACECommonStaticConfig';
import { ACEReducerForOne } from './parameter/ACEReducerForOne';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    static send(value) {
        console.log('APP version: ' + DeviceInfo.getReadableVersion());
        console.log('SDK version: ' + ACS.SDKVersion());
        const keyName = 'user_id';
        AsyncStorage.setItem(keyName, 'jinsang', () => {
            console.log('유저 id저장');
        });
        console.log('ACS.send: ' + JSON.stringify(value));
        ACEReducerForOne.plWithPage(value.name);
    }
    static SDKVersion() {
        return '0.0.51';
    }
}
//# sourceMappingURL=acs.js.map