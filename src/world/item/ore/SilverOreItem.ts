import { OreItem } from './OreItem.ts'

/**
 * Silver ore item.
 */
export class SilverOreItem extends OreItem {
    public constructor() {
        super({
            name: 'Silver Ore',
            description: 'Silver ore.',
        })
    }
}