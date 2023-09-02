import { Unit } from '../../world/unit/Unit.ts'
import { BattleAction } from './BattleAction.ts'
import { Battle } from './Battle.ts'
import { TargetRangeType, TargetType } from '../../world/ability/Ability.ts'
import { BattlefieldPosition } from './BattlefieldPosition.ts'

export class BattleUnit {
    /**
     * Empty battle unit.
     */
    public static readonly EMPTY = null

    /**
     * The queue of the actions.
     * @private
     */
    private readonly actionQueue: BattleAction[] = []

    /**
     * Creates a battle unit.
     * @param battle The battle it is in.
     * @param unit
     * @param position
     */
    public constructor(
        private readonly battle: Battle,
        private readonly unit: Unit,
        private readonly position: BattlefieldPosition,
    ) {
    }

    public getUnit(): Unit {
        return this.unit
    }

    public addAction(action: BattleAction): void {
        this.actionQueue.push(action)
    }

    public getActionQueue(): BattleAction[] {
        return this.actionQueue
    }

    public consumeAction(): void {
        const battleAction = this.actionQueue.shift()

        if (!battleAction) {
            return
        }

        const battlefield = this.battle.getBattleField()
        const action = battleAction.getAction()
        const position = battleAction.getPosition()
        if (action === BattleAction.ATTACK) {
            // Attack
            const targetList: BattleUnit[]
                = battlefield.getTargetList(this.position, position, TargetType.Enemy, TargetRangeType.Single)
            this.unit.attack(targetList[0].unit)
        } else {
            // Use an ability
            const ability = this.unit.getAbilities()[action]

            // To determine which targets bear the ability
            const { targetType, targetRange } = ability.getModel().getProperties()
            const targetList: BattleUnit[]
                = battlefield.getTargetList(this.position, position, targetType, targetRange)
            ability.getModel().apply(targetList.map(battleUnit => battleUnit.unit), ability)
            console.log(targetList)
        }
    }
}