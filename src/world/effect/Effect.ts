import { ModelInstance } from '../util/ModelInstance.ts'
import { InstantiableModel } from '../util/InstantiableModel.ts'

export interface EffectProperties {
    // Whether the effect is instantly applied
    readonly instantlyApplied: boolean

    // The duration in milliseconds
    readonly duration: number

    // The interval in milliseconds
    readonly interval: number
}

/**
 * @param T The object to apply
 */
export class Effect<T = any> extends InstantiableModel<EffectProperties> {
    /**
     * Permanent duration.
     */
    public static readonly PERMANENT_DURATION: number = -1

    /**
     * Apply once interval.
     */
    public static readonly APPLY_ONCE_INTERVAL: number = 0

    /**
     * Applies this effect on an object.
     * @param _effectAffected The object to apply
     * @param _effectInstance The effect instance
     */
    public apply(_effectAffected: T, _effectInstance: EffectInstance<T>) {
    }

    /**
     * This method is fired when the effect is removed from an EffectAffected object.
     * @param _effectAffected The object to apply
     * @param _effectInstance The effect instance
     */
    public afterRemove(_effectAffected: T, _effectInstance: EffectInstance<T>) {
    }

    /**
     * Whether this effect is a permanent effect.
     */
    public isPermanent(): boolean {
        return this.properties.duration === Effect.PERMANENT_DURATION
    }

    /**
     * Whether this effect is an instant effect.
     */
    public isInstant(): boolean {
        return this.properties.duration === 0
    }

    public override spawnInstance(): EffectInstance<T> {
        return new EffectInstance<T>(this)
    }
}

export class EffectInstance<T = any> extends ModelInstance<Effect<T>> {
}

/**
 * A game object that can be affected by effects.
 */
export interface EffectAffected<T> {
    getEffects(): Iterable<EffectInstance<T>>;

    /**
     * Adds an effect.
     * @param effectInstance
     */
    addEffect(effectInstance: EffectInstance<T>): void

    /**
     * Removes an effect.
     * @param effectInstance
     */
    removeEffect(effectInstance: EffectInstance<T>): void

    /**
     * Applies all effects.
     */
    applyEffects(): void
}