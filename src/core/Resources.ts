/**
 * A utility class containing helper functions relating to resources.
 */
export class Resources {
    // /**
    //  * Finds a resource by its key.
    //  * @param resourceKey The key of the resource to search
    //  */
    // public static find<T>(resourceKey: ResourceKey): T {
    //     const registry = Registries.ROOT.getByLocation(resourceKey.getParent()) as Registry<T>
    //
    //     return registry.getByLocation(resourceKey.getLocation()) as T
    // }
    //
    // /**
    //  * Creates a resource key.
    //  * @param registry The registry of the resource
    //  * @param path The path of the resource
    //  */
    // public static key(registry: Registry, path: string): ResourceKey {
    //     const registryLocation = registry.getResourceKey().getLocation()
    //     const location = Builtins.RESOURCE_LOCATION_BUILDER.create(path)
    //
    //     return new ResourceKey(registryLocation, location)
    // }
}