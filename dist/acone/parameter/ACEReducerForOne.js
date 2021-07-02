import APIForPL from './APIForPL';
import APIForBuy from './APIForBuy';
import TaskAdapter from '../../common/task/TaskAdapter';
import APIForTypes from '../constant/APIForTypes';
export class ACEReducerForOne {
    constructor() {
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static reducer(params, callback) {
        const taskAdapter = new TaskAdapter();
        switch (params.type) {
            case APIForTypes.buy:
                taskAdapter.addTask(new APIForBuy(params), callback);
                break;
            case APIForTypes.plWithPage:
                taskAdapter.addTask(new APIForPL(params), callback);
                break;
            default:
                console.log('not implementation Task.');
                break;
        }
        return taskAdapter.run();
    }
    static buy(pageName, callback) {
        console.log('buy: ' + JSON.stringify(pageName));
        return ACEReducerForOne.reducer({
            type: APIForTypes.buy,
            payload: {},
            error: false,
            debugParams: {},
        }, callback);
    }
    static plWithPage(pageName, callback) {
        console.log('plWithPage: ' + JSON.stringify(pageName));
        return ACEReducerForOne.reducer({
            type: APIForTypes.plWithPage,
            payload: {},
            error: false,
            debugParams: {},
        }, callback);
    }
}
//# sourceMappingURL=ACEReducerForOne.js.map