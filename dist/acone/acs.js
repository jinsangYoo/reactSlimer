import { ACECommonStaticConfig } from '../common/config/ACECommonStaticConfig';
import { ACEReducerForOne } from './parameter/ACEReducerForOne';
import AsyncStorage from '@react-native-async-storage/async-storage';
var ACS = (function () {
    function ACS() {
    }
    ACS.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    ACS.configure = function (value, callback) {
        return ACS.getInstance().configure(value, callback);
    };
    ACS.prototype.configure = function (value, callback) {
        return ACECommonStaticConfig.configure(value, callback);
    };
    ACS.send = function (value) {
        var keyName = 'user_id';
        AsyncStorage.setItem(keyName, 'jinsang', function () {
            console.log('유저 id저장');
        });
        console.log('ACS.send: ' + JSON.stringify(value));
        ACEReducerForOne.plWithPage(value.name);
    };
    return ACS;
}());
export { ACS };
//# sourceMappingURL=acs.js.map