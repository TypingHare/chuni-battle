import { Effect, EffectAffected, EffectInstance, EffectProperties } from './Effect.ts'
import { Stat } from '../content/Stat.ts'

/**
 * Unit effect properties.
 */
export interface StatEffectProperties extends EffectProperties {
    // The stat to be affected
    affectedStat: Stat

    // The value of variation of the stat
    value: number

    // Whether the value represents a percentage; false if the value represents a real value
    isPercentage: boolean

    // Whether to return the stat to the unit when the effect is removed
    toReturn: boolean
}

/**
 * An effect that affects a unit.
 */
export class StatEffect extends Effect<StatEffectAffected> {
    public constructor(protected properties: StatEffectProperties) {
        super(properties)
    }

    public override apply(statEffectAffected: StatEffectAffected, _effectInstance: StatEffectInstance): void {
        const { affectedStat, value, isPercentage } = this.properties

        const realValue: number = Math.floor(!isPercentage ? value : (() => {
            const baseValue = statEffectAffected.getBaseStatValue(affectedStat)
            return baseValue * value
        })())

        const currentValue = statEffectAffected.getStatValue(affectedStat)
        if (currentValue == 0) {
            return
        }

        statEffectAffected.increaseExtraStatValue(affectedStat, realValue)
    }

    public override afterRemove(effectAffected: StatEffectAffected, effectInstance: StatEffectInstance): void {
        if (!this.properties.toReturn) {
            return
        }

        const { affectedStat } = this.properties
        const accumulatedValue: number = effectInstance.getAccumulatedValue()
        effectAffected.increaseExtraStatValue(affectedStat, -accumulatedValue)
    }

    public override spawnInstance(): StatEffectInstance {
        return new StatEffectInstance(this)
    }
}

export interface StatEffectAffected extends EffectAffected<StatEffectAffected> {
    /**
     * Returns the base value of a stat.
     * @param stat The stat
     */
    getBaseStatValue(stat: Stat): number

    /**
     * Returns the value of a specified stat.
     * @param stat The stat
     */
    getStatValue(stat: Stat): number

    /**
     * Sets stat value.
     * @param stat The stat
     * @param increaseBy The value to increase by
     */
    increaseExtraStatValue(stat: Stat, increaseBy: number): void
}

/**
 * Unit effect instance.
 */
export class StatEffectInstance extends EffectInstance<StatEffectAffected> {
    /**
     * Accumulated value.
     * @private
     */
    private accumulatedValue: number = 0

    /**
     * Creates a stat effect instance.
     * @param effect
     */
    public constructor(protected effect: StatEffect) {
        super(effect)
    }

    /**
     * Gets accumulated value.
     */
    public getAccumulatedValue(): number {
        return this.accumulatedValue
    }
}