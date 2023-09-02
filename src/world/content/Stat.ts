import { Race } from './Race.ts'

/**
 * Unit stats.
 */
export enum Stat {
    // Health and mana
    HealthPoint,
    ManaPoint,

    // Regenerations
    HealthRegeneration,
    ManaRegeneration,

    // Primary attributes
    Wisdom,
    Fortune,
    Agility,
    Strength,
    Stamina,

    // Secondary attribute (visible)
    SpellMastery,       // wisdom
    Parry,              // fortune
    Speed,              // agility
    Attack,             // strength
    Defense,            // stamina

    // Secondary attribute (hidden)
    CastingMastery,     // wisdom * agility
    Focus,              // wisdom * stamina
    CriticalStrike,     // fortune * strength
    Dexterity,          // fortune * agility
    Vitality,           // agility * stamina
    Dodge,              // agility * fortune
    Bash,               // strength * fortune
    SpellPower,         // strength * wisdom
    Endurance,          // stamina * strength
    CounterSpell        // stamina * wisdom
}

export type PrimaryAttribute = Stat.Wisdom | Stat.Fortune | Stat.Agility | Stat.Strength | Stat.Stamina
export type VisibleAttribute = Stat.SpellMastery | Stat.Parry | Stat.Speed | Stat.Attack | Stat.Defense
export type HiddenAttribute =
    Stat.CastingMastery
    | Stat.Focus
    | Stat.CriticalStrike
    | Stat.Dexterity
    | Stat.Vitality
    | Stat.Dodge
    | Stat.Bash
    | Stat.SpellPower
    | Stat.Endurance
    | Stat.CounterSpell

export type SecondaryAttribute = VisibleAttribute | HiddenAttribute

export class StatsUtil {
    /**
     * The mapping of visible attributes and the primary attribute.
     */
    public static readonly VISIBLE_ATTRIBUTE_MAPPING: Record<VisibleAttribute, PrimaryAttribute> = {
        [Stat.SpellMastery]: Stat.Wisdom,
        [Stat.Parry]: Stat.Fortune,
        [Stat.Speed]: Stat.Agility,
        [Stat.Attack]: Stat.Strength,
        [Stat.Defense]: Stat.Stamina,
    }

    /**
     * The mapping of hidden attributes and two relevant primary attributes.
     */
    public static readonly HIDDEN_ATTRIBUTE_MAPPING: Record<HiddenAttribute, [PrimaryAttribute, PrimaryAttribute]> = {
        [Stat.CastingMastery]: [Stat.Wisdom, Stat.Agility],
        [Stat.Focus]: [Stat.Wisdom, Stat.Stamina],
        [Stat.CriticalStrike]: [Stat.Fortune, Stat.Strength],
        [Stat.Dexterity]: [Stat.Fortune, Stat.Agility],
        [Stat.Vitality]: [Stat.Agility, Stat.Stamina],
        [Stat.Dodge]: [Stat.Agility, Stat.Fortune],
        [Stat.Bash]: [Stat.Strength, Stat.Fortune],
        [Stat.SpellPower]: [Stat.Strength, Stat.Wisdom],
        [Stat.Endurance]: [Stat.Stamina, Stat.Strength],
        [Stat.CounterSpell]: [Stat.Stamina, Stat.Wisdom],
    }

    /**
     * The mapping of races and their corresponding main primary attribute.
     */
    public static readonly RACE_PRIMARY_ATTRIBUTE_MAPPING: Record<Race, PrimaryAttribute> = {
        [Race.Human]: Stat.Wisdom,
        [Race.Elf]: Stat.Fortune,
        [Race.Specter]: Stat.Agility,
        [Race.Orc]: Stat.Strength,
        [Race.Colossus]: Stat.Stamina,
    }

    public static isBasic(stat: Stat): boolean {
        return !this.isAttribute(stat)
    }

    public static isAttribute(stat: Stat): boolean {
        return stat >= Stat.Wisdom && stat <= Stat.CounterSpell
    }

    /**
     * Check if a stat is a primary attribute.
     * @param stat
     */
    public static isPrimaryAttribute(stat: Stat): boolean {
        return stat >= Stat.Wisdom && stat <= Stat.Stamina
    }

    /**
     * Check if a stat is a secondary attribute.
     * @param stat
     */
    public static isSecondaryAttribute(stat: Stat): boolean {
        return stat >= Stat.SpellMastery && stat <= Stat.CounterSpell
    }

    /**
     * Check if a stat is a visible secondary attribute.
     * @param stat
     */
    public static isVisibleAttribute(stat: Stat): boolean {
        return stat >= Stat.SpellMastery && stat <= Stat.Defense
    }
}