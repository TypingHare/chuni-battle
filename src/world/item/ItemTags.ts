import { Tag } from '../../core/registry/Tag.ts'
import { Registries } from '../../core/Registries.ts'
import { Resources } from '../../core/Resources.ts'

export class ItemTags {
    public static readonly GEM: Tag = ItemTags.createItemTags('gem')

    /**
     * Creates an item tags.
     * @param path The path of the item
     * @private
     */
    private static createItemTags(path: string): Tag {
        return new Tag(Registries.ITEM.getKey(), Resources.location(path))
    }
}