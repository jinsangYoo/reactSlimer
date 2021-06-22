import { ACECommonStaticConfig } from './common/config/ACECommonStaticConfig';
import axios from 'axios';
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
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        var localConfig = {
            url: 'policy',
            method: 'get',
            baseURL: 'http://192.168.0.18:52274',
            headers: {
                'Content-Type': 'text/plain',
            },
            timeout: 1000,
        };
        axios
            .create()
            .request(localConfig)
            .then(function (response) {
            console.log('success');
            console.log(response);
            console.log(response.data);
        })
            .catch(function (error) {
            console.log('error!!');
            console.log(error);
        });
    };
    return ACS;
}());
export { ACS };
//# sourceMappingURL=acs.js.map