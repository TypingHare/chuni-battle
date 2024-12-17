package chuni.core.gameplay.statuseffect

interface StatusEffectAffected {
    fun addStatusEffect(statusEffect: StatusEffect)
    fun removeStatusEffect(statusEffect: StatusEffect)
}