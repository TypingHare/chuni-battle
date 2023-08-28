import { ResourceKey } from '../resource/ResourceKey.ts'
import { Tag } from './Tag.ts'

/**
 * The reference of a resource.
 * @param T The type of the resource
 */
export class Reference<T = any> {
    /**
     * Empty tag set.
     * @private
     */
    private static readonly EMPTY_TAG_SET: Set<Tag> = new Set()

    /**
     * The set of tags.
     * @private
     */
    private tagSet: Set<Tag> = Reference.EMPTY_TAG_SET

    /**
     * Creates a reference.
     * @param resourceKey The key of the resource
     * @param resource The resource this reference contains
     */
    public constructor(
        private resourceKey: ResourceKey,
        private resource: T,
    ) {
    }

    /**
     * Returns the resource key.
     */
    public getResourceKey(): ResourceKey {
        return this.resourceKey
    }

    /**
     * Returns the resource it holds.
     */
    public getResource(): T {
        return this.resource
    }

    /**
     * Returns the set of tags.
     */
    public getTagSet(): Set<Tag> {
        return this.tagSet
    }

    /**
     * Binds a tag.
     * @param tag Tag to bind
     */
    public bindTag(tag: Tag): void {
        if (this.tagSet === Reference.EMPTY_TAG_SET) {
            this.tagSet = new Set()
        }

        this.tagSet.add(tag)
    }

    /**
     * Checks whether this reference contains a tag.
     * @param tag The tag to search for
     */
    public hasTag(tag: Tag): boolean {
        return this.tagSet.has(tag)
    }

    /**
     * Removes a tag.
     * @param tag The tag to remove
     */
    public removeTag(tag: Tag) {
        this.tagSet.delete(tag)
    }
}