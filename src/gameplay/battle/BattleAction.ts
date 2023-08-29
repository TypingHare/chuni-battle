import { BattlefieldFaction } from './Battlefield.ts'

/**
 * BattleAction.
 */
export class BattleAction {
    /**
     * Attack action.
     */
    public static readonly ATTACK = -1

    public constructor(
        private action: number,
        private centerTargetFaction: BattlefieldFaction,
        private centerTarget: number,
    ) {
    }

    public getAction(): number {
        return this.action
    }

    public getCenterTargetFaction(): BattlefieldFaction {
        return this.centerTargetFaction
    }

    public getCenterTarget(): number {
        return this.centerTarget
    }
}