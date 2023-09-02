import { InstantiableModel } from '../util/InstantiableModel.ts'
import { ModelInstance } from '../util/ModelInstance.ts'
import { UnitModel, Unit } from '../unit/Unit.ts'
import { MobType } from '../content/MobType.ts'
import { LevelRange } from '../util/LevelRange.ts'

export interface MobMode {
    // The unit
    readonly unit: UnitModel,

    // The type of this mob
    readonly mob: MobType,

    // The level range
    readonly levelRange: LevelRange

    // The appear-rate of this unit
    readonly appearRate: number
}

export interface SiteProperties {
    // The name of this site
    name: string

    // The mobs of this site
    mobModeList: MobMode[]
}

export class SiteModel extends InstantiableModel<SiteProperties> {
    public override createInstance(): Site {
        return new Site(this)
    }
}

export class Site extends ModelInstance<SiteModel, SiteProperties> {
    /**
     * Creates a mob group.
     */
    public createMobGroup(): Unit[] {
        const { mobModeList } = this.model.getProperties()
        const mobList: Unit[] = []

        const { unit, levelRange } = mobModeList[0]
        mobList.push(unit.createInstance({
            level: levelRange.getRandomLevel(),
        }))

        return mobList
    }
}