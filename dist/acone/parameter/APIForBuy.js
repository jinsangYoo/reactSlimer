import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import { ACEResultCode, ACEConstantCallback } from '../../common/constant/ACEPublicStaticConfig';
export default class APIForBuy extends Task {
    constructor(params) {
        super(params);
    }
    doWork(callback) {
        super.doWork(callback);
        if (callback) {
            const res = {
                taskHash: `${this._logSource}::0011`,
                code: ACEResultCode.Success,
                result: ACEConstantCallback[ACEConstantCallback.Success],
                message: 'Done doWork to buy.',
                apiName: this.getDescription(),
            };
            callback(undefined, res);
        }
    }
    didWork(callback) {
        super.didWork(callback);
        ACENetwork.requestToLog(response => {
            this.completed(response);
        }, err => {
            this.failed(err);
        });
    }
    doneWork() {
        super.doneWork();
    }
    completed(response) {
        super.completed(response);
    }
    failed(err) {
        super.failed(err);
    }
}
//# sourceMappingURL=APIForBuy.js.map