import ITask from '../../common/task/ITask';
import { ACENetwork } from '../../common/http/ACENetwork';
export default class APIForPL extends ITask {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
        console.log('APIForPL::doWork');
    }
    didWork() {
        super.didWork();
        console.log('APIForPL::didWork');
        ACENetwork.request(response => {
            console.log('APIForPL::in cb::completed');
            this.completed(response);
        }, err => {
            console.log('APIForPL::in cb::failed');
            this.failed(err);
        });
    }
    doneWork() {
        super.doneWork();
        console.log('APIForPL::doneWork');
    }
    completed(response) {
        super.completed(response);
        console.log('APIForPL::completed');
    }
    failed(err) {
        super.failed(err);
        console.log('APIForPL::failed');
    }
}
//# sourceMappingURL=APIForPL.js.map