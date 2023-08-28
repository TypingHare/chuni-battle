import { ResourceLocation } from './ResourceLocation'

/**
 * Represents a unique key that identifies a game resource.
 */
export class ResourceKey {


    /**
     * Creates a resource key.
     * @param parent The parent of this resource key. For a game object, it is the location of the registry to which it
     *     registers; for a registry, it is the root location.
     * @param location The location of this resource key.
     * @private
     */
    public constructor(
        private readonly parent: ResourceLocation,
        private readonly location: ResourceLocation,
    ) {
    }

    /**
     * Returns the parent of this resource key.
     */
    public getParent(): ResourceLocation {
        return this.parent
    }

    /**
     * Returns the location of this resource key.
     */
    public getLocation(): ResourceLocation {
        return this.location
    }

    /**
     * Returns the resource key string.
     */
    public toString(): string {
        return `${location}@${parent}`
    }
}