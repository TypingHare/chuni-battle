import { Effect } from './Effect.ts'

/**
 * Disposable effect.
 */
export abstract class DisposableEffect<T = any> extends Effect<T> {
    /**
     * Creates a disposable effect.
     * @protected
     */
    protected constructor() {
        super({
            instantlyApplied: true,
            duration: 0,
            interval: Effect.APPLY_ONCE_INTERVAL,
        })
    }
}