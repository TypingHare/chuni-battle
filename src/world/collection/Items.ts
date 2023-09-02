import { Registries } from '../../core/Registries.ts'
import { Builtins } from '../../core/Builtins.ts'
import { ItemModel } from '../item/Item.ts'
import { SapphireItem } from '../item/gem/SapphireItem.ts'
import { DiamondItem } from '../item/gem/DiamondItem.ts'

/**
 * Builtin items.
 */
export class Items {
    // Gems
    public static readonly SAPPHIRE = Items.register('sapphire', new SapphireItem())
    public static readonly DIAMOND = Items.register('diamond', new DiamondItem())

    /**
     * Registers an item.
     * @param path The path of this item
     * @param item The item to register
     * @private
     */
    private static register(path: string, item: ItemModel): ItemModel {
        return Registries.ITEM.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), item)
    }
}