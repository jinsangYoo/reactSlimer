import { ACECommonStaticConfig } from '../common/config/ACECommonStaticConfig';
import { ACEReducerForOne } from './parameter/ACEReducerForOne';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
        const keyName = 'user_id';
        AsyncStorage.setItem(keyName, 'jinsang', () => {
            console.log('유저 id저장');
        });
        console.log('ACS.send: ' + JSON.stringify(value));
        ACEReducerForOne.plWithPage(value.name);
    }
}
//# sourceMappingURL=acs.js.map