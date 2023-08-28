import { NegativeModifier } from './NegativeModifier.ts'

/**
 * Stun modifier. Upon getting stunned, the unit is not able to attack or use any abilities until the effect expires.
 */
export class StunModifier extends NegativeModifier {
    public constructor() {
        super({ name: 'Stun' })
    }
}