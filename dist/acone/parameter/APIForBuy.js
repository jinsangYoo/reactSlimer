import APIForPL from './APIForPL';
import ACELog from '../../common/logger/ACELog';
import ACECONSTANT from '../../common/constant/ACEConstant';
import ACEParameterUtilForOne from './ACEParameterUtilForOne';
import IACBuyMode from '../constant/IACBuyMode';
import { acproductToURLForOne } from '../../common/util/ACProductUtil';
import { stringToNumber } from '../../common/util/TextUtils';
export default class APIForBuy extends APIForPL {
    constructor(params) {
        var _a, _b, _c;
        ACELog.d(APIForBuy._TAG, 'in constructor');
        super(params);
        this.orderNumber = (_a = params.payload.orderNumber) !== null && _a !== void 0 ? _a : ACECONSTANT.EMPTY;
        this.paymentMethod = (_b = params.payload.paymentMethod) !== null && _b !== void 0 ? _b : ACECONSTANT.EMPTY;
        this.products = Array.from((_c = params.payload.products) !== null && _c !== void 0 ? _c : []);
    }
    doWork(callback) {
        super.doWork((error, innerResult) => {
            ACELog.d(APIForBuy._TAG, 'in doWork::in cb');
            if (error && callback) {
                callback(error, innerResult);
            }
            else if (callback) {
                const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
                _parameterUtilForOne.setBuyMode(IACBuyMode.Order);
                _parameterUtilForOne.setOrderNumber(this.orderNumber);
                _parameterUtilForOne.setPaymentMethod(this.paymentMethod);
                _parameterUtilForOne.setProduct(acproductToURLForOne(this.products, this._logSource));
                const _st = _parameterUtilForOne.getST();
                _parameterUtilForOne.setBuyTimeTSAtObject(this.assignWillUpdateVt(), _st.getGetTS(), _st.getRandom6ForGetTS());
                const _buyCount = stringToNumber(_parameterUtilForOne.getVT().getBuyCount(), 10);
                _parameterUtilForOne.setBuyCountAtObject(this.assignWillUpdateVt(), _buyCount + 1);
                callback(undefined, innerResult);
            }
        });
    }
    didWork(callback) {
        super.didWork(callback);
        ACELog.d(APIForBuy._TAG, 'didWork');
    }
    completed(response) {
        super.completed(response);
        ACELog.d(APIForBuy._TAG, 'completed');
    }
    failed(err) {
        super.failed(err);
        ACELog.d(APIForBuy._TAG, 'failed');
    }
    doneWork(callback) {
        super.doneWork(callback);
        ACELog.d(APIForBuy._TAG, 'doneWork');
        const _parameterUtilForOne = ACEParameterUtilForOne.getInstance();
        _parameterUtilForOne.clearBuyMode();
        _parameterUtilForOne.clearPayMethod();
        _parameterUtilForOne.clearOrderNumber();
        _parameterUtilForOne.clearProduct();
    }
}
APIForBuy._TAG = 'APIForBuy';
//# sourceMappingURL=APIForBuy.js.map