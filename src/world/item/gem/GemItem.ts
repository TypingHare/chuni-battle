import { ItemModel, ItemProperties, ItemType } from '../Item.ts'

export type GemItemProperties = Omit<ItemProperties, 'type' | 'maxStack'>

/**
 * Gem item.
 */
export class GemItem extends ItemModel {
    public constructor(properties: GemItemProperties) {
        super({ ...properties, type: ItemType.Gem, maxStack: 64 })
    }
}