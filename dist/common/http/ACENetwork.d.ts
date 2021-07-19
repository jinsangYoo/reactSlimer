import { AxiosResponse } from 'axios';
export declare class ACENetwork {
    private static networkRequestTypeToParams;
    private static logToBaseURL;
    private static policyToBaseURL;
    private static networkRequestTypeToBaseURLs;
    private static logToRequestHeaders;
    private static policyToRequestHeaders;
    private static networkRequestTypeToHeaders;
    private static logToURL;
    private static policyToURL;
    private static networkRequestTypeToURLs;
    static requestToPolicy(completed?: (response: AxiosResponse) => void, failed?: (err: object) => void): Promise<object>;
    static requestToLog(completed?: (response: AxiosResponse) => void, failed?: (err: object) => void): Promise<object>;
    private static request;
}
//# sourceMappingURL=ACENetwork.d.ts.map