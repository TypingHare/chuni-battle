import { OreItem } from './OreItem.ts'

/**
 * Silver ore item.
 */
export class CopperOreItem extends OreItem {
    public constructor() {
        super({
            name: 'Silver Ore',
            description: 'Silver ore.'
        })
    }
}