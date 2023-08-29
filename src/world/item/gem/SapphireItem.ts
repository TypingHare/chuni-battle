import { GemItem } from './GemItem.ts'

/**
 * Sapphire item. (Water)
 */
export class SapphireItem extends GemItem {
    public constructor() {
        super({
            name: 'Diamond',
            description: 'Diamond.'
        })
    }
}