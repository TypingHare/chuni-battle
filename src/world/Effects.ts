import { Registries } from '../core/Registries.ts'
import { Builtins } from '../core/Builtins.ts'
import { Effect } from './effect/Effect.ts'
import { HealEffect } from './effect/HealEffect.ts'

/**
 * Builtin effects.
 */
export class Effects {
    public static readonly HEAL_1 = Effects.registerHealEffect('heal.1', 50)
    public static readonly HEAL_2 = Effects.registerHealEffect('heal.2', 100)
    public static readonly HEAL_3 = Effects.registerHealEffect('heal.3', 150)

    /**
     * Registers an effect.
     * @param path The path of the effect
     * @param effect The effect to register
     * @private
     */
    private static register(path: string, effect: Effect): Effect {
        return Registries.EFFECT.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), effect)
    }

    /**
     * Registers a heal effect.
     * @param path The path of the effect
     * @param heal The amount to heal
     * @private
     */
    private static registerHealEffect(path: string, heal: number): Effect {
        return Effects.register(path, new HealEffect(heal))
    }
}