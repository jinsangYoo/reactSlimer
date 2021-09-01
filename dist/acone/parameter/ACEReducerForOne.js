import APIForPL from './APIForPL';
import APIForBuy from './APIForBuy';
import APIForCart from './APIForCart';
import APIForAppearProduct from './APIForAppearProduct';
import APIForSearch from './APIForSearch';
import APIForLinkTel from './APIForLinkTel';
import APIForLogin from './APIForLogin';
import APIForJoinLeave from './APIForJoinLeave';
import APIForPolicy from './APIForPolicy';
import TaskAdapter from '../../common/task/TaskAdapter';
import ACEofAPIForOne from '../constant/ACEofAPIForOne';
import { ACEConstantCallback, ACEResultCode } from '../../common/constant/ACEPublicStaticConfig';
import ACELog from '../../common/logger/ACELog';
import ControlTowerSingleton from '../../common/controltower/ControlTowerSingleton';
import { ACParams } from '../acparam';
export default class ACEReducerForOne {
    constructor() { }
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
            case ACEofAPIForOne.AppearProduct:
                taskAdapter.addTask(new APIForAppearProduct(params), callback);
                break;
            case ACEofAPIForOne.Buy:
                taskAdapter.addTask(new APIForBuy(params), callback);
                break;
            case ACEofAPIForOne.AddInCart:
            case ACEofAPIForOne.DeleteInCart:
                taskAdapter.addTask(new APIForCart(params), callback);
                break;
            case ACEofAPIForOne.Search:
                taskAdapter.addTask(new APIForSearch(params), callback);
                break;
            case ACEofAPIForOne.Join:
            case ACEofAPIForOne.Leave:
                taskAdapter.addTask(new APIForJoinLeave(params), callback);
                break;
            case ACEofAPIForOne.Login:
                taskAdapter.addTask(new APIForLogin(params), callback);
                break;
            case ACEofAPIForOne.PlWithPage:
                taskAdapter.addTask(new APIForPL(params), callback);
                break;
            case ACEofAPIForOne.Policy:
                taskAdapter.addTask(new APIForPolicy(params), callback);
                break;
            case ACEofAPIForOne.TrackLinkEvent:
            case ACEofAPIForOne.TrackTelEvent:
                taskAdapter.addTask(new APIForLinkTel(params), callback);
                break;
            default:
                ACELog.d(ACEReducerForOne._TAG, 'not implementation Task.');
                break;
        }
        return taskAdapter.run();
    }
    static appearProduct(callback, pageName, productName, productCategoryName, productPrice) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.AppearProduct,
            payload: {
                pageName: pageName,
                productName: productName,
                productCategoryName: productCategoryName,
                productPrice: productPrice,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static buy(callback, pageName, orderNumber, payMethodName, products) {
        ACELog.d(ACEReducerForOne._TAG, 'buy: ' + JSON.stringify(pageName));
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Buy,
            payload: {
                orderNumber: orderNumber,
                paymentMethod: payMethodName,
                products: products,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static cart(type, callback, products) {
        return ACEReducerForOne.reducer({
            type: type == ACParams.TYPE.ADDCART ? ACEofAPIForOne.AddInCart : ACEofAPIForOne.DeleteInCart,
            payload: {
                products: products,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static join(callback, pageName, userId) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Join,
            payload: {
                pageName: pageName,
                userId: userId,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static leave(callback, pageName, userId) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Leave,
            payload: {
                pageName: pageName,
                userId: userId,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static link(callback, pageName, linkName) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.TrackLinkEvent,
            payload: {
                pageName: pageName,
                linkName: linkName,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static login(callback, pageName, userAge, userGender, userId, userMaritalStatus) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Login,
            payload: {
                pageName: pageName,
                userAge: userAge,
                userGender: userGender,
                userId: userId,
                userMaritalStatus: userMaritalStatus,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static plWithPage(callback, pageName) {
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
    static search(callback, pageName, keyword) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.Search,
            payload: {
                pageName: pageName,
                keyword: keyword,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
    static tel(callback, pageName, tel) {
        return ACEReducerForOne.reducer({
            type: ACEofAPIForOne.TrackTelEvent,
            payload: {
                pageName: pageName,
                tel: tel,
            },
            error: false,
            debugParams: {},
        }, callback);
    }
}
ACEReducerForOne._TAG = 'reducerForOne';
//# sourceMappingURL=ACEReducerForOne.js.map