package chuni.core.resource

import java.util.Objects

class ResourceKey(
    val parent: ResourceLocation,
    val location: ResourceLocation
) {
    override fun toString(): String = "$parent$DELIMITER$location"

    override fun equals(other: Any?): Boolean =
        other is ResourceKey && other.parent == parent && other.location == location

    companion object {
        const val DELIMITER = '@'
    }

    override fun hashCode() : Int = Objects.hash(parent, location)
}