package chuni.core.gameplay.statuseffect

import chuni.core.common.IntZeroRange
import chuni.core.common.Range
import chuni.core.gameplay.Template
import kotlin.random.Random

class StatusEffectOptions

open class StatusEffectTemplate(
    val isInstant: Boolean,
    val durationMsRange: Range<Int>,
    val intervalMsRange: Range<Int>,
) : Template<StatusEffect, StatusEffectOptions>() {
    override fun createInstance(
        random: Random,
        options: StatusEffectOptions
    ): StatusEffect {
        return StatusEffect(
            isInstant,
            durationMsRange.generate(random),
            intervalMsRange.generate(random)
        )
    }
}

open class ImmediateEffectTemplate() :
    StatusEffectTemplate(true, IntZeroRange(), IntZeroRange()) {}

class PeriodicEffectTemplate(
    durationMsRange: Range<Int>,
    intervalMsRange: Range<Int>,
) : StatusEffectTemplate(false, durationMsRange, intervalMsRange)