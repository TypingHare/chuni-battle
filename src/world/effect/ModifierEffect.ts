import { Effect, EffectAffected, EffectProperties } from './Effect.ts'
import { Modifier } from '../modifier/Modifier.ts'

export type ModifierEffectProperties = Omit<EffectProperties, 'instantlyApplied' | 'interval'> & {
    modifier: Modifier
}

/**
 * Modifier effect.
 */
export class ModifierEffect extends Effect<ModifierAffected> {
    /**
     * Modifier to add to the affected object.
     * @private
     */
    private readonly modifier: Modifier

    /**
     * Creates a modifier effect.
     * @param properties
     */
    public constructor(properties: ModifierEffectProperties) {
        super({
            instantlyApplied: true,
            duration: properties.duration,
            interval: Effect.APPLY_ONCE_INTERVAL,
        })

        const { modifier } = properties
        this.modifier = modifier
    }

    public override apply(effectAffected: ModifierAffected): void {
        const modifiers = effectAffected.getModifiers()

        let hasModifier = false
        for (let modifier of modifiers) {
            if (modifier === this.modifier) {
                hasModifier = true
            }
        }

        if (!hasModifier) {
            effectAffected.addModifier(this.modifier)
        }
    }

    public override afterRemove(effectAffected: ModifierAffected) {
        const effectInstances = effectAffected.getEffects()

        let hasSameModifierEffect = false
        for (const effectInstance of effectInstances) {
            const effect = effectInstance.getModel() as Effect<unknown>
            if (effect instanceof Object.getPrototypeOf(this)) {
                hasSameModifierEffect = true
                break
            }
        }

        if (!hasSameModifierEffect) {
            effectAffected.removeModifier(this.modifier)
        }
    }
}

/**
 * Modifier affected object.
 */
export interface ModifierAffected extends EffectAffected<ModifierAffected> {
    /**
     * Returns all modifier instances.
     */
    getModifiers(): Iterable<Modifier>

    /**
     * Adds a modifier.
     * @param modifier
     */
    addModifier(modifier: Modifier): void

    /**
     * Removes a modifier.
     * @param modifier
     */
    removeModifier(modifier: Modifier): void
}