import { Item, ItemProperties, ItemType } from '../Item.ts'

export type OreItemProperties = Omit<ItemProperties, 'type' | 'maxStack'>

/**
 * Gem item.
 */
export class OreItem extends Item {
    public constructor(properties: OreItemProperties) {
        super({ ...properties, type: ItemType.Material, maxStack: 32 })
    }
}