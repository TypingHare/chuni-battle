import { InstantiableModel } from '../util/InstantiableModel.ts'
import { ModelInstance } from '../util/ModelInstance.ts'
import { Unit, UnitInstance } from '../unit/Unit.ts'
import { MobType } from '../content/MobType.ts'
import { LevelRange } from '../util/LevelRange.ts'

export interface MobMode {
    // The unit
    readonly unit: Unit,

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

export class Site extends InstantiableModel<SiteProperties> {
    public override spawnInstance(): SiteInstance {
        return new SiteInstance(this)
    }
}

export class SiteInstance extends ModelInstance<Site> {
    /**
     * Creates a mob group.
     */
    public createMobGroup(): UnitInstance[] {
        const { mobModeList } = this.model.getProperties()
        const mobList: UnitInstance[] = []

        const { unit, levelRange } = mobModeList[0]
        mobList.push(unit.spawnInstance({
            level: levelRange.getRandomLevel(),
        }))

        return mobList
    }
}