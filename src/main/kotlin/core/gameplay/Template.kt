package chuni.core.gameplay

import kotlin.random.Random

abstract class Template<T, O> {
    abstract fun createInstance(random: Random, options: O): T
}