import { Item, ItemProperties } from '../Item.ts'

export type GemItemProperties = Omit<ItemProperties, 'maxStack'>

/**
 * Gem item.
 */
export class GemItem extends Item {
    public constructor(properties: GemItemProperties) {
        super({ ...properties, maxStack: 64 })
    }
}