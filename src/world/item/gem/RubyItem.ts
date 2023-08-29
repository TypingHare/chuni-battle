import { GemItem } from './GemItem.ts'

/**
 * Ruby item. (Fire)
 */
export class RubyItem extends GemItem {
    public constructor() {
        super({
            name: 'Diamond',
            description: 'Diamond.'
        })
    }
}