export default class ACENetworkResult {
    constructor(response) {
        this._responseCode = response.status;
        this._responseBody = response.data;
        this._responseHeaders = response.headers;
    }
    getCode() {
        return this._responseCode;
    }
    getBody() {
        return this._responseBody;
    }
    getHeaders() {
        return this._responseHeaders;
    }
}
//# sourceMappingURL=ACENetworkResult.js.map