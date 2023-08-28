import { ResourceLocation } from './resource/ResourceLocation.ts'
import { Builtins } from './Builtins.ts'
import { Registry } from './registry/Registry.ts'
import { BuiltinRegistry } from './registry/BuiltinRegistry.ts'
import { ResourceKey } from './resource/ResourceKey.ts'
import { Modifier } from '../world/modifier/Modifier.ts'

export class Registries {
    /**
     * The path of root resource location.
     */
    public static readonly ROOT_LOCATION_PATH: string = 'root'

    /**
     * Root location.
     */
    public static readonly ROOT_LOCATION: ResourceLocation
        = Builtins.RESOURCE_LOCATION_BUILDER.create(Registries.ROOT_LOCATION_PATH)

    // Root registry
    public static readonly ROOT: Registry<Registry>
        = new BuiltinRegistry<Registry>(Registries.createRegistryKey(Registries.ROOT_LOCATION_PATH))

    // Regular registries
    public static readonly MODIFIER: Registry<Modifier> = Registries.createRegistry('modifier')

    /**
     * Creates a registry key.
     * @param path The path of the location.
     * @private
     */
    private static createRegistryKey(path: string): ResourceKey {
        return new ResourceKey(Registries.ROOT_LOCATION, Builtins.RESOURCE_LOCATION_BUILDER.create(path))
    }

    /**
     * Creates and returns a registry.
     * @param path The path of the registry
     * @private
     */
    private static createRegistry<T>(path: string): Registry<T> {
        const registryKey = Registries.createRegistryKey(path)

        return Registries.ROOT.register(registryKey.getLocation(), new BuiltinRegistry<T>(registryKey))
    }
}