import { Model } from '../util/Model.ts'

export enum ItemType {
    Material,
    Food,
    Tome,
    Equipment,
    Gem,
    Potion,
}

export interface ItemProperties {
    // The type of the item
    readonly type: ItemType

    // The name of the item
    readonly name: string

    // The description of the item
    readonly description: string

    // The maximum stack size of this item.
    readonly maxStack: number
}

export class ItemModel extends Model<ItemProperties> {
}