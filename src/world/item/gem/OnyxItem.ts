import { GemItem } from './GemItem.ts'

/**
 * Onyx item. (Earth)
 */
export class OnyxItem extends GemItem {
    public constructor() {
        super({
            name: 'Diamond',
            description: 'Diamond.'
        })
    }
}