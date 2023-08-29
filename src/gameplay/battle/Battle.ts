import { Battlefield } from './Battlefield.ts'

/**
 * Battle.
 */
export class Battle {
    /**
     * Creates a battle.
     * @param battlefield Battle field
     */
    public constructor(
        private readonly battlefield: Battlefield,
    ) {
    }

    /**
     * Battle begins.
     */
    public begin(): void {

    }

    public getBattleField(): Battlefield {
        return this.battlefield
    }
}