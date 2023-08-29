import { GemItem } from './GemItem.ts'

/**
 * Citrine item.
 */
export class CitrineItem extends GemItem {
    public constructor() {
        super({
            name: 'Citrine',
            description: 'Citrine.'
        })
    }
}