import { ResourceKey } from '../resource/ResourceKey.ts'
import { ResourceLocation } from '../resource/ResourceLocation.ts'
import { Reference } from './Reference.ts'

/**
 * Registry.
 * @param <T> The type of the containing resources
 */
export abstract class Registry<T = any> {
    /**
     * Creates a registry.
     * @param resourceKey The resource key of this registry
     */
    protected constructor(private readonly resourceKey: ResourceKey) {
    }

    /**
     * Returns the key of this registry.
     */
    public getKey(): ResourceKey {
        return this.resourceKey
    }

    /**
     * Returns the resource key by a location.
     * @param resourceLocation The location of the resource
     */
    public abstract getResourceKey(resourceLocation: ResourceLocation): ResourceKey

    /**
     * Registers a resource.
     * @param resourceLocation The location of the resource
     * @param resource The resource to register
     * @throws ResourceKeyConflictException if the resource key conflict appears
     */
    public abstract register(resourceLocation: ResourceLocation, resource: T): T

    /**
     * Returns the reference.
     */
    public abstract getReference(resourceLocation: ResourceLocation): Reference<T>

    /**
     * Retrieves a resource by a specified resource location.
     * @param resourceLocation The location of the resource
     */
    public abstract getByLocation(resourceLocation: ResourceLocation): T

    /**
     * Retrieves a resource by a specified resource key.
     * @param resourceKey The key of the resource
     */
    public abstract getByKey(resourceKey: ResourceKey): T

    /**
     * Returns the location of a resource
     * @param resource A registered resource
     */
    public abstract getLocationByResource(resource: T): ResourceLocation

    /**
     * Returns the list of references.
     */
    public abstract getReferenceList(): Reference<T>[]
}