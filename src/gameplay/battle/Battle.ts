import { Battlefield, BattleUnitOrNull } from './Battlefield.ts'
import { Unit } from '../../world/unit/Unit.ts'
import { BattleUnit } from './BattleUnit.ts'
import { Faction } from './Faction.ts'
import { BattlefieldPosition } from './BattlefieldPosition.ts'

/**
 * Battle.
 */
export class Battle {
    /**
     * Battlefield.
     * @private
     */
    private readonly battlefield: Battlefield

    /**
     * Creates a battle.
     * @param ownFaction
     * @param enemyFaction
     */
    public constructor(
        ownFaction: (Unit | null)[],
        enemyFaction: (Unit | null)[],
    ) {
        const provideBattleUnitOrNull = (
            unitOrNull: Unit | null,
            position: BattlefieldPosition,
        ): BattleUnitOrNull => {
            return unitOrNull && new BattleUnit(this, unitOrNull, position)
        }

        this.battlefield = new Battlefield(
            ownFaction.map((unit, index) => provideBattleUnitOrNull(unit, BattlefieldPosition.of(Faction.Own, index))),
            enemyFaction.map((unit, index) => provideBattleUnitOrNull(unit, BattlefieldPosition.of(Faction.Enemy, index))),
        )
    }

    /**
     * Battle begins.
     */
    public begin(): void {

    }

    /**
     * Returns the battlefield.
     */
    public getBattleField(): Battlefield {
        return this.battlefield
    }
}