import APIForPL from './APIForPL';
import APIForBuy from './APIForBuy';
import TaskAdapter from '../../common/task/TaskAdapter';
import ACEofAPIForOne from '../constant/ACEofAPIForOne';
import APIForPolicy from './APIForPolicy';
import { ACEConstantCallback, ACEResultCode } from '../../common/constant/ACEPublicStaticConfig';
import ACELog from '../../common/logger/ACELog';
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton';
export default class ACEReducerForOne {
    constructor() {
    }
    static getInstance() {
        return this.instance || (this.instance = new this());
    }
    static reducer(params, callback) {
        if (params.type !== ACEofAPIForOne.Policy) {
            if (!ControlTowerSingleton.isEnableByPolicy()) {
                const result = {
                    taskHash: `${params.type}::0006`,
                    code: ACEResultCode.NotFoundPolicyInformation,
                    result: ACEConstantCallback[ACEConstantCallback.Failed],
                    message: 'Not found policy information.',
                    apiName: ACEofAPIForOne[params.type],
                };
                if (callback) {
                    callback(new Error('0006, Not found policy information.'), result);
                    return;
                }
                else {
                    return new Promise((resolveToOut, rejectToOut) => {
                        rejectToOut(result);
                    });
                }
            }
        }
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
        ControlTowerSingleton.getInstance().setDevSDKMode();
        ControlTowerSingleton.getInstance().setHomeDevNetworkMode();
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.PlWithPage,
            payload: {
                pageName: pageName,
            },
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