import { BattlefieldPosition } from './BattlefieldPosition.ts'

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
        private position: BattlefieldPosition,
    ) {
    }

    public getAction(): number {
        return this.action
    }

    public getPosition(): BattlefieldPosition {
        return this.position
    }
}