import { InstantiableModel } from '../util/InstantiableModel.ts'
import { ModelInstance } from '../util/ModelInstance.ts'
import { Effect, EffectModel } from '../effect/Effect.ts'
import { ManaPointEffectAffected } from '../effect/MagicPointEffect.ts'
import { ModifierAffected } from '../effect/ModifierEffect.ts'
import { HealthPointEffectAffected } from '../effect/HealthPointEffect.ts'

/**
 * The targeting type enumeration for abilities.
 */
export enum TargetType {
    None = 0b000,
    Self = 0b001,
    Ally = 0b010,
    SelfAndAlly = 0b011,
    Enemy = 0b100,
    EnemyAndAlly = 0b110,
    EnemyAndSelf = 0b101,
    Any = 0b111,
}

/**
 * Target range types.
 */
export enum TargetRangeType {
    Single,     // One
    Medium,     // Three
    All         // Five
}

export interface AbilityProperties {
    // The name of the ability
    readonly name: string

    // Target type
    readonly targetType: TargetType

    // Target range
    readonly targetRange: TargetRangeType

    // Whether it is a spell
    readonly isSpell: boolean

    // Lists of effects of each level
    readonly effectList: EffectModel[][]
}

export interface AbilityOptions {
    readonly level: number
}

export type AbilityBearer = HealthPointEffectAffected | ManaPointEffectAffected | ModifierAffected

export class AbilityModel extends InstantiableModel<AbilityProperties, AbilityOptions> {
    /**
     * Applies this ability to certain bearers
     * @param bearerList
     * @param ability
     */
    public apply(bearerList: AbilityBearer[], ability: Ability): void {
        const effectList = ability.getEffectList()
        for (const abilityBearer of bearerList) {
            for (const effect of effectList) {
                effect.getModel().apply(abilityBearer, effect)
            }
        }
    }

    public override createInstance(options: AbilityOptions): Ability {
        return new Ability(this, options)
    }
}

/**
 * A special ability which represents null.
 */
export class EmptyAbility extends AbilityModel {
    /**
     * The name of the empty ability.
     */
    public static readonly NAME = '$EMPTY$'

    /**
     * Creates an empty ability.
     */
    public constructor() {
        super({
            name: EmptyAbility.NAME,
            targetType: TargetType.None,
            targetRange: TargetRangeType.All,
            isSpell: true,
            effectList: [],
        })
    }
}

export class Ability extends ModelInstance<AbilityModel, AbilityProperties, AbilityOptions> {
    /**
     * A special ability which represents no ability.
     */
    public static readonly NULL = new Ability(new EmptyAbility(), { level: 0 })

    /**
     * The list of effects.
     * @private
     */
    private effectList: Effect[] = []

    public constructor(ability: AbilityModel, options: AbilityOptions) {
        super(ability, options)

        if (ability.getProperties().name !== EmptyAbility.NAME) {
            this.loadEffectList()
            options.level
        }
    }

    /**
     * Loads effect instances.
     * @private
     */
    private loadEffectList(): void {
        if (this === Ability.NULL) {
            return
        }

        const level = this.options!.level
        this.effectList = []
        const effectList = this.model.getProperties().effectList[level - 1]
        for (const effect of effectList) {
            this.effectList.push(effect.createInstance())
        }
    }

    /**
     * Returns the list of effects.
     */
    public getEffectList(): Effect[] {
        return this.effectList
    }
}

export interface AbilityHolder {
    /**
     * Returns all abilities.
     */
    getAbilities(): Ability[]

    /**
     * Returns the number of abilities.
     */
    getAbilityNumber(): number

    /**
     * Adds an ability.
     * @param ability The ability to add
     */
    addAbility(ability: Ability): void

    /**
     * Removes an ability.
     * @param index The index of the ability to remove
     */
    removeAbility(index: number): void

    /**
     * Swaps the position of two abilities.
     * @param index1 The index of the first ability to swap
     * @param index2 The index of the second ability to swap
     */
    swapAbility(index1: number, index2: number): void
}