import { Registries } from '../core/Registries.ts'
import { Builtins } from '../core/Builtins.ts'
import { Item } from './item/Item.ts'
import { SapphireItem } from './item/gem/SapphireItem.ts'
import { DiamondItem } from './item/gem/DiamondItem.ts'
import { GemItem } from './item/gem/GemItem.ts'
import { ItemTags } from './item/ItemTags.ts'

/**
 * Builtin items.
 */
export class Items {
    public static readonly SAPPHIRE = Items.registerGem('sapphire', new SapphireItem())
    public static readonly DIAMOND = Items.registerGem('diamond', new DiamondItem())

    /**
     * Registers an item.
     * @param path The path of this item
     * @param item The item to register
     * @private
     */
    private static register(path: string, item: Item): Item {
        return Registries.ITEM.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), item)
    }

    /**
     * Registers a gem.
     * @param path The path of this item
     * @param gemItem The gem item to register
     * @private
     */
    private static registerGem(path: string, gemItem: GemItem): Item {
        const location = Registries.ITEM.getLocationByResource(Items.register(path, gemItem))
        Registries.ITEM.getReference(location).bindTag(ItemTags.GEM)

        return gemItem
    }
}