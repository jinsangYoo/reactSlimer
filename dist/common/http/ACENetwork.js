import axios from 'axios';
export class ACENetwork {
    static request(res, failed) {
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        const localConfig = {
            url: 'policy',
            method: 'get',
            baseURL: 'http://192.168.0.18:52274',
            headers: {
                'Content-Type': 'text/plain',
            },
            timeout: 1000,
        };
        return new Promise((resolve, reject) => {
            axios
                .create()
                .request(localConfig)
                .then(response => {
                console.log('success 52');
                console.log('response: ' + JSON.stringify(response));
                console.log('response.data: ' + response.data);
                if (res) {
                    console.log('try call res!!');
                    res(response);
                }
                else {
                    console.log('not call res, try call resolve!!');
                    resolve(response);
                }
            })
                .catch(error => {
                console.log('error 52');
                console.log('error: ' + JSON.stringify(error));
                if (failed) {
                    console.log('try call failed!!');
                    failed(error);
                }
                else {
                    console.log('not call failed, try call reject!!');
                    reject(error);
                }
            });
        });
    }
}
//# sourceMappingURL=ACENetwork.js.map