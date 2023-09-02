import { Registries } from '../../core/Registries.ts'
import { Builtins } from '../../core/Builtins.ts'
import { Abilities } from './Abilities.ts'
import { UnitModel } from '../unit/Unit.ts'
import { WarriorUnit } from '../unit/WarriorUnit.ts'

/**
 * Builtin units.
 */
export class Units {
    public static readonly SPIDER_WARRIOR = Units.register('spider_warrior', new WarriorUnit({
        name: 'Spider Warrior',
        race: null,
        abilityModeList: [
            { ability: Abilities.TACKLE, level: 1 },
        ],
    }))

    /**
     * Registers a unit.
     * @param path The path of the unit
     * @param unit The unit to register
     * @private
     */
    private static register(path: string, unit: UnitModel): UnitModel {
        return Registries.UNIT.register(Builtins.RESOURCE_LOCATION_BUILDER.create(path), unit)
    }
}