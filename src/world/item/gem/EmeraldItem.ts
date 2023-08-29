
import { GemItem } from './GemItem.ts'

/**
 * Emerald item. (Wood)
 */
export class EmeraldItem extends GemItem {
    public constructor() {
        super({
            name: 'Diamond',
            description: 'Diamond.'
        })
    }
}