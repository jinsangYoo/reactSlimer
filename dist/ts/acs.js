import { ACParams } from './acparam';
import axios from 'axios';
var ACS = (function () {
    function ACS() {
    }
    ACS.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    ACS.prototype.send = function (value) {
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
export function send() {
    ACS.getInstance().send(ACParams.init(ACParams.TYPE.DEFAULT, '젭알'));
}
//# sourceMappingURL=acs.js.map