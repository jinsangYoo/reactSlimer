import APIForPL from './APIForPL';
import APIForBuy from './APIForBuy';
import TaskAdapter from '../../common/task/TaskAdapter';
import ACEofAPIForOne from '../constant/ACEofAPIForOne';
import APIForPolicy from './APIForPolicy';
import ACELog from '../../common/logger/ACELog';
export default class ACEReducerForOne {
    constructor() {
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static reducer(params, callback) {
        const taskAdapter = new TaskAdapter();
        switch (params.type) {
            case ACEofAPIForOne.Buy:
                taskAdapter.addTask(new APIForBuy(params), callback);
                break;
            case ACEofAPIForOne.PlWithPage:
                taskAdapter.addTask(new APIForPL(params), callback);
                break;
            case ACEofAPIForOne.Policy:
                taskAdapter.addTask(new APIForPolicy(params), callback);
                break;
            default:
                ACELog.d(ACEReducerForOne._TAG, 'not implementation Task.');
                break;
        }
        return taskAdapter.run();
    }
    static buy(pageName, callback) {
        ACELog.d(ACEReducerForOne._TAG, 'buy: ' + JSON.stringify(pageName));
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Buy,
            payload: {},
            error: false,
            debugParams: {},
        }, callback);
    }
    static plWithPage(pageName, callback) {
        ACELog.d(ACEReducerForOne._TAG, 'plWithPage: ' + JSON.stringify(pageName));
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.PlWithPage,
            payload: {},
            error: false,
            debugParams: {},
        }, callback);
    }
    static policy(callback) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Policy,
            payload: {},
            error: false,
            debugParams: {},
        }, callback);
    }
}
ACEReducerForOne._TAG = 'reducerForOne';
//# sourceMappingURL=ACEReducerForOne.js.map