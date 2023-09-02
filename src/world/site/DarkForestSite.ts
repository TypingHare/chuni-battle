import { Site } from './Site.ts'
import { Units } from '../collection/Units.ts'
import { LevelRange } from '../util/LevelRange.ts'
import { MobType } from '../content/MobType.ts'

export class DarkForestSite extends Site {
    public constructor() {
        super({
            name: 'Dark Forest',
            mobModeList: [
                {
                    unit: Units.SPIDER_WARRIOR,
                    mob: MobType.Standard,
                    levelRange: new LevelRange(3, 5),
                    appearRate: 20,
                },
            ],
        })
    }
}