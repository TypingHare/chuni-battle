import { PositiveModifier } from './PositiveModifier.ts'

/**
 * Spell Immunity modifier. If a unit is debuff immune, it will not take any debuff modifiers; all debuff modifiers
 * will be removed when a unit gains debuff immunity.
 */
export class AttackImmunityModifier extends PositiveModifier {
    public constructor() {
        super({
            name: 'Spell Immunity',
            description: '',
        })
    }
}