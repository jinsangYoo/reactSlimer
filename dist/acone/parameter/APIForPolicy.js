import ITask from '../../common/task/ITask';
import { ACENetwork } from '../../common/http/ACENetwork';
export default class APIForPolicy extends ITask {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
    }
    didWork() {
        super.didWork();
        ACENetwork.request(response => {
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
//# sourceMappingURL=APIForPolicy.js.map