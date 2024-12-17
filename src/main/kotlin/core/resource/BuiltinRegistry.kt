package chuni.core.resource

class BuiltinRegistry<T>(resourceKey: ResourceKey) : Registry<T>(resourceKey) {
    private val byId = mutableListOf<Reference<T>>()
    private val byKey = mutableMapOf<ResourceKey, Reference<T>>()

    @Throws(ResourceKeyConflictException::class)
    override fun register(
        path: ResourceLocation,
        resource: T
    ): T {
        val resourceKey = createResourceKey(path)
        if (byKey.containsKey(resourceKey)) {
            throw ResourceKeyConflictException(resourceKey)
        }

        Reference(resourceKey, resource, this.byId.size).apply {
            byId.add(this)
            byKey[resourceKey] = this
        }

        return resource
    }

    override fun getReference(id: Int): Reference<T> = byId[id]

    @Throws(ResourceKeyNotFoundException::class)
    override fun getReference(resourceKey: ResourceKey): Reference<T> {
        return byKey[resourceKey] ?: throw ResourceKeyNotFoundException(
            resourceKey
        )
    }

    override fun getReferenceList(): List<Reference<T>> = byId
}