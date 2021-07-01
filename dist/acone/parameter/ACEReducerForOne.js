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
    static reducer(params) {
        const taskAdapter = new TaskAdapter();
        switch (params.type) {
            case APIForTypes.buy:
                taskAdapter.addTask(new APIForBuy(params));
                break;
            case APIForTypes.plWithPage:
                taskAdapter.addTask(new APIForPL(params));
                break;
            default:
                console.log('not implementation Task.');
                break;
        }
        taskAdapter.run();
    }
    static buy(pageName) {
        console.log('buy: ' + JSON.stringify(pageName));
        ACEReducerForOne.reducer({
            type: APIForTypes.buy,
            payload: {},
            error: false,
            debugParams: {},
        });
    }
    static plWithPage(pageName) {
        console.log('plWithPage: ' + JSON.stringify(pageName));
        ACEReducerForOne.reducer({
            type: APIForTypes.plWithPage,
            payload: {},
            error: false,
            debugParams: {},
        });
    }
}
//# sourceMappingURL=ACEReducerForOne.js.map