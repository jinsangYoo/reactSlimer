import Task from '../../common/task/Task';
import { ACENetwork } from '../../common/http/ACENetwork';
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
        if (!global.Promise) {
            console.log('ACECommonStaticConfig::not support promise.');
            ACENetwork.request(response => {
                console.log('APIForPL::in cb::completed!!!');
                this.completed(response);
                console.log('APIForPL::try doneWork 1');
                this.doneWork();
                if (callback) {
                    console.log('try call cb!!');
                    callback(undefined, response);
                }
            }, err => {
                console.log('APIForPL::in cb::failed!!!');
                this.failed(err);
                console.log('APIForPL::try doneWork 2');
                this.doneWork();
                if (callback) {
                    console.log('try call cb!!');
                    callback(err, undefined);
                }
            });
        }
        else {
            console.log('ACECommonStaticConfig::support promise.');
            return new Promise((resolve, reject) => {
                ACENetwork.request(response => {
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