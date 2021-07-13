import axios from 'axios';
export class ACENetwork {
    static request(completed, failed) {
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
                console.log('ACENetwork::success');
                if (completed) {
                    console.log('ACENetwork::try call completed!!');
                    completed(response);
                }
                else {
                    console.log('ACENetwork::not call res, try call resolve!!');
                    resolve(response);
                }
            })
                .catch(error => {
                console.log('ACENetwork::error');
                if (failed) {
                    console.log('ACENetwork::try call failed!!');
                    failed(error);
                }
                else {
                    console.log('ACENetwork::not call failed, try call reject!!');
                    reject(error);
                }
            });
        });
    }
}
//# sourceMappingURL=ACENetwork.js.map