import { OreItem } from './OreItem.ts'

/**
 * Iron ore item.
 */
export class IronOreItem extends OreItem {
    public constructor() {
        super({
            name: 'Silver Ore',
            description: 'Silver ore.'
        })
    }
}