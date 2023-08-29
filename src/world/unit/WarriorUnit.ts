import { Stat } from '../content/Stat.ts'
import { DefaultUnit, DefaultUnitProperties, StatsObject } from './DefaultUnit.ts'

/**
 * Warrior units have no mana point, but have higher health point and health regeneration.
 */
export class WarriorUnit extends DefaultUnit {
    public constructor(
        properties: DefaultUnitProperties,
        statsBase: StatsObject = {},
        statsGain: StatsObject = {},
    ) {
        const _statsBase = {
            [Stat.HealthPoint]: 80,
            [Stat.ManaPoint]: 0,
            [Stat.HealthRegeneration]: 0.15,
            [Stat.ManaRegeneration]: 0,
            ...statsBase,
        }

        const _statsGain = {
            [Stat.HealthPoint]: 7,
            [Stat.ManaPoint]: 0,
            [Stat.HealthRegeneration]: 0.03,
            [Stat.ManaRegeneration]: 0,
            [Stat.Wisdom]: 1,
            [Stat.Strength]: 3,
            ...statsGain,
        }

        super(properties, _statsBase, _statsGain)
    }
}