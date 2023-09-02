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
export class EffectModel<T = any> extends InstantiableModel<EffectProperties> {
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
     * @param _effect The effect instance
     */
    public apply(_effectAffected: T, _effect: Effect<T>) {
    }

    /**
     * This method is fired when the effect is removed from an EffectAffected object.
     * @param _effectAffected The object to apply
     * @param _effect The effect instance
     */
    public afterRemove(_effectAffected: T, _effect: Effect<T>) {
    }

    /**
     * Whether this effect is a permanent effect.
     */
    public isPermanent(): boolean {
        return this.properties.duration === EffectModel.PERMANENT_DURATION
    }

    /**
     * Whether this effect is an instant effect.
     */
    public isInstant(): boolean {
        return this.properties.duration === 0
    }

    public override createInstance(): Effect<T> {
        return new Effect<T>(this)
    }
}

export class Effect<T = any> extends ModelInstance<EffectModel<T>, EffectProperties> {
}

/**
 * A game object that can be affected by effects.
 */
export interface EffectAffected<T> {
    /**
     * Returns all effects.
     */
    getEffects(): Iterable<Effect<T>>;

    /**
     * Adds an effect.
     * @param effect
     */
    addEffect(effect: Effect<T>): void

    /**
     * Removes an effect.
     * @param effect
     */
    removeEffect(effect: Effect<T>): void

    /**
     * Applies all effects.
     */
    applyEffects(): void
}