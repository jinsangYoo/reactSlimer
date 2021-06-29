import axios from 'axios';
var ACENetwork = (function () {
    function ACENetwork() {
    }
    ACENetwork.request = function () {
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
    return ACENetwork;
}());
export { ACENetwork };
//# sourceMappingURL=ACENetwork.js.map