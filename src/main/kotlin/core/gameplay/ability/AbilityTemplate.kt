package chuni.core.gameplay.ability

import chuni.core.gameplay.Template
import kotlin.random.Random

class AbilityOptions

class AbilityTemplate : Template<Ability, AbilityOptions>() {
    override fun createInstance(
        random: Random,
        options: AbilityOptions
    ): Ability {
        return Ability()
    }
}