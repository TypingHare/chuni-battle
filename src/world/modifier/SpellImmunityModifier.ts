import { PositiveModifier } from './PositiveModifier.ts'

/**
 * Spell immunity modifier. If a unit is spell immune, it will not take any effects from spells.
 */
export class SpellImmunityModifier extends PositiveModifier {
    public constructor() {
        super({ name: 'Spell Immunity' })
    }
}