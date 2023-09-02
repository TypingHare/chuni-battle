import { Faction } from './Faction.ts'


/**
 * Battle position
 */
export class BattlefieldPosition {
    /**
     * The width of battlefield of each faction.
     */
    public static readonly WIDTH: number = 5

    // Ten battlefield positions
    public static readonly OWN_1: BattlefieldPosition = new BattlefieldPosition(Faction.Own, 0)
    public static readonly OWN_2: BattlefieldPosition = new BattlefieldPosition(Faction.Own, 1)
    public static readonly OWN_3: BattlefieldPosition = new BattlefieldPosition(Faction.Own, 2)
    public static readonly OWN_4: BattlefieldPosition = new BattlefieldPosition(Faction.Own, 3)
    public static readonly OWN_5: BattlefieldPosition = new BattlefieldPosition(Faction.Own, 4)
    public static readonly ENEMY_1: BattlefieldPosition = new BattlefieldPosition(Faction.Enemy, 0)
    public static readonly ENEMY_2: BattlefieldPosition = new BattlefieldPosition(Faction.Enemy, 1)
    public static readonly ENEMY_3: BattlefieldPosition = new BattlefieldPosition(Faction.Enemy, 2)
    public static readonly ENEMY_4: BattlefieldPosition = new BattlefieldPosition(Faction.Enemy, 3)
    public static readonly ENEMY_5: BattlefieldPosition = new BattlefieldPosition(Faction.Enemy, 4)

    private static readonly LIST = [
        BattlefieldPosition.OWN_1, BattlefieldPosition.OWN_2, BattlefieldPosition.OWN_3, BattlefieldPosition.OWN_4, BattlefieldPosition.OWN_5,
        BattlefieldPosition.ENEMY_1, BattlefieldPosition.ENEMY_2, BattlefieldPosition.ENEMY_3, BattlefieldPosition.ENEMY_4, BattlefieldPosition.ENEMY_5,
    ]

    /**
     * The hero's battlefield position.
     */
    public static readonly HERO: BattlefieldPosition = BattlefieldPosition.OWN_3

    /**
     * Returns a specified battlefield position.
     * @param faction
     * @param index
     */
    public static of(faction: Faction, index: number): BattlefieldPosition {
        if (index < 0 || index >= this.WIDTH) {
            throw new Error(`Illegal battlefield index: [ ${index} ]`)
        }

        return this.LIST[index + faction * this.WIDTH]
    }

    /**
     * Creates a battlefield position
     * @param faction The faction
     * @param index The index (count from left to right)
     */
    private constructor(
        private readonly faction: Faction,
        private readonly index: number,
    ) {
    }

    /**
     * Returns the faction.
     */
    public getFaction(): Faction {
        return this.faction
    }

    /**
     * Returns the index.
     */
    public getIndex(): number {
        return this.index
    }
}