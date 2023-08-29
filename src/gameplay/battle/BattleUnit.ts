import { UnitInstance } from '../../world/unit/Unit.ts'
import { BattleAction } from './BattleAction.ts'
import { Battle } from './Battle.ts'
import { TargetRangeType, TargetType } from '../../world/ability/Ability.ts'
import { BattlefieldFaction } from './Battlefield.ts'

export class BattleUnit {
    /**
     * Empty battle unit.
     */
    public static readonly EMPTY = null

    private readonly actionQueue: BattleAction[] = []

    public constructor(
        private readonly battle: Battle,
        private readonly unitInstance: UnitInstance,
        private readonly faction: BattlefieldFaction,
    ) {
    }

    public getUnitInstance(): UnitInstance {
        return this.unitInstance
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
        const faction = battleAction.getCenterTargetFaction()
        const centerTarget = battleAction.getCenterTarget()
        if (action === BattleAction.ATTACK) {
            // Attack
            const targetList: BattleUnit[]
                = battlefield.getTargetList(this.faction, faction, centerTarget, TargetType.Enemy, TargetRangeType.Single)
            this.unitInstance.attack(targetList[0].getUnitInstance())
        } else {
            // Use an ability
            const abilityInstance = this.unitInstance.getAbilities()[action]

            // To determine which targets bear the ability
            const { targetType, targetRange } = abilityInstance.getModel().getProperties()
            const targetList: BattleUnit[]
                = battlefield.getTargetList(this.faction, faction, centerTarget, targetType, targetRange)
            console.log(targetList)
        }
    }
}