package chuni.core.gameplay.statuseffect

/**
 * @property isInstant Whether this effect is applied immediately at the start.
 * @property durationMs The total duration of the effect in milliseconds.
 * @property intervalMs The interval at which the effect is reapplied in milliseconds.
 */
open class StatusEffect(
    val isInstant: Boolean,
    val durationMs: Int,
    val intervalMs: Int,
)