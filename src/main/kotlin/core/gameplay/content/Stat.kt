package chuni.core.gameplay.content

enum class Stat {
    // Primary attributes
    WISDOM,
    FORTUNE,
    AGILITY,
    STRENGTH,
    STAMINA,

    // Secondary attributes (visible)
    SpellMastery,       // wisdom
    Parry,              // fortune
    Speed,              // agility
    Attack,             // strength
    Defense,            // stamina

    // Secondary attributes (hidden)
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
