import { Unit, UnitProperties } from './Unit.ts'
import { Stat } from '../content/Stat.ts'

export type StatsObject = {
    [stat: number]: number
}

export type DefaultUnitProperties = Omit<UnitProperties, 'statsBase' | 'statsGain'>

/**
 * Default unit.
 */
export class DefaultUnit extends Unit {
    public static readonly HEALTH_POINT_BASE: number = 50
    public static readonly MANA_POINT_BASE: number = 20
    public static readonly HEALTH_REGENERATION_BASE: number = 0.1
    public static readonly MANA_REGENERATION_BASE: number = 0.05
    public static readonly WISDOM_BASE: number = 10
    public static readonly FORTUNE_BASE: number = 10
    public static readonly AGILITY_BASE: number = 10
    public static readonly STRENGTH_BASE: number = 10
    public static readonly STAMINA_BASE: number = 10

    public static readonly HEALTH_POINT_GAIN: number = 5
    public static readonly MANA_POINT_GAIN: number = 2
    public static readonly HEALTH_REGENERATION_GAIN: number = 0.02
    public static readonly MANA_REGENERATION_GAIN: number = 0.01
    public static readonly WISDOM_GAIN: number = 2
    public static readonly FORTUNE_GAIN: number = 2
    public static readonly AGILITY_GAIN: number = 2
    public static readonly STRENGTH_GAIN: number = 2
    public static readonly STAMINA_GAIN: number = 2

    public constructor(
        properties: DefaultUnitProperties,
        statsBase: StatsObject,
        statsGain: StatsObject,
    ) {
        const _statsBase = []
        _statsBase[Stat.HealthPoint] = statsBase[Stat.HealthPoint] || DefaultUnit.HEALTH_POINT_BASE
        _statsBase[Stat.ManaPoint] = statsBase[Stat.ManaPoint] || DefaultUnit.MANA_POINT_BASE
        _statsBase[Stat.HealthRegeneration] = statsBase[Stat.HealthRegeneration] || DefaultUnit.HEALTH_REGENERATION_BASE
        _statsBase[Stat.ManaRegeneration] = statsBase[Stat.ManaRegeneration] || DefaultUnit.MANA_REGENERATION_BASE
        _statsBase[Stat.Wisdom] = statsBase[Stat.Wisdom] || DefaultUnit.WISDOM_BASE
        _statsBase[Stat.Fortune] = statsBase[Stat.Fortune] || DefaultUnit.FORTUNE_BASE
        _statsBase[Stat.Agility] = statsBase[Stat.Agility] || DefaultUnit.AGILITY_BASE
        _statsBase[Stat.Strength] = statsBase[Stat.Strength] || DefaultUnit.STRENGTH_BASE
        _statsBase[Stat.Stamina] = statsBase[Stat.Stamina] || DefaultUnit.STAMINA_BASE
        for (let i = Stat.SpellMastery; i <= Stat.CounterSpell; i++) {
            _statsBase[i] = statsBase[i] || 0
        }

        const _statsGain = []
        _statsGain[Stat.HealthPoint] = statsGain[Stat.HealthPoint] || DefaultUnit.HEALTH_POINT_GAIN
        _statsGain[Stat.ManaPoint] = statsGain[Stat.ManaPoint] || DefaultUnit.MANA_POINT_GAIN
        _statsGain[Stat.HealthRegeneration] = statsGain[Stat.HealthRegeneration] || DefaultUnit.HEALTH_REGENERATION_GAIN
        _statsGain[Stat.ManaRegeneration] = statsGain[Stat.ManaRegeneration] || DefaultUnit.MANA_REGENERATION_GAIN
        _statsGain[Stat.Wisdom] = statsGain[Stat.Wisdom] || DefaultUnit.WISDOM_GAIN
        _statsGain[Stat.Fortune] = statsGain[Stat.Fortune] || DefaultUnit.FORTUNE_GAIN
        _statsGain[Stat.Agility] = statsGain[Stat.Agility] || DefaultUnit.AGILITY_GAIN
        _statsGain[Stat.Strength] = statsGain[Stat.Strength] || DefaultUnit.STRENGTH_GAIN
        _statsGain[Stat.Stamina] = statsGain[Stat.Stamina] || DefaultUnit.STAMINA_GAIN
        for (let i = Stat.SpellMastery; i <= Stat.CounterSpell; i++) {
            _statsGain[i] = statsGain[i] || 0
        }

        super({
            ...properties,
            statsBase: _statsBase,
            statsGain: _statsGain,
        })
    }
}