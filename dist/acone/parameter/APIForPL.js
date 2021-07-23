import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import { makeSuccessCallback, makeFailCallback } from '../../common/util/MapUtil';
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
            console.log('APIForPL::in cb::completed!!!');
            this.completed(response);
            this.doneWork();
            if (callback) {
                const callbackUnit = {
                    title: 'normal send log.',
                    location: 'APIForPL::ACENetwork.requestToLog::completed',
                    result: true,
                    payload: makeSuccessCallback(this),
                };
                callback(undefined, {
                    prevResult: true,
                    history: [callbackUnit],
                });
            }
        }, err => {
            console.log('APIForPL::in cb::failed!!!');
            this.failed(err);
            this.doneWork();
            if (callback) {
                const callbackUnit = {
                    title: 'fail send log.',
                    location: 'APIForPL::ACENetwork.requestToLog::failed',
                    result: false,
                    payload: makeFailCallback(this),
                };
                callback(err, {
                    prevResult: false,
                    history: [callbackUnit],
                });
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