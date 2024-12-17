package chuni.core.resource

class ResourceLocationCreator(val namespace: String) {
    fun create(path: String): ResourceLocation =
        ResourceLocation(namespace, path)
}