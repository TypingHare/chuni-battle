import { ResourceLocation } from '../resource/ResourceLocation.ts'

/**
 * Thrown when a requested resource does not exist.
 */
export class ResourceNotFoundException extends Error {
    /**
     * Creates a ResourceNotFoundException.
     * @param resourceLocation The location of the missing resource
     */
    public constructor(private readonly resourceLocation: ResourceLocation) {
        super(`Resource not found at location: [ ${resourceLocation.toString()} ]`)
    }

    /**
     * Returns the location of the missing resource.
     */
    public getResourceLocation(): ResourceLocation {
        return this.resourceLocation
    }
}