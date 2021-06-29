import EventEmitter from 'events'

type EventsOf<T> = keyof T & string
type ListenerFunc<T, E extends EventsOf<T>> = T[E] extends (...args: any[]) => void ? T[E] : never
type ListenerArgs<T, E extends EventsOf<T>> = T[E] extends (...args: infer A) => void ? A : never

export default class SafeEmitter<T> extends EventEmitter {
  on<E extends EventsOf<T>>(event: E, listener: ListenerFunc<T, E>) {
    return super.on(event, listener)
  }
  once<E extends EventsOf<T>>(event: E, listener: ListenerFunc<T, E>) {
    return super.once(event, listener)
  }
  emit<E extends EventsOf<T>>(event: E, ...args: ListenerArgs<T, E>) {
    return super.emit(event, ...args)
  }
}
