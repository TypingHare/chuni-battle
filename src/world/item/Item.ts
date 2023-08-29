import { Model } from '../util/Model.ts'
import { ModelInstance } from '../util/ModelInstance.ts'

export interface ItemProperties {
    // The name of the item
    readonly name: string,

    // The description of the item
    readonly description: string,

    // The maximum stack size of this item.
    readonly maxStack: number,
}

export class Item extends Model<ItemProperties> {

}

export class ItemInstance extends ModelInstance<Item> {

}