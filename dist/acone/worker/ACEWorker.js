var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { ACEWorkerEventsForCallerEmitter } from '../worker/ACEWorkerEventsForCallerEmitter';
import { ACEWorkerEventsForWorkerEmitter } from '../worker/ACEWorkerEventsForWorkerEmitter';
var ACEWorker = (function () {
    function ACEWorker() {
        var _this = this;
        this.commandEmitter = new ACEWorkerEventsForCallerEmitter();
        global.onmessage = function (command) {
            var _a;
            return (_a = _this.eventEmitter).emit.apply(_a, __spreadArray([command.data.type], command.data.data));
        };
        this.commandEmitter.on('onStartForAPI', function (task) {
            var _a;
            console.log('ACEWorker::commandEmitter::onStartForAPI');
            console.log(JSON.stringify(task));
            ACEWorker.plWithPage((_a = task === null || task === void 0 ? void 0 : task.action.name) !== null && _a !== void 0 ? _a : 'none');
        });
        this.commandEmitter.on('onFinish', function (message, logsource) {
            console.log('ACEWorker::commandEmitter::onFinish');
            console.log([message, logsource]);
        });
        this.commandEmitter.on('onError', function (err) {
            console.log('ACEWorker::commandEmitter::onError');
            console.log(JSON.stringify(err));
        });
        this.eventEmitter = new ACEWorkerEventsForWorkerEmitter();
        this.eventEmitter.on('onStartForAPI', function (task) {
            console.log('ACEWorker::eventEmitter::onStartForAPI');
            console.log(JSON.stringify(task));
        });
        this.eventEmitter.on('started', function () { return console.log('ACEWorker::eventEmitter::started'); });
        this.eventEmitter.on('onFinish', function (message, logsource) {
            console.log('ACEWorker::eventEmitter::onFinish');
            console.log(JSON.stringify([message, logsource]));
            postMessage({ type: 'onFinish', message: message, logsource: logsource });
        });
        this.eventEmitter.on('onError', function (err) {
            console.log('ACEWorker::eventEmitter::onError');
            console.log(JSON.stringify(err));
        });
    }
    ACEWorker.getInstance = function () {
        return this.instance || (this.instance = new this());
    };
    ACEWorker.getWorkerEmitter = function () {
        return ACEWorker.getInstance().eventEmitter;
    };
    ACEWorker.plWithPage = function (pageName) {
        console.log('ACEWorker::plWithPage: ' + JSON.stringify(pageName));
        ACEWorker.getWorkerEmitter().emit('onFinish', 'done', 200);
    };
    return ACEWorker;
}());
export default ACEWorker;
//# sourceMappingURL=ACEWorker.js.map