import { EffectModel } from './Effect.ts'

/**
 * Disposable effect.
 */
export abstract class DisposableEffectModel<T = any> extends EffectModel<T> {
    /**
     * Creates a disposable effect.
     * @protected
     */
    protected constructor() {
        super({
            instantlyApplied: true,
            duration: 0,
            interval: EffectModel.APPLY_ONCE_INTERVAL,
        })
    }
}