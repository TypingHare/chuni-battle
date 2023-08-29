import { GemItem } from './GemItem.ts'

/**
 * Diamond item.
 */
export class DiamondItem extends GemItem {
    public constructor() {
        super({
            name: 'Diamond',
            description: 'Diamond.'
        })
    }
}