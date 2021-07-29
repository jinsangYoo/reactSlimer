import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import { makeSuccessCallbackParams, makeFailCallbackParams } from '../../common/util/MapUtil';
export default class APIForPL extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
        console.log('APIForPL::doWork');
    }
    didWork(callback) {
        super.didWork(callback);
        console.log('APIForPL::didWork');
        ACENetwork.requestToLog(response => {
            console.log('APIForPL::in requestToLog.completed');
            this.completed(response);
            this.doneWork();
            if (callback) {
                callback(undefined, makeSuccessCallbackParams(this));
            }
        }, err => {
            console.log('APIForPL::in requestToLog.failed');
            this.failed(err);
            this.doneWork();
            if (callback) {
                callback(err, makeFailCallbackParams(this));
            }
        });
    }
    completed(response) {
        super.completed(response);
        console.log('APIForPL::completed');
    }
    failed(err) {
        super.failed(err);
        console.log('APIForPL::failed');
    }
    doneWork() {
        super.doneWork();
        console.log('APIForPL::doneWork');
    }
}
//# sourceMappingURL=APIForPL.js.map