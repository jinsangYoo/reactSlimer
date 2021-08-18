import EventEmitter from 'events';
export default class SafeEmitter extends EventEmitter {
    addListener(event, listener) {
        return super.on(event, listener);
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
    removeListener(event, listener) {
        return super.removeListener(event, listener);
    }
    removeAllListeners(event) {
        return super.removeAllListeners(event);
    }
    removeListeners(event) {
        return super.removeAllListeners(event);
    }
}
//# sourceMappingURL=SafeEmitter.js.map