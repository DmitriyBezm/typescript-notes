/** Пример описания промиса */
type Executor<T> = (
  resolve: (result: T) => void,
  reject: (error: unknown) => void,
) => void

class Promise<T> {
  constructor(f: Executor<T>) {}
  then<U, F extends Error>(g: (result: T) => Promise<U>): Promise<U>
  catch<U, F extends Error>(g: (error: unknown) => Promise<U>): Promise<U>
}

/** Пример типизации библиотечного модуля на основе EventEmitter */

// import Redis from 'client'

// let client = Redis.createClient();

// client.on('ready', () => console.info('Client is ready'))
// client.on('error', (e) => console.error('An error occurred!', e))
// client.on('reconnecting', params => console.info('Reconnecting...', params))

/** Пример 1. Типизация событий с помощью перегрузки */
type RedisClientEx1 = {
  on(event: 'ready', f: () => void): void
  on(event: 'error', f: (e: Error) => void): void
  on(event: 'reconnecting', f: (params: { attempt: number, delay: number }) => void): void
}

/** Пример 2. Типизация событий с помощью отображения типов */
type Events = {
  ready: void;
  error: Error;
  reconnecting: (params: { attempt: number, delay: number }) => void;
}

type RedisClientEx2 = {
  on<E extends keyof Events>(
    events: E,
    f: (arg: Events[E]) => void
  ): void
}

export {}