import { OreItem } from './OreItem.ts'

/**
 * Gold ore item.
 */
export class GoldOreItem extends OreItem {
    public constructor() {
        super({
            name: 'Silver Ore',
            description: 'Silver ore.'
        })
    }
}