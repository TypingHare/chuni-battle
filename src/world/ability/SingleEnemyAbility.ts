import { Ability, AbilityProperties, TargetRangeType, TargetType } from './Ability.ts'

/**
 * An ability that targets one enemy.
 */
export class SingleEnemyAbility extends Ability {
    public constructor(properties: Omit<AbilityProperties, 'targetType' | 'targetRange'>) {
        super({
            ...properties,
            targetType: TargetType.Enemy,
            targetRange: TargetRangeType.Single,
        })
    }
}