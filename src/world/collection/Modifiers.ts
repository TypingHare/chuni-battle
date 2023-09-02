import { SpellImmunityModifier } from '../modifier/SpellImmunityModifier.ts'
import { AttackImmunityModifier } from '../modifier/AttackImmunityModifier.ts'
import { DebuffImmunityModifier } from '../modifier/DebuffImmunityModifier.ts'
import { StunModifier } from '../modifier/StunModifier.ts'
import { Modifier } from '../modifier/Modifier.ts'
import { Builtins } from '../../core/Builtins.ts'
import { Registries } from '../../core/Registries.ts'

/**
 * Builtin modifiers.
 */
export class Modifiers {
    public static readonly SPELL_IMMUNITY = Modifiers.register('spell_immunity', new SpellImmunityModifier())
    public static readonly ATTACK_IMMUNITY = Modifiers.register('attack_immunity', new AttackImmunityModifier())
    public static readonly DEBUFF_IMMUNITY = Modifiers.register('debuff_immunity', new DebuffImmunityModifier())
    public static readonly STUN = Modifiers.register('stun', new StunModifier())

    /**
     * Registers a modifier.
     * @param path The path of the modifier.
     * @param modifier The modifier to register
     * @private
     */
    private static register(path: string, modifier: Modifier): Modifier {
        return Registries.MODIFIER.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), modifier)
    }
}