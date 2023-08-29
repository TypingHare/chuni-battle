import { Item, ItemProperties } from '../Item.ts'

export type OreItemProperties = Omit<ItemProperties, 'maxStack'>

/**
 * Gem item.
 */
export class OreItem extends Item {
    public constructor(properties: OreItemProperties) {
        super({ ...properties, maxStack: 32 })
    }
}