package chuni.core.gameplay.content

enum class MobType {
    // A normal mob
    NORMAL,

    // A mob group has at most one elite mob
    ELITE,

    // A mini boss will appear with at most two standard mobs
    MINI_BOSS,

    // A boss will appear without any other mobs
    BOSS
}