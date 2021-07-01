import EventEmitter from 'events';
export default class SafeEmitter extends EventEmitter {
    on(event, listener) {
        return super.on(event, listener);
    }
    once(event, listener) {
        return super.once(event, listener);
    }
    emit(event, ...args) {
        return super.emit(event, ...args);
    }
}
//# sourceMappingURL=SafeEmitter.js.map