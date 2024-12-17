package chuni.core.gameplay.unit

import chuni.core.gameplay.Template
import kotlin.random.Random

class UnitOptions(val level: Int) {
}

class UnitTemplate : Template<Unit, UnitOptions>() {
    override fun createInstance(random: Random, unitOptions: UnitOptions) =
        Unit()
}