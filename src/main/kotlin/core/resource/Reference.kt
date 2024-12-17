package chuni.core.resource

class Reference<T>(
    val resourceKey: ResourceKey,
    val resource: T,
    val id: Int
)