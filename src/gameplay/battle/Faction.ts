export enum Faction {
    Own, Enemy
}

export class FactionUtil {
    public static enemyOf(faction: Faction): Faction {
        return faction ^ 1
    }
}