import { Ability, AbilityProperties, TargetRangeType, TargetType } from './Ability.ts'

/**
 * An ability that targets one enemy.
 */
export class SingleEnemyAbility extends Ability {
    public constructor(properties: Omit<AbilityProperties, 'targetTypeList' | 'targetRange'>) {
        super({
            ...properties,
            targetTypeList: [TargetType.Enemy],
            targetRange: TargetRangeType.Single,
        })
    }
}