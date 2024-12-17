package chuni.core.resource

/**
 * The key of every resource in a registry has the same parent.
 */
abstract class Registry<T>(val resourceKey: ResourceKey) {
    /**
     * Creates a resource key based on the path.
     */
    fun createResourceKey(path: ResourceLocation): ResourceKey =
        ResourceKey(resourceKey.location, path)

    /**
     * Registers a resource.
     */
    @Throws(ResourceKeyConflictException::class)
    abstract fun register(path: ResourceLocation, resource: T): T

    /**
     * Retrieves a reference by ID.
     */
    abstract fun getReference(id: Int): Reference<T>

    /**
     * Retrieves a reference by resource key.
     */
    @Throws(ResourceKeyNotFoundException::class)
    abstract fun getReference(resourceKey: ResourceKey): Reference<T>

    @Throws(ResourceKeyNotFoundException::class)
    fun getReference(path: ResourceLocation): Reference<T> =
        getReference(createResourceKey(path))

    abstract fun getReferenceList(): List<Reference<T>>
}

class ResourceKeyConflictException(resourceKey: ResourceKey) :
    RuntimeException("Resource key conflict: $resourceKey")

class ResourceKeyNotFoundException(resourceKey: ResourceKey) :
    RuntimeException("Resource location not found: $ResourceKey")