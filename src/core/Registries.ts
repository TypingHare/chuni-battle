import { Builtins } from './Builtins.ts'
import { Registry } from './registry/Registry.ts'
import { BuiltinRegistry } from './registry/BuiltinRegistry.ts'
import { ResourceKey } from './resource/ResourceKey.ts'
import { Modifier } from '../world/modifier/Modifier.ts'
import { Ability } from '../world/ability/Ability.ts'
import { Effect } from '../world/effect/Effect.ts'
import { Item } from '../world/item/Item.ts'
import { Site } from '../world/site/Site.ts'
import { Unit } from '../world/unit/Unit.ts'

/**
 * A utility class collecting all builtin registries.
 */
export class Registries {
    // Root registry
    public static readonly ROOT: Registry<Registry>
        = new BuiltinRegistry<Registry>(Registries.createRegistryKey(Builtins.ROOT_LOCATION_PATH))

    // Regular registries
    public static readonly ABILITY: Registry<Ability> = Registries.createRegistry('ability')
    public static readonly EFFECT: Registry<Effect> = Registries.createRegistry('effect')
    public static readonly ITEM: Registry<Item> = Registries.createRegistry('item')
    public static readonly MODIFIER: Registry<Modifier> = Registries.createRegistry('modifier')
    public static readonly SITE: Registry<Site> = Registries.createRegistry('site')
    public static readonly UNIT: Registry<Unit> = Registries.createRegistry('unit')

    /**
     * Creates a registry key.
     * @param path The path of the location.
     * @private
     */
    private static createRegistryKey(path: string): ResourceKey {
        return new ResourceKey(Builtins.ROOT_LOCATION, Builtins.RESOURCE_LOCATION_BUILDER.create(path))
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