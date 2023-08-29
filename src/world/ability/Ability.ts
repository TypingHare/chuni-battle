import { InstantiableModel } from '../util/InstantiableModel.ts'
import { ModelInstance } from '../util/ModelInstance.ts'
import { Effect, EffectInstance } from '../effect/Effect.ts'
import { HealthPointEffectAffected } from '../effect/HealEffect.ts'
import { ManaPointEffectAffected } from '../effect/ManaPointEffect.ts'
import { ModifierAffected } from '../effect/ModifierEffect.ts'

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
    readonly effectList: Effect[][]
}

export interface AbilitySpawningOptions {
    readonly level: number
}

export type AbilityBearer = HealthPointEffectAffected | ManaPointEffectAffected | ModifierAffected

export class Ability extends InstantiableModel<AbilityProperties, AbilitySpawningOptions> {
    /**
     * Applies this ability to certain bearers
     * @param bearerList
     * @param abilityInstance
     */
    public apply(bearerList: AbilityBearer[], abilityInstance: AbilityInstance): void {
        const effectInstanceList = abilityInstance.getEffectInstanceList()
        for (const abilityBearer of bearerList) {
            for (const effectInstance of effectInstanceList) {
                effectInstance.getModel().apply(abilityBearer, effectInstance)
            }
        }
    }

    public override spawnInstance(options: AbilitySpawningOptions): AbilityInstance {
        return new AbilityInstance(this, options)
    }
}

/**
 * A special ability which represents null.
 */
export class EmptyAbility extends Ability {
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

export class AbilityInstance extends ModelInstance<Ability, AbilitySpawningOptions> {
    /**
     * A special ability instance which represents no ability.
     */
    public static readonly NULL = new AbilityInstance(new EmptyAbility(), { level: 0 })

    /**
     * The list of effect instances.
     * @private
     */
    private effectInstanceList: EffectInstance[] = []

    public constructor(ability: Ability, options: AbilitySpawningOptions) {
        super(ability, options)

        if (ability.getProperties().name !== EmptyAbility.NAME) {
            this.loadEffectInstanceList()
            options.level
        }
    }

    /**
     * Loads effect instances.
     * @private
     */
    private loadEffectInstanceList(): void {
        if (this === AbilityInstance.NULL) {
            return
        }

        const level = this.options!.level
        this.effectInstanceList = []
        const effectList = this.model.getProperties().effectList[level - 1]
        for (const effect of effectList) {
            this.effectInstanceList.push(effect.spawnInstance())
        }
    }

    /**
     * Returns the list of effect instances.
     */
    public getEffectInstanceList(): EffectInstance[] {
        return this.effectInstanceList
    }
}

export interface AbilityHolder {
    /**
     * Returns all abilities.
     */
    getAbilities(): AbilityInstance[]

    /**
     * Returns the number of abilities.
     */
    getAbilityNumber(): number

    /**
     * Adds an ability.
     * @param abilityInstance
     */
    addAbility(abilityInstance: AbilityInstance): void

    /**
     * Removes an ability.
     * @param index
     */
    removeAbility(index: number): void

    /**
     * Swaps the position of two abilities.
     * @param index1 The index of the first ability to swap
     * @param index2 The index of the second ability to swap
     */
    swapAbility(index1: number, index2: number): void
}