import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
import ACEResultCode from '../../common/constant/ACEResultCode';
import ACEInnerCBResultKey from '../../common/constant/ACEInnerCBResultKey';
export default class APIForPolicy extends Task {
    constructor(params) {
        super(params);
    }
    doWork() {
        super.doWork();
    }
    didWork(callback) {
        super.didWork();
        if (global.Promise) {
            return new Promise((resolve, reject) => {
                ACENetwork.requestToPolicy(response => {
                    console.log('APIForPolicy::in cb::completed!!!');
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
                    console.log('APIForPolicy::in cb::failed!!!');
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
            console.log('APIForPolicy::not support promise.');
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