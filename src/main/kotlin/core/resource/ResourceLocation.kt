package chuni.core.resource

import java.util.*

class ResourceLocation(val namespace: String, val path: String) {
    init {
        if (!namespace.matches(NAMESPACE_REGEX)) {
            throw IllegalArgumentException("Invalid namespace: '$namespace'")
        }

        if (!path.matches(PATH_REGEX)) {
            throw IllegalArgumentException("Invalid path: '$path'")
        }
    }

    override fun toString(): String = "$namespace$DELIMITER$path"

    override fun equals(other: Any?): Boolean =
        other is ResourceLocation && other.namespace == namespace && other.path == path

    override fun hashCode(): Int = Objects.hash(namespace, path)

    companion object {
        const val DELIMITER = ':'
        val NAMESPACE_REGEX = Regex("^[A-Za-z](-?[A-Za-z0-9]+)*\$")
        val PATH_REGEX = Regex("^[A-Za-z0-9/._-]+$")
    }
}
