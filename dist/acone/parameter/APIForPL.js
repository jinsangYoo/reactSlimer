import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEResultCode from '../../common/constant/ACEResultCode';
import { ACEInnerCBResultKey } from '../../common/constant/ACEInnerCBResultKey';
export default class APIForPL extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
        console.log('APIForPL::doWork');
    }
    didWork(callback) {
        super.didWork();
        console.log('APIForPL::didWork');
        if (global.Promise) {
            return new Promise((resolve, reject) => {
                ACENetwork.requestToLog(response => {
                    console.log('APIForPL::in cb::completed!!!');
                    this.completed(response);
                    this.doneWork();
                    if (callback) {
                        console.log('try call cb!!');
                        callback(undefined, response);
                    }
                    else {
                        console.log('try call resolve!!');
                        resolve(response);
                    }
                }, err => {
                    console.log('APIForPL::in cb::failed!!!');
                    this.failed(err);
                    this.doneWork();
                    if (callback) {
                        console.log('try call cb!!');
                        callback(err, undefined);
                    }
                    else {
                        console.log('try call reject!!');
                        reject(err);
                    }
                });
            });
        }
        else {
            console.log('APIForPL::not support promise.');
            this.failed({
                code: ACEInnerCBResultKey.NotSupportPromise,
                result: ACEInnerCBResultKey[ACEInnerCBResultKey.NotSupportPromise],
            });
            if (callback) {
                console.log('try call cb!!');
                callback({
                    code: ACEResultCode.NotSupportPromise,
                    result: ACEResultCode[ACEResultCode.NotSupportPromise],
                }, undefined);
            }
        }
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