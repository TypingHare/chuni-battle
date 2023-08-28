import { Modifier, ModifierProperties } from './Modifier.ts'

/**
 * Negative modifier (debuff).
 */
export class NegativeModifier extends Modifier {
    public constructor(properties: Omit<ModifierProperties, 'isNegative'>) {
        super({ ...properties, isNegative: true })
    }
}