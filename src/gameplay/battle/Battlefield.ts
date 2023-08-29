import { BattleUnit } from './BattleUnit.ts'
import { TargetRangeType, TargetType } from '../../world/ability/Ability.ts'

export enum BattlefieldFaction {
    Own,
    Enemy,
}

export type BattleUnitOrNull = BattleUnit | null

/**
 * Battlefield.
 */
export class Battlefield {
    /**
     * The width of battlefield of each faction.
     */
    public static readonly WIDTH: number = 5

    /**
     * The index of the hero.
     */
    public static readonly HERO_INDEX: number = Battlefield.WIDTH / 2

    /**
     * Creates a battlefield.
     * @param ownFaction The units in the own faction
     * @param enemyFaction The units in the enemy faction
     */
    public constructor(
        private readonly ownFaction: BattleUnitOrNull[],
        private readonly enemyFaction: BattleUnitOrNull[],
    ) {
    }

    /**
     * Returns the list of targets.
     * @param selfFaction
     * @param centerTargetFaction
     * @param centerTargetIndex
     * @param targetType
     * @param targetRangeType
     */
    public getTargetList(
        selfFaction: BattlefieldFaction,
        centerTargetFaction: BattlefieldFaction,
        centerTargetIndex: number,
        targetType: TargetType,
        targetRangeType: TargetRangeType,
    ): BattleUnit[] {
        const battleUnitList: BattleUnit[] = []

        console.log(selfFaction)

        if (targetRangeType === TargetRangeType.Single) {
            this.pushIfNotEmpty(battleUnitList, this.getFactionReference(centerTargetFaction), centerTargetIndex)
        } else if (targetRangeType === TargetRangeType.Medium) {
            if (centerTargetFaction === BattlefieldFaction.Own) {
                if (targetType & TargetType.Self) {
                    if (centerTargetIndex >= Battlefield.HERO_INDEX - 1 && centerTargetIndex <= Battlefield.HERO_INDEX + 1) {
                        this.pushIfNotEmpty(battleUnitList, this.ownFaction, Battlefield.HERO_INDEX)
                    }
                }

                if (targetType & TargetType.Ally) {
                    for (let i = centerTargetIndex - 1; i <= centerTargetIndex + 1; i++) {
                        if (i === Battlefield.HERO_INDEX) continue
                        this.pushIfNotEmpty(battleUnitList, this.ownFaction, i)
                    }
                }
            } else {
                if (targetType & TargetType.Enemy) {
                    for (let i = centerTargetIndex - 1; i <= centerTargetIndex + 1; i++) {
                        this.pushIfNotEmpty(battleUnitList, this.enemyFaction, i)
                    }
                }
            }
        } else if (targetRangeType === TargetRangeType.All) {
            if (targetType & TargetType.Self) {
                this.pushIfNotEmpty(battleUnitList, this.ownFaction, 2)
            }

            if (targetType & TargetType.Ally) {
                for (let i = 0; i < Battlefield.WIDTH; i++) {
                    if (i === Battlefield.HERO_INDEX) continue
                    this.pushIfNotEmpty(battleUnitList, this.ownFaction, i)
                }
            }

            if (targetType & TargetType.Enemy) {
                for (let i = 0; i < Battlefield.WIDTH; i++) {
                    this.pushIfNotEmpty(battleUnitList, this.enemyFaction, i)
                }
            }
        }

        return battleUnitList
    }

    private getFactionReference(centerTargetFaction: BattlefieldFaction): BattleUnitOrNull[] {
        return centerTargetFaction === BattlefieldFaction.Own ? this.ownFaction : this.enemyFaction
    }

    private pushIfNotEmpty(battleUnitList: BattleUnit[], faction: BattleUnitOrNull[], index: number): void {
        const battleUnit = faction[index]
        if (battleUnit != null) {
            battleUnitList.push(battleUnit)
        }
    }
}