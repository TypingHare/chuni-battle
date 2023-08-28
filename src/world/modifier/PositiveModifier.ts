import { Modifier, ModifierProperties } from './Modifier.ts'

/**
 * Positive modifier (buff).
 */
export class PositiveModifier extends Modifier {
    public constructor(properties: Omit<ModifierProperties, 'isNegative'>) {
        super({ ...properties, isNegative: false })
    }
}