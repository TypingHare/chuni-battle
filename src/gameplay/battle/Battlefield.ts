import { BattleUnit } from './BattleUnit.ts'
import { TargetRangeType, TargetType } from '../../world/ability/Ability.ts'
import { BattlefieldPosition } from './BattlefieldPosition.ts'
import { Faction, FactionUtil } from './Faction.ts'

export type BattleUnitOrNull = BattleUnit | null

/**
 * Battlefield.
 */
export class Battlefield {
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
     * Returns a battle unit.
     * @param position
     */
    public getBattleUnit(position: BattlefieldPosition): BattleUnitOrNull {
        return position.getFaction() === Faction.Own ?
            this.ownFaction[position.getIndex()] :
            this.enemyFaction[position.getIndex()]
    }

    /**
     * Returns the list of targets.
     * @param selfPosition
     * @param centerPosition
     * @param targetType
     * @param targetRangeType
     */
    public getTargetList(
        selfPosition: BattlefieldPosition,
        centerPosition: BattlefieldPosition,
        targetType: TargetType,
        targetRangeType: TargetRangeType,
    ): BattleUnit[] {
        const battleUnitList: BattleUnit[] = []

        const selfFaction = selfPosition.getFaction()
        const selfIndex = selfPosition.getIndex()
        const centerFaction = centerPosition.getFaction()
        const centerIndex = centerPosition.getIndex()
        if (targetRangeType === TargetRangeType.Single) {
            const battleUnit = this.getBattleUnit(centerPosition)
            if (battleUnit) battleUnitList.push(battleUnit)
        } else if (targetRangeType === TargetRangeType.Medium) {
            if (centerFaction === FactionUtil.enemyOf(selfFaction)) {
                // The target faction is the opposite of self faction
                if (targetType & TargetType.Enemy) {
                    for (let i = Math.max(0, centerIndex - 1); i <= Math.min(centerIndex + 1, BattlefieldPosition.WIDTH); i++) {
                        this.pushIfNotEmpty(battleUnitList, centerFaction, i)
                    }
                }
            } else {
                // The target faction is the self faction
                if (targetType & TargetType.Ally) {
                    for (let i = Math.max(0, centerIndex - 1); i <= Math.min(centerIndex + 1, BattlefieldPosition.WIDTH); i++) {
                        if (i === selfIndex) continue
                        this.pushIfNotEmpty(battleUnitList, centerFaction, i)
                    }
                }

                // Check self
                if (targetType & TargetType.Self) {
                    if (centerIndex >= selfIndex - 1 && centerIndex <= selfIndex + 1) {
                        this.pushIfNotEmpty(battleUnitList, centerFaction, selfIndex)
                    }
                }
            }
        } else if (targetRangeType === TargetRangeType.All) {
            if (targetType & TargetType.Self) {
                this.pushIfNotEmpty(battleUnitList, selfFaction, selfIndex)
            }

            if (targetType & TargetType.Ally) {
                for (let i = 0; i < BattlefieldPosition.WIDTH; i++) {
                    if (i === selfIndex) continue
                    this.pushIfNotEmpty(battleUnitList, selfFaction, i)
                }
            }

            const enemyFaction = FactionUtil.enemyOf(selfFaction)
            if (targetType & TargetType.Enemy) {
                for (let i = 0; i < BattlefieldPosition.WIDTH; i++) {
                    this.pushIfNotEmpty(battleUnitList, enemyFaction, i)
                }
            }
        }

        return battleUnitList
    }

    private getFactionReference(faction: Faction): BattleUnitOrNull[] {
        return faction === Faction.Own ? this.ownFaction : this.enemyFaction
    }

    private pushIfNotEmpty(battleUnitList: BattleUnit[], faction: Faction, index: number): void {
        const battleUnit = this.getFactionReference(faction)[index]
        if (battleUnit != null) {
            battleUnitList.push(battleUnit)
        }
    }
}