import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
export default class APIForBuy extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
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