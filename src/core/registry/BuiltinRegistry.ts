import { Registry } from './Registry.ts'
import { ResourceKey } from '../resource/ResourceKey.ts'
import { Reference } from './Reference.ts'
import { ResourceLocation } from '../resource/ResourceLocation.ts'
import { ResourceNotFoundException } from './ResourceNotFoundException.ts'
import { ResourceKeyConflictException } from './ResourceKeyConflictException.ts'

/**
 * Builtin implementation of registry.
 */
export class BuiltinRegistry<T = any> extends Registry<T> {
    /**
     * A mapping of key map and resource key.
     * @private
     */
    private readonly keyMap: Map<string, ResourceKey> = new Map()

    /**
     * The list of references. The index of the reference serves as its ID.
     * @private
     */
    private readonly byId: Reference<T>[] = []

    /**
     * A mapping of resource location and its resource reference.
     * @private
     */
    private readonly byLocation: Map<ResourceLocation, Reference<T>> = new Map()

    /**
     * A mapping of resource and its location.
     * @private
     */
    private readonly byResource: Map<T, ResourceLocation> = new Map

    /**
     * Creates a builtin registry.
     * @param resourceKey The resource key of this registry
     */
    public constructor(resourceKey: ResourceKey) {
        super(resourceKey)
    }

    public override getByKey(resourceKey: ResourceKey): T {
        return this.getByLocation(resourceKey.getLocation())
    }

    public override getReference(resourceLocation: ResourceLocation): Reference<T> {
        const reference = this.byLocation.get(resourceLocation)

        if (!reference) {
            throw new ResourceNotFoundException(resourceLocation)
        }

        return reference
    }

    public override getByLocation(resourceLocation: ResourceLocation): T {
        return this.getReference(resourceLocation).getResource()
    }

    public override getResourceKey(resourceLocation: ResourceLocation): ResourceKey {
        const locationString = resourceLocation.toString()
        const resourceKey = this.keyMap.get(locationString)

        if (!resourceKey) {
            throw new ResourceNotFoundException(resourceLocation)
        }

        return resourceKey
    }

    public override register(resourceLocation: ResourceLocation, resource: T): T {
        const locationString = resourceLocation.toString()
        const resourceKey = new ResourceKey(this.getKey().getLocation(), resourceLocation)
        if (this.keyMap.get(locationString)) {
            throw new ResourceKeyConflictException(resourceKey)
        }

        const reference = new Reference(resourceKey, resource)
        this.keyMap.set(resourceLocation.toString(), resourceKey)
        this.byId.push(reference)
        this.byLocation.set(resourceLocation, reference)
        this.byResource.set(resource, resourceLocation)

        return resource
    }

    public override getLocationByResource(resource: T): ResourceLocation {
        const location = this.byResource.get(resource)

        if (!location) {
            throw new Error()
        }

        return location
    }

    public override getReferenceList(): Reference<T>[] {
        return this.byId
    }
}