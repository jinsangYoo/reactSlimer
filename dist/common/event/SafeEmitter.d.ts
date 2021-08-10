/// <reference types="node" />
import EventEmitter from 'events';
declare type EventsOf<T> = keyof T & string;
declare type ListenerFunc<T, E extends EventsOf<T>> = T[E] extends (...args: any[]) => void ? T[E] : never;
declare type ListenerArgs<T, E extends EventsOf<T>> = T[E] extends (...args: infer A) => void ? A : never;
export default class SafeEmitter<T> extends EventEmitter {
    on<E extends EventsOf<T>>(event: E, listener: ListenerFunc<T, E>): this;
    once<E extends EventsOf<T>>(event: E, listener: ListenerFunc<T, E>): this;
    emit<E extends EventsOf<T>>(event: E, ...args: ListenerArgs<T, E>): boolean;
}
export {};
//# sourceMappingURL=SafeEmitter.d.ts.map