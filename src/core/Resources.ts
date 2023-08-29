import { ResourceKey } from './resource/ResourceKey.ts'
import { Registry } from './registry/Registry.ts'
import { Builtins } from './Builtins.ts'
import { ResourceLocation } from './resource/ResourceLocation.ts'

/**
 * A utility class containing helper functions relating to resources.
 */
export class Resources {
    /**
     * Creates a resource location with the builtin resource location builder.
     * @param path The path of the location
     */
    public static location(path: string): ResourceLocation {
        return Builtins.RESOURCE_LOCATION_BUILDER.create(path)
    }

    /**
     * Creates a resource key with the builtin resource location builder.
     * @param registry The registry of the resource
     * @param path The path of the resource
     */
    public static key(registry: Registry, path: string): ResourceKey {
        const location = Builtins.RESOURCE_LOCATION_BUILDER.create(path)

        return new ResourceKey(registry.getKey().getLocation(), location)
    }
}