import { InstantiableModel } from '../util/InstantiableModel.ts'
import { ModelInstance } from '../util/ModelInstance.ts'
import { Race } from '../content/Race.ts'
import { Ability, AbilityHolder, AbilityModel, AbilityOptions } from '../ability/Ability.ts'
import { StatEffectAffected } from '../effect/StatEffect.ts'
import { ManaPointEffectAffected } from '../effect/MagicPointEffect.ts'
import { ModifierAffected } from '../effect/ModifierEffect.ts'
import { Modifier } from '../modifier/Modifier.ts'
import { HiddenAttribute, Stat, StatsUtil, VisibleAttribute } from '../content/Stat.ts'
import { GameConstants } from '../GameConstants.ts'
import { HealthPointEffectAffected } from '../effect/HealthPointEffect.ts'
import { Effect } from '../effect/Effect.ts'

export type AbilityMode = AbilityOptions & {
    readonly ability: AbilityModel
}

export interface UnitProperties {
    // The name of the unit
    readonly name: string,

    // The race of the unit; undefined indicates the unit does not belong to any race
    readonly race: Race | null,

    // The base of stats
    readonly statsBase: number[],

    // The gain of stats
    readonly statsGain: number[],

    // The list of abilities this unit has
    readonly abilityModeList: AbilityMode[]
}

export interface UnitOptions {
    readonly level: number
}

export class UnitModel extends InstantiableModel<UnitProperties, UnitOptions> {
    public override createInstance(options: UnitOptions): Unit {
        return new Unit(this, options)
    }

    public getStatBase(stat: Stat): number {
        return this.properties.statsBase[stat]
    }

    public getStatGain(stat: Stat): number {
        return this.properties.statsGain[stat]
    }
}

export class Unit extends ModelInstance<UnitModel, UnitProperties, UnitOptions> implements StatEffectAffected,
    HealthPointEffectAffected,
    ManaPointEffectAffected,
    ModifierAffected,
    AbilityHolder {
    /**
     * The level of the unit.
     * @private
     */
    private level: number

    /**
     * Base stats. It is equal to <stat base> + <stat gain> * level.
     * @private
     */
    private readonly baseStats: number[]

    /**
     * Dynamic extra stats.
     * @private
     */
    private readonly extraStats: number[]

    /**
     * A set of effects.
     * @private
     */
    private readonly effectSet: Set<Effect> = new Set()

    /**
     * The unit's current health point.
     * @private
     */
    private currentHealthPoint: number

    /**
     * The unit's current mana point.
     * @private
     */
    private currentManaPoint: number

    /**
     * The list of abilities.
     * @private
     */
    private readonly abilityList: Ability[]

    /**
     * A set of modifiers.
     * @private
     */
    private readonly modifierSet: Set<Modifier> = new Set()

    /**
     * Creates a units.
     * @param unitModel
     * @param options
     */
    public constructor(
        unitModel: UnitModel,
        options: UnitOptions,
    ) {
        super(unitModel, options)

        // Level
        this.level = options.level

        // Initialize dynamic stats and dynamic extra stats
        this.baseStats = []
        this.extraStats = []
        for (let stat = Stat.HealthPoint; stat <= Stat.CounterSpell; stat++) {
            this.baseStats[stat] = this.model.getStatBase(stat) + this.level * this.model.getStatGain(stat)
            this.extraStats[stat] = 0
        }

        // Initialize current health point and mana point
        this.currentHealthPoint = this.getStatValue(Stat.HealthPoint)
        this.currentManaPoint = this.getStatValue(Stat.ManaPoint)

        // Initialize abilities
        this.abilityList = []
    }

    /**
     * Returns the unit of this unit.
     */
    public getLevel(): number {
        return this.level
    }

    /**
     * Returns this unit's current health point.
     */
    public getCurrentHealthPoint(): number {
        return this.currentHealthPoint
    }

    /**
     * Returns this unit's current mana point.
     */
    public getCurrentManaPoint(): number {
        return this.currentManaPoint
    }

    /**
     * Make this unit level up.
     */
    public levelUp(): void {
        if (this.level === GameConstants.UNIT_MAX_LEVEL) {
            return
        }

        this.level++

        // The unit gains stats
        for (let stat = Stat.HealthPoint; stat < Stat.CounterSpell; stat++) {
            this.baseStats[stat] += this.model.getStatGain(stat)
        }
    }

    /**
     * Attacks a specified target.
     * @param target The target to attack
     */
    public attack(target: Unit): void {
        target.increaseHealthPoint(-10)
    }

    /**
     * Increases current health point.
     * @param increaseBy
     */
    public increaseHealthPoint(increaseBy: number): void {
        this.currentHealthPoint += increaseBy
    }

    /**
     * Increases current mana point.
     * @param increaseBy
     */
    public increaseManaPoint(increaseBy: number): void {
        this.currentManaPoint += increaseBy
    }

    public getBaseStatValue(stat: Stat): number {
        return this.baseStats[stat]
    }

    public getStatValue(stat: Stat): number {
        let value = this.baseStats[stat] + this.extraStats[stat]

        if (!StatsUtil.isAttribute(stat) || StatsUtil.isPrimaryAttribute(stat)) {
            return value
        }

        const { race } = this.model.getProperties()
        if (StatsUtil.isVisibleAttribute(stat)) {
            // Visible attributes
            const coefficient = race && stat === StatsUtil.RACE_PRIMARY_ATTRIBUTE_MAPPING[race] ?
                GameConstants.VISIBLE_ATTRIBUTE_SAME_RACE_COEFFICIENT :
                GameConstants.VISIBLE_ATTRIBUTE_COEFFICIENT

            const relatedPrimaryAttribute = StatsUtil.VISIBLE_ATTRIBUTE_MAPPING[stat as VisibleAttribute]
            value += this.getStatValue(relatedPrimaryAttribute) * coefficient
        } else {
            // Hidden attributes
            const coefficient1 = race && stat === StatsUtil.RACE_PRIMARY_ATTRIBUTE_MAPPING[race] ?
                GameConstants.HIDDEN_ATTRIBUTE_SAME_RACE_COEFFICIENT_1 :
                GameConstants.HIDDEN_ATTRIBUTE_COEFFICIENT_1
            const coefficient2 = race && stat === StatsUtil.RACE_PRIMARY_ATTRIBUTE_MAPPING[race] ?
                GameConstants.HIDDEN_ATTRIBUTE_SAME_RACE_COEFFICIENT_2 :
                GameConstants.HIDDEN_ATTRIBUTE_COEFFICIENT_2

            const [primaryAttribute1, primaryAttribute2] = StatsUtil.HIDDEN_ATTRIBUTE_MAPPING[stat as HiddenAttribute]
            value += this.getStatValue(primaryAttribute1) * coefficient1
                + this.getStatValue(primaryAttribute2) * coefficient2
        }

        return value
    }

    public increaseExtraStatValue(stat: Stat, increaseBy: number): void {
        this.extraStats[stat] += Math.max(0, this.extraStats[stat] += increaseBy)
    }

    public getEffects(): Iterable<Effect> {
        return this.effectSet
    }

    public addEffect(effect: Effect): void {
        this.effectSet.add(effect)
    }

    public applyEffects(): void {
        for (const effect of this.effectSet) {
            effect.getModel().apply(this, effect)
        }
    }

    public removeEffect(effect: Effect): void {
        this.effectSet.delete(effect)
    }

    public getAbilities(): Ability[] {
        return this.abilityList
    }

    public getAbilityNumber(): number {
        return this.abilityList.filter(ability => ability !== Ability.NULL).length
    }

    public addAbility(ability: Ability): void {
        this.abilityList.push(ability)
    }

    public removeAbility(index: number): void {
        this.abilityList[index] = Ability.NULL
    }

    public swapAbility(index1: number, index2: number): void {
        const list = this.abilityList;
        [list[index1], list[index2]] = [list[index2], list[index1]]
    }

    public getModifiers(): Iterable<Modifier> {
        return this.modifierSet
    }

    public addModifier(modifier: Modifier): void {
        this.modifierSet.add(modifier)
    }

    public removeModifier(modifier: Modifier): void {
        this.modifierSet.delete(modifier)
    }
}