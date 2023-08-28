import { ResourceLocation } from '../resource/ResourceLocation.ts'
import { ResourceKey } from '../resource/ResourceKey.ts'
import { Registry } from './Registry.ts'

/**
 * Tag.
 */
export class Tag {
    /**
     * Creates a tag.
     * @param registryKey The registry key
     * @param location The location of this tag
     */
    public constructor(
        private readonly registryKey: ResourceKey,
        private readonly location: ResourceLocation,
    ) {
    }

    /**
     *
     * @param registry
     */
    public isFor(registry: Registry): boolean {
        return this.registryKey === registry.getKey()
    }

    /**
     * Returns the location of this tag.
     */
    public getLocation(): ResourceLocation {
        return this.location
    }
}