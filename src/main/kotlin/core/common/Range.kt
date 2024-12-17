package chuni.core.common

import com.sun.jdi.InvalidTypeException
import kotlin.random.Random
import kotlin.reflect.KClass
import kotlin.reflect.cast

abstract class Range<T> {
    abstract fun generate(random: Random): T
}

class LinearRange<T : Number>(
    val start: T,
    val step: T,
    val count: Int
) : Range<T>() {
    override fun generate(random: Random): T {
        val index = random.nextInt(count)

        @Suppress("UNCHECKED_CAST")
        return when (start) {
            is Int -> (start + index * step.toInt()) as T
            is Long -> (start + index * step.toLong()) as T
            is Float -> (start + index * step.toFloat()) as T
            is Double -> (start + index * step.toDouble()) as T
            else -> throw InvalidTypeException("Unsupported numeric type: ${start::class}")
        }
    }
}

open class ZeroRange<T : Number>(val type: KClass<T>) : Range<T>() {
    override fun generate(random: Random): T {
        return type.cast(0)
    }
}

class IntZeroRange() : ZeroRange<Int>(Int::class)
class LongZeroRange() : ZeroRange<Long>(Long::class)
class FloatZeroRange() : ZeroRange<Float>(Float::class)
class DoubleZeroRange() : ZeroRange<Double>(Double::class)
