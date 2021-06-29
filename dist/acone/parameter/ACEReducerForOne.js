var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { ACENetwork } from '../../common/http/ACENetwork';
import { ACEWorkerEventsForCallerEmitter } from '../worker/ACEWorkerEventsForCallerEmitter';
import { ACEWorkerEventsForWorkerEmitter } from '../worker/ACEWorkerEventsForWorkerEmitter';
var ACEReducerForOne = (function () {
    function ACEReducerForOne() {
        var _this = this;
        this.commandEmitter = new ACEWorkerEventsForCallerEmitter();
        this.eventEmitter = new ACEWorkerEventsForWorkerEmitter();
        this.worker = new Worker('../worker/ACEWorker');
        this.worker.onmessage = function (event) {
            var _a;
            return (_a = _this.eventEmitter).emit.apply(_a, __spreadArray([event.data.type], event.data.data));
        };
        this.worker.onerror = function (event) { return _this.eventEmitter.emit('onError', __assign({}, event)); };
        this.eventEmitter.on('started', function () { return console.log('ACEReducerForOne::eventEmitter::started'); });
        this.eventEmitter.on('onFinish', function (message, logsource) {
            console.log('ACEReducerForOne::eventEmitter::onFinish');
            console.log([message, logsource]);
        });
        this.eventEmitter.on('onError', function (err) {
            console.log('ACEReducerForOne::eventEmitter::onError');
            console.log(JSON.stringify(err));
        });
        this.commandEmitter.on('onStartForAPI', function (task) {
            console.log('ACEReducerForOne::commandEmitter::onStartForAPI');
            console.log(JSON.stringify(task));
            ACEReducerForOne.getWorker().postMessage({ type: 'onStartForAPI', task: task });
        });
        this.commandEmitter.on('onFinish', function (message, logsource) {
            console.log('ACEReducerForOne::commandEmitter::onFinish');
            console.log([message, logsource]);
        });
        this.commandEmitter.on('onError', function (err) {
            console.log('ACEReducerForOne::commandEmitter::onError');
            console.log(JSON.stringify(err));
        });
    }
    ACEReducerForOne.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    ACEReducerForOne.getCallerEmitter = function () {
        return ACEReducerForOne.getInstance().commandEmitter;
    };
    ACEReducerForOne.getWorker = function () {
        return ACEReducerForOne.getInstance().worker;
    };
    ACEReducerForOne.mainthreadToWorkerAction = function (task) {
        switch (task.action.type) {
            case 'plWithPage':
                ACEReducerForOne.getCallerEmitter().emit('onStartForAPI', task);
                break;
            default:
                console.log('not implementation Task.');
                break;
        }
    };
    ACEReducerForOne.plWithPage = function (pageName) {
        console.log('plWithPage: ' + JSON.stringify(pageName));
        ACEReducerForOne.mainthreadToWorkerAction({
            action: {
                type: 'plWithPage',
                name: 'plWithPage',
                logsource: 100,
            },
        });
    };
    ACEReducerForOne.buy = function (pageName) {
        console.log('buy: ' + JSON.stringify(pageName));
        ACENetwork.request();
    };
    return ACEReducerForOne;
}());
export { ACEReducerForOne };
//# sourceMappingURL=ACEReducerForOne.js.map