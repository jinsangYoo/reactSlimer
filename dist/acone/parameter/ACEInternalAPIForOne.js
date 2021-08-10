import ACEReducerForOne from './ACEReducerForOne';
export default class ACEInternalAPIForOne {
    constructor() { }
    requestPolicy(callback) {
        return ACEReducerForOne.policy(callback);
    }
    send(value, callback) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=ACEInternalAPIForOne.js.map