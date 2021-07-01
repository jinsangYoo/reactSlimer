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
        axios
            .create()
            .request(localConfig)
            .then(response => {
            console.log('success');
            console.log(response);
            console.log(response.data);
            if (res)
                res(response);
        })
            .catch(error => {
            console.log('error!!');
            console.log(error);
            if (failed)
                failed(error);
        });
    }
}
//# sourceMappingURL=ACENetwork.js.map