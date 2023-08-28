import { ResourceKey } from '../resource/ResourceKey.ts'

/**
 * Resource key conflict exception.
 */
export class ResourceKeyConflictException extends Error {
    public constructor(private resourceKey: ResourceKey) {
        super(`Fail to register resource due to key conflict: [ ${resourceKey.toString()} ].`)
    }

    /**
     * Returns the conflicted resource key.
     */
    public getResourceKey(): ResourceKey {
        return this.resourceKey
    }
}