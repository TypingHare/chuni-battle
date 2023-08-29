import { Site } from './Site.ts'
import { Units } from '../Units.ts'
import { LevelRange } from '../util/LevelRange.ts'
import { Mob } from '../content/Mob.ts'

export class DarkForestSite extends Site {
    public constructor() {
        super({
            name: 'Dark Forest',
            mobModeList: [
                {
                    unit: Units.SPIDER_WARRIOR,
                    mob: Mob.Standard,
                    levelRange: new LevelRange(3, 5),
                    appearRate: 20,
                },
            ],
        })
    }
}